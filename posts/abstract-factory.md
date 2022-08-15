---
title: 设计模式：抽象工厂
description: 抽象工厂是如何演化而来的，在 OOP 和 FP 两种范式下的实现，以及一些随想。
topic: Design Patterns
createdAt: 2022/8/15
---

[工厂方法](/posts/factory-method)用于生产**单个产品族的多个变种**（如木头或塑料的椅子）。假设此时引入了另一个新的产品族，并且其拥有同样的变种——我们可以再在这个新产品族上套一遍工厂方法（下图左）；但直觉告诉我们，横向上一定也存在着某种联系。事实上，在多个产品族上套用工厂方法有两个缺点：

1. 业务逻辑散落在各自的 Creator 内，不利于两个产品族相互合作。
2. 很多情况下，程序会在启动时读取外部变量，并固定本次运行时始终使用某一变种。此时，我们就不得不手动指定很多遍，每个产品族都要使用这个变种。（举个例子，客户装修时一般都会想要统一风格的家具，比如木头椅子、木头桌子、木头饰品等等，一般都会要木头的一整套。）

![两套工厂方法 vs 抽象工厂](https://s2.loli.net/2022/08/15/alA9VHgEWMrJXPY.png)

那么，这种横向的联系是什么呢？肯定不是接口，因为桌子和椅子的功能不同，没办法抽象出接口。其实很容易想到，这种关系就是工厂，就像现实里，一个工厂专门做木质家具，另一个工厂专门做塑料家具一样。这个工厂会汇总相同变种的每个不同产品的工厂方法。

## OOP 下的实现

还是以椅子为例，这次我们加入另一个产品族：桌子，同样也有木头和塑料两种变种。

```ts
interface Chair {
  sit: () => void;
}

class WoodenChair implements Chair {
  sit() {
    console.log("I sit on a wooden chair.");
  }
}

class PlasticChair implements Chair {
  sit() {
    console.log("I sit on a plastic chair.");
  }
}

interface Table {
  eat: () => void;
}

class WoodenTable implements Table {
  eat() {
    console.log("I eat on a wooden table.");
  }
}

class PlasticTable implements Table {
  eat() {
    console.log("I eat on a plastic table.");
  }
}

interface Factory {
  createChair: () => Chair;
  createTable: () => Table;
}

class WoodenFactory implements Factory {
  createChair() {
    return new WoodenChair();
  }
  createTable() {
    return new WoodenTable();
  }
}

class PlasticFactory implements Factory {
  createChair() {
    return new PlasticChair();
  }
  createTable() {
    return new PlasticTable();
  }
}

function businessLogic(factory: Factory) {
  const chair = factory.createChair();
  const table = factory.createTable();

  console.log("I sweep the dust off the chair.");
  chair.sit();
  console.log("I adjust to a comfortable posture.");

  console.log("I place dishes on the table.");
  table.eat();
  console.log("I clean the dishes.");
}

function main(env: "wooden" | "plastic") {
  const factory = env === "wooden" ? new WoodenFactory() : new PlasticFactory();
  businessLogic(factory);
}

main("wooden");

// Result:
// I sweep the dust off the chair.
// I sit on a wooden chair.
// I adjust to a comfortable posture.
// I place dishes on the table.
// I eat on a wooden table.
// I clean the dishes.
```

可以看到，为了多个产品的合作，业务逻辑 `businessLogic` 不再寄生于各工厂方法的类内，而是脱离出来作为单独的方法。

其次是，`WoodenFactory` 负责制造 `Wooden` 变种，`PlasticFactory` 负责制造 `Plastic` 变种，这样就只需要指定一次工厂的种类，之后生产出的产品就都属于这一变种。

最后是，代码不再直接依赖各产品的类来生产产品，而是依赖工厂的方法来生产产品，扩展性也得到了增强。

## FP 下的实现

```ts
function sitOnWoodenChair() {
  console.log("I sit on a wooden chair.");
}

function sitOnPlasticChair() {
  console.log("I sit on a plastic chair.");
}

function eatOnWoodenTable() {
  console.log("I eat on a wooden table.");
}

function eatOnPlasticTable() {
  console.log("I eat on a plastic table.");
}

function woodenFactory() {
  return { sit: sitOnWoodenChair, eat: eatOnWoodenTable };
}

function plasticFactory() {
  return { sit: sitOnPlasticChair, eat: eatOnPlasticTable };
}

function businessLogic(factory: () => { sit: () => void; eat: () => void }) {
  const { sit, eat } = factory();

  console.log("I sweep the dust off the chair.");
  sit();
  console.log("I adjust to a comfortable posture.");

  console.log("I place dishes on the table.");
  eat();
  console.log("I clean the dishes.");
}

function main(env: "wooden" | "plastic") {
  const factory = env === "wooden" ? woodenFactory : plasticFactory;
  businessLogic(factory);
}

main("wooden");

// Result:
// I sweep the dust off the chair.
// I sit on a wooden chair.
// I adjust to a comfortable posture.
// I place dishes on the table.
// I eat on a wooden table.
// I clean the dishes.
```

FP 下的抽象工厂和工厂方法差的不多，只不过传给 `businessLogic` 的从单个的 `sit` 方法变成了 `factory`，后者的返回值包含着 `sit` 方法。这和 OOP 是相呼应的，其目的也是将同一变种的不同产品捆绑起来。

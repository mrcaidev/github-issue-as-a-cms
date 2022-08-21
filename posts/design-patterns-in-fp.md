---
title: 函数式编程范式下的设计模式
description: FP 范式下的设计模式有两大特点：数据方法解耦、函数一等公民。
topic: Design Patterns
createdAt: 2022/8/21
---

设计模式的出现，很大程度上是因为在 OOP 范式下，代码**以类为主要结构，方法围绕数据**。

于是，我们很多时候不得不把一个单纯的“行动”，抽象成“某个行动者在进行这项行动”，也就是需要在代码中明确点出这个行动的执行者，把一个动词扩充成主谓结构。

而 FP 范式则纯粹就是将“行动”作为“行动”，行动对象通过参数传入，这样就可以省下不少代码。

在 FP 这种范式下，我们可以看到两个与 OOP 显著的不同点：

1. **数据方法解耦。**方法不再围绕着类内的数据服务，而是以参数的方式接受数据，推崇[纯函数](https://en.wikipedia.org/wiki/Pure_function)。
2. **函数[一等公民](https://en.wikipedia.org/wiki/First-class_function)。**函数可以作为变量、参数或返回值，于是可以使用闭包、柯里化等手段以比肩 OOP。

## 数据方法解耦

这使得很多设计模式变得不再必要。

例如**单例模式**，我们完全可以直接把实例暴露出来，然后利用模块本身的 `export` 来决定哪些字段对外部可见。同理也适用于**享元模式、组合模式、原型模式**等等。

在 OOP 的设计模式中，我们还经常看到“一个类里包含着另一个类的实例作为字段”这种情景，比如**适配器模式、代理模式、装饰器模式、桥接模式**等等。实际上在 FP 中，这就可以简化成“一个函数调用另一个函数”，更加符合直觉。以适配器模式为例，在 OOP 下：

```ts
interface LegacyService {
  call: (value: string) => void;
}

interface ModernService {
  call: (value: number) => void;
}

class LegacyLibrary implements LegacyService {
  call(value: string) {
    console.log(value);
  }
}

class LegacyToModernAdapter implements ModernService {
  protected adaptee: LegacyService;

  constructor(adaptee: LegacyService) {
    this.adaptee = adaptee;
  }

  call(value: number) {
    this.adaptee.call(String(value));
  }
}

const adapter = new LegacyToModernAdapter(new LegacyLibrary());
adapter.call(1); // 1
```

但在 FP 下，上面的一大段逻辑甚至累赘得有些可笑：

```ts
function legacyCall(value) {
  console.log(value);
}

function adaptLegacyToModernCall(value) {
  legacyCall(String(value));
}

adaptLegacyToModernCall(1); // 1
```

所以网上其实有很多“FP 下不需要设计模式”的观点。

## 函数作为参数

**工厂方法**将这一点体现得十分明显。

我们使用工厂方法的目的是，**解耦宏观业务逻辑和其依赖的具体实现细节**。比如“寄快递”这件事，业务逻辑是“发货、运输、收货”，但“运输”这一块可以有很多种实现细节，如铁路、航运、空运等等。

在 OOP 下，我们的实现思路是：把业务逻辑放在抽象类里，然后用不同的子类“顶掉”抽象类的依赖。

```ts
interface Transportation {
  carry: () => void;
}

abstract class Logistics {
  // 不关心具体实现细节。
  abstract createTransportation(): Transportation;

  // 只关心宏观业务逻辑。
  deliver() {
    const transportation = this.createTransportation();
    console.log("发货");
    transportation.carry(); // 不管是什么交通工具，能 `carry` 就行。
    console.log("收货");
  }
}

class Ship implements Transportation {
  carry() {
    console.log("航运");
  }
}

class SeaLogistics extends Logistics {
  // 用具体的“船”顶掉抽象的“交通工具”。
  createTransportation() {
    return new Ship();
  }
}

class Plane implements Transportation {
  carry() {
    console.log("空运");
  }
}

class AirLogistics extends Logistics {
  // 用具体的“飞机”顶掉抽象的“交通工具”。
  createTransportation() {
    return new Plane();
  }
}

const seaLogistics = new SeaLogistics();
seaLogistics.deliver(); // 发货 空运 收货
const airLogistics = new AirLogistics();
airLogistics.deliver(); // 发货 航运 收货
```

这是合理的，但同时也是没必要的。为了 OOP，我们不得不为“航运”抽象出“船”的角色、为“航运”抽象出“飞机”的角色；然后为了给抽象类屏蔽这一区别，又声明出“运输工具”这一接口来统一“船”和“飞机”。

但做完这么一大堆，我们回头想想，我们真正想做的是什么？其实就是在“发货”和“收货”之间，允许动态执行不同的行动。这在 FP 中，简直轻而易举，因为我们可以直接把行动本身作为参数，传给业务逻辑：

```ts
function carryByShip() {
  console.log("航运");
}

function carryByPlane() {
  console.log("空运");
}

function deliver(carry: () => void) {
  console.log("发货");
  carry();
  console.log("收货");
}

deliver(carryByShip); // 发货 航运 收货
deliver(carryByPlane); // 发货 空运 收货
```

这就是开头说的，在 FP 中，我们完全不用抽象出“行动的执行者”。我们只要通过参数告诉 `deliver`，我们想怎么运输，就可以。

同时我们可以注意到：**当 OOP 要求两个类实现同一接口时，FP 会相应地要求两个函数拥有相同签名。**在这个例子中，`Ship` 和 `Plane` 都实现了 `Transportation` 接口，那么相应地，`runShip` 和 `runPlane` 就都要拥有 `() => void` 的函数签名。

## 函数组合

**建造者**模式相对简单地体现了这一点。

```ts
type House = string[];
type Builder = (house: House) => House;

const buildLivingRoom: Builder = (house) => {
  const nextHouse = [...house];
  nextHouse.push("living room");
  return nextHouse;
};

const buildBedroom: Builder = (house) => {
  const nextHouse = [...house];
  nextHouse.push("bedroom");
  return nextHouse;
};

const buildBathRoom: Builder = (house) => {
  const nextHouse = [...house];
  nextHouse.push("bathroom");
  return nextHouse;
};

function compose(...builders: Builder[]) {
  return (target: House) =>
    builders.reduce((result, build) => build(result), target);
}

// 相当于：
// const build = buildBathRoom(buildBedroom(buildBedroom(buildLivingRoom([]))));
const build = compose(
  buildLivingRoom,
  buildBedroom,
  buildBedroom,
  buildBathRoom
);
const house = build([]);
console.log(house); // [ 'living room', 'bedroom', 'bedroom', 'bathroom' ]
```

由于 FP 没办法像 OOP 那样直接 `return this` 来实现链式调用，所以在实行链式操作的时候常常导致函数的层层嵌套。于是我们可以通过 `reduce` 方法，一层层地将作用施加到目标上，从而将要调用的函数平铺。

这里还涉及到两个概念：[柯里化](https://en.wikipedia.org/wiki/Currying)和[纯函数](https://en.wikipedia.org/wiki/Pure_function)，也是 FP 下的两个重要概念。

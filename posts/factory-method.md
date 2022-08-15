---
title: 设计模式：工厂方法
description: 工厂方法在 OOP 和 FP 两种范式下的实现，以及一些随想。
topic: Design Patterns
createdAt: 2022/8/15
---

工厂方法的核心思想在于：**当一件事可以用不同的方法实现时，我就可以抽象出一个接口，来屏蔽这些方法的实现细节，从而将业务逻辑与具体方法解耦。**

## OOP 下的实现

以椅子为例：我们有木头椅子和塑料椅子，但不管是哪种椅子，都可以用来坐人。具体坐哪种椅子，由运行时决定。

```ts
interface Chair {
  sit: () => void;
}

abstract class ChairCreator {
  abstract factory(): Chair;

  businessLogic() {
    const chair = this.factory();
    console.log("I sweep the dust off the chair.");
    chair.sit();
    console.log("I adjust to a comfortable posture.");
  }
}

class WoodenChair implements Chair {
  sit() {
    console.log("I sit on a wooden chair.");
  }
}

class WoodenChairCreator extends ChairCreator {
  factory() {
    return new WoodenChair();
  }
}

class PlasticChair implements Chair {
  sit() {
    console.log("I sit on a plastic chair.");
  }
}

class PlasticChairCreator extends ChairCreator {
  factory() {
    return new PlasticChair();
  }
}

function main(env: "wooden" | "plastic") {
  const creator =
    env === "wooden" ? new WoodenChairCreator() : new PlasticChairCreator();
  creator.businessLogic();
}

main("wooden");

// Result:
// I sweep the dust off the chair.
// I sit on a wooden chair.
// I adjust to a comfortable posture.
```

在 `businessLogic` 方法中，我们并不关心我们要坐哪种椅子。但我们知道，不管是哪种椅子，我们都可以坐上去；从代码的层面上说，也就是所有的椅子都实现了 `Chair` 接口，都拥有 `sit` 方法。

如此，每种椅子的 `sit` 方法就不会侵入 `businessLogic`，而是交由椅子自己管理，实现了解耦。

## FP 下的实现

FP 下的实现更为简洁，更符合一般的思维方式。

```ts
function sitOnWoodenChair() {
  console.log("I sit on a wooden chair.");
}

function sitOnPlasticChair() {
  console.log("I sit on a plastic chair.");
}

function businessLogic(sit: () => void) {
  console.log("I sweep the dust off the chair.");
  sit();
  console.log("I adjust to a comfortable posture.");
}

function main(env: "wooden" | "plastic") {
  const sit = env === "wooden" ? sitOnWoodenChair : sitOnPlasticChair;
  businessLogic(sit);
}

main("wooden");

// Result:
// I sweep the dust off the chair.
// I sit on a wooden chair.
// I adjust to a comfortable posture.
```

我们根据环境变量，选择恰当的 `sit` 函数传入 `businessLogic`，用参数的方式在 `businessLogic` 中屏蔽了 `sit` 的细节。

**OOP 下要求产品实现相同接口，FP 下要求函数签名一致。**

## ahooks 中的工厂方法

[ahooks](https://github.com/alibaba/hooks) 是阿里巴巴出品的一套企业级 React Hooks。前几天在学习它的源码的时候，发现有两个地方就是通过工厂方法实现了解耦。

### 屏蔽 storage 类型

源码在这里：[alibaba/hooks - createUseStorageState](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/createUseStorageState/index.ts#L20)

这段代码的目标是实现与 `localStorage` 或者 `sessionStorage` 交互的 hook。和这两种 storage 交互的逻辑是完全一致的，包括（反）序列化、state 管理、effect 等等部分，只是操作的 storage 名字不同罢了。

由于 `localStorage` 和 `sessionStorage` **实现了同样的接口** `Storage`，我们就可以将 storage 作为参数传入，这样 hook 本身就可以将这两种 storage 一视同仁，交互逻辑就只要写一遍即可。

### 屏蔽 `useEffect`/`useLayoutEffect`

源码在这里：[alibaba/hooks - createUpdateEffect](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/createUpdateEffect/index.ts#L6)

`useUpdateEffect` 可以使用 `useEffect` 来实现，也可以使用 `useLayoutEffect` 来实现，除此之外的逻辑完全一致。

由于这两个 hook 的**签名一致**，我们就可以[抽象出 `EffectHookType` 类型](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/createUpdateEffect/index.ts#L4)，来代替这两个具体的 hook。实际使用时，如果传入的参数是 `useEffect`，那么整个 hook 就是采用 `useEffect` 实现的，反之同理。

## 工厂方法不是工厂

工厂方法的核心是业务逻辑，而不是创建某一种对象。以上面的代码为例，它的核心是 `businessLogic`，而不是 `factory`。`factory` 只是为一段抽象的业务逻辑，指定了具体方式，让它不再抽象而已。

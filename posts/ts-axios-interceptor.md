---
title: 修正 Axios 拦截器的 TypeScript 类型提示
description: Axios 的拦截器可以修改请求与响应，但 TypeScript 对这些修改并不知情。我们可以通过自定义 .d.ts 文件来强行纠正 TypeScript 的类型提示。
topic: typescript
createdAt: 2022/8/4
---

## 问题

如果不加拦截器，Axios 返回的数据并不是响应本身，而是这样的一个数据结构：

```json
{
  "data": {
    // 真正的数据
  },
  "status": 200,
  "statusText": "OK",
  "headers": {
    // 响应头
  },
  "config": {
    // Axios 配置
  },
  "request": {
    // 完整的请求记录
  }
}
```

所以我们经常会加这样一个拦截器：

```ts
const axiosInstance = axios.create();
axiosInstance.interceptors.response.use((res) => res.data); // <- 响应拦截器
const res = await axiosInstance.get("/api");
```

这样，`res` 拿到的就直接是 `data` 字段的数据，而不用每次都手动写 `res.data` 拿数据。

但问题在于，TypeScript 并不能探测到这一拦截。TypeScript 依然认为，我们拿到的是原始的响应（类型签名：`AxiosResponse<any, any>`。用上面的例子来说，假设我们想要的数据类型为 `T`，那么 TypeScript 依旧认为 `res` 的类型为 `AxiosResponse<T, any>`，尽管我们实际拿到的 `res` 类型是 `T`。

## 解决方案

这一方案来自 Axios 的 Issue [#1510](https://github.com/axios/axios/issues/1510#issuecomment-525382535)。

我们可以手动创建一个 .d.ts 文件，覆盖 Axios 原生的类型签名。

```ts
// src/types/index.d.ts
import axios from "axios";

declare module "axios" {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>;
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>;
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>;
  }
}
```

然后，在 tsconfig.json 里通知 TypeScript 使用新的签名。

```json
// tsconfig.json
{
  // ...
  "typeRoots": ["node_modules/@types", "src/types"]
}
```

我们可以在官网上找到 `typeRoots` 的[定义](https://www.typescriptlang.org/tsconfig#typeRoots)：项目所有“类型文件”的目录。在本例中，我们指定了两个目录，于是 TypeScript 就会在这两个目录下面，寻找未知类型的定义。

第一个 `node_modules/@types` 是来自 [Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped) 的类型文件，诸如 `@types/node` 等的常见类型文件都在这里。

第二个就是我们自定义的类型文件了。TypeScript 再遇到 Axios 的 API 时，就会首先从这里找签名，于是就找到了我们覆盖的签名。现在，TypeScript 就知道 `res` 的类型是 `T` 了。

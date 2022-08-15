---
title: HTTP 状态码：2xx 成功响应
description: HTTP 的 2xx 状态码代表成功响应。客户端的请求正确，服务器的理解也正确。
topic: HTTP
createdAt: 2022/5/17
---

2xx 状态码说明请求都已经成功，或者部分成功。客户端通常不需要进行下一步的动作，来完成这个请求。

## 200 OK

最常见的成功状态码。默认可缓存。

**一般用于 GET、HEAD、TRACE 请求的响应。**

## 201 Created

服务器已经成功创建了新资源。响应体中会返回新资源的地址，或者新资源本身，或者响应头中会包含 `Location` 字段并指向新资源地址。

**一般用于 POST 请求的响应。**

## 202 Accepted

这是一个不太负责任的状态码：服务器已经接受了请求，但还没做出相应动作，也不一定能成功执行，而且不管服务器执行结果如何，都不会告知客户端。

一般这个请求会交给另一个进程或者服务器进行处理，或者是一个批处理程序。

服务器应当在实体主体部分包含对请求状态的描述，最好还包含对请求完成时间的估计。

## 203 Non-Authoritative Information

请求被成功响应，但客户端收到的响应并不完全来自于源服务器。默认可缓存。

一般是第三方代理对原响应做出了修改，它们就会将状态码变更为 203 Non-Authoritative Information 来通知客户端。

## 204 No Content

请求成功了，但没有响应体。默认可缓存。

**一般用于 PUT 和 PATCH 方法**，或者是客户端只想要头部。

## 205 Reset Content

通知客户端重置页面视图，比如清空表单、重置 canvas 状态或者刷新页面。

**不可以携带响应体！**

## 206 Partial Content

响应体包含了请求头 `Range` 字段指定的部分数据。

如果只包含一个区间，那么响应头应该包含 `Content-Type` 指明数据 MIME 类型，以及 `Content-Range` 字段指明区间范围。

如果包含多个区间，那么响应头应该包含 `Content-Type: multipart/byteranges; boundary=SEP`，其中 SEP 是多个区间信息的分隔符。然后，多个区间各自的信息如下例所示：

```
--SEP
Content-Type: application/pdf
Content-Range: bytes 234-639/8000
...
--SEP
Content-Type: application/pdf
Content-Range: bytes 4590-7999/8000
...
--SEP--
```

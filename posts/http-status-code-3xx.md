---
title: HTTP 状态码：3xx 重定向响应
description: HTTP 的 3xx 状态码代表重定向响应。资源不在这个地方，要去别的地方找。
topic: http
createdAt: 2022/5/17
---

3xx 状态码用于告知客户端，还需要进一步的动作才能完成请求。如果响应头包含 `Location` 字段，则用户代理**可能**会自动跳转到其指定的 URL。

在进行 URL 跳转的时候，有些客户端会自动把请求方法重写为 GET，即使这是不符合规范的。我们会在状态码 301、302、307、308 的关系中注意到这个问题。

## 300 Multiple Choice

客户端的请求有多种可能的响应，需要用户作出进一步的选择。如果服务器能够提供一种优先的选择，那么它应该在响应头中包含 `Location` 字段指向优先选择的资源。

## 301 Moved Permanently

请求的资源 URL 已经永久更改，响应头的 `Location` 字段指明了更改后的 URL。这一更改默认被缓存。

**新请求的请求方法可能被重写**，建议使用 308 Permanent Redirect。

## 302 Found

请求的资源 URL 已经暂时更改，响应头的 `Location` 字段指明了更改后的 URL。

**新请求的请求方法可能被重写**，建议使用 307 Temporary Redirect。

## 303 See Other

示意客户端从另一个 URL 中获取想要的信息，响应头的 `Location` 字段指明了新的 URL。

这和 301 Moved Permanently、302 Found 的区别在于，并没有资源被移动。它指向的也并不一定是某个新资源，而可能是消息确认页面或进度展示页面等。

## 304 Not Modified

资源没有被更改，可以使用本地缓存。详细的缓存机制见 [MDN：HTTP 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching)。

## 305 Use Proxy

必须使用代理才能访问。（已废弃）

## 306 Unused

不再使用，HTTP/1.1 早期版本曾使用过。

## 307 Temporary Redirect

和 302 Found 语义相同，但**客户端不能更改其请求方法**。

## 308 Permanent Redirect

和 301 Moved Permanently 语义相同，但**客户端不能更改其请求方法**。

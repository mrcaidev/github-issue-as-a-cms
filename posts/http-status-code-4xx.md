---
title: HTTP 状态码：4xx 客户端错误
description: HTTP 的 4xx 状态码代表客户端错误。服务器无法理解或满足客户端的要求。
topic: http
---

服务器在发出 4xx 状态码时，**应当**说明错误原因；用户代理在收到 4xx 状态码时，**应当**展示错误原因。

## 400 Bad Request

客户端的请求语法错误，服务器无法理解。

> 比如某个值应该是数字，却收到了字符串。

## 401 Unauthorized

客户端没有进行身份验证，却试图访问需要身份验证的资源。

> 比如用户还没有登录。

## 402 Payment Required

保留，将来用于数字支付系统。

## 403 Forbidden

客户端没有足够高的权限，无法接触目标资源。

它和 401 Unauthorized 的主要区别在于：401 Unauthorized 代表着“服务器不知道客户端是谁”，而 403 Forbidden 代表着“服务器知道客户端是谁，但客户端权限不够高，服务器拒绝展示资源”。

> 比如某用户试图访问别人的余额、手机号等私密资料，或者是普通用户试图进入后台管理界面。

## 404 Not Found

服务器找不到客户端要求的资源。默认可缓存。

> 比如用户访问了一个不存在的页面，或者请求了一个不存在的用户的资料。

## 405 Method Not Allowed

服务器明令禁止，请求该 URL 时不能使用当前方法。默认可缓存。

同时，服务器**必须**在同一响应的 `Allow` 字段内，附上可接受的请求方法的列表。

> 比如不能对某一个 API 使用 DELETE 方法。

## 406 Not Acceptable

客户端对于响应内容有特殊的要求，但服务器无法满足这些要求。更具体地说就是，服务器无法提供“符合请求头中 `Accept` 系列字段要求”的资源。详细机制见 [MDN：内容协商](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Content_negotiation)。

虽然这种情况还是比较常见，但也**一般不使用这一状态码**。原因是这样一种思想：就算只能返回一个用户不甚满意的内容，也比返回一个错误要好。

## 407 Proxy Authentication Required

中间的代理服务器需要身份验证。

与请求头的 [`Proxy-Authenticate`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Proxy-Authenticate) 字段绑定一起发送。

## 408 Request Timeout

服务器想把空闲连接关闭。

响应头**应当**包含 `Connection: close`。

## 409 Conflict

客户端请求与服务器当前资源状态发生冲突。

> 比如重复创建一个用户，或者上传了新文档的旧版本。

## 410 Gone

请求的资源已经被服务器永久删除，并且没有新资源的链接可供跳转，也不一定能提供被删除资源的相关信息。默认可缓存。

它和 404 Not Found 的主要区别在于：404 Not Found 代表着“服务器不知道这个资源是什么”，而 410 Gone 代表着“服务器知道这个资源曾经存在过，但它已经明确被删除了”。

## 411 Length Required

客户端请求头内没有 `Content-Length` 字段，但服务器明确指定需要该字段。

## 412 Precondition Failed

客户端发起了条件请求，但服务器不满足其中的某些条件。

## 413 Payload Too Large

请求体太大，服务器无法处理。服务器可能会关闭连接以防止此请求被发送。

如果只是暂时无法处理，那么响应头**应当**携带 `Retry-After` 字段，指明客户端可以在多久之后重试。

## 414 URI Too Long

客户端请求的 URI 长度超过了服务器允许的范围。默认可缓存。

有几种原因可能会造成该错误：

- 当客户端误将 POST 请求当作 GET 请求时，会带有一个较长的查询字符串。
- 当客户端堕入“重定向循环黑洞”时，如指向自身后缀的重定向 URI 前缀。
- 当客户端对服务器进行攻击，试图寻找潜在的漏洞时。

## 415 Unsupported Media Type

服务器不支持客户端请求体的 MIME 类型。

服务器有可能直接检测了请求头的 `Content-Type` 和 `Content-Encoding`，也有可能直接检测了请求体数据。

> 比如服务端希望拿到 application/json 类型的数据，但客户端上传了 image/gif 类型的数据。

## 416 Range Not Satisfiable

客户端在请求头 `Range` 字段指定的数据区间，超出了服务器能处理的范围。

响应头会携带 `Content-Range` 字段，提示无法满足的区间和资源实际长度，如 `Content-Range: 500-1500/1000`。

## 417 Expectation Failed

服务器无法满足请求头中 `Expect` 字段指明的条件。

> 比如拒绝 `Expect: 100-continue`。

## 422 Unprocessable Entity

客户端请求的语义有误，导致服务器无法处理。

它和 400 Bad Request 的主要区别在于：400 Bad Request 代表着“服务器无法理解请求的语法”，而 422 Unprocessable Entity 代表着“服务器理解了请求的语法，但请求的语义有误”。

它和 415 Unsupported Media Type 的主要区别在于，415 Unsupported Media Type 代表着“服务器不支持这种 MIME 类型”，而 422 Unprocessable Entity 代表着“服务器支持这种 MIME 类型，但具体的数据出了错”。

> 比如有一个让用户评分 1-5 星的 API，服务器可能希望收到一条 3 星的评价 `{ "rating": 3 }`，但却收到了一条 6 星的评价 `{ "rating": 6 }`。后者的 MIME 类型的确是 application/json（所以不是 415 Unsupported Media Type），`rating` 字段也确实是数字（所以不是 400 Bad Request），但这个数字的语义却不正确，导致服务器拒绝处理。

## 426 Upgrade Required

请求所用的协议错误。

服务器**应当**在响应头的 `Upgrade` 字段指明期望的协议。

> 比如服务器期望使用 HTTP/2.0，但收到了 HTTP/1.1 的请求。

## 429 Too Many Requests

客户端请求频率超过限制。

> 比如爬虫爬太快。

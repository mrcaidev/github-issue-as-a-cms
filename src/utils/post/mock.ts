export const mockPosts: PostSummary[] = [
  {
    slug: 6,
    title: "Web Performance: Images",
    description:
      "Images account for nearly twice as much as JavaScript in terms of web performance issues. Fortunately, there are numerous ways to optimize them.",
    publishedAt: "2023-01-15T17:00:32Z",
    tags: ["performance"],
  },
  {
    slug: 5,
    title: "How to Use Axios Interceptor in TypeScript",
    description:
      "It's a common practice to retrieve res.data in an Axios response interceptor, but TypeScript knows nothing about it. How can we inform the type system?",
    publishedAt: "2023-01-15T15:26:47Z",
    tags: ["typescript"],
  },
  {
    slug: 4,
    title: "Design Patterns in One Sentence",
    description:
      "Describe 23 mostly commonly used design patterns each in one sentence.",
    publishedAt: "2023-01-15T15:25:48Z",
    tags: ["design patterns"],
  },
  {
    slug: 3,
    title: "Design Patterns in Functional Programming",
    description:
      "Design patterns in functional programming paradigm has two distinct features - decoupling of data and methods, and first-class functions.",
    publishedAt: "2023-01-15T15:24:36Z",
    tags: ["design patterns"],
  },
  {
    slug: 2,
    title: "HTTP Caching - Fresh, Stale and Revalidation",
    description:
      "HTTP caching is critical to the performance of a website. Resources can be reused for a set period of time, and then revalidated to keep their freshness.",
    publishedAt: "2023-01-15T15:22:03Z",
    tags: ["http"],
  },
  {
    slug: 1,
    title: "Everything You Need To Know About 100 Continue",
    description:
      'The HTTP status code "100 Continue" indicates that the server feels good about the initial part of a request, and the client can go on with it.',
    publishedAt: "2023-01-15T15:02:48Z",
    tags: ["http"],
  },
];

export const mockTags: PostTag[] = mockPosts.reduce((acc, post) => {
  for (const tag of post.tags) {
    const tagIndex = acc.findIndex((t) => t.name === tag);
    if (tagIndex === -1) {
      acc.push({ name: tag, count: 1 });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      acc[tagIndex]!.count++;
    }
  }
  return acc;
}, [] as PostTag[]);

export const mockPost: Post = {
  slug: 6,
  title: "Web Performance: Images",
  description:
    "Images account for nearly twice as much as JavaScript in terms of web performance issues. Fortunately, there are numerous ways to optimize them.",
  isDraft: false,
  origin: "https://github.com/mrcaidev/blog/issues/6",
  publishedAt: "2023-01-15T17:00:32Z",
  updatedAt: "2023-01-15T17:00:32Z",
  tags: ["performance", "http"],
  content: `
  High-quality images can significantly boost your website's appeal. They make an excellent first impression on users and effectively communicate your insights.

However, according to [Web Almanac 2022 statistics](https://almanac.httparchive.org/en/2022/page-weight), images are also the leading cause of website performance issues, with a staggering page weight of 1000+ KB, which is twice that of JavaScript.

![Images have twice the page weight of JavaScript](https://user-images.githubusercontent.com/78269445/212551413-4d5cec8e-7ca9-4fda-8358-70bbc24b92a0.png)

We want to deliver high-quality images while minimizing performance loss, which necessitates extensive and in-depth image optimization.

## 🔽 Reduce Image Quality

Among all possible solutions, brute force always seems to be the most intuitive one. The less information in an image, the easier it is to compress, the better the performance.

1. **Blur**: If we only want to emphasize the foreground of image, we can blur the background, which reduces the amount of information while keeping all of the important parts.
2. **Zoom**: Zoom out to 87% of the original image, and then zoom in to 115% of the current one. In the end, the size did not change, but many pixels vanished during the zooming process.
3. **Tool**: Use tools like [Squoosh](https://squoosh.app) to further compress the image.

After the above processing, the size of an image can be reduced to ~3%, with humans barely noticing the difference.

## 🎞️ Choose Correct Format

|    Scenario     |  Format  |
|:---------------:|:--------:|
|Ordinary Pictures|WebP, Jpeg|
|Complex graphics |PNG, Jpeg |
|With transparency|PNG, WebP |
|      Icons      |   SVG    |
|     Dynamic     |  Video   |

## 🤔 Other

- Adjust the width to somewhere between 320px and 1920px.
- Opaque is preferred to transparent.
- Remove all unnecessary shapes in SVG.
- Integrate tools like Sharp and Imagemin into the build scripts.

## 🖼️ Responsive Images

If we provide a 1920px wide image for laptops, mobile devices will also receive the same 1920px wide image, which is completely unnecessary.

\`srcset\` is a native attribute of \`<img>\` that allows us to provide images of different sizes for devices of different widths. The \`size\` attribute can then be used to run media query based on these images.

\`\`\`html
<img
  srcset="image-small.jpg 320w            <== 给 <=320px 的设备
          image-medium.jpg 600w           <== 给 <=600px 的设备
          image-large.jpg 1200w           <== 给 <=1200px 的设备
          image-full.jpg 1920w            <== 给 <=1920px 的设备
          "
  size="(min-width:1200px) 1200px, 100vw  <== >=1200px 的设备是 1200px，否则是 100vw"
  src="image.jpg"
  alt="A nice image."
/>
\`\`\`

Typically, 4-5 options would suffice. Going too far is as bad as not going far enough.

## 🛏️ Lazy Loading

The image is not loaded until the user scrolls to it.

\`\`\`html
<img src="image.png" alt="A nice image." loading="lazy" />
\`\`\`

Simple as the attribute is, it can boost the performance a lot. \`loading="lazy"\` should be the default for every image.

_Exception: It is not recommended to apply lazy loading to LCP. It would only have negative impacts on the performance._
  `,
};

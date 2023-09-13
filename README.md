# lottie-video-test

A simple example to show a Lottie svg animation overlapping with a &lt;video> as they're both controlled via `requestAnimationFrame`

The test includes a blue square (lottie) overlaid directly on top of a red square (video). The test is successful if you don't see the red square at all, as that means lottie and the video are perfectly in sync.

## Getting started

To run the application, serve it locally using a simple http server. For example:

```shell
npx http-server -o
```

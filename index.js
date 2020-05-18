var video = document.getElementById('bg-video');

var animation = lottie.loadAnimation({
  container: document.getElementById('bm'),
  renderer: 'svg',
  loop: true,
  autoplay: false,
  path: 'data.json'
});

var animationFrame;

function playAnimation() {
  var duration = video.seekable.end(0);
  var start = null;

  var step = timestamp => {
    if (!start) start = timestamp;
    const time = timestamp - start;

    video.currentTime = time / 1000;
    animation.goToAndStop(time);

    // loop
    if (time > duration * 1000) {
      start = null;
    }
    animationFrame = window.requestAnimationFrame(step);
  }

  animationFrame = window.requestAnimationFrame(step);
}

function resetAnimation() {
  window.cancelAnimationFrame(animationFrame);
  video.currentTime = 0;
  animation.goToAndStop(0);
}
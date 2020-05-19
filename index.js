var video = document.getElementById('bg-video');
video.onloadeddata = (event => {
  console.log('video loaded');
  video.ontimeupdate = (event) => {
    console.log('timeupdate: ', video.currentTime);
  };
})

var animation = lottie.loadAnimation({
  container: document.getElementById('bm'),
  renderer: 'svg',
  loop: true,
  autoplay: false,
  path: 'data.json'
});

var animationFrame;

function playAnimation() {
  window.cancelAnimationFrame(animationFrame);
  var duration = video.seekable.end(0);
  var start = null;
  if (video) video.pause();

  var step = timestamp => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const time = progress / 1000;

    video.currentTime = time;
    animation.goToAndStop(time * 1000);

    // loop
    if (time > duration) {
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
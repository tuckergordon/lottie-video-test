var video = document.getElementById('bg-video');
video.onloadeddata = (event => {
  console.log('video loaded');
  video.ontimeupdate = (event) => {
    console.log('timeupdate: ', video.currentTime);
  };
});

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
    var progress = timestamp - start;
    var time = progress / 1000;

    video.onseeked = (event) => {
      const seekedProgress = event.timeStamp - start;
      const seekedTime = seekedProgress / 1000;
      video.onseeked = null;
      animation.goToAndStop(seekedTime * 1000);
      animationFrame = window.requestAnimationFrame(step);
    }

    video.currentTime = time;
    // animation.goToAndStop(time * 1000);

    // loop
    if (time > duration) {
      start = null;
    }
    // animationFrame = window.requestAnimationFrame(step);
  }

  animationFrame = window.requestAnimationFrame(step);
}

function resetAnimation() {
  video.onseeked = null;
  window.cancelAnimationFrame(animationFrame);
  video.currentTime = 0;
  animation.goToAndStop(0);
}

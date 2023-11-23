// audioPlayer.js

(function () {
  var playButtons = document.querySelectorAll('.play-btn');

  playButtons.forEach(button => {
      button.addEventListener('click', () => {
          var audioId = button.getAttribute('data-audio-id');
          var audio = document.getElementById(audioId);
          var progressBar = document.querySelector(`.progress-bar-${audioId}`);

          if (audio.paused) {
              audio.play().then(() => {
                  button.innerHTML = '<img src="images/icons/Pause.png" alt="">';
              });
          } else {
              audio.pause();
              button.innerHTML = '<img src="images/icons/Play.png" alt="">';
          }

          audio.addEventListener('timeupdate', () => {
              var progress = (audio.currentTime / audio.duration) * 100;
              progressBar.style.width = `${progress}%`;
          });
      });
  });
})()

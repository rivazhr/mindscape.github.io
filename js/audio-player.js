document.addEventListener('DOMContentLoaded', function () {
    const playButtons = document.querySelectorAll('.play-btn');

    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const audioId = button.getAttribute('data-audio-id');
            const audio = document.getElementById(audioId);
            const progressBar = document.querySelector(`.progress-bar-${audioId}`);

            if (audio.paused) {
                audio.play().then(() => {
                    button.innerHTML = '<img src="/images/icons/Pause.svg" alt="">';
                }).catch(error => {
                    console.error('Failed to play audio:', error);
                });
            } else {
                audio.pause();
                button.innerHTML = '<img src="/images/icons/Play.svg" alt="">';
            }

            audio.addEventListener('timeupdate', () => {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = `${progress}%`;
            });
        });
    });
});
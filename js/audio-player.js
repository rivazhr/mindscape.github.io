document.addEventListener('DOMContentLoaded', function () {
    const playButtons = document.querySelectorAll('.play-btn');

    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const audioId = button.getAttribute('data-audio-id');
            const audio = document.getElementById(audioId);
            const progressBar = document.querySelector(`.progress-bar-${audioId}`);
            const currentTimeDisplay = document.querySelector(`.current-time-${audioId}`);
            const durationDisplay = document.querySelector(`.duration-${audioId}`);

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

                const currentTime = formatTime(audio.currentTime);
                const duration = formatTime(audio.duration);
                currentTimeDisplay.textContent = currentTime;
                durationDisplay.textContent = duration;

                progressBar.setAttribute('aria-valuenow', audio.currentTime);
            });

            function formatTime(seconds) {
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = Math.floor(seconds % 60);
                return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
            }
        
            function padZero(number) {
                return (number < 10) ? `0${number}` : number;
            }
            
        });
    });
});

function toggleAudio(id) {
    const audioContainers = ['alam', 'fokus', 'ketenangan', 'tidur'];

    audioContainers.forEach(containerId => {
        const container = document.getElementById(containerId);

        if (containerId === id) {
            if (!container.classList.contains('show')) {
                container.classList.add('show');
            }
        } else {
            container.classList.remove('show');
        }
    });
}

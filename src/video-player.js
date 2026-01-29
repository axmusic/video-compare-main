export class BaseVideoPlayer {
    constructor(container) {
        this.container = container;
        this.videos = [];
        this.wrappers = [];
        this.readyStates = [];
        this.captions = [];

        this.loadingElement = document.createElement('div');
        this.loadingElement.textContent = 'Loading';
        this.loadingElement.style.position = 'absolute';
        this.loadingElement.style.top = '50%';
        this.loadingElement.style.left = '50%';
        this.loadingElement.style.transform = 'translate(-50%, -50%)';
        this.loadingElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        this.loadingElement.style.color = 'white';
        this.loadingElement.style.padding = '10px 20px';
        this.loadingElement.style.borderRadius = '4px';
        this.loadingElement.style.zIndex = '4';
        this.container.appendChild(this.loadingElement);

        this.loadingDots = 0;
        this.loadingInterval = setInterval(() => this.animateLoading(), 500);
    }

    animateLoading() {
        if (!this.loadingElement) return;
        this.loadingDots = (this.loadingDots + 1) % 4;
        this.loadingElement.textContent = 'Loading' + '.'.repeat(this.loadingDots);
    }

    addVideo(video) {
        const index = this.videos.length;
        this.videos.push(video);
        this.readyStates.push(false);
        video.pause();
        video.currentTime = 0;
        video.style.visibility = 'hidden';  // Hide video initially
        video.style.opacity = '0';         // Make fully transparent
        video.addEventListener('loadstart', () => this.resetReadyStates());
        video.addEventListener('canplaythrough', () => {
            this.readyStates[index] = true;
            this.checkAndPlay();
        });
    }

    addCaption(video, wrapper, className) {
        // Add caption if uevc-caption attribute exists
        const caption = video.getAttribute('uevc-caption');
        if (caption) {
            const captionDiv = document.createElement('span');
            captionDiv.textContent = caption;
            captionDiv.classList.add('uevc-caption');
            if (className) {
                captionDiv.classList.add(className);
            }
            wrapper.appendChild(captionDiv);
            this.captions.push(captionDiv);

            // Watch for changes to uevc-caption attribute
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'uevc-caption') {
                        const newCaption = video.getAttribute('uevc-caption');
                        captionDiv.textContent = newCaption;
                    }
                });
            });

            observer.observe(video, {
                attributes: true,
                attributeFilter: ['uevc-caption']
            });
        }
    }

    addVideoWithWrapper(video, className) {
        const wrapper = document.createElement('div');
        video.parentNode.insertBefore(wrapper, video);
        wrapper.appendChild(video);

        this.addVideo(video);
        this.wrappers.push(wrapper);
        wrapper.classList.add('video-wrapper');
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'contain';
        video.style.maxWidth = 'none';
        this.addCaption(video, wrapper, className);

    }

    resetReadyStates() {
        this.readyStates.fill(false);
        this.videos.forEach(video => video.pause());
        this.videos.forEach(video => video.currentTime = 0);
        this.loadingElement.style.display = 'block';
        if (!this.loadingInterval) {
            this.loadingInterval = setInterval(() => this.animateLoading(), 500);
        }
    }

    checkAndPlay() {
        if (this.readyStates.every(state => state)) {
            this.videos.forEach(video => {
                video.play();
                video.style.visibility = 'visible';  // Show video when ready
                video.style.opacity = '1';           // Make fully opaque
            });
            this.captions.forEach(caption => {
                caption.style.visibility = 'visible';  // Show captions when ready
                caption.style.opacity = '1';           // Make fully opaque
            });
            this.loadingElement.style.display = 'none';
            clearInterval(this.loadingInterval);
            this.loadingInterval = null;
        }
    }

    syncVideos(sourceIndex = 0) {
        const sourceVideo = this.videos[sourceIndex];
        sourceVideo.addEventListener('timeupdate', () => {
            this.videos.forEach((video, index) => {
                if (index !== sourceIndex && Math.abs(video.currentTime - sourceVideo.currentTime) > 0.05) {
                    video.currentTime = sourceVideo.currentTime;
                }
            });
        });
    }
}
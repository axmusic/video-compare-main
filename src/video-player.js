export class BaseVideoPlayer {
    constructor(container) {
        this.container = container;
        this.videos = [];
        this.wrappers = [];
        this.readyStates = [];
        this.captions = [];

        // Read playback options
        this.playMode = this.container.getAttribute('data-play-mode') || 'auto';
        this.viewportPause = this.container.getAttribute('data-viewport-pause') !== 'false';
        this.debugLoading = this.container.getAttribute('data-debug-loading') === 'true';
        this.showLoading = this.container.getAttribute('data-show-loading') !== 'false';
        this.hasInteracted = false;
        this.playModeSetup = false;
        this.viewportObserverSetup = false;
        this.isIntersecting = true; // Assume visible initially

        // Find existing loading element
        this.loadingElement = this.container.querySelector('.uevc-loading-wrapper');

        // If showLoading is false, hide existing loading element and exit
        if (!this.showLoading) {
            if (this.loadingElement) {
                this.loadingElement.style.display = 'none';
            }
            return;
        }

        // Only create fallback if showLoading is true and it doesn't already exist
        if (!this.loadingElement) {
            this.loadingElement = document.createElement('div');
            this.loadingElement.classList.add('uevc-loading-wrapper');
            const loadingText = document.createElement('div');
            loadingText.classList.add('uevc-loading');
            loadingText.textContent = 'Loading';
            this.loadingElement.appendChild(loadingText);
            this.container.appendChild(this.loadingElement);
        }

        // Show loading initially if showLoading is true
        if (this.loadingElement) {
            this.loadingElement.style.display = 'flex';
        }
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
        video.addEventListener('canplay', () => {
            this.readyStates[index] = true;
            this.checkAndPlay();
        });

        // Fail-safe: After 5 seconds, assume it might be ready even if event didn't fire
        setTimeout(() => {
            if (!this.readyStates[index]) {
                this.readyStates[index] = true;
                this.checkAndPlay();
            }
        }, 5000);
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
        this.addCaption(video, wrapper, className);

    }

    resetReadyStates() {
        this.readyStates.fill(false);
        this.videos.forEach(video => video.pause());
        this.videos.forEach(video => video.currentTime = 0);
        if (this.showLoading && this.loadingElement) {
            this.loadingElement.style.display = 'flex';
        }
    }

    checkAndPlay() {
        if (this.readyStates.every(state => state)) {
            // Show videos and captions
            this.videos.forEach(video => {
                video.style.visibility = 'visible';
                video.style.opacity = '1';
            });
            this.captions.forEach(caption => {
                caption.style.visibility = 'visible';
                caption.style.opacity = '1';
            });

            if (this.showLoading && this.loadingElement && !this.debugLoading) {
                this.loadingElement.style.display = 'none';
            }

            // Play videos based on play mode, but only if visible (if viewportPause enabled)
            if (this.playMode === 'auto') {
                if (!this.viewportPause || this.isIntersecting) {
                    this.videos.forEach(video => video.play());
                }
            }
        }
    }

    setupViewportObserver() {
        if (this.viewportObserverSetup) return;
        this.viewportObserverSetup = true;

        if (!window.IntersectionObserver) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isIntersecting = entry.isIntersecting;

                if (this.viewportPause) {
                    if (this.isIntersecting) {
                        // Resume playing if mode allows
                        if (this.playMode === 'auto' || (this.playMode === 'interaction' && this.hasInteracted)) {
                            this.videos.forEach(video => video.play());
                        }
                    } else {
                        // Pause when out of view
                        this.videos.forEach(video => video.pause());
                    }
                }
            });
        }, { threshold: 0 });

        observer.observe(this.container);
    }

    setupPlayMode() {
        if (this.playModeSetup) return;
        this.playModeSetup = true;

        if (this.playMode === 'interaction') {
            // Play on first interaction, then keep playing
            const playOnce = () => {
                if (!this.hasInteracted) {
                    this.hasInteracted = true;
                    this.videos.forEach(video => video.play());
                    // Remove listeners after first interaction
                    this.container.removeEventListener('mouseenter', playOnce);
                    this.container.removeEventListener('touchstart', playOnce);
                    this.container.removeEventListener('click', playOnce);
                }
            };
            this.container.addEventListener('mouseenter', playOnce);
            this.container.addEventListener('touchstart', playOnce, { passive: true });
            this.container.addEventListener('click', playOnce);
        } else if (this.playMode === 'manual') {
            // Play only while interacting
            const playVideos = () => {
                this.videos.forEach(video => video.play());
            };
            const pauseVideos = () => {
                this.videos.forEach(video => video.pause());
            };

            this.container.addEventListener('mouseenter', playVideos);
            this.container.addEventListener('mouseleave', pauseVideos);
            this.container.addEventListener('touchstart', playVideos, { passive: true });
            this.container.addEventListener('touchend', pauseVideos, { passive: true });
        }
    }

    syncVideos(sourceIndex = 0) {
        const sourceVideo = this.videos[sourceIndex];
        let lastSync = 0;

        // Sync playback state
        sourceVideo.addEventListener('play', () => {
            this.videos.forEach((v, i) => {
                if (i !== sourceIndex && v.paused) v.play();
            });
        });

        sourceVideo.addEventListener('pause', () => {
            this.videos.forEach((v, i) => {
                if (i !== sourceIndex && !v.paused) v.pause();
            });
        });

        // Sync seeking
        sourceVideo.addEventListener('seeking', () => {
            this.videos.forEach((v, i) => {
                if (i !== sourceIndex) v.currentTime = sourceVideo.currentTime;
            });
        });

        // Frequent sync check (throttle for performance)
        sourceVideo.addEventListener('timeupdate', () => {

            const now = performance.now();

            if (now - lastSync < 200) return;

            lastSync = now;

            this.videos.forEach((v, i) => {

                if (i !== sourceIndex) {

                    const diff = Math.abs(v.currentTime - sourceVideo.currentTime);

                    if (diff > 0.2) v.currentTime = sourceVideo.currentTime;

                }
            });

        });
    }
}
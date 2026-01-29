/*! UE Video Comparison - v0.0.7 */
const SLIDER_CONTAINER_CLASS = 'uevc-slider-container';
const WIPER_CONTAINER_CLASS = 'uevc-wiper-container';
const SIDE_BY_SIDE_CONTAINER_CLASS = 'uevc-side-by-side-container';
const THREE_VIDEO_COMPARISON_CONTAINER_CLASS = 'uevc-three-video-comparison-container';
const FOUR_GRID_CONTAINER_CLASS = 'uevc-four-grid-container';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = ".video-wrapper video {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n}\n\n.uevc-slider-container {\n    display: inline-block;\n    line-height: 0;\n    position: relative;\n    width: 100%;\n}\n\n.uevc-slider-container>.video-wrapper {\n    width: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 100%;\n    max-width: none;\n}\n\n.uevc-slider-container .video-wrapper video {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    max-width: none;\n}\n\n.uevc-slider-container>.uevc-slider-clipper {\n    width: 50%;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    overflow: hidden;\n    z-index: 3;\n}\n\n.uevc-slider-container>.uevc-slider-clipper>.video-wrapper {\n    width: 200%;\n    position: absolute;\n    height: 100%;\n    max-width: none;\n    left: 0;\n}\n\n/* Vertical Slider Styles */\n[class*=\"uevc-\"][class*=\"-container\"].vertical>.uevc-slider-clipper {\n    width: 100%;\n    height: 50%;\n    top: 0;\n    bottom: auto;\n    left: 0;\n    right: 0;\n}\n\n[class*=\"uevc-\"][class*=\"-container\"].vertical>.uevc-slider-clipper>.video-wrapper {\n    width: 100%;\n    height: 200%;\n    top: 0;\n    left: 0;\n}\n\n.uevc-wiper-container {\n    display: inline-block;\n    line-height: 0;\n    position: relative;\n    width: 100%;\n}\n\n.uevc-wiper-container>.video-wrapper {\n    width: 99%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 99%;\n}\n\n.uevc-wiper-container>.uevc-wiper-clipper-outer {\n    width: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    overflow: hidden;\n    z-index: 3;\n}\n\n.uevc-wiper-container>.uevc-wiper-clipper-outer>.uevc-wiper-clipper {\n    width: 99%;\n    /* leave some space for border */\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 99%;\n    overflow: hidden;\n    z-index: 3;\n}\n\n.uevc-wiper-container .video-wrapper video {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    max-width: none;\n}\n\n.uevc-wiper-container>.uevc-wiper-clipper-outer>.uevc-wiper-clipper>.video-wrapper>video {\n    width: 100%;\n    position: absolute;\n    height: 100%;\n    max-width: none;\n    left: 0;\n}\n\n.uevc-three-video-comparison-container {\n    display: inline-block;\n    line-height: 0;\n    position: relative;\n    width: 100%;\n}\n\n.uevc-three-video-comparison-container>.video-wrapper {\n    width: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 100%;\n    max-width: none;\n}\n\n.uevc-three-video-comparison-container>.uevc-slider-clipper {\n    width: 50%;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    overflow: hidden;\n    z-index: 3;\n}\n\n.uevc-three-video-comparison-container>.uevc-slider-clipper>.video-wrapper {\n    width: 200%;\n    position: absolute;\n    height: 100%;\n    max-width: none;\n    left: 0;\n}\n\n.uevc-three-video-comparison-container .video-wrapper video {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    max-width: none;\n}\n\n.uevc-side-by-side-container {\n    display: flex;\n    position: relative;\n    justify-content: center;\n    gap: 0px;\n}\n\n.uevc-side-by-side-container>.video-wrapper {\n    width: 50%;\n    max-width: 50%;\n    height: auto;\n    position: relative;\n}\n\n.uevc-side-by-side-container>.video-wrapper>video {\n    width: 100%;\n    height: 100%;\n    object-fit: contain;\n}\n\n.uevc-four-grid-container>.video-wrapper {\n    width: 100%;\n    height: 100%;\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.uevc-four-grid-container>.video-wrapper>video {\n    width: 100%;\n    height: 100%;\n    object-fit: contain;\n}\n\n.uevc-four-grid-container {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    grid-template-rows: 1fr 1fr;\n    gap: 0;\n    overflow: hidden;\n    width: 100%;\n    height: 100%;\n}\n\n/* Caption Styles */\n.uevc-caption {\n    position: absolute;\n    bottom: 10px;\n    right: 10px;\n    background-color: rgba(0, 0, 0, 0.7);\n    color: white;\n    padding: 5px 10px;\n    border-radius: 4px;\n    min-height: fit-content;\n    line-height: 1.4;\n    word-break: break-word;\n    max-width: 80%;\n    visibility: hidden;\n    opacity: 0;\n    transition: opacity 0.3s ease;\n}\n\n.uevc-caption.ue-before {\n    right: auto;\n    left: 10px;\n}\n\n.uevc-caption.ue-overlay {\n    top: 5px;\n    bottom: auto;\n    right: 5px;\n    z-index: 5;\n    font-size: 10px;\n    padding: 2px 4px;\n    border-radius: 2px;\n}\n\n/* Vertical mode caption positioning */\n.uevc-slider-container.vertical .uevc-caption.ue-before {\n    left: auto;\n    right: 10px;\n    bottom: auto;\n    top: 10px;\n}\n\n.uevc-slider-container.vertical .uevc-caption.ue-after {\n    bottom: 10px;\n    top: auto;\n}\n\n/* Slider Line */\n.uevc-slider-line {\n    position: absolute;\n    background-color: white;\n    z-index: 4;\n    pointer-events: none;\n}\n\n.uevc-slider-container:not(.vertical) .uevc-slider-line,\n.uevc-three-video-comparison-container:not(.vertical) .uevc-slider-line {\n    width: 2px;\n    height: 100%;\n    top: 0;\n    transform: translateX(-50%);\n}\n\n[class*=\"uevc-\"][class*=\"-container\"].vertical .uevc-slider-line {\n    width: 100%;\n    height: 2px;\n    left: 0;\n    transform: translateY(-50%);\n}\n\n/* Slider Handle */\n.uevc-handle {\n    position: absolute;\n    z-index: 5;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    pointer-events: none;\n    transform: translate(-50%, -50%);\n}\n\n.uevc-slider-container:not(.vertical) .uevc-handle,\n.uevc-three-video-comparison-container:not(.vertical) .uevc-handle {\n    top: 50%;\n}\n\n[class*=\"uevc-\"][class*=\"-container\"].vertical .uevc-handle {\n    left: 50%;\n}\n\n/* Handle Types */\n.uevc-handle.bar {\n    width: 8px;\n    height: 24px;\n    background-color: white;\n    border-radius: 2px;\n    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);\n}\n\n.uevc-handle.arrows {\n    width: 30px;\n    height: 30px;\n}\n\n.uevc-arrow-left,\n.uevc-arrow-right {\n    width: 0;\n    height: 0;\n    border-style: solid;\n    position: absolute;\n}\n\n.uevc-slider-container:not(.vertical) .uevc-arrow-left,\n.uevc-three-video-comparison-container:not(.vertical) .uevc-arrow-left {\n    border-width: 6px 8px 6px 0;\n    border-color: transparent white transparent transparent;\n    left: -12px;\n}\n\n.uevc-slider-container:not(.vertical) .uevc-arrow-right,\n.uevc-three-video-comparison-container:not(.vertical) .uevc-arrow-right {\n    border-width: 6px 0 6px 8px;\n    border-color: transparent transparent transparent white;\n    right: -12px;\n}\n\n[class*=\"uevc-\"][class*=\"-container\"].vertical .uevc-arrow-left {\n    /* Top arrow */\n    border-width: 0 6px 8px 6px;\n    border-color: transparent transparent white transparent;\n    top: -12px;\n}\n\n[class*=\"uevc-\"][class*=\"-container\"].vertical .uevc-arrow-right {\n    /* Bottom arrow */\n    border-width: 8px 6px 0 6px;\n    border-color: white transparent transparent transparent;\n    bottom: -12px;\n}\n\n.uevc-handle.icon {\n    width: 40px;\n    height: 40px;\n    background-color: white;\n    border-radius: 50%;\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);\n    color: #333;\n}\n\n.uevc-handle-icon {\n    display: none;\n    /* Hidden by default in container, library will move it */\n}\n\n.uevc-handle.icon .uevc-handle-icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}";
n(css,{});

class BaseVideoPlayer {
    constructor(container) {
        this.container = container;
        this.videos = [];
        this.wrappers = [];
        this.readyStates = [];
        this.captions = [];

        // Read playback options
        this.playMode = this.container.getAttribute('data-play-mode') || 'auto';
        this.viewportPause = this.container.getAttribute('data-viewport-pause') === 'true';
        this.hasInteracted = false;
        this.playModeSetup = false;
        this.viewportObserverSetup = false;
        this.isIntersecting = true; // Assume visible initially

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
            // Show videos and captions
            this.videos.forEach(video => {
                video.style.visibility = 'visible';
                video.style.opacity = '1';
            });
            this.captions.forEach(caption => {
                caption.style.visibility = 'visible';
                caption.style.opacity = '1';
            });
            this.loadingElement.style.display = 'none';
            clearInterval(this.loadingInterval);
            this.loadingInterval = null;

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
        sourceVideo.addEventListener('timeupdate', () => {
            this.videos.forEach((video, index) => {
                if (index !== sourceIndex && Math.abs(video.currentTime - sourceVideo.currentTime) > 0.05) {
                    video.currentTime = sourceVideo.currentTime;
                }
            });
        });
    }
}

class ComparisonWiper extends BaseVideoPlayer {
    constructor(container) {
        super(container);

        const video1 = container.getElementsByTagName('video')[1];
        const video2 = container.getElementsByTagName('video')[0];

        this.addVideoWithWrapper(video1, 'ue-after');
        this.addVideoWithWrapper(video2, 'ue-before');

        this.setupWiper();
        this.syncVideos(0);
        this.setupPlayMode();
        this.setupViewportObserver();
    }

    setupWiper() {
        const video1 = this.videos[0];
        const video2 = this.videos[1];
        const wrapper1 = this.wrappers[0];
        const wrapper2 = this.wrappers[1];
        const clipperOuter = document.createElement('div');
        clipperOuter.classList.add('uevc-wiper-clipper-outer');
        const clipper = document.createElement('div');
        clipper.classList.add('uevc-wiper-clipper');
        clipperOuter.appendChild(clipper);
        wrapper2.parentNode.insertBefore(clipperOuter, wrapper2);
        clipper.appendChild(wrapper2);

        this.video2Clipped = true;
        this.animationTriggered = false;

        // Read timing attributes - duration is in seconds
        const duration = parseFloat(this.container.getAttribute('data-duration')) || 1.0;

        video1.addEventListener('loadedmetadata', () => {
            this.container.style.aspectRatio = `${video1.videoWidth / video1.videoHeight} / 1`;
        });

        // Monitor video1 progress to trigger animation
        video1.addEventListener('timeupdate', () => {
            if (!this.animationTriggered && video2.currentTime > duration) {
                console.log('triggering animation');
                requestAnimationFrame(() => {
                    clipperOuter.style.backgroundColor = 'white';
                });
                clipperOuter.getBoundingClientRect();
                this.startAnimation(clipperOuter);
                this.startAnimation(clipper);
                this.animationTriggered = true;
            }
        });

        // Swap videos when video1 seeks before the trigger point
        video1.addEventListener('seeked', () => {
            if (video1.currentTime < duration) {
                this.animationTriggered = false;
                clipper.style.clipPath = null;
                clipperOuter.style.clipPath = null;

                if (this.video2Clipped) {
                    const tempVideo = wrapper1;
                    wrapper1.parentNode.insertBefore(wrapper2, wrapper1);
                    clipper.appendChild(tempVideo);
                } else {
                    const tempVideo = wrapper2;
                    wrapper2.parentNode.insertBefore(wrapper1, wrapper2);
                    clipper.appendChild(tempVideo);
                }
                this.video2Clipped = !this.video2Clipped;
                requestAnimationFrame(() => {
                    clipperOuter.style.backgroundColor = null;
                });
            }
        });

        video1.addEventListener('loadstart', () => {
            this.animationTriggered = false;
            clipper.style.clipPath = null;
            clipperOuter.style.clipPath = null;
            if (video2.parentNode === this.videoContainer) {
                const tempVideo = wrapper2;
                wrapper2.parentNode.insertBefore(wrapper1, wrapper2);
                clipper.appendChild(tempVideo);
                this.video2Clipped = true;
                this.animationTriggered = false;
            }
        });
    }

    startAnimation(clipper) {
        const startTime = Date.now();
        // Read transition duration from data-transition-duration attribute, default to 1000ms
        const duration = parseInt(this.container.getAttribute('data-transition-duration')) || 1000;

        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(1, elapsed / duration);

            const clipPath = `polygon(
                0% ${200 - progress * 200 + 0.1}%,
                ${200 - progress * 200 + 0.1}% 0%,
                0% 0%
            )`;

            clipper.style.clipPath = clipPath;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }
}

class ComparisonSlider extends BaseVideoPlayer {
    constructor(container) {
        super(container);

        const video1 = container.getElementsByTagName('video')[1];
        const video2 = container.getElementsByTagName('video')[0];

        this.addVideoWithWrapper(video1, 'ue-after');
        this.addVideoWithWrapper(video2, 'ue-before');

        this.setupSlider();
        this.syncVideos(0);
        this.setupPlayMode();
        this.setupViewportObserver();
    }

    setupSlider() {
        const wrapper2 = this.wrappers[1];
        const clipper = document.createElement('div');
        clipper.classList.add('uevc-slider-clipper');

        wrapper2.parentNode.insertBefore(clipper, wrapper2);
        clipper.appendChild(wrapper2);

        const video = this.videos[0];
        video.addEventListener('loadedmetadata', () => {
            this.container.style.aspectRatio = `${video.videoWidth / video.videoHeight} / 1`;
        });

        const trigger = this.container.getAttribute('data-trigger');
        const direction = this.container.getAttribute('data-direction');
        const handleType = this.container.getAttribute('data-handle-type');

        if (direction === 'vertical') {
            this.container.classList.add('vertical');
        }

        // Create slider line
        const line = document.createElement('span');
        line.classList.add('uevc-slider-line');
        this.container.appendChild(line);

        // Create handle if type is specified
        let handle = null;
        if (handleType) {
            handle = document.createElement('div');
            handle.classList.add('uevc-handle', handleType);

            if (handleType === 'arrows') {
                const leftArrow = document.createElement('span');
                leftArrow.classList.add('uevc-arrow-left');
                const rightArrow = document.createElement('span');
                rightArrow.classList.add('uevc-arrow-right');
                handle.appendChild(leftArrow);
                handle.appendChild(rightArrow);
            } else if (handleType === 'icon') {
                const iconSource = this.container.querySelector('.uevc-handle-icon');
                if (iconSource) {
                    handle.appendChild(iconSource);
                }
            }
            this.container.appendChild(handle);
        }

        const setPosition = (position) => {
            // Clamp position between 0 and 100
            position = Math.max(0, Math.min(100, position));

            if (direction === 'vertical') {
                clipper.style.height = position + '%';
                wrapper2.style.height = (position === 0 ? 100 : (100 / position) * 100) + '%';
                line.style.top = position + '%';
                if (handle) handle.style.top = position + '%';
            } else {
                clipper.style.width = position + '%';
                wrapper2.style.width = (position === 0 ? 100 : (100 / position) * 100) + '%';
                line.style.left = position + '%';
                if (handle) handle.style.left = position + '%';
            }
        };

        // Set initial position
        const initialPosition = parseFloat(this.container.getAttribute('data-initial')) || 50;
        setPosition(initialPosition);

        const trackLocation = (e) => {
            const rect = this.container.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            let position;

            if (direction === 'vertical') {
                position = ((clientY - rect.top) / this.container.offsetHeight) * 100;
            } else {
                position = ((clientX - rect.left) / this.container.offsetWidth) * 100;
            }

            setPosition(position);
        };

        if (trigger === 'click') {
            const onMouseMove = (e) => {
                e.preventDefault();
                trackLocation(e);
            };

            const onMouseUp = () => {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            };

            this.container.addEventListener('mousedown', (e) => {
                e.preventDefault(); // Prevent selection
                trackLocation(e);
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
            });
        } else {
            this.container.addEventListener('mousemove', trackLocation, false);
            this.container.addEventListener('touchstart', (e) => {
                // Prevent scrolling when touching the slider in hover mode too (optional, but good for UX)
                e.preventDefault();
                trackLocation(e);
            }, { passive: false });
            this.container.addEventListener('touchmove', (e) => {
                e.preventDefault();
                trackLocation(e);
            }, { passive: false });
        }

        // Touch support for both modes
        if (trigger === 'click') {
            this.container.addEventListener('touchstart', (e) => {
                e.preventDefault();
                trackLocation(e);
            }, { passive: false });
            this.container.addEventListener('touchmove', (e) => {
                e.preventDefault();
                trackLocation(e);
            }, { passive: false });
        }
    }
}

class ThreeVideoComparison extends ComparisonSlider {
    constructor(container) {
        super(container);

        // Get the third video
        const video3 = container.getElementsByTagName('video')[2];
        this.addVideo(video3);
        this.addCaption(video3, this.wrappers[0], 'ue-overlay');

        // Add the third video to the second wrapper
        this.wrappers[0].appendChild(video3);
        video3.style.width = '20%';
        video3.style.height = '20%';
        video3.style.position = 'absolute';
        video3.style.top = '0';
        video3.style.right = '0';
        video3.style.zIndex = '4';

        // Sync the third video with others
        this.syncVideos(0);
    }
}

class SideBySide extends BaseVideoPlayer {
    constructor(container) {
        super(container);

        const video1 = container.getElementsByTagName('video')[0];
        const video2 = container.getElementsByTagName('video')[1];

        this.initialize(video1, video2);
    }


    initialize(leftVideo, rightVideo) {
        this.addVideoWithWrapper(leftVideo, 'ue-before');
        this.addVideoWithWrapper(rightVideo, 'ue-after');
        this.syncVideos(0);
        this.setupPlayMode();
        this.setupViewportObserver();

        leftVideo.addEventListener('loadedmetadata', () => {
            this.container.style.aspectRatio = `${leftVideo.videoWidth * 2 / leftVideo.videoHeight} / 1`;
        });
    }
}

class FourGrid extends BaseVideoPlayer {
    constructor(container) {
        super(container);
        const videos = container.getElementsByTagName('video');
        this.initialize(videos);
    }

    initialize(videos) {
        for (const video of videos) {
            this.addVideoWithWrapper(video);
        }

        this.syncVideos(0);
        this.setupPlayMode();
        this.setupViewportObserver();

        videos[0].addEventListener('loadedmetadata', () => {
            this.container.style.aspectRatio = `${videos[0].videoWidth * 2 / (videos[0].videoHeight * 2)} / 1`;
        });
    }
}

function initUEVideoCompare() {
    const initialize = () => {
        const containers = document.getElementsByClassName(
            SLIDER_CONTAINER_CLASS,
        );

        for (let i = 0; i < containers.length; i++) {
            const container = containers[i];
            if (container) {
                new ComparisonSlider(container);
            }
        }

        const wiperContainers = document.getElementsByClassName(
            WIPER_CONTAINER_CLASS,
        );
        for (let i = 0; i < wiperContainers.length; i++) {
            const container = wiperContainers[i];
            if (container) {
                new ComparisonWiper(container);
            }
        }

        const sideBySideContainers = document.getElementsByClassName(
            SIDE_BY_SIDE_CONTAINER_CLASS,
        );
        for (let i = 0; i < sideBySideContainers.length; i++) {
            const container = sideBySideContainers[i];
            if (container) {
                new SideBySide(container);
            }
        }

        const threeVideoComparisonContainers = document.getElementsByClassName(
            THREE_VIDEO_COMPARISON_CONTAINER_CLASS,
        );
        for (let i = 0; i < threeVideoComparisonContainers.length; i++) {
            const container = threeVideoComparisonContainers[i];
            if (container) {
                new ThreeVideoComparison(container);
            }
        }

        const fourGridContainers = document.getElementsByClassName(
            FOUR_GRID_CONTAINER_CLASS,
        );
        for (let i = 0; i < fourGridContainers.length; i++) {
            const container = fourGridContainers[i];
            if (container) {
                new FourGrid(container);
            }
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
}

initUEVideoCompare();

export { initUEVideoCompare as default };

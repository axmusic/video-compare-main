/*!
* UE Video Comparison - v0.3.5
* Unlimited Elements for Elementor, Adarsh Pawar.
* Repository: https://github.com/AxMusic/video-compare-main
*/
var UEVideoCompare = (function () {
    'use strict';

    const SLIDER_CONTAINER_CLASS = 'uevc-slider-container';
    const WIPER_CONTAINER_CLASS = 'uevc-wiper-container';
    const SIDE_BY_SIDE_CONTAINER_CLASS = 'uevc-side-by-side-container';
    const THREE_VIDEO_COMPARISON_CONTAINER_CLASS = 'uevc-three-video-comparison-container';
    const FOUR_GRID_CONTAINER_CLASS = 'uevc-four-grid-container';

    class BaseVideoPlayer {
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

            const updateSize = () => {
                if (!video1.videoWidth) return;
                this.container.style.aspectRatio = `${video1.videoWidth / video1.videoHeight} / 1`;
                const aspect = video1.videoHeight / video1.videoWidth;
                const width = this.container.offsetWidth;
                if (!width) return;
                this.container.style.minHeight = `${width * aspect}px`;
            };
            const resizeObserver = new ResizeObserver(updateSize);

            video1.addEventListener('loadedmetadata', updateSize);
            // window.addEventListener('resize', updateSize);
            resizeObserver.observe(this.container);

            video1.addEventListener('timeupdate', () => {
                if (!this.animationTriggered && video2.currentTime > duration) {
                    // console.log('triggering animation');
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

            const updateSize = () => {
                if (!video.videoWidth) return;
                this.container.style.aspectRatio = `${video.videoWidth / video.videoHeight} / 1`;
                const aspect = video.videoHeight / video.videoWidth;
                const width = this.container.offsetWidth;
                if (!width) return;
                this.container.style.minHeight = `${width * aspect}px`;
            };
            const resizeObserver = new ResizeObserver(updateSize);

            video.addEventListener('loadedmetadata', updateSize);
            // window.addEventListener('resize', updateSize);
            resizeObserver.observe(this.container);


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
                    // Prevent scrolling when touching the slider in hover mode
                    e.preventDefault();
                    trackLocation(e);
                }, { passive: false });
                this.container.addEventListener('touchmove', (e) => {
                    e.preventDefault();
                    trackLocation(e);
                }, { passive: false });
            }

            // Auto slide functionality
            const autoSlide = this.container.getAttribute('data-auto-slide') === 'true';
            const autoSlideDuration = parseInt(this.container.getAttribute('data-auto-slide-duration')) || 2000;
            const autoSlideResume = this.container.getAttribute('data-auto-slide-resume') === 'true';
            const autoSlideResumeDelay = parseInt(this.container.getAttribute('data-auto-slide-resume-delay')) || 1500;

            if (autoSlide) {
                let direction = 1; // 1 for right, -1 for left
                let animationFrame;
                let isPaused = false;
                let resumeTimeout;

                let progress = initialPosition / 100; // 0 to 1
                let lastFrameTime = null;

                const animateSmooth = (timestamp) => {
                    if (!lastFrameTime) lastFrameTime = timestamp;
                    const deltaTime = timestamp - lastFrameTime;
                    lastFrameTime = timestamp;

                    if (isPaused) return;

                    const step = deltaTime / autoSlideDuration;

                    if (direction === 1) {
                        progress += step;
                        if (progress >= 1) {
                            progress = 1;
                            direction = -1;
                        }
                    } else {
                        progress -= step;
                        if (progress <= 0) {
                            progress = 0;
                            direction = 1;
                        }
                    }

                    setPosition(progress * 100);
                    animationFrame = requestAnimationFrame(animateSmooth);
                };

                const stopSlide = () => {
                    isPaused = true;
                    if (animationFrame) cancelAnimationFrame(animationFrame);
                    lastFrameTime = null;
                    if (resumeTimeout) clearTimeout(resumeTimeout);
                };

                const resumeSlide = () => {
                    if (!autoSlideResume) return;
                    resumeTimeout = setTimeout(() => {
                        isPaused = false;
                        animationFrame = requestAnimationFrame(animateSmooth);
                    }, autoSlideResumeDelay);
                };

                // Start initial animation
                animationFrame = requestAnimationFrame(animateSmooth);

                // Event listeners to pause/resume
                this.container.addEventListener('mouseenter', stopSlide);
                this.container.addEventListener('touchstart', stopSlide, { passive: true });

                this.container.addEventListener('mouseleave', resumeSlide);
                this.container.addEventListener('touchend', resumeSlide, { passive: true });
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
            /* use CSS instead
            video3.style.width = '20%';
            video3.style.height = '20%';
            video3.style.top = '0';
            video3.style.right = '0';
            */
            video3.style.position = 'absolute';
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
                if (container && !container.hasAttribute('data-uevc-initialized')) {
                    container.setAttribute('data-uevc-initialized', 'true');
                    new ComparisonSlider(container);
                }
            }

            const wiperContainers = document.getElementsByClassName(
                WIPER_CONTAINER_CLASS,
            );
            for (let i = 0; i < wiperContainers.length; i++) {
                const container = wiperContainers[i];
                if (container && !container.hasAttribute('data-uevc-initialized')) {
                    container.setAttribute('data-uevc-initialized', 'true');
                    new ComparisonWiper(container);
                }
            }

            const sideBySideContainers = document.getElementsByClassName(
                SIDE_BY_SIDE_CONTAINER_CLASS,
            );
            for (let i = 0; i < sideBySideContainers.length; i++) {
                const container = sideBySideContainers[i];
                if (container && !container.hasAttribute('data-uevc-initialized')) {
                    container.setAttribute('data-uevc-initialized', 'true');
                    new SideBySide(container);
                }
            }

            const threeVideoComparisonContainers = document.getElementsByClassName(
                THREE_VIDEO_COMPARISON_CONTAINER_CLASS,
            );
            for (let i = 0; i < threeVideoComparisonContainers.length; i++) {
                const container = threeVideoComparisonContainers[i];
                if (container && !container.hasAttribute('data-uevc-initialized')) {
                    container.setAttribute('data-uevc-initialized', 'true');
                    new ThreeVideoComparison(container);
                }
            }

            const fourGridContainers = document.getElementsByClassName(
                FOUR_GRID_CONTAINER_CLASS,
            );
            for (let i = 0; i < fourGridContainers.length; i++) {
                const container = fourGridContainers[i];
                if (container && !container.hasAttribute('data-uevc-initialized')) {
                    container.setAttribute('data-uevc-initialized', 'true');
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

    return initUEVideoCompare;

})();

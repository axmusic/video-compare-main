import { BaseVideoPlayer } from './video-player';

export class ComparisonSlider extends BaseVideoPlayer {
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
                // Prevent scrolling when touching the slider in hover mode
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

export class ThreeVideoComparison extends ComparisonSlider {
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
        */
        video3.style.position = 'absolute';
        video3.style.top = '0';
        video3.style.right = '0';
        video3.style.zIndex = '4';

        // Sync the third video with others
        this.syncVideos(0);
    }
}
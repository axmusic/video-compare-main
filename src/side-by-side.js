import { BaseVideoPlayer } from './video-player.js';

export class SideBySide extends BaseVideoPlayer {
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

        leftVideo.addEventListener('loadedmetadata', () => {
            this.container.style.aspectRatio = `${leftVideo.videoWidth * 2 / leftVideo.videoHeight} / 1`;
        });
    }
}

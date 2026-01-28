# UE video compare

A simple library for video comparison.

## Usage

Load the script from CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/ue-video-compare/dist/ue-video-compare.min.js"></script>
```

Use the following HTML structure to initialize the video comparison slider:

```html
<div class="uevc-slider-container" >
    <video playsinline autoplay muted loop>
    <source src="./static/videos/video1.mp4">
    </video>
    <video playsinline autoplay muted loop>
    <source src="./static/videos/video2.mp4">
    </video>
</div>
```

### Configuration

You can customize the slider behavior using data attributes:

- `data-trigger`: Controls how the user interacts with the slider.
    - `hover` (default): Slider follows the mouse cursor.
    - `click`: Slider must be clicked and dragged to move.
- `data-direction`: Controls the slider orientation.
    - `horizontal` (default): Slider moves left/right.
    - `vertical`: Slider moves up/down.
- `data-initial`: Sets the initial position of the slider (0-100). Default is 50.

Example:
```html
<div class="uevc-slider-container" data-trigger="click" data-direction="vertical" data-initial="30">
    ...
</div>
```

## Features

- Support synchronization of the multiple videos
- Support interaction with mouse(hover) and touch(touch move)
- Support caption with `uevc-caption="caption"` attribute
- Support slider, wiper, side by side, 3 video comparison, 4-grid comparison
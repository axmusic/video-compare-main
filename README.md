# Video Compare

A simple javascript video comparison library for both slider and wiper.

## Usage

Load the library from CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/video-compare/dist/video-compare.min.js"></script>
```

Use the following HTML structure to initialize the video comparison slider:

```html
```html
<div class="vc-slider-container" >
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
<div class="vc-slider-container" data-trigger="click" data-direction="vertical" data-initial="30">
    ...
</div>
```

For more example, please check the [demo page](https://liangrunda.github.io/video-compare/) and [source code](https://github.com/liangrunda/video-compare/tree/main/example).

## Features

- Support synchronization of the multiple videos
- Simple and easy to use - just add the class name to the container
- Multiple video comparison modes: slider, wiper, four grid, side by side and three video comparison
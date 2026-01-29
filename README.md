# UE Video Comparison

A powerful, high-performance library for comparing videos on the web. Support for sliders, wipers, side-by-side, and multi-video grids with perfect synchronization.

## Features

- **Perfect Sync**: All videos stay frame-locked during playback.
- **Multiple Layouts**: Slider, Wipe, Side-by-Side, 3-Video, and 4-Grid.
- **Performant**: Built-in viewport detection to pause off-screen videos.
- **Customizable**: Control triggers (hover/click), directions, playback modes, and handles.
- **Easy Captions**: Add labels to videos using simple attributes.
- **Lightweight**: Zero dependencies.

---

## Installation

Add the JS and CSS to your project:

```html
<!-- Styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ue-video-compare/dist/ue-video-compare.css">

<!-- Script -->
<script src="https://cdn.jsdelivr.net/npm/ue-video-compare/dist/ue-video-compare.min.js"></script>
```

## Basic Usage

Initialize the comparison by using the appropriate container class:

```html
<div class="uevc-slider-container">
    <video playsinline autoplay muted loop uevc-caption="Before">
        <source src="video1.mp4">
    </video>
    <video playsinline autoplay muted loop uevc-caption="After">
        <source src="video2.mp4">
    </video>
</div>
```

---

## Configuration

### Container Classes
Choose your comparison layout:
- `uevc-slider-container`: Classic split-screen slider.
- `uevc-wiper-container`: Automatic diagonal wipe transition.
- `uevc-side-by-side-container`: Two videos next to each other.
- `uevc-three-video-comparison-container`: Three videos with one as a mini-overlay.
- `uevc-four-grid-container`: A 2x2 grid of synchronized videos.

### Data Attributes (Global)
Apply these to the main container `<div>`:

| Attribute | Options | Default | Description |
|-----------|---------|---------|-------------|
| `data-trigger` | `hover`, `click` | `hover` | How the user moves the slider. |
| `data-direction` | `horizontal`, `vertical` | `horizontal` | Orientation of the slider. |
| `data-initial` | `0` to `100` | `50` | Initial split position (percentage). |
| `data-play-mode` | `auto`, `interaction`, `manual` | `auto` | `interaction`: Play on first hover. `manual`: Play only while hovering. |
| `data-viewport-pause`| `true`, `false` | `false` | If `true`, pauses video off-screen to save CPU/Battery. |
| `data-handle-type` | `bar`, `arrows`, `icon` | (none) | Visual style of the slider handle. |

### Data Attributes (Wiper Mode)
- `data-duration`: Seconds to wait before starting the wipe (Default: `1.0`).
- `data-transition-duration`: Milliseconds the wipe animation takes (Default: `1000`).

---

## Captions

Add labels to your videos by adding the `uevc-caption` attribute directly to the `<video>` tag:

```html
<video uevc-caption="Original 4K">...</video>
```

---

## Advanced: Manual Initialization

If you are adding containers dynamically via JavaScript, you can re-run the initialization:

```javascript
// Scans for new containers and initializes them (skips already initialized ones)
UEVideoCompare();
```

## License

MIT License 

## Ax Adarsh Pawar, Unlimited Elements for Elementor
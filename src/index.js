import { SLIDER_CONTAINER_CLASS, WIPER_CONTAINER_CLASS, SIDE_BY_SIDE_CONTAINER_CLASS, THREE_VIDEO_COMPARISON_CONTAINER_CLASS, FOUR_GRID_CONTAINER_CLASS } from './consts';
import './styles.css';
import { ComparisonWiper } from './wiper';
import { ComparisonSlider, ThreeVideoComparison } from './slider';
import { SideBySide } from './side-by-side';
import { FourGrid } from './four-grid';

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

    // Observe for dynamic content changes (SPA, iframes, etc.)
    const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                shouldUpdate = true;
                break;
            }
        }
        if (shouldUpdate) {
            initialize();
        }
    });

    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }
}

initUEVideoCompare();
export default initUEVideoCompare;

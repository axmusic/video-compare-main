/**
 * Initialization logic for Unlimited Elements for Elementor
 */
(function () {
    function initWidget() {
        if (typeof UEVideoCompare === 'undefined') {
            console.error('UE Video Comparison library not loaded.');
            return;
        }

        // Initialize the library. 
        // The library automatically finds all containers by class name 
        // ('uevc-slider-container', etc.) upon execution.
        // If your widget content is added dynamically, you can call 
        // UEVideoCompare(); to re-scan for new elements.

        UEVideoCompare();
    }

    // Unlimited Elements often handles the 'DOMContentLoaded' event, 
    // but for the Elementor Editor, we might need to trigger it manually 
    // or use UE's specific events if needed.
    initWidget();
})();

/**
 * Initialization logic for Unlimited Elements for Elementor
 */
(function () {
    function initWidget() {
        if (typeof UEVideoCompare === 'undefined') {
            console.error('UE Video Comparison library not loaded.');
            return;
        }
        UEVideoCompare();
    }
    initWidget();
})();

let fadeTarget = document.getElementById("loader");

window.onload = function () {
    function fadeOutEffect() {
        let fadeEffect = setInterval(function () {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
            }
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity -= 0.2;
            } else {
                clearInterval(fadeEffect);
            }
        }, 100);
    }

    fadeOutEffect(fadeTarget);
}
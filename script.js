/* ========================================
   DANIEL & DILARA
   CINEMATIC WEDDING INVITATION
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    const beginButton = document.getElementById("beginButton");
    const worldMap = document.getElementById("worldMap");
    const weddingSection = document.getElementById("wedding");
    const travelRoute = document.getElementById("travelRoute");

    // Start the journey when the visitor clicks the button.
    if (beginButton && worldMap) {
        beginButton.addEventListener("click", () => {
            worldMap.classList.add("route-active");

            beginButton.innerHTML =
                'FOLLOW OUR JOURNEY <span aria-hidden="true">✦</span>';

            beginButton.disabled = true;

            beginButton.style.opacity = "0.75";

            // Reveal the wedding details after the route animation.
            window.setTimeout(() => {
                if (weddingSection) {
                    weddingSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }, 3200);
        });
    }

    // Draw the route automatically when the map enters the viewport.
    if (worldMap && "IntersectionObserver" in window) {
        const mapObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        worldMap.classList.add("route-active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.3
            }
        );

        mapObserver.observe(worldMap);
    } else if (worldMap) {
        worldMap.classList.add("route-active");
    }

    // Keep the route ready if its SVG element exists.
    if (travelRoute) {
        travelRoute.style.willChange = "stroke-dashoffset";
    }

    // Countdown to October 24, 2026, at 6:00 PM in Istanbul (UTC+03:00).
    const weddingDate = new Date("2026-10-24T18:00:00+03:00");
    const countdown = document.getElementById("countdown");
    const countdownMessage = document.getElementById("countdownMessage");
    let countdownInterval;

    function updateCountdown() {
        const remaining = weddingDate.getTime() - Date.now();

        if (remaining <= 0) {
            if (countdown) countdown.hidden = true;
            if (countdownMessage) countdownMessage.hidden = false;
            if (countdownInterval) window.clearInterval(countdownInterval);
            return;
        }

        if (countdownMessage) countdownMessage.hidden = true;
        if (!countdown) return;

        const totalSeconds = Math.ceil(remaining / 1000);
        const values = {
            days: Math.floor(totalSeconds / 86400),
            hours: Math.floor((totalSeconds % 86400) / 3600),
            minutes: Math.floor((totalSeconds % 3600) / 60),
            seconds: totalSeconds % 60
        };

        Object.entries(values).forEach(([unit, value]) => {
            const output = countdown.querySelector(`[data-countdown="${unit}"]`);
            if (output) output.textContent = String(value).padStart(2, "0");
        });
    }

    updateCountdown();
    countdownInterval = window.setInterval(updateCountdown, 1000);
});

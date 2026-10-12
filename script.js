```javascript
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

    // Wedding countdown: October 24, 2026, at 6:00 PM in Istanbul.
    // Istanbul uses UTC+03:00.
    const weddingDate = new Date("2026-10-24T18:00:00+03:00");

    function updateCountdown() {
        const now = new Date();
        const remaining = weddingDate.getTime() - now.getTime();

        if (remaining <= 0) {
            return;
        }

        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (remaining / (1000 * 60 * 60)) % 24
        );
        const minutes = Math.floor(
            (remaining / (1000 * 60)) % 60
        );

        const countdown = document.getElementById("countdown");

        if (countdown) {
            countdown.textContent =
                `${days} DAYS · ${hours} HOURS · ${minutes} MINUTES`;
        }
    }

    updateCountdown();
    window.setInterval(updateCountdown, 60000);
});
```

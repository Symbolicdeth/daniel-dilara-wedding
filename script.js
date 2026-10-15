/* ========================================
   DANIEL & DILARA
   CINEMATIC WEDDING INVITATION
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    const beginButton = document.getElementById("beginButton");
    const worldMap = document.getElementById("worldMap");
    const weddingSection = document.getElementById("wedding");
    const travelRoute = document.getElementById("travelRoute");

    // Post-wedding album URL.
    const albumUrl = "https://photos.app.goo.gl/5GWeEewUJjuPrpAn8";

    // Return the date in Istanbul, regardless of the visitor's timezone.
    function istanbulDateString() {
        const parts = new Intl.DateTimeFormat("en-CA", {
            timeZone: "Europe/Istanbul",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).formatToParts(new Date());

        const date = {};
        parts.forEach((part) => {
            if (part.type !== "literal") date[part.type] = part.value;
        });
        return `${date.year}-${date.month}-${date.day}`;
    }

    function applyPostWeddingChanges() {
        if (istanbulDateString() < "2026-10-25") return;

        // Keep the original page and CSS. Only hide invitation-only details.
        const countdown = document.getElementById("countdown");
        const countdownMessage = document.getElementById("countdownMessage");
        if (countdown) {
            countdown.hidden = true;
            countdown.style.display = "none";
        }
        if (countdownMessage) {
            countdownMessage.hidden = true;
            countdownMessage.style.display = "none";
        }

        document.querySelectorAll(".venue-name, .venue-city, .location-button").forEach((el) => {
            el.hidden = true;
            el.style.display = "none";
        });

        // Hide the old WhatsApp instructions too (the venue-city selector above
        // handles this existing line without changing its markup).
        const weddingSection = document.getElementById("wedding");
        if (!weddingSection || document.getElementById("postWeddingMessage")) return;

        const divider = weddingSection.querySelector(".divider");
        const date = weddingSection.querySelector(".wedding-date");
        const time = weddingSection.querySelector(".wedding-time");

        // Retain the date, names, original message, map, and all original styling.
        if (time) {
            time.hidden = true;
            time.style.display = "none";
        }

        const message = document.createElement("p");
        message.id = "postWeddingMessage";
        message.className = "post-event-message";
        message.textContent = "Thank you for being part of our special day and for making our celebration unforgettable.";

        const albumMessage = document.createElement("p");
        albumMessage.id = "postWeddingAlbumMessage";
        albumMessage.className = "post-event-album-message";
        albumMessage.textContent = "Keep the memories alive. View and share the photos from our wedding in our shared album.";

        const albumButton = document.createElement("a");
        albumButton.id = "postWeddingAlbumButton";
        albumButton.className = "location-button";
        albumButton.href = albumUrl;
        albumButton.target = "_blank";
        albumButton.rel = "noopener noreferrer";
        albumButton.textContent = "VIEW & SHARE WEDDING PHOTOS";

        if (date) {
            date.insertAdjacentElement("afterend", message);
        } else if (divider) {
            divider.insertAdjacentElement("afterend", message);
        } else {
            weddingSection.appendChild(message);
        }

        message.insertAdjacentElement("afterend", albumMessage);
        albumMessage.insertAdjacentElement("afterend", albumButton);

        const closingNote = document.createElement("p");
        closingNote.id = "postWeddingClosing";
        closingNote.className = "post-event-closing";
        closingNote.textContent = "WITH LOVE AND GRATITUDE";
        albumButton.insertAdjacentElement("afterend", closingNote);

        const closingNames = document.createElement("p");
        closingNames.id = "postWeddingClosingNames";
        closingNames.className = "post-event-closing-names";
        closingNames.textContent = "Daniel & Dilara · 2026";
        closingNote.insertAdjacentElement("afterend", closingNames);

        // Simplify the original footer only on the post-wedding page:
        // remove "MADE WITH LOVE" and keep only "2026".
        const footerParagraphs = document.querySelectorAll("footer.footer p");
        if (footerParagraphs.length > 0) {
            footerParagraphs[0].hidden = true;
            footerParagraphs[0].style.display = "none";
        }
        if (footerParagraphs.length > 1) {
            footerParagraphs[1].textContent = "2026";
        }

        // Match the invitation's original serif typography and restrained gold accents.
        const postEventStyle = document.createElement("style");
        postEventStyle.id = "postEventTypography";
        postEventStyle.textContent = `
            .post-event-message {
                max-width: 760px;
                margin: 28px auto 18px;
                color: var(--ivory, #e9e2d2);
                font-family: var(--font-display, "Cormorant Garamond", Georgia, "Times New Roman", serif);
                font-size: clamp(22px, 3vw, 30px);
                font-weight: 400;
                line-height: 1.5;
                letter-spacing: .01em;
                text-wrap: balance;
            }
            .post-event-album-message {
                max-width: 690px;
                margin: 22px auto 28px;
                color: var(--muted, #aeb4c0);
                font-family: var(--font-display, "Cormorant Garamond", Georgia, "Times New Roman", serif);
                font-size: clamp(20px, 2.6vw, 26px);
                font-weight: 400;
                line-height: 1.55;
                text-wrap: balance;
            }
            .post-event-closing {
                margin: 48px 0 12px;
                color: var(--gold, #e7c783);
                font-family: var(--font-body, Arial, sans-serif);
                font-size: 11px;
                letter-spacing: .24em;
                line-height: 1.8;
            }
            .post-event-closing-names {
                margin: 0 0 12px;
                color: var(--muted, #aeb4c0);
                font-family: var(--font-display, "Cormorant Garamond", Georgia, "Times New Roman", serif);
                font-size: 20px;
                line-height: 1.5;
            }
            @media (max-width: 600px) {
                .post-event-message { font-size: 23px; }
                .post-event-album-message { font-size: 20px; }
                .post-event-closing { margin-top: 38px; }
            }
        `;
        document.head.appendChild(postEventStyle);
    }

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

    // Check on page load and periodically, so it switches after midnight in Istanbul.
    applyPostWeddingChanges();
    window.setInterval(applyPostWeddingChanges, 60 * 1000);
});

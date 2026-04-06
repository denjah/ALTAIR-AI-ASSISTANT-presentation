/* ============================================================
   AI-ASSISTANT LANDING — Scroll Animations & Parallax
   ============================================================ */

(() => {
    'use strict';

    // ——— IntersectionObserver for text reveal ———
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // reveal all children inside .text-zone
                    const textZone = entry.target.querySelector('.text-zone');
                    if (textZone) {
                        Array.from(textZone.children).forEach((child) => {
                            child.classList.add('visible');
                        });
                    }
                    // reveal mascot
                    const mascot = entry.target.querySelector('.mascot');
                    if (mascot) {
                        setTimeout(() => mascot.classList.add('visible'), 300);
                    }
                } else {
                    // optional: reset when leaving viewport for re-animation
                    const textZone = entry.target.querySelector('.text-zone');
                    if (textZone) {
                        Array.from(textZone.children).forEach((child) => {
                            child.classList.remove('visible');
                        });
                    }
                    const mascot = entry.target.querySelector('.mascot');
                    if (mascot) mascot.classList.remove('visible');
                }
            });
        },
        {
            threshold: 0.25,
            rootMargin: '0px',
        }
    );

    document.querySelectorAll('.slide').forEach((slide) => {
        revealObserver.observe(slide);
    });

    // ——— Parallax background on scroll ———
    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY || window.pageYOffset;

        document.querySelectorAll('.slide').forEach((slide) => {
            const bg = slide.querySelector('.slide-bg');
            if (!bg) return;

            const rect = slide.getBoundingClientRect();
            const slideCenter = rect.top + rect.height / 2;
            const viewCenter = window.innerHeight / 2;
            const delta = (slideCenter - viewCenter) / window.innerHeight;

            // Fixed parallax: background shifts within 1920x1080
            bg.style.transform = `translate(-50%, calc(-50% + ${delta * 60}px))`;
        });

        ticking = false;
    }

    window.addEventListener(
        'scroll',
        () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        },
        { passive: true }
    );

    // initial call
    updateParallax();

    // ——— Smooth wheel snapping (optional enhancement) ———
    // Uses CSS scroll-snap but adds a tiny debounce for smoothness
    let isScrolling;
    window.addEventListener('wheel', () => {
        clearTimeout(isScrolling);
        document.documentElement.style.scrollSnapType = 'none';
        isScrolling = setTimeout(() => {
            document.documentElement.style.scrollSnapType = 'y mandatory';
        }, 150);
    }, { passive: true });
})();

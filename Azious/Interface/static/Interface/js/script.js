/**
 * Script principal - Azious
 * Gestion des interactions et animations
 */

(function () {
    'use strict';

    // ========================================
    // CONSTANTES
    // ========================================

    const header = document.querySelector('.header');
    const menuLinks = document.querySelectorAll('.nav-link');
    const offcanvasElement = document.getElementById('offcanvasNavbar');

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================

    function handleScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Throttle scroll event
    let scrollTimer;
    window.addEventListener('scroll', () => {
        if (!scrollTimer) {
            scrollTimer = setTimeout(() => {
                handleScroll();
                scrollTimer = null;
            }, 10);
        }
    });

    // ========================================
    // NAVIGATION ACTIVE STATE
    // ========================================

    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                menuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Écouter le scroll pour mettre à jour le lien actif
    let activeTimer;
    window.addEventListener('scroll', () => {
        if (!activeTimer) {
            activeTimer = setTimeout(() => {
                updateActiveLink();
                activeTimer = null;
            }, 100);
        }
    });

    // ========================================
    // SMOOTH SCROLL
    // ========================================

    menuLinks.forEach(link => {
        const href = link.getAttribute('href');

        if (href && href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();

                    // Fermer le menu offcanvas si ouvert (Bootstrap)
                    if (offcanvasElement) {
                        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                        if (bsOffcanvas) {
                            bsOffcanvas.hide();
                        }
                    }

                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // ========================================
    // INITIALISATION
    // ========================================

    console.log('🚀 Azious - Scripts chargés avec succès');

})();
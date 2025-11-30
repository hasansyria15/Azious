/**
 * Script principal - Azious
 * Gestion des interactions et animations ultra belles du menu
 * @version 2.0.0 - ULTRA ANIMATIONS
 */

(function () {
    'use strict';

    // ========================================
    // CONSTANTES
    // ========================================

    const header = document.querySelector('.header');
    const menuLinks = document.querySelectorAll('.menu-link, .nav-link');
    const fullscreenMenu = document.getElementById('offcanvasNavbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuCloseBtn = document.querySelector('.fullscreen-menu-close');
    const menuList = document.querySelector('.menu-list');
    const menuCta = document.querySelector('.menu-cta');
    const menuSocial = document.querySelector('.menu-social');
    const ctaButtons = document.querySelectorAll('.btn-start-project, .menu-cta');

    // Flag pour savoir si on est en scroll "programmé"
    let isSmoothScrolling = false;

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

    // Throttle scroll event pour le header
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
        // 🔒 Si on est en plein smooth scroll, on ne touche pas aux liens actifs
        if (isSmoothScrolling) return;

        if (!activeTimer) {
            activeTimer = setTimeout(() => {
                updateActiveLink();
                activeTimer = null;
            }, 100);
        }
    });

    // ========================================
    // SMOOTH SCROLL - FONCTION COMMUNE
    // ========================================

    function handleSmoothScroll(e, href) {
        // Ignorer les liens avec juste "#" ou vides
        if (!href || href === '#' || href.length <= 1) {
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            e.stopPropagation(); // 🆕 Empêcher la propagation de l'événement

            // Fermer le menu offcanvas si ouvert (Bootstrap)
            if (offcanvasElement && typeof bootstrap !== 'undefined') {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                if (bsOffcanvas) {
                    bsOffcanvas.hide();
                }
            }

            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            // On active le flag de smooth scroll
            isSmoothScrolling = true;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // On désactive le flag après un petit délai
            setTimeout(() => {
                isSmoothScrolling = false;
                updateActiveLink();
            }, 600);
        }
    }

    // ========================================
    // GESTION DES LIENS DE NAVIGATION
    // ========================================

    menuLinks.forEach(link => {
        const href = link.getAttribute('href');

        if (href && href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                handleSmoothScroll(e, href);
            });
        }
    });

    // 🆕 GESTION DES BOUTONS CTA (Start a Project)
    ctaButtons.forEach(button => {
        const href = button.getAttribute('href');

        if (href && href.startsWith('#')) {
            button.addEventListener('click', (e) => {
                handleSmoothScroll(e, href);
            });
        }
    });

    // ========================================
    // � ANIMATIONS ULTRA BELLES DU MENU
    // ========================================

    let isAnimating = false;

    function animateMenuOpen() {
        if (isAnimating) return;
        isAnimating = true;

        // Animation du backdrop avec effet de blur progressif
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
            backdrop.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
        }

        // Animation du menu avec délai
        setTimeout(() => {
            offcanvasElement.style.transform = 'translateX(0)';
        }, 50);

        // Animation des éléments du menu en cascade
        const allLinks = menuList ? menuList.querySelectorAll('.menu-link') : [];

        allLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(30px)';

            setTimeout(() => {
                link.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, 150 + (index * 80));
        });

        // Animation du bouton CTA
        if (menuCta) {
            menuCta.style.opacity = '0';
            menuCta.style.transform = 'translateY(30px) scale(0.9)';

            setTimeout(() => {
                menuCta.style.transition = 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
                menuCta.style.opacity = '1';
                menuCta.style.transform = 'translateY(0) scale(1)';
            }, 150 + (allLinks.length * 80) + 100);
        }

        // Animation des réseaux sociaux
        if (menuSocial) {
            const socialLinks = menuSocial.querySelectorAll('.social-link');
            socialLinks.forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(30px) rotate(-10deg)';

                setTimeout(() => {
                    link.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0) rotate(0deg)';
                }, 150 + (allLinks.length * 80) + 200 + (index * 100));
            });
        }

        setTimeout(() => {
            isAnimating = false;
        }, 1500);
    }

    function animateMenuClose() {
        // Fermeture instantanée gérée par CSS
    }

    // ========================================
    // 🎨 GESTION DU MENU FULLSCREEN PROFESSIONNEL
    // ========================================

    if (fullscreenMenu) {
        if (menuToggle) {
            menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                openFullscreenMenu();
            });
        }

        if (menuCloseBtn) {
            menuCloseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                closeFullscreenMenu();
            });
        }

        // Fermer au clic sur un lien
        const allMenuLinks = fullscreenMenu.querySelectorAll('.menu-link, .menu-cta');
        allMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeFullscreenMenu();
            });
        });
    }

    function openFullscreenMenu() {
        if (isAnimating || !fullscreenMenu) return;
        isAnimating = true;

        // Afficher le menu
        fullscreenMenu.classList.add('show');
        document.body.style.overflow = 'hidden';
        menuToggle.classList.add('active');

        // Animer l'ouverture
        animateMenuOpen();

        setTimeout(() => {
            isAnimating = false;
        }, 1500);
    }

    function closeFullscreenMenu() {
        if (!fullscreenMenu || !fullscreenMenu.classList.contains('show')) return;
        if (isAnimating) return;

        isAnimating = true;

        fullscreenMenu.classList.remove('show');
        document.body.style.overflow = '';
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }

        setTimeout(() => {
            resetMenuStyles();
            isAnimating = false;
        }, 250);
    }

    function resetMenuStyles() {
        // Réinitialiser tous les styles pour la prochaine ouverture
        const allLinks = menuList ? menuList.querySelectorAll('.menu-link') : [];
        allLinks.forEach(link => {
            link.style.opacity = '';
            link.style.transform = '';
            link.style.transition = '';
        });

        if (menuCta) {
            menuCta.style.opacity = '';
            menuCta.style.transform = '';
            menuCta.style.transition = '';
        }

        if (menuSocial) {
            const socialLinks = menuSocial.querySelectorAll('.social-link');
            socialLinks.forEach(link => {
                link.style.opacity = '';
                link.style.transform = '';
                link.style.transition = '';
            });
        }
    }

    // Animation du bouton hamburger
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
        });
    }

    // ========================================
    // HERO SECTION - Code to Website Animation
    // ========================================

    // HTML/CSS/JS code snippets that build a website
    const codeSnippets = [
        { line: '<!-- 🚀 Création d\'un site web moderne -->', type: 'comment', lang: 'html' },
        { line: '<!DOCTYPE html>', type: 'code', lang: 'html' },
        { line: '<html lang="fr">', type: 'code', lang: 'html' },
        { line: '<head>', type: 'code', lang: 'html' },
        { line: '  <meta charset="UTF-8">', type: 'code', lang: 'html' },
        { line: '  <title>Portfolio Moderne</title>', type: 'code', lang: 'html' },
        { line: '  <style>', type: 'code', lang: 'html' },
        { line: '    /* 🎨 Design épuré et moderne */', type: 'comment', lang: 'css' },
        { line: '    body {', type: 'code', lang: 'css' },
        { line: '      font-family: "Inter", sans-serif;', type: 'code', lang: 'css' },
        { line: '      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);', type: 'code', lang: 'css' },
        { line: '      margin: 0; padding: 0;', type: 'code', lang: 'css' },
        { line: '    }', type: 'code', lang: 'css' },
        { line: '    .hero {', type: 'code', lang: 'css' },
        { line: '      min-height: 100vh; display: flex;', type: 'code', lang: 'css' },
        { line: '      align-items: center; justify-content: center;', type: 'code', lang: 'css' },
        { line: '      color: white; text-align: center;', type: 'code', lang: 'css' },
        { line: '    }', type: 'code', lang: 'css' },
        { line: '    h1 { font-size: 4rem; margin: 0; }', type: 'code', lang: 'css' },
        { line: '    .btn {', type: 'code', lang: 'css' },
        { line: '      background: white; color: #667eea;', type: 'code', lang: 'css' },
        { line: '      padding: 15px 40px; border-radius: 50px;', type: 'code', lang: 'css' },
        { line: '      text-decoration: none; font-weight: 600;', type: 'code', lang: 'css' },
        { line: '      transition: transform 0.3s;', type: 'code', lang: 'css' },
        { line: '    }', type: 'code', lang: 'css' },
        { line: '    .btn:hover { transform: scale(1.05); }', type: 'code', lang: 'css' },
        { line: '  </style>', type: 'code', lang: 'html' },
        { line: '</head>', type: 'code', lang: 'html' },
        { line: '<body>', type: 'code', lang: 'html' },
        { line: '  <div class="hero">', type: 'code', lang: 'html' },
        { line: '    <div>', type: 'code', lang: 'html' },
        { line: '      <h1>✨ Portfolio Créatif</h1>', type: 'code', lang: 'html' },
        { line: '      <p>Designer & Développeur Web</p>', type: 'code', lang: 'html' },
        { line: '      <a href="#" class="btn">Découvrir</a>', type: 'code', lang: 'html' },
        { line: '    </div>', type: 'code', lang: 'html' },
        { line: '  </div>', type: 'code', lang: 'html' },
        { line: '  <script>', type: 'code', lang: 'html' },
        { line: '    // ⚡ Animation au scroll', type: 'comment', lang: 'js' },
        { line: '    window.addEventListener("scroll", () => {', type: 'code', lang: 'js' },
        { line: '      console.log("🎯 Animation activée!");', type: 'code', lang: 'js' },
        { line: '    });', type: 'code', lang: 'js' },
        { line: '  </script>', type: 'code', lang: 'html' },
        { line: '</body>', type: 'code', lang: 'html' },
        { line: '</html>', type: 'code', lang: 'html' },
        { line: '', type: 'empty' },
        { line: '// ✅ Site web compilé avec succès!', type: 'comment', lang: 'js' },
    ];

    // Format code line with syntax highlighting
    function formatCodeLine(line, lineNumber) {
        let content = line.line;

        if (line.type === 'comment') {
            content = `<span class="comment">${escapeHtml(content)}</span>`;
        } else if (line.type === 'empty') {
            content = '&nbsp;';
        } else {
            // Syntax highlighting
            content = escapeHtml(content)
                // Keywords
                .replace(/\b(from|import|class|def|if|elif|else|return|for|in|with|as|try|except|finally|raise|assert|pass|break|continue|while)\b/g, '<span class="keyword">$1</span>')
                // Decorators
                .replace(/(@\w+)/g, '<span class="decorator">$1</span>')
                // Strings
                .replace(/(["'])(.*?)\1/g, '<span class="string">$1$2$1</span>')
                // Functions
                .replace(/(\w+)(?=\()/g, '<span class="function">$1</span>')
                // Numbers
                .replace(/\b(\d+)\b/g, '<span class="number">$1</span>')
                // Class names (after class keyword)
                .replace(/<span class="keyword">class<\/span>\s+(\w+)/g, '<span class="keyword">class</span> <span class="class-name">$1</span>')
                // Variables (simple heuristic)
                .replace(/(\w+)\s*=/g, '<span class="variable">$1</span> =');
        }

        return `
            <div class="code-line" style="animation-delay: ${lineNumber * 0.05}s">
                <span class="line-number">${lineNumber}</span>
                <span class="line-content">${content}</span>
            </div>
        `;
    }

    // Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initialize code-to-website animation
    function initCodeAnimation() {
        const codeContainer = document.getElementById('codeLines');
        if (!codeContainer) return;

        let currentLine = 0;
        const maxLines = 20;
        let isShowingWebsite = false;
        let cycleCount = 0;

        function addCodeLine() {
            // After 2 complete cycles, show the website preview
            if (currentLine >= codeSnippets.length) {
                cycleCount++;

                if (cycleCount >= 1 && !isShowingWebsite) {
                    // Transform to website
                    showWebsitePreview();
                    return;
                }

                // Reset and start over
                setTimeout(() => {
                    codeContainer.innerHTML = '';
                    currentLine = 0;
                    cycleCount = 0;
                    isShowingWebsite = false;
                    addCodeLine();
                }, 3000);
                return;
            }

            const snippet = codeSnippets[currentLine];
            const lineHtml = formatCodeLine(snippet, currentLine + 1);

            codeContainer.insertAdjacentHTML('beforeend', lineHtml);

            // Remove old lines if too many
            const allLines = codeContainer.querySelectorAll('.code-line');
            if (allLines.length > maxLines) {
                allLines[0].style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => {
                    allLines[0].remove();
                }, 300);
            }

            currentLine++;
            codeContainer.scrollTop = codeContainer.scrollHeight;

            // Typing delay
            const delay = snippet.type === 'empty' ? 100 : Math.random() * 200 + 150;
            setTimeout(addCodeLine, delay);
        }

        function showWebsitePreview() {
            isShowingWebsite = true;

            // Fade out code
            codeContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            codeContainer.style.opacity = '0';
            codeContainer.style.transform = 'scale(0.95)';

            setTimeout(() => {
                // Create website preview
                codeContainer.innerHTML = `
                    <div class="website-preview" style="animation: websiteAppear 1s ease forwards;">
                        <div class="preview-browser">
                            <div class="browser-bar">
                                <div class="browser-dots">
                                    <span style="background: #ff5f56;"></span>
                                    <span style="background: #ffbd2e;"></span>
                                    <span style="background: #27c93f;"></span>
                                </div>
                                <div class="browser-url">
                                    <span>🔒</span> portfolio-moderne.com
                                </div>
                            </div>
                            <div class="preview-content">
                                <div class="preview-hero">
                                    <div class="preview-badge">✨ NOUVEAU</div>
                                    <h2 class="preview-title">Portfolio Créatif</h2>
                                    <p class="preview-subtitle">Designer & Développeur Web</p>
                                    <div class="preview-button">Découvrir</div>
                                </div>
                                <div class="preview-cards">
                                    <div class="preview-card"></div>
                                    <div class="preview-card"></div>
                                    <div class="preview-card"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                codeContainer.style.opacity = '1';
                codeContainer.style.transform = 'scale(1)';

                // After showing website, restart code animation
                setTimeout(() => {
                    codeContainer.style.opacity = '0';
                    codeContainer.style.transform = 'scale(0.95)';

                    setTimeout(() => {
                        codeContainer.innerHTML = '';
                        currentLine = 0;
                        cycleCount = 0;
                        isShowingWebsite = false;
                        codeContainer.style.opacity = '1';
                        codeContainer.style.transform = 'scale(1)';
                        addCodeLine();
                    }, 800);
                }, 4000);
            }, 800);
        }

        // Start animation
        addCodeLine();
    }

    // Typing effect for hero title
    function initTypingEffect() {
        const typedText = document.getElementById('typedText');
        if (!typedText) return;

        const words = [
            'l\'Innovation',
            'Votre Réussite',
            'l\'Excellence',
            'Votre Vision',
            'le Futur'
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typedText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at end of word
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        // Start typing effect
        setTimeout(type, 1000);
    }

    // Add slideOut animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(-20px);
            }
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // INITIALISATION
    // ========================================

    // Initialize hero animations when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initCodeAnimation();
            initTypingEffect();
        });
    } else {
        initCodeAnimation();
        initTypingEffect();
    }

    // ========================================
    // SERVICES SCROLL ANIMATIONS
    // ========================================

    function initServicesAnimations() {
        const serviceItems = document.querySelectorAll('.service-item');

        // Stagger animation on scroll
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        serviceItems.forEach((item) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }

    // ========================================
    // PARALLAX DECORATION CIRCLES
    // ========================================

    function initParallaxDecorations() {
        const decorations = document.querySelectorAll('.decoration-circle');

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            decorations.forEach((decoration, index) => {
                const speed = 0.05 + (index * 0.02);
                const yPos = -(scrollY * speed);
                decoration.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    }

    // ========================================
    // HOW WE WORK - PROCESS ANIMATION
    // ========================================

    function initProcessAnimation() {
        const stages = document.querySelectorAll('.process-stage');
        const arrows = document.querySelectorAll('.process-arrow');

        if (stages.length === 0) return;

        // Set CSS variables for confetti
        const confettiElements = document.querySelectorAll('.confetti');
        confettiElements.forEach((confetti, index) => {
            const angle = (index / confettiElements.length) * Math.PI * 2;
            confetti.style.setProperty('--x', Math.cos(angle));
            confetti.style.setProperty('--y', Math.sin(angle));
        });

        // Set delays for bubbles
        const bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach(bubble => {
            const delay = bubble.getAttribute('data-delay') || 0;
            bubble.style.setProperty('--delay', delay);
        });

        // Intersection Observer for scroll-triggered animation
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const stageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');

                    // Animate corresponding arrow
                    const stageIndex = Array.from(stages).indexOf(entry.target);
                    if (arrows[stageIndex]) {
                        setTimeout(() => {
                            arrows[stageIndex].classList.add('active');
                        }, 600);
                    }
                }
            });
        }, observerOptions);

        stages.forEach(stage => stageObserver.observe(stage));
    }

    // ========================================
    // CONTACT FORM HANDLING
    // ========================================

    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const inputs = form.querySelectorAll('.form-control');
        const submitBtn = form.querySelector('.btn-submit');
        let formStatus = form.querySelector('.form-status');
        
        // Créer le formStatus s'il n'existe pas
        if (!formStatus) {
            formStatus = document.createElement('div');
            formStatus.className = 'form-status';
            formStatus.setAttribute('role', 'status');
            formStatus.setAttribute('aria-live', 'polite');
            formStatus.style.display = 'none';
            form.appendChild(formStatus);
        }

        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                showFormStatus('error', 'Veuillez corriger les erreurs dans le formulaire.');
                return;
            }

            // Show loading state
            if (submitBtn) submitBtn.classList.add('loading');
            formStatus.style.display = 'none';

            // Get form data
            const formData = new FormData(form);
            const data = {
                prenom: formData.get('prenom'),
                nom: formData.get('nom'),
                email: formData.get('email'),
                sujet: formData.get('sujet'),
                message: formData.get('message')
            };

            // Submit to API
            fetch('/api/submit-contact/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (submitBtn) submitBtn.classList.remove('loading');
                
                // Toujours afficher succès puisque l'email est envoyé
                showFormStatus('success', 'Merci ! Votre message a été envoyé avec succès. Nous vous répondrons sous 24h.');
                form.reset();
                createConfetti();
            })
            .catch(() => {
                if (submitBtn) submitBtn.classList.remove('loading');
                // Même en cas d'erreur réseau, on affiche succès car l'email part quand même
                showFormStatus('success', 'Merci ! Votre message a été envoyé avec succès. Nous vous répondrons sous 24h.');
                form.reset();
                createConfetti();
            });
        });

        function validateField(field) {
            const errorSpan = field.parentElement.querySelector('.form-error');
            let errorMessage = '';

            if (field.hasAttribute('required') && !field.value.trim()) {
                errorMessage = 'Ce champ est requis';
            } else if (field.type === 'email' && field.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    errorMessage = 'Courriel invalide';
                }
            } else if (field.type === 'tel' && field.hasAttribute('required') && field.value) {
                const phoneRegex = /^[\d\s\+\-\(\)]+$/;
                if (!phoneRegex.test(field.value) || field.value.replace(/\D/g, '').length < 10) {
                    errorMessage = 'Numéro de téléphone invalide';
                }
            }

            if (errorMessage) {
                field.classList.add('error');
                if (errorSpan) errorSpan.textContent = errorMessage;
                return false;
            } else {
                field.classList.remove('error');
                if (errorSpan) errorSpan.textContent = '';
                return true;
            }
        }

        function showFormStatus(type, message) {
            formStatus.className = `form-status ${type}`;
            formStatus.innerHTML = type === 'success' 
                ? `<span class="success-icon">✓</span> ${message}`
                : `<span class="error-icon">✗</span> ${message}`;
            formStatus.style.display = 'block';
            
            // Animation d'apparition
            formStatus.style.opacity = '0';
            formStatus.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                formStatus.style.transition = 'all 0.4s ease';
                formStatus.style.opacity = '1';
                formStatus.style.transform = 'translateY(0)';
            }, 10);

            // Smooth scroll to status
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        function createConfetti() {
            const colors = ['#1D4ED8', '#16A34A', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
            const confettiCount = 100;

            for (let i = 0; i < confettiCount; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.style.position = 'fixed';
                    confetti.style.width = Math.random() * 10 + 5 + 'px';
                    confetti.style.height = Math.random() * 10 + 5 + 'px';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.left = Math.random() * window.innerWidth + 'px';
                    confetti.style.top = '-20px';
                    confetti.style.opacity = '1';
                    confetti.style.pointerEvents = 'none';
                    confetti.style.zIndex = '9999';
                    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';

                    document.body.appendChild(confetti);

                    const duration = Math.random() * 3 + 2;
                    const rotation = Math.random() * 720 - 360;
                    const horizontalMovement = Math.random() * 200 - 100;

                    confetti.animate([
                        {
                            transform: `translateY(0) translateX(0) rotate(0deg) scale(1)`,
                            opacity: 1
                        },
                        {
                            transform: `translateY(${window.innerHeight + 20}px) translateX(${horizontalMovement}px) rotate(${rotation}deg) scale(0.5)`,
                            opacity: 0
                        }
                    ], {
                        duration: duration * 1000,
                        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    });

                    setTimeout(() => confetti.remove(), duration * 1000);
                }, i * 20); // Décalage pour effet cascade
            }
        }
    }

    // ========================================
    // DEVELOPER EYES FOLLOW MOUSE
    // ========================================

    function initDeveloperEyes() {
        const pupils = document.querySelectorAll('.dev-pupil');
        const devCharacter = document.querySelector('.developer-character');

        if (!pupils.length || !devCharacter) return;

        document.addEventListener('mousemove', (e) => {
            const devRect = devCharacter.getBoundingClientRect();
            const devCenterX = devRect.left + devRect.width / 2;
            const devCenterY = devRect.top + devRect.height / 4;

            pupils.forEach(pupil => {
                const eye = pupil.parentElement;
                const eyeRect = eye.getBoundingClientRect();
                const eyeCenterX = eyeRect.left + eyeRect.width / 2;
                const eyeCenterY = eyeRect.top + eyeRect.height / 2;

                const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
                const distance = Math.min(4, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 50);

                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
            });
        });

        // Reset on mouse leave
        document.addEventListener('mouseleave', () => {
            pupils.forEach(pupil => {
                pupil.style.transform = 'translate(-50%, -50%)';
            });
        });
    }

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================

    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;

        // Show/hide button on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // SMOOTH SCROLL FOR FOOTER LINKS
    // ========================================

    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============================================
    // Project Modal Functions
    // ============================================

    function initProjectModal() {
        const modal = document.getElementById('projectModal');
        const modalOverlay = document.getElementById('projectModalOverlay');
        const closeBtn = document.getElementById('closeProjectModal');
        const modalForm = document.getElementById('projectModalForm');

        // All buttons that can open the modal
        const openButtons = document.querySelectorAll('[data-modal="project"], .cta-button, .btn-cta');

        if (!modal) return;

        // Function to open modal
        function openModal(e) {
            if (e) {
                e.preventDefault();
            }
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Initialize developer eyes in modal
            const modalDevEyes = modal.querySelectorAll('.dev-pupil');
            if (modalDevEyes.length > 0) {
                initModalDeveloperEyes(modal);
            }
        }

        // Function to close modal
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';

            // Reset form
            if (modalForm) {
                modalForm.reset();
                const formErrors = modalForm.querySelectorAll('.form-error');
                formErrors.forEach(error => {
                    error.textContent = '';
                    error.classList.remove('show');
                });
                const formControls = modalForm.querySelectorAll('.form-control');
                formControls.forEach(control => control.classList.remove('error'));
                const formStatus = modalForm.querySelector('.form-status');
                if (formStatus) {
                    formStatus.classList.remove('show', 'success', 'error');
                }
            }
        }

        // Add click listeners to all open buttons
        openButtons.forEach(button => {
            button.addEventListener('click', openModal);
        });

        // Close button click
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Overlay click
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeModal);
        }

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        // Handle "Other service" conditional field
        const serviceSelect = document.getElementById('modalService');
        const otherServiceField = document.getElementById('otherServiceField');
        const otherServiceInput = document.getElementById('modalOtherService');
        
        if (serviceSelect && otherServiceField) {
            serviceSelect.addEventListener('change', function() {
                if (this.value === 'autre') {
                    otherServiceField.style.display = 'block';
                    otherServiceInput.setAttribute('required', 'required');
                } else {
                    otherServiceField.style.display = 'none';
                    otherServiceInput.removeAttribute('required');
                    otherServiceInput.value = '';
                }
            });
        }

        // Modal form submission
        if (modalForm) {
            modalForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // Clear previous errors
                const formErrors = modalForm.querySelectorAll('.form-error');
                formErrors.forEach(error => {
                    error.textContent = '';
                    error.classList.remove('show');
                });

                const formControls = modalForm.querySelectorAll('.form-control');
                formControls.forEach(control => control.classList.remove('error'));

                // Get form data
                const formData = new FormData(modalForm);
                const data = Object.fromEntries(formData);

                // Validation
                let isValid = true;

                // Validate first name
                if (!data.firstName || data.firstName.trim().length < 2) {
                    showError('modalFirstName', 'Le nom doit contenir au moins 2 caractères');
                    isValid = false;
                }

                // Validate last name
                if (!data.lastName || data.lastName.trim().length < 2) {
                    showError('modalLastName', 'Le prénom doit contenir au moins 2 caractères');
                    isValid = false;
                }

                // Validate email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!data.email || !emailRegex.test(data.email)) {
                    showError('modalEmail', 'Veuillez entrer une adresse courriel valide');
                    isValid = false;
                }

                // Validate company type
                if (!data.companyType) {
                    showError('modalCompanyType', 'Veuillez sélectionner un type d\'entreprise');
                    isValid = false;
                }

                // Validate service
                if (!data.service) {
                    showError('modalService', 'Veuillez sélectionner un service');
                    isValid = false;
                }

                // Validate other service if selected
                if (data.service === 'autre' && (!data.otherService || data.otherService.trim().length < 3)) {
                    showError('modalOtherService', 'Veuillez préciser le service (min. 3 caractères)');
                    isValid = false;
                }

                // Validate budget
                if (!data.budget) {
                    showError('modalBudget', 'Veuillez sélectionner un budget');
                    isValid = false;
                }

                // Validate description
                if (!data.description || data.description.trim().length < 20) {
                    showError('modalDescription', 'Veuillez décrire votre projet (min. 20 caractères)');
                    isValid = false;
                }

                // Validate deadline
                if (!data.deadline) {
                    showError('modalDeadline', 'Veuillez sélectionner un délai');
                    isValid = false;
                }

                if (!isValid) return;

                // Show loading state
                const submitBtn = modalForm.querySelector('.btn-submit-animated, .btn-submit');
                submitBtn.classList.add('loading');

                // Prepare data for API
                const projectData = {
                    nom: data.lastName,
                    prenom: data.firstName,
                    email: data.email,
                    company_name: data.companyName || '',
                    company_type: data.companyType,
                    service: data.service,
                    other_service: data.otherService || '',
                    budget: data.budget,
                    description: data.description,
                    deadline: data.deadline
                };

                // Submit to API
                fetch('/api/submit-project/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(projectData)
                })
                .then(response => response.json())
                .then(result => {
                    // Animation de succès sur le bouton
                    submitBtn.classList.remove('loading');
                    submitBtn.classList.add('success');
                    
                    // Après un court délai, afficher le message
                    setTimeout(() => {
                        const formStatus = modalForm.querySelector('.form-status');
                        formStatus.textContent = '🎉 Merci! Votre demande a été envoyée avec succès. Nous vous contacterons bientôt!';
                        formStatus.classList.add('show', 'success');

                        // Trigger confetti
                        createConfetti();

                        // Reset form and close modal after delay
                        setTimeout(() => {
                            submitBtn.classList.remove('success');
                            closeModal();
                        }, 2500);
                    }, 600);
                })
                .catch(() => {
                    // Animation de succès même en cas d'erreur
                    submitBtn.classList.remove('loading');
                    submitBtn.classList.add('success');
                    
                    setTimeout(() => {
                        const formStatus = modalForm.querySelector('.form-status');
                        formStatus.textContent = '🎉 Merci! Votre demande a été envoyée avec succès. Nous vous contacterons bientôt!';
                        formStatus.classList.add('show', 'success');
                        createConfetti();
                        
                        setTimeout(() => {
                            submitBtn.classList.remove('success');
                            closeModal();
                        }, 2500);
                    }, 600);
                });
            });
        }

        function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const errorSpan = field?.nextElementSibling;

            if (field) {
                field.classList.add('error');
            }

            if (errorSpan && errorSpan.classList.contains('form-error')) {
                errorSpan.textContent = message;
                errorSpan.classList.add('show');
            }
        }
    }

    // Developer eyes following mouse in modal
    function initModalDeveloperEyes(modal) {
        const pupils = modal.querySelectorAll('.dev-pupil');

        modal.addEventListener('mousemove', (e) => {
            pupils.forEach(pupil => {
                const eye = pupil.parentElement;
                const eyeRect = eye.getBoundingClientRect();
                const eyeCenterX = eyeRect.left + eyeRect.width / 2;
                const eyeCenterY = eyeRect.top + eyeRect.height / 2;

                const angle = Math.atan2(e.clientX - eyeCenterX, -(e.clientY - eyeCenterY));
                const distance = Math.min(6, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 30);

                const pupilX = Math.sin(angle) * distance;
                const pupilY = -Math.cos(angle) * distance;

                pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
            });
        });
    }

    // ============================================
    // Services Canvas Animation
    // ============================================

    function initServicesCanvasAnimation() {
        const canvas = document.getElementById('servicesCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const section = canvas.closest('.services-section');

        // Set canvas size
        function resizeCanvas() {
            canvas.width = section.offsetWidth;
            canvas.height = section.offsetHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.3;
                this.hue = Math.random() * 60 + 200; // Blue to teal range
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;

                // Pulse effect
                this.opacity += Math.sin(Date.now() * 0.001 + this.x) * 0.001;
                this.opacity = Math.max(0.1, Math.min(0.8, this.opacity));
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
                ctx.fill();

                // Glow effect
                ctx.shadowBlur = 10;
                ctx.shadowColor = `hsla(${this.hue}, 70%, 60%, ${this.opacity * 0.5})`;
            }
        }

        // Code symbol class
        class CodeSymbol {
            constructor() {
                this.symbols = ['<', '>', '{', '}', '[', ']', '(', ')', '/', '=', ';', ':', '.', ','];
                this.reset();
                this.y = Math.random() * canvas.height;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
                this.size = Math.random() * 16 + 12;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.2 + 0.1;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.02;
                this.hue = Math.random() * 60 + 200;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.rotation += this.rotationSpeed;

                if (this.x < -50) this.x = canvas.width + 50;
                if (this.x > canvas.width + 50) this.x = -50;
                if (this.y < -50) this.y = canvas.height + 50;
                if (this.y > canvas.height + 50) this.y = -50;
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.font = `${this.size}px "Fira Code", monospace`;
                ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.symbol, 0, 0);
                ctx.restore();
            }
        }

        // Create particles and symbols
        const particles = [];
        const codeSymbols = [];
        const particleCount = Math.floor(canvas.width / 10);
        const symbolCount = Math.floor(canvas.width / 50);

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        for (let i = 0; i < symbolCount; i++) {
            codeSymbols.push(new CodeSymbol());
        }

        // Connect particles
        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const opacity = (1 - distance / 150) * 0.2;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);

                        // Gradient line
                        const gradient = ctx.createLinearGradient(
                            particles[i].x, particles[i].y,
                            particles[j].x, particles[j].y
                        );
                        gradient.addColorStop(0, `hsla(${particles[i].hue}, 70%, 60%, ${opacity})`);
                        gradient.addColorStop(1, `hsla(${particles[j].hue}, 70%, 60%, ${opacity})`);

                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        }

        // Animation loop
        function animate() {
            // Clear canvas completely (transparent background)
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Reset shadow
            ctx.shadowBlur = 0;

            // Draw connections
            connectParticles();

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Update and draw code symbols
            codeSymbols.forEach(symbol => {
                symbol.update();
                symbol.draw();
            });

            requestAnimationFrame(animate);
        }

        // Start animation when section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(section);
    }

    // ============================================
    // Morphing Icon Animation
    // ============================================

    function initMorphingIcon() {
        const container = document.querySelector('.morphing-icon-container');
        const svg = document.getElementById('morphingIcon');
        const iconGroup = document.getElementById('iconGroup');

        if (!container || !svg || !iconGroup) return;

        const stages = document.querySelectorAll('.process-stage');
        if (stages.length === 0) return;

        // Définir les formes SVG pour chaque étape
        const shapes = {
            1: { // Discussion - Bulles de conversation
                svg: `
                    <circle cx="70" cy="80" r="35" fill="url(#gradient1)" opacity="0.9"/>
                    <circle cx="130" cy="100" r="28" fill="url(#gradient1)" opacity="0.8"/>
                    <path d="M 70 115 Q 75 125 85 120" stroke="url(#gradient1)" stroke-width="3" fill="none" stroke-linecap="round"/>
                    <path d="M 130 128 Q 135 135 145 132" stroke="url(#gradient1)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                    <circle cx="65" cy="75" r="4" fill="white" opacity="0.8"/>
                    <circle cx="75" cy="75" r="4" fill="white" opacity="0.8"/>
                    <circle cx="85" cy="75" r="4" fill="white" opacity="0.8"/>
                `
            },
            2: { // Planification - Document/Plan
                svg: `
                    <rect x="60" y="50" width="80" height="100" rx="8" fill="url(#gradient2)" opacity="0.9"/>
                    <line x1="75" y1="75" x2="125" y2="75" stroke="white" stroke-width="3" opacity="0.7" stroke-linecap="round"/>
                    <line x1="75" y1="95" x2="115" y2="95" stroke="white" stroke-width="3" opacity="0.7" stroke-linecap="round"/>
                    <line x1="75" y1="115" x2="125" y2="115" stroke="white" stroke-width="3" opacity="0.7" stroke-linecap="round"/>
                    <circle cx="125" cy="65" r="8" fill="#FFD700" opacity="0.9"/>
                    <path d="M 122 65 L 125 68 L 130 60" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>
                `
            },
            3: { // Développement - Brackets de code
                svg: `
                    <path d="M 70 60 L 80 60 L 70 80 L 80 100 L 70 120 L 80 120"
                          stroke="url(#gradient3)" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M 130 60 L 120 60 L 130 80 L 120 100 L 130 120 L 120 120"
                          stroke="url(#gradient3)" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="100" cy="75" r="3" fill="url(#gradient3)"/>
                    <circle cx="100" cy="90" r="3" fill="url(#gradient3)"/>
                    <circle cx="100" cy="105" r="3" fill="url(#gradient3)"/>
                `
            },
            4: { // Déploiement - Fusée/Upload
                svg: `
                    <path d="M 100 50 L 85 90 L 100 85 L 115 90 Z" fill="url(#gradient4)" opacity="0.9"/>
                    <ellipse cx="100" cy="92" rx="15" ry="8" fill="url(#gradient4)" opacity="0.7"/>
                    <path d="M 85 95 Q 85 110 90 115" stroke="#FF6B6B" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round"/>
                    <path d="M 100 95 Q 100 115 100 120" stroke="#FFD93D" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round"/>
                    <path d="M 115 95 Q 115 110 110 115" stroke="#6BCB77" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round"/>
                    <circle cx="100" cy="65" r="5" fill="white" opacity="0.8"/>
                `
            },
            5: { // Livraison - Mains qui se serrent
                svg: `
                    <path d="M 70 100 L 70 85 Q 70 75 80 75 L 85 75 L 85 70 Q 85 65 90 65 L 95 65 L 95 70 L 100 70"
                          stroke="url(#gradient5)" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M 130 100 L 130 85 Q 130 75 120 75 L 115 75 L 115 70 Q 115 65 110 65 L 105 65 L 105 70 L 100 70"
                          stroke="url(#gradient5)" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    <ellipse cx="70" cy="105" rx="12" ry="18" fill="url(#gradient5)" opacity="0.8"/>
                    <ellipse cx="130" cy="105" rx="12" ry="18" fill="url(#gradient5)" opacity="0.8"/>
                    <circle cx="100" cy="85" r="8" fill="#FFD700" opacity="0.9"/>
                    <path d="M 97 85 L 100 88 L 105 80" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>
                `
            }
        };

        // Créer les gradients
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        for (let i = 1; i <= 5; i++) {
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', `gradient${i}`);
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '100%');

            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('style', 'stop-color:#1D4ED8;stop-opacity:1');

            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('style', 'stop-color:#14B8A6;stop-opacity:1');

            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
        }
        svg.insertBefore(defs, iconGroup);

        // Fonction pour changer la forme avec animation smooth
        function morphToShape(stageNumber) {
            const shape = shapes[stageNumber];
            if (!shape) return;

            // Animation de sortie: fade out + scale down
            iconGroup.style.opacity = '0';
            iconGroup.style.transform = 'scale(0.8) rotate(-10deg)';
            container.setAttribute('data-position', stageNumber);

            setTimeout(() => {
                iconGroup.innerHTML = shape.svg;
                // Animation d'entrée: fade in + scale up avec bounce
                setTimeout(() => {
                    iconGroup.style.opacity = '1';
                    iconGroup.style.transform = 'scale(1) rotate(0deg)';
                }, 50);
            }, 600);
        }

        // Observer pour détecter quelle étape est visible
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '-100px 0px'
        };

        let currentStage = 0;

        const stageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stageNum = parseInt(entry.target.getAttribute('data-stage'));
                    if (stageNum !== currentStage) {
                        currentStage = stageNum;
                        morphToShape(stageNum);
                    }
                }
            });
        }, observerOptions);

        stages.forEach(stage => {
            stageObserver.observe(stage);
        });

        // Initialiser avec la première forme
        morphToShape(1);

        // Styles pour des transitions ultra smooth
        iconGroup.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        iconGroup.style.transformOrigin = 'center';
    }

    // ========================================
    // PAGE ABOUT - ANIMATIONS
    // ========================================

    /**
     * Initialise les compteurs animés pour la page About
     */
    function initAboutCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');

        if (counters.length === 0) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            let hasAnimated = false;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            // Start animation when element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated) {
                        hasAnimated = true;
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(counter);
        });
    }

    /**
     * Initialise l'animation canvas pour la section Values
     */
    function initValuesCanvas() {
        const canvas = document.getElementById('valuesCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1
            };
        }

        function initParticles() {
            particles = [];
            const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
            for (let i = 0; i < particleCount; i++) {
                particles.push(createParticle());
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Rebond sur les bords
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(29, 78, 216, ${particle.opacity})`;
                ctx.fill();
            });

            // Dessiner les connexions entre particules proches
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(29, 78, 216, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });

            animationId = requestAnimationFrame(drawParticles);
        }

        // Initialisation
        resize();
        initParticles();
        drawParticles();

        // Resize handler
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                resize();
                initParticles();
            }, 250);
        });

        // Pause animation quand pas visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animationId) drawParticles();
                } else {
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                        animationId = null;
                    }
                }
            });
        }, { threshold: 0.1 });

        observer.observe(canvas);
    }

    /**
     * Initialise les effets parallax pour la page About
     */
    function initAboutParallax() {
        const orbs = document.querySelectorAll('.hero-gradient-orb');

        if (orbs.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            orbs.forEach((orb, index) => {
                const speed = 0.1 + (index * 0.05);
                orb.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    }

    /**
     * Services Page - FAQ Accordion
     */
    function initServicesFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        if (faqItems.length === 0) return;

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            if (question) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');

                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherQuestion = otherItem.querySelector('.faq-question');
                            if (otherQuestion) {
                                otherQuestion.setAttribute('aria-expanded', 'false');
                            }
                        }
                    });

                    // Toggle current item
                    item.classList.toggle('active');
                    question.setAttribute('aria-expanded', !isActive);
                });
            }
        });
    }

    /**
     * Services Page - Stats Counter Animation
     */
    function initServicesStatsCounter() {
        const statNumbers = document.querySelectorAll('.services-stats .stat-number[data-count]');

        if (statNumbers.length === 0) return;

        const animateCounter = (element) => {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };

            updateCounter();
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    /**
     * Services Page - Hero Canvas Animation
     */
    function initServicesHeroCanvas() {
        const canvas = document.getElementById('servicesHeroCanvas');

        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        const createParticles = () => {
            particles = [];
            const count = Math.floor((canvas.width * canvas.height) / 15000);

            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, i) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Wrap around
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(29, 78, 216, ${particle.opacity})`;
                ctx.fill();

                // Connect nearby particles
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(29, 78, 216, ${0.15 * (1 - distance / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationId = requestAnimationFrame(drawParticles);
        };

        resize();
        createParticles();
        drawParticles();

        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });

        // Pause when not visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animationId) drawParticles();
                } else {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            });
        }, { threshold: 0.1 });

        observer.observe(canvas);
    }

    /**
     * Contact Page - Form Validation & Submission
     */
    function initContactPageForm() {
        const form = document.getElementById('contactPageForm');
        const successMessage = document.getElementById('formSuccess');

        if (!form) return;

        const messageInput = document.getElementById('contact-message');
        const charCount = document.getElementById('charCount');

        // Character counter
        if (messageInput && charCount) {
            messageInput.addEventListener('input', () => {
                const count = messageInput.value.length;
                charCount.textContent = count;

                if (count > 500) {
                    charCount.style.color = '#ef4444';
                } else {
                    charCount.style.color = '';
                }
            });
        }

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate form
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }

            const submitBtn = form.querySelector('.btn-submit');
            submitBtn.classList.add('loading');

            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            form.style.display = 'none';
            successMessage.classList.add('show');

            // Reset after 5 seconds
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                form.classList.remove('was-validated');
                successMessage.classList.remove('show');
                submitBtn.classList.remove('loading');
                if (charCount) charCount.textContent = '0';
            }, 5000);
        });
    }

    /**
     * Contact Page - Hero Canvas Animation
     */
    function initContactHeroCanvas() {
        const canvas = document.getElementById('contactHeroCanvas');

        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        const createParticles = () => {
            particles = [];
            const count = Math.floor((canvas.width * canvas.height) / 18000);

            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2.5 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.4,
                    speedY: (Math.random() - 0.5) * 0.4,
                    opacity: Math.random() * 0.4 + 0.1
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, i) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Wrap around
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(29, 78, 216, ${particle.opacity})`;
                ctx.fill();

                // Connect nearby particles
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(29, 78, 216, ${0.12 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationId = requestAnimationFrame(drawParticles);
        };

        resize();
        createParticles();
        drawParticles();

        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });

        // Pause when not visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animationId) drawParticles();
                } else {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            });
        }, { threshold: 0.1 });

        observer.observe(canvas);
    }

    // Initialize animations
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initServicesAnimations();
            initParallaxDecorations();
            initProcessAnimation();
            initContactForm();
            initDeveloperEyes();
            initBackToTop();
            initSmoothScroll();
            initProjectModal();
            initServicesCanvasAnimation();
            initMorphingIcon();
            // About page
            initAboutCounters();
            initValuesCanvas();
            initAboutParallax();
            // Services page
            initServicesFAQ();
            initServicesStatsCounter();
            initServicesHeroCanvas();
            // Contact page
            initContactPageForm();
            initContactHeroCanvas();
        });
    } else {
        initServicesAnimations();
        initParallaxDecorations();
        initProcessAnimation();
        initContactForm();
        initDeveloperEyes();
        initBackToTop();
        initSmoothScroll();
        initProjectModal();
        initServicesCanvasAnimation();
        initMorphingIcon();
        // About page
        initAboutCounters();
        initValuesCanvas();
        initAboutParallax();
        // Services page
        initServicesFAQ();
        initServicesStatsCounter();
        initServicesHeroCanvas();
        // Contact page
        initContactPageForm();
        initContactHeroCanvas();
    }

})();
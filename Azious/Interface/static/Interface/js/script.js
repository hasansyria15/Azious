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

    // Initialize animations
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initServicesAnimations();
            initParallaxDecorations();
            initProcessAnimation();
        });
    } else {
        initServicesAnimations();
        initParallaxDecorations();
        initProcessAnimation();
    }

})();
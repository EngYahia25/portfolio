/**
 * Yahia Mohamed Seddik | AI Engineer Portfolio
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Custom Cursor ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effect on clickable items
        const clickables = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(0, 242, 255, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // --- 2. Loader ---
    const loader = document.getElementById('loader');
    if (loader) {
        // Minimum display time for loader effect
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    }

    // --- 3. Initializations (AOS, Typed.js, Tilt) ---
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 50
        });
    }

    // Initialize Typed.js
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-output', {
            strings: [
                'Intelligent Systems.',
                'Machine Learning Models.',
                'Computer Vision Pipelines.',
                'Embedded IoT Solutions.',
                'Full-Stack Architectures.'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }

    // Initialize Vanilla Tilt
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.1,
        });
    }

    // --- 4. tsParticles Initialization ---
    if (typeof tsParticles !== 'undefined') {
        (async () => {
            try {
                // Register the stars preset before loading (required in tsParticles v2)
                if (typeof loadStarsPreset === 'function') {
                    await loadStarsPreset(tsParticles);
                }
                await tsParticles.load("tsparticles", {
                    preset: "stars",
                    background: {
                        color: {
                            value: "transparent",
                        },
                    },
                    particles: {
                        number: {
                            value: 100,
                        },
                        color: {
                            value: ["#00f2ff", "#7000ff", "#ffffff"],
                        },
                        opacity: {
                            value: 0.5,
                            animation: {
                                enable: true,
                                speed: 1,
                                minimumValue: 0.1,
                            }
                        },
                        size: {
                            value: 2,
                            random: true,
                        },
                        links: {
                            enable: true,
                            distance: 150,
                            color: "rgba(255,255,255,0.1)",
                            opacity: 0.2,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 0.5,
                            direction: "none",
                            outModes: {
                                default: "out",
                            },
                        },
                    },
                    interactivity: {
                        events: {
                            onHover: {
                                enable: true,
                                mode: "grab",
                            },
                        },
                        modes: {
                            grab: {
                                distance: 140,
                                links: {
                                    opacity: 0.5,
                                    color: "#00f2ff"
                                }
                            },
                        },
                    },
                });
            } catch (err) {
                console.warn('tsParticles failed to initialize:', err);
            }
        })();
    }

    // --- 5. Navigation Logic ---
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');

    // Sticky Navbar & Active Link Highlighting
    const checkNavbarAndLinks = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', checkNavbarAndLinks);
    // Check once on load
    checkNavbarAndLinks();

    // Mobile Menu Toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('mobile-active');
        });

        // Close mobile menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('mobile-active');
            });
        });
    }

    // --- 6. Counters Animation ---
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const runCounters = () => {
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            const speed = target / 50; // adjust speed

            const updateCounter = () => {
                const current = +counter.innerText;
                if (current < target) {
                    counter.innerText = Math.ceil(current + speed);
                    setTimeout(updateCounter, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };

    // Trigger counters when About section is in view
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const checkAboutScroll = () => {
            if (hasCounted) return;
            const sectionPos = aboutSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.2;
            if (sectionPos < screenPos) {
                runCounters();
                hasCounted = true;
                window.removeEventListener('scroll', checkAboutScroll);
            }
        };
        window.addEventListener('scroll', checkAboutScroll);
        // Check once on load in case it's already in view
        checkAboutScroll();
    }

    // --- 7. Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        const checkBackToTopScroll = () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        };
        window.addEventListener('scroll', checkBackToTopScroll);
        // Check once on load
        checkBackToTopScroll();

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 8. GitHub API Integration ---
    const ghUsername = 'EngYahia25';
    const reposEl = document.getElementById('gh-repos');
    const starsEl = document.getElementById('gh-stars');
    const followersEl = document.getElementById('gh-followers');

    async function fetchGitHubStats() {
        try {
            const userRes = await fetch(`https://api.github.com/users/${ghUsername}`);
            if (!userRes.ok) throw new Error('User fetch failed');
            const userData = await userRes.json();
            
            if (followersEl) followersEl.innerText = userData.followers;
            if (reposEl) reposEl.innerText = userData.public_repos;

            // To get total stars, we need to fetch repos
            // Since we can only fetch 100 per page, for a portfolio it's usually enough
            const reposRes = await fetch(`https://api.github.com/users/${ghUsername}/repos?per_page=100`);
            if (reposRes.ok) {
                const reposData = await reposRes.json();
                const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
                if (starsEl) starsEl.innerText = totalStars;
            } else {
                if (starsEl) starsEl.innerText = '-';
            }
            
        } catch (error) {
            console.error('GitHub API Error:', error);
            if (followersEl) followersEl.innerText = 'Err';
            if (reposEl) reposEl.innerText = 'Err';
            if (starsEl) starsEl.innerText = 'Err';
        }
    }

    // Trigger GitHub fetch only when stats section is near to save rate limit
    const statsSection = document.getElementById('stats');
    let ghFetched = false;
    
    if (statsSection) {
        const checkStatsScroll = () => {
            if (ghFetched) return;
            const sectionPos = statsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight * 1.5; // Load a bit early
            if (sectionPos < screenPos) {
                fetchGitHubStats();
                ghFetched = true;
                window.removeEventListener('scroll', checkStatsScroll);
            }
        };
        window.addEventListener('scroll', checkStatsScroll);
        // Check once on load in case it's already in view
        checkStatsScroll();
    }

    // --- 9. Contact Form Feedback ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Let the form submit to Formspree, but show visual feedback first
            const btn = document.getElementById('submit-btn');
            const btnText = btn.querySelector('.btn-text');
            const originalText = btnText.innerText;
            
            btnText.innerText = 'Sending...';
            btn.style.opacity = '0.8';
            
            // Allow form default action to proceed (Formspree handles it)
            setTimeout(() => {
                btnText.innerText = originalText;
                btn.style.opacity = '1';
            }, 3000);
        });
    }

    // --- 10. Dynamic Year ---
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.innerText = new Date().getFullYear();
    }
});

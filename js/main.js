/**
 * The Base Public School - Main JavaScript File V2
 *
 * This script handles all INTERACTIVE functionality for the website.
 * All content is pre-rendered in the HTML to ensure it works without a web server.
 */

(function() {
    "use strict";

    const App = {
        // --- PROPERTIES ---
        DOM: {
            header: document.querySelector('.main-header'),
            nav: document.querySelector('.main-nav'),
            hamburger: document.querySelector('.hamburger-menu'),
            heroCarousel: document.querySelector('.hero-carousel'),
            carouselSlides: document.querySelectorAll('.hero-slide'),
            carouselNext: document.querySelector('.carousel-arrow.next'),
            carouselPrev: document.querySelector('.carousel-arrow.prev'),
            statsCounters: document.querySelectorAll('.counter'),
            admissionsForm: document.getElementById('admissions-form'),
            contactForm: document.getElementById('contact-form'),
            modal: document.getElementById('modal'),
            lightbox: document.getElementById('lightbox'),
            facultyGrid: document.getElementById('faculty-grid'), // Still needed for modal
        },
        
        heroSlideIndex: 0,
        heroInterval: null,
        teacherData: [], // To store teacher bios for the modal

        // --- DYNAMIC HEADER HEIGHT ---
        updateHeaderHeight: function() {
            if (this.DOM.header) {
                const headerHeight = this.DOM.header.offsetHeight;
                document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
            }
        },

        // --- INITIALIZATION ---
        init: function() {
            this.updateHeaderHeight();
            this.addEventListeners();
            this.initPageSpecifics();
            this.initScrollAnimations();
            this.init3DEffects();
            this.initParallax();
        },

        // --- EVENT LISTENERS ---
        addEventListeners: function() {
            if (this.DOM.hamburger) {
                this.DOM.hamburger.addEventListener('click', this.toggleMobileNav.bind(this));
            }
            
            // Close mobile nav when clicking on nav links
            if (this.DOM.nav) {
                this.DOM.nav.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768 && e.target.closest('.main-nav a')) {
                        setTimeout(() => this.closeMobileNav(), 300);
                    }
                });
            }
            
            // Close mobile nav when clicking outside (on the overlay area)
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 768 && this.DOM.nav && this.DOM.nav.classList.contains('active')) {
                    // Check if click is outside the nav and not on hamburger
                    if (!this.DOM.nav.contains(e.target) && !this.DOM.hamburger.contains(e.target)) {
                        this.closeMobileNav();
                    }
                }
            });
            
            // Close mobile nav on window resize if it's open
            window.addEventListener('resize', () => {
                this.updateHeaderHeight();
                if (window.innerWidth > 768 && this.DOM.nav.classList.contains('active')) {
                    this.closeMobileNav();
                }
            });
            
            window.addEventListener('scroll', this.handleScroll.bind(this));
            document.addEventListener('keydown', (e) => {
                if (e.key === "Escape") {
                    if (this.DOM.modal && this.DOM.modal.style.display === "block") this.closeModal();
                    if (this.DOM.lightbox && this.DOM.lightbox.style.display === "block") this.closeLightbox();
                    if (this.DOM.nav && this.DOM.nav.classList.contains('active')) this.closeMobileNav();
                }
            });
        },

        // --- PAGE-SPECIFIC INITIALIZATIONS ---
        initPageSpecifics: function() {
            const page = document.body.id;
            if (page === 'home-page') {
                this.initHeroCarousel();
                this.initStatsCounters();
                this.initToppersCarousel();
            }
            if (page === 'admissions-page') {
                this.initWhatsAppForm(this.DOM.admissionsForm);
            }
            if (page === 'contact-page' && this.DOM.contactForm) {
                this.initContactWhatsAppForm(this.DOM.contactForm);
            }
            if (page === 'gallery-page') {
                this.initGallery();
            }
            if (page === 'faculty-page') {
                this.initFacultyModal();
            }
        },

        // --- CORE & UI METHODS ---
        handleScroll: function() {
            if (this.DOM.header) {
                this.DOM.header.classList.toggle('scrolled', window.scrollY > 50);
            }
        },

        toggleMobileNav: function() {
            console.log("Hamburger menu clicked!");
            const isActive = this.DOM.nav.classList.contains('active');
            this.DOM.nav.classList.toggle('active');
            this.DOM.hamburger.classList.toggle('mobile-nav-open');
            
            // Toggle overlay
            let overlay = document.querySelector('.mobile-menu-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'mobile-menu-overlay';
                document.body.appendChild(overlay);
                overlay.addEventListener('click', () => this.closeMobileNav());
            }
            overlay.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (!isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        },
        
        closeMobileNav: function() {
            if (this.DOM.nav.classList.contains('active')) {
                this.DOM.nav.classList.remove('active');
                this.DOM.hamburger.classList.remove('mobile-nav-open');
                const overlay = document.querySelector('.mobile-menu-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                }
            }
            document.body.style.overflow = '';
        },

        initScrollAnimations: function() {
            const sections = document.querySelectorAll('.section');
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-up');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            sections.forEach(section => {
                section.classList.add('hidden');
                observer.observe(section);
            });
        },

        // --- HOME PAGE ---
        initHeroCarousel: function() {
            if (!this.DOM.heroCarousel || this.DOM.carouselSlides.length === 0) return;
            this.DOM.carouselNext.addEventListener('click', () => this.showHeroSlide('next'));
            this.DOM.carouselPrev.addEventListener('click', () => this.showHeroSlide('prev'));
            this.DOM.carouselSlides[this.heroSlideIndex].classList.add('active');
            this.startHeroInterval();
        },
        startHeroInterval: function() { this.heroInterval = setInterval(() => this.showHeroSlide('next'), 7000); },
        resetHeroInterval: function() { clearInterval(this.heroInterval); this.startHeroInterval(); },
        showHeroSlide: function(direction) {
            this.DOM.carouselSlides[this.heroSlideIndex].classList.remove('active');
            if (direction === 'next') { this.heroSlideIndex = (this.heroSlideIndex + 1) % this.DOM.carouselSlides.length; } 
            else { this.heroSlideIndex = (this.heroSlideIndex - 1 + this.DOM.carouselSlides.length) % this.DOM.carouselSlides.length; }
            this.DOM.carouselSlides[this.heroSlideIndex].classList.add('active');
            this.resetHeroInterval();
        },
        initStatsCounters: function() {
            if (!this.DOM.statsCounters || this.DOM.statsCounters.length === 0) return;
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = +counter.getAttribute('data-target');
                        let count = 0;
                        const speed = 100;
                        const updateCount = () => {
                            const increment = target / speed;
                            if (count < target) { count += increment; counter.innerText = Math.ceil(count); requestAnimationFrame(updateCount); } 
                            else { counter.innerText = target; }
                        };
                        updateCount();
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });
            this.DOM.statsCounters.forEach(counter => observer.observe(counter));
        },

        initToppersCarousel: function() {
            const carousel = document.getElementById('toppers-carousel');
            if (!carousel) return;

            const cards = carousel.querySelectorAll('.topper-card');
            if (cards.length === 0) return;

            // 1. Clone cards for a seamless infinite loop effect
            cards.forEach(card => {
                const clone = card.cloneNode(true);
                carousel.appendChild(clone);
            });

            // 2. Calculate animation properties
            // Note: This runs once on load. For a fully responsive carousel,
            // this calculation should be re-run on window resize.
            const cardStyle = window.getComputedStyle(cards[0]);
            const cardWidth = cards[0].offsetWidth;
            const cardMarginRight = parseInt(cardStyle.marginRight, 10);
            const totalCardWidth = cardWidth + cardMarginRight;
            
            const totalWidth = totalCardWidth * cards.length;
            const animationDuration = cards.length * 3.5; // Adjust speed: lower number = faster

            // 3. Create and inject the dynamic @keyframes animation
            const animationName = 'slide';
            const keyframes = `
                @keyframes ${animationName} {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-${totalWidth}px);
                    }
                }
            `;
            
            const styleSheet = document.createElement("style");
            styleSheet.type = "text/css";
            styleSheet.innerText = keyframes;
            document.head.appendChild(styleSheet);

            // 4. Apply the animation to the carousel
            carousel.style.animation = `${animationName} ${animationDuration}s linear infinite`;
        },

        // --- FACULTY PAGE MODAL ---
        initFacultyModal: async function() {
            // The only fetch call left: to get bio data for the modal.
            // This is acceptable as it's not critical for initial page view.
            try {
                this.teacherData = await (await fetch('data/teachers.json')).json();
                if (this.DOM.facultyGrid) {
                    this.DOM.facultyGrid.addEventListener('click', (e) => {
                        if (e.target.matches('.btn[data-teacher-id]')) {
                            const teacherId = parseInt(e.target.getAttribute('data-teacher-id'));
                            const teacher = this.teacherData.find(t => t.id === teacherId);
                            if (teacher) {
                                this.showModal(`<h3>${teacher.name}</h3>`, `<p>${teacher.bio}</p>`);
                            }
                        }
                    });
                }
            } catch (error) {
                console.error("Could not load teacher bios for modal:", error);
            }
        },

        // --- GALLERY ---
        initGallery: function() {
            if (document.getElementById('gallery-grid')) {
                document.getElementById('gallery-grid').addEventListener('click', (e) => {
                    if (e.target.tagName === 'IMG') {
                        this.showLightbox(e.target.src);
                    }
                });
            }
        },

        // --- MODAL & LIGHTBOX ---
        showModal: function(titleHTML, contentHTML) { if (!this.DOM.modal) return; this.DOM.modal.querySelector('#modal-title').innerHTML = titleHTML; this.DOM.modal.querySelector('#modal-body').innerHTML = contentHTML; this.DOM.modal.style.display = "block"; this.DOM.modal.querySelector('.close-btn').onclick = () => this.closeModal(); window.onclick = (event) => { if (event.target == this.DOM.modal) this.closeModal(); }; },
        closeModal: function() { if (this.DOM.modal) this.DOM.modal.style.display = "none"; },
        showLightbox: function(src) { if (!this.DOM.lightbox) return; this.DOM.lightbox.querySelector('#lightbox-img').src = src; this.DOM.lightbox.style.display = "block"; this.DOM.lightbox.querySelector('.close-btn').onclick = () => this.closeLightbox(); },
        closeLightbox: function() { if (this.DOM.lightbox) this.DOM.lightbox.style.display = "none"; },

        // --- FORMS ---
        initWhatsAppForm: function(form) { if (!form) return; form.addEventListener('submit', (e) => { e.preventDefault(); let isValid = this.validateForm(form); if (isValid) { const studentName = form.querySelector('#student-name').value; const parentName = form.querySelector('#parent-name').value; const email = form.querySelector('#email').value; const phone = form.querySelector('#phone').value; const className = form.querySelector('#class').value; const message = form.querySelector('#message').value; const whatsappNumber = "916307819866"; const encodedMessage = encodeURIComponent(whatsappMessage.trim()); const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`; window.open(whatsappUrl, '_blank'); alert('Your inquiry has been prepared for WhatsApp. Please send the message.'); form.reset(); } }); },
        
        initContactWhatsAppForm: function(form) {
            if (!form) return;
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateForm(form)) {
                    const name = form.querySelector('#name').value;
                    const email = form.querySelector('#email').value;
                    const subject = form.querySelector('#subject').value;
                    const message = form.querySelector('#message').value;
                    const whatsappNumber = "916307819866";
                    
                    const whatsappMessage = `*New Contact Message*\n-----------------------\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;
                    const encodedMessage = encodeURIComponent(whatsappMessage.trim());
                    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
                    
                    window.open(whatsappUrl, '_blank');
                    alert('Your message has been prepared for WhatsApp. Please send the message.');
                    form.reset();
                }
            });
        },

        validateForm: function(form) { let isValid = true; form.querySelectorAll('.error-message').forEach(el => el.remove()); const requiredFields = form.querySelectorAll('[required]'); requiredFields.forEach(field => { if (!field.value.trim()) { isValid = false; this.showError(field, 'This field is required.'); } }); return isValid; },
        showError: function(field, message) { const error = document.createElement('p'); error.className = 'error-message'; error.style.color = 'red'; error.style.fontSize = '0.9rem'; error.style.marginTop = '4px'; error.textContent = message; field.parentElement.appendChild(error); },

        // --- 3D EFFECTS --- (Optimized - only on hover, not mousemove)
        init3DEffects: function() {
            // Reduced complexity - using CSS hover instead of mousemove for better performance
            // This reduces JavaScript execution and improves performance
        },

        // --- PARALLAX EFFECTS --- (Optimized for performance)
        initParallax: function() {
            // Simplified parallax - only for hero section with throttling
            const hero = document.querySelector('.hero');
            if (hero) {
                let ticking = false;
                const updateParallax = () => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * 0.3; // Reduced rate for better performance
                    hero.style.transform = `translate3d(0, ${rate}px, 0)`;
                    ticking = false;
                };
                
                window.addEventListener('scroll', () => {
                    if (!ticking) {
                        window.requestAnimationFrame(updateParallax);
                        ticking = true;
                    }
                }, { passive: true });
            }
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        App.init();
    });

})();

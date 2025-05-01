// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    let isMenuOpen = false;
    const body = document.body;
    const loader = document.querySelector('.loader');
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const themeToggle = document.querySelector('.theme-toggle');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const skillBars = document.querySelectorAll('.skill-progress');
    const contactForm = document.getElementById('contactForm');
    
    // Helper function to check if an element is in viewport
    const isInViewport = (element, offset = 0) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
            rect.bottom >= 0
        );
    };
    
    // Preloader
    setTimeout(() => {
        loader.classList.add('hidden');
        
        // Animate hero section after loader is hidden
        const heroSection = document.querySelector('.hero');
        heroSection.classList.add('fade-in');
    }, 2500);
    
    // Theme Toggle
    const setTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    };
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.contains('dark-mode') ? setTheme('light') : setTheme('dark');
    });
    
    // Mobile Menu Toggle
    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('open', isMenuOpen);
        document.body.classList.toggle('mobile-menu-open', isMenuOpen);
        
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };
    
    mobileMenuBtn.addEventListener('click', toggleMenu);
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                if (isMenuOpen) toggleMenu();
                
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active navigation link based on scroll position
    const setActiveNavLink = () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Custom cursor effect (for desktop only)
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            
            // Smooth animation with requestAnimationFrame
            requestAnimationFrame(() => {
                cursorDot.style.left = `${clientX}px`;
                cursorDot.style.top = `${clientY}px`;
                
                cursorOutline.style.left = `${clientX}px`;
                cursorOutline.style.top = `${clientY}px`;
            });
        });
        
        // Cursor hover effect
        const handleMouseEnter = () => {
            cursorOutline.style.width = '70px';
            cursorOutline.style.height = '70px';
            cursorOutline.style.backgroundColor = 'rgba(20, 184, 166, 0.1)';
        };
        
        const handleMouseLeave = () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        };
        
        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .achievement-item, .social-icon');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });
    }
    
    // Project filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Animate skill bars on scroll
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            if (isInViewport(bar.parentElement, 100)) {
                const progressValue = bar.getAttribute('data-progress');
                bar.style.width = `${progressValue}%`;
            }
        });
    };
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elementsToAnimate = document.querySelectorAll('.about-image-container, .about-text, .skill-category, .project-card, .achievement-item, .contact-info, .contact-form');
        
        elementsToAnimate.forEach(element => {
            if (isInViewport(element, 150) && !element.classList.contains('fade-in')) {
                element.classList.add('fade-in');
                
                // Add staggered delay for child elements
                if (element.classList.contains('skill-category') || element.classList.contains('project-card')) {
                    const index = Array.from(element.parentNode.children).indexOf(element);
                    element.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
        
        animateSkillBars();
    };
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
    
    // Initial call to animate elements in viewport
    setTimeout(animateOnScroll, 500);
    
    // Scroll down button in hero section
    const scrollDownBtn = document.querySelector('.scroll-down');
    scrollDownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const aboutSection = document.querySelector('#about');
        
        window.scrollTo({
            top: aboutSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Contact form validation and submission
    if (contactForm) {
        const formGroups = contactForm.querySelectorAll('.form-group');
        const successStatus = document.querySelector('.form-status.success');
        const errorStatus = document.querySelector('.form-status.error');
        
        const validateInput = (input) => {
            const field = input.getAttribute('name');
            const value = input.value.trim();
            const errorElement = document.getElementById(`${field}Error`);
            
            let error = '';
            
            switch (field) {
                case 'name':
                    if (!value) error = 'Name is required';
                    break;
                case 'email':
                    if (!value) {
                        error = 'Email is required';
                    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                        error = 'Please enter a valid email address';
                    }
                    break;
                case 'subject':
                    if (!value) error = 'Subject is required';
                    break;
                case 'message':
                    if (!value) {
                        error = 'Message is required';
                    } else if (value.length < 10) {
                        error = 'Message must be at least 10 characters';
                    }
                    break;
            }
            
            if (error) {
                input.classList.add('error');
                errorElement.textContent = error;
                return false;
            } else {
                input.classList.remove('error');
                errorElement.textContent = '';
                return true;
            }
        };
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            
            input.addEventListener('blur', () => {
                validateInput(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateInput(input);
                }
            });
        });
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            
            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea');
                if (!validateInput(input)) {
                    isFormValid = false;
                }
            });
            
            if (isFormValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.form-submit');
                const btnText = submitBtn.querySelector('.btn-text');
                const btnIcon = submitBtn.querySelector('i');
                
                submitBtn.disabled = true;
                btnText.textContent = 'Sending...';
                btnIcon.className = 'fas fa-spinner fa-spin';
                
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.opacity = '0';
                    
                    setTimeout(() => {
                        successStatus.classList.add('active');
                        
                        // Reset form after 5 seconds
                        setTimeout(() => {
                            successStatus.classList.remove('active');
                            contactForm.style.opacity = '1';
                            submitBtn.disabled = false;
                            btnText.textContent = 'Send Message';
                            btnIcon.className = 'fas fa-paper-plane';
                        }, 5000);
                    }, 300);
                }, 1500);
            }
        });
    }
});
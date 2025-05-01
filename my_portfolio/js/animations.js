document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer to handle scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.15 });
    
    // Get all elements that should be animated on scroll
    const animatedElements = document.querySelectorAll(
        '.about-content, .skills-container, .projects-grid, .contact-content, .footer-content'
    );
    
    // Observe each element
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add staggered animation to child elements
    document.querySelectorAll('.animate').forEach(parent => {
        const children = parent.querySelectorAll('.skill-item, .project-card, .achievement-item');
        
        children.forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`;
        });
    });
    
    // Text animation for the hero section
    const typingAnimation = () => {
        const text = "Creating digital experiences that inspire.";
        const typingElement = document.querySelector('.hero-subtitle');
        
        if (typingElement) {
            typingElement.textContent = '';
            
            let i = 0;
            const typeNextCharacter = () => {
                if (i < text.length) {
                    typingElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeNextCharacter, 50);
                }
            };
            
            // Start typing after loader is hidden
            setTimeout(typeNextCharacter, 2700);
        }
    };
    
    typingAnimation();
    
    // Parallax effect for the hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrollPosition * 0.3}px)`;
                
                // Move background shapes in opposite direction
                document.querySelectorAll('.shape').forEach(shape => {
                    const speed = shape.classList.contains('shape-1') ? 0.2 :
                                 shape.classList.contains('shape-2') ? 0.1 : 
                                 shape.classList.contains('shape-3') ? 0.15 : 0.25;
                                 
                    shape.style.transform = `translateY(${-scrollPosition * speed}px)`;
                });
            }
        });
    }
    
    // Project hover effects with 3D tilt
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate rotation values (limit to small angles)
            const rotateY = 5 * mouseX / (cardRect.width / 2);
            const rotateX = -5 * mouseY / (cardRect.height / 2);
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x-pos', `${x}px`);
            button.style.setProperty('--y-pos', `${y}px`);
        });
    });
    
    // Animated Counter for Skills
    const startCounters = () => {
        const skillPercentages = document.querySelectorAll('.skill-percentage');
        
        skillPercentages.forEach(counter => {
            const target = +counter.textContent.replace('%', '');
            const count = +counter.innerHTML.replace('%', '');
            const speed = 1000 / target; // Adjust for consistent animation duration
            
            if (count < target) {
                counter.innerHTML = Math.ceil(count + 1) + '%';
                setTimeout(() => startCounters(), speed);
            }
        });
    };
    
    // Start counters when skills section is in view
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startCounters();
                skillsObserver.unobserve(skillsSection);
            }
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }
    
    // Animated navigation highlight
    const highlightNav = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    };
    
    highlightNav();
});
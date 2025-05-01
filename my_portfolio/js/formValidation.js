document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        const submitBtn = contactForm.querySelector('.form-submit');
        const formSuccessMessage = document.querySelector('.form-status.success');
        const formErrorMessage = document.querySelector('.form-status.error');
        
        // Form validation
        const validateForm = () => {
            let isValid = true;
            
            formInputs.forEach(input => {
                const inputValue = input.value.trim();
                const fieldName = input.getAttribute('name');
                const errorElement = document.getElementById(`${fieldName}Error`);
                
                // Reset error state
                input.classList.remove('error');
                errorElement.textContent = '';
                
                // Validate based on field type
                switch(fieldName) {
                    case 'name':
                        if (inputValue === '') {
                            isValid = false;
                            input.classList.add('error');
                            errorElement.textContent = 'Please enter your name';
                        }
                        break;
                        
                    case 'email':
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (inputValue === '') {
                            isValid = false;
                            input.classList.add('error');
                            errorElement.textContent = 'Please enter your email address';
                        } else if (!emailPattern.test(inputValue)) {
                            isValid = false;
                            input.classList.add('error');
                            errorElement.textContent = 'Please enter a valid email address';
                        }
                        break;
                        
                    case 'subject':
                        if (inputValue === '') {
                            isValid = false;
                            input.classList.add('error');
                            errorElement.textContent = 'Please enter a subject';
                        }
                        break;
                        
                    case 'message':
                        if (inputValue === '') {
                            isValid = false;
                            input.classList.add('error');
                            errorElement.textContent = 'Please enter your message';
                        } else if (inputValue.length < 10) {
                            isValid = false;
                            input.classList.add('error');
                            errorElement.textContent = 'Message must be at least 10 characters';
                        }
                        break;
                }
            });
            
            return isValid;
        };
        
        // Real-time validation as user types
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    const fieldName = input.getAttribute('name');
                    const errorElement = document.getElementById(`${fieldName}Error`);
                    
                    // Clear error when user starts typing
                    input.classList.remove('error');
                    errorElement.textContent = '';
                }
            });
            
            // Validate on blur
            input.addEventListener('blur', () => {
                const inputValue = input.value.trim();
                const fieldName = input.getAttribute('name');
                const errorElement = document.getElementById(`${fieldName}Error`);
                
                // Specific validation based on field type
                switch(fieldName) {
                    case 'name':
                        if (inputValue === '') {
                            input.classList.add('error');
                            errorElement.textContent = 'Please enter your name';
                        }
                        break;
                        
                    case 'email':
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (inputValue === '') {
                            input.classList.add('error');
                            errorElement.textContent = 'Please enter your email address';
                        } else if (!emailPattern.test(inputValue)) {
                            input.classList.add('error');
                            errorElement.textContent = 'Please enter a valid email address';
                        }
                        break;
                        
                    case 'subject':
                        if (inputValue === '') {
                            input.classList.add('error');
                            errorElement.textContent = 'Please enter a subject';
                        }
                        break;
                        
                    case 'message':
                        if (inputValue === '') {
                            input.classList.add('error');
                            errorElement.textContent = 'Please enter your message';
                        } else if (inputValue.length < 10) {
                            input.classList.add('error');
                            errorElement.textContent = 'Message must be at least 10 characters';
                        }
                        break;
                }
            });
        });
        
        // Handle form submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateForm()) {
                // Change button state to loading
                const btnText = submitBtn.querySelector('.btn-text');
                const btnIcon = submitBtn.querySelector('i');
                
                submitBtn.disabled = true;
                btnText.textContent = 'Sending...';
                btnIcon.className = 'fas fa-spinner fa-spin';
                
                // Simulate form submission (in a real app, you would send data to a server here)
                setTimeout(() => {
                    // Show success message
                    contactForm.reset();
                    formSuccessMessage.classList.add('active');
                    
                    // Reset form after a delay
                    setTimeout(() => {
                        formSuccessMessage.classList.remove('active');
                        submitBtn.disabled = false;
                        btnText.textContent = 'Send Message';
                        btnIcon.className = 'fas fa-paper-plane';
                    }, 3000);
                }, 1500);
            }
        });
    }
});
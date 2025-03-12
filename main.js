const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const skillBars = document.querySelectorAll('.progress');
const contactForm = document.getElementById('contactForm');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    updateActiveNavLink();
    animateSkillBars();
});

const originalWidths = {};

document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    
    skillBars.forEach((bar, index) => {
        const width = bar.style.width;
        originalWidths[index] = width;
        bar.style.width = '0';
    });
    
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.opacity = '1';
        }, 300 + (index * 200));
    });
    
    setTimeout(() => {
        animateSkillBars();
    }, 1000);
});

function animateSkillBars() {
    const skillSection = document.getElementById('skills');
    if (!skillSection) return;
    
    const sectionTop = skillSection.offsetTop;
    const sectionHeight = skillSection.offsetHeight;
    
    if (window.scrollY >= sectionTop - 300 && window.scrollY < sectionTop + sectionHeight) {
        skillBars.forEach((bar, index) => {
            const targetWidth = originalWidths[index] || 
                               (bar.getAttribute('style') && bar.getAttribute('style').includes('width:') ? 
                               bar.getAttribute('style').split('width:')[1].trim().split(';')[0] : 
                               '0%');
            
            if (bar.style.width === '0px' || bar.style.width === '') {
                bar.style.width = targetWidth;
            }
        });
    }
}


if (contactForm) {
    // Initialize EmailJS with your Public Key (User ID)
    emailjs.init("lG-0BQHENnIYwmfo8"); // Ganti dengan Public Key EmailJS kamu
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
        
        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validasi input sebelum mengirim email
        if (!name || !email || !subject || !message) {
            alert("Please fill out all fields.");
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            return;
        }

        // Prepare template parameters
        const templateParams = {
            from_name: name,
            reply_to: email,
            subject: subject,
            message: message
        };
        
        // Send email using EmailJS
        emailjs.send('service_cd374kc', 'template_jspmdy4', templateParams)
            .then(response => {
                console.log('Email sent successfully!', response.status, response.text);
                
                // Show success message
                const formResponse = document.createElement('div');
                formResponse.classList.add('form-response');
                formResponse.innerHTML = `
                    <div class="success-message">
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for contacting me, ${name}. I'll get back to you soon.</p>
                    </div>
                `;
                
                // Replace form with success message
                contactForm.style.opacity = '0';
                setTimeout(() => {
                    contactForm.parentNode.replaceChild(formResponse, contactForm);
                    formResponse.style.opacity = '0';
                    setTimeout(() => {
                        formResponse.style.opacity = '1';
                    }, 100);
                }, 300);
            })
            .catch(error => {
                console.error('Failed to send email:', error);
                
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Show error message
                alert("Failed to send your message. Please try again later.");
            });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

window.addEventListener('scroll', function() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    
    if (window.scrollY > heroBottom - navbar.offsetHeight) {
        navbar.style.backgroundColor = 'var(--navbar-bg)';
    } else {
        navbar.style.backgroundColor = 'var(--navbar-bg)';
    }
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + navbar.offsetHeight + 50;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

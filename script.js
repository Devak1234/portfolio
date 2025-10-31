// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Loading animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loading');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile');
    hamburger.classList.toggle('active');
});

// Dark mode toggle with smooth transition
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').classList.remove('fa-moon');
    darkModeToggle.querySelector('i').classList.add('fa-sun');
}

// Back to top button with enhanced animation
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate skill bars on scroll with stagger effect
const skillBars = document.querySelectorAll('.skill-fill');

function animateSkillBars() {
    skillBars.forEach((bar, index) => {
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (barTop < windowHeight - 50) {
            setTimeout(() => {
                bar.style.width = bar.style.width || '0%';
            }, index * 200);
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Enhanced scroll animations with stagger effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 150);
        }
    });
}, observerOptions);

// Observe sections and cards
document.querySelectorAll('section > .container').forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('.project-card, .achievement-card, .skill-category').forEach(card => {
    observer.observe(card);
});

// Contact form submission with enhanced feedback
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Show loading state
    const submitButton = contactForm.querySelector('button');
    const originalText = submitButton.textContent;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    // Prepare email parameters
    const templateParams = {
        from_name: contactForm.name.value,
        from_email: contactForm.email.value,
        message: contactForm.message.value,
        to_name: 'Devak H'
    };

    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        }, function(error) {
            console.log('FAILED...', error);
            showNotification('Failed to send message. Please try again.', 'error');
        })
        .finally(() => {
            // Reset button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Enhanced typing animation for hero text
const animatedText = document.querySelector('.animated-text span');
const text = animatedText.textContent;
animatedText.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        animatedText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    } else {
        // Add blinking cursor effect
        animatedText.style.borderRight = '2px solid var(--primary-color)';
        setInterval(() => {
            animatedText.style.borderRight = animatedText.style.borderRight ? '' : '2px solid var(--primary-color)';
        }, 500);
    }
}

window.addEventListener('load', () => {
    setTimeout(typeWriter, 1500);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('mobile');
        hamburger.classList.remove('active');
    }
});

// Add stagger animation to skill items
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// Mouse follow effect for hero
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    hero.style.backgroundPosition = `${mouseX * 50}px ${mouseY * 50}px`;
});
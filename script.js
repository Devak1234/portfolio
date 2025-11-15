// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.querySelector('i').classList.remove('fa-moon');
    themeToggle.querySelector('i').classList.add('fa-sun');
}

// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Project modal functionality
const modal = document.getElementById('project-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTechStack = document.getElementById('modal-tech-stack');
const modalClose = document.querySelector('.modal-close');

const projectsData = {
    1: {
        image: 'Student complaint.png',
        title: 'Student Online Complaint and Feedback Management System',
        description: 'A centralized digital platform for managing student complaints and collecting feedback efficiently within institutions. Features include complaint submission, tracking system, admin dashboard, feedback export, visual analytics, and secure handling.',
        tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL']
    },
    2: {
        image: 'ShareNest.jpeg',
        title: 'Sharenest',
        description: 'Full-stack project for item renting leveraging modern web technologies. Users can rent items from nearby people, includes notification system and request features. Promotes cost-saving and community bonding.',
        tech: ['ReactJS', 'Node.js']
    }
};

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const project = projectsData[projectId];

        if (project) {
            modalImage.src = project.image;
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;

            modalTechStack.innerHTML = '';
            project.tech.forEach(tech => {
                const span = document.createElement('span');
                span.textContent = tech;
                modalTechStack.appendChild(span);
            });

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Contact form validation and submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const company = formData.get('company').trim();
    const email = formData.get('email').trim();
    const number = formData.get('number').trim();
    const message = formData.get('message').trim();

    // Basic validation
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Show loading
    const submitButton = contactForm.querySelector('.btn-submit');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    // Create mailto link
    const subject = `Contact from ${name} - ${company || 'Individual'}`;
    const body = `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nNumber: ${number}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:devakdevak30@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open mail client
    window.location.href = mailtoLink;

    // Reset form and show success
    setTimeout(() => {
        showNotification('Opening your email client to send the message...', 'success');
        contactForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 1000);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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

// Typing animation for home section
const greeting = document.querySelector('.intro-text h1');
const greetingText = greeting.textContent;
greeting.textContent = '';

let i = 0;
function typeWriter() {
    if (i < greetingText.length) {
        greeting.textContent += greetingText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Parallax effect for home section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const home = document.querySelector('#home');
    const rate = scrolled * -0.3;
    if (home) {
        home.style.transform = `translateY(${rate}px)`;
    }
});
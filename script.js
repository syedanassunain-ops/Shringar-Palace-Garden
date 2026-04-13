// Initialize AOS Animations
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.getElementById('nav');

mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        nav.style.display = 'block';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.background = 'white';
        nav.style.padding = '2rem';
        nav.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';

        const ul = nav.querySelector('ul');
        ul.style.flexDirection = 'column';
        ul.style.gap = '1.5rem';
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        nav.style.display = 'none';
    }
});

// Smooth Scroll for Nav Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                nav.style.display = 'none';
                mobileToggle.querySelector('i').className = 'fas fa-bars';
            }

            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission (WhatsApp Integration)
const form = document.querySelector('.booking-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const name = form.querySelector('input[placeholder="Your Name"]').value;
        const email = form.querySelector('input[placeholder="Your Email"]').value;
        const date = form.querySelector('input[type="date"]').value;
        const guests = form.querySelector('select').value;

        // Construct WhatsApp message
        const message = `Hello Shringar Palace Garden, I would like to enquire about booking your venue.
        
*Name:* ${name}
*Email:* ${email}
*Event Date:* ${date}
*Estimated Guests:* ${guests}

Please let me know about the availability and pricing. Thank you!`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        // Redirect to WhatsApp
        const whatsappUrl = `https://wa.me/919845059666?text=${encodedMessage}`;

        // Visual feedback
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Redirecting to WhatsApp...';
        btn.disabled = true;

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            btn.innerText = 'Sent to WhatsApp!';
            btn.style.backgroundColor = '#128C7E';
            form.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.backgroundColor = '';
            }, 3000);
        }, 1000);
    });
}

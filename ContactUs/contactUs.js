document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real application, you would send this data to your server
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });
});
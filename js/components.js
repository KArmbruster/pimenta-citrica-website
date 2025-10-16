// Load header component
async function loadHeader() {
    try {
        const response = await fetch('components/header.html');
        const html = await response.text();
        document.getElementById('header-placeholder').innerHTML = html;

        // Set active navigation link based on current page
        setActiveNavLink();
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Set active class on current page's navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
});

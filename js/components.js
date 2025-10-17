// Load header component
async function loadHeader() {
    try {
        const response = await fetch('components/header.html');
        const html = await response.text();
        document.getElementById('header-placeholder').innerHTML = html;

        // Set active navigation link based on current page
        setActiveNavLink();

        // Initialize mobile menu toggle
        initMobileMenu();
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

// Initialize mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (menuToggle && navWrapper) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navWrapper.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navWrapper.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navWrapper.contains(e.target)) {
                menuToggle.classList.remove('active');
                navWrapper.classList.remove('active');
            }
        });
    }
}

// Load accessibility toggle component
async function loadAccessibilityToggle() {
    try {
        const response = await fetch('components/accessibility-toggle.html');
        const html = await response.text();
        document.getElementById('accessibility-placeholder').innerHTML = html;

        // Initialize accessibility toggle functionality
        initAccessibilityToggle();
    } catch (error) {
        console.error('Error loading accessibility toggle:', error);
    }
}

// Initialize accessibility toggle functionality
function initAccessibilityToggle() {
    const toggleBtn = document.getElementById('accessibility-toggle');

    if (toggleBtn) {
        // Check for saved preference in localStorage
        const savedMode = localStorage.getItem('textColorMode');
        if (savedMode === 'black') {
            document.body.classList.add('black-text-mode');
        }

        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('black-text-mode');

            // Save preference to localStorage
            if (document.body.classList.contains('black-text-mode')) {
                localStorage.setItem('textColorMode', 'black');
            } else {
                localStorage.setItem('textColorMode', 'red');
            }
        });
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadAccessibilityToggle();
});

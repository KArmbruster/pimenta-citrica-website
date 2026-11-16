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
    let currentPath = window.location.pathname;

    // Normalize path - remove trailing slash and make sure it starts with /
    if (currentPath === '/' || currentPath === '/index' || currentPath === '/index.html') {
        currentPath = '/';
    } else {
        currentPath = currentPath.replace(/\/$/, ''); // Remove trailing slash
        currentPath = currentPath.replace(/\.html$/, ''); // Remove .html extension
    }

    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');

            // A page inside the dropdown also highlights its parent item
            const parentToggle = link.closest('.dropdown')?.querySelector('.dropdown-toggle');
            if (parentToggle) {
                parentToggle.classList.add('active');
            }
        }
    });
}

// Initialize mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (menuToggle && navWrapper) {
        const setOpen = (open) => {
            menuToggle.classList.toggle('active', open);
            navWrapper.classList.toggle('active', open);
            menuToggle.setAttribute('aria-expanded', String(open));
        };

        menuToggle.addEventListener('click', () => {
            setOpen(!navWrapper.classList.contains('active'));
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => setOpen(false));
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navWrapper.contains(e.target)) {
                setOpen(false);
            }
        });

        // Close menu with Escape and return focus to the button
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navWrapper.classList.contains('active')) {
                setOpen(false);
                menuToggle.focus();
            }
        });
    }
}

// Load footer component
async function loadFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    try {
        const response = await fetch('components/footer.html');
        placeholder.innerHTML = await response.text();

        const year = document.getElementById('footer-year');
        if (year) {
            year.textContent = new Date().getFullYear();
        }
    } catch (error) {
        console.error('Error loading footer:', error);
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

// Send the contact form in place and show the result on the page.
// Without JavaScript the form still posts to Formspree the normal way.
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const status = form.querySelector('.form-status');
    const button = form.querySelector('button[type="submit"]');

    const showStatus = (message, isError) => {
        status.textContent = message;
        status.classList.toggle('error', isError);
        status.hidden = false;
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const label = button.textContent;
        button.disabled = true;
        button.textContent = 'SENDING…';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            });
            if (!response.ok) throw new Error(`Form service responded ${response.status}`);

            form.reset();
            showStatus('Thank you! Your message is on its way.', false);
        } catch (error) {
            console.error('Error sending contact form:', error);
            showStatus('Something went wrong and your message was not sent. Please try again.', true);
        } finally {
            button.disabled = false;
            button.textContent = label;
        }
    });
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    loadHeader();
    loadFooter();
    loadAccessibilityToggle();
});

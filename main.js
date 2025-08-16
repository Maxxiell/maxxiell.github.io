// Single Page Application Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('[data-page]');
    const pages = document.querySelectorAll('.page-content');
    
    // Hamburger menu elements
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.close-btn');
    
    // Track if this is the initial page load
    let isInitialLoad = true;
    
    // Hamburger menu functionality
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
    
    closeBtn.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
    });
    
    // Close mobile nav when clicking on a link
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });
    
    // Function to show a specific page
    function showPage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show the selected page
        const targetPage = document.getElementById(pageId + '-page');
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update active navigation state
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Update URL without page reload
        history.pushState({page: pageId}, '', `#${pageId}`);
        
        // Initialize gallery lightbox when gallery page is shown
        if (pageId === 'gallery') {
            initGalleryLightbox();
        }
        
        // Only trigger animations on initial page load
        if (isInitialLoad) {
            isInitialLoad = false;
            // Trigger animations for the current page
            if (pageId === 'about') {
                triggerAboutPageAnimation();
            } else if (pageId === 'home') {
                triggerHomePageAnimation();
            }
        }
    }
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.page) {
            showPage(e.state.page);
        } else {
            showPage('home');
        }
    });
    
    // Check for hash in URL on page load
    const hash = window.location.hash.slice(1);
    if (hash && hash !== 'home') {
        showPage(hash);
    } else {
        showPage('home');
    }
    
    // Initialize gallery lightbox if starting on gallery page
    if (window.location.hash === '#gallery') {
        initGalleryLightbox();
    }
    
    // Trigger initial animations
    setTimeout(() => {
        if (window.location.hash === '#about') {
            triggerAboutPageAnimation();
        } else if (window.location.hash === '' || window.location.hash === '#home') {
            triggerHomePageAnimation();
        }
    }, 100);
});

// Gallery Lightbox Functionality
function initGalleryLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('closeBtn');
    
    if (!lightbox || !lightboxImg || !closeBtn) return;
    
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            if (img.src) {
                lightboxImg.src = img.src;
                lightbox.style.display = 'flex';
            }
        });
    });
    
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
    });
    
    // Close on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
        }
    });
}

// Function to trigger about page animation
function triggerAboutPageAnimation() {
    const aboutParagraph = document.querySelector('.aboutparagraph');
    if (aboutParagraph) {
        aboutParagraph.style.animation = 'none';
        aboutParagraph.offsetHeight; // Trigger reflow
        aboutParagraph.style.animation = 'fadeInFromBlack 1.5s ease-out forwards';
    }
}

// Function to trigger home page animation
function triggerHomePageAnimation() {
    const centeredDiv = document.querySelector('.centered');
    if (centeredDiv) {
        centeredDiv.style.animation = 'none';
        centeredDiv.offsetHeight; // Trigger reflow
        centeredDiv.style.animation = 'fadeInFromBlack 1.5s ease-out forwards';
    }
}

// Original header hover effects (if needed)
const header = document.getElementById("header");
if (header) {
    const hText = document.querySelector(".left1 h1");
    const pText = document.querySelector(".left1 p");
    const cText = document.querySelector(".centered h2");
    const c3Text = document.querySelector(".centered h3");
    const aText = document.querySelector(".centered a");

    header.addEventListener("mouseover", () => {
        document.body.style.background = 'linear-gradient(to right,rgb(255, 30, 0), #86a7bb)';
        document.body.style.transition = 'background 2s ease-in-out';
        header.style.background = 'linear-gradient(to right, #fff, rgba(252, 252, 252, 0.12))';
        header.style.boxShadow = ' 10px 5px 0px yellow';
        header.style.border = '1px solid yellow';
        if (hText) hText.style.color = 'black';
        if (pText) pText.style.color = 'black';
        if (cText) cText.style.color = 'black';
        if (c3Text) c3Text.style.color = '#5c5c5c';
        if (aText) aText.style.color = 'white';
    });

    header.addEventListener("mouseout", () => {
        document.body.style.background = '';
        document.body.style.transition = '';
        header.style.background = '';
        header.style.boxShadow = '';
        header.style.border = '';
        if (hText) hText.style.color = '';
        if (pText) pText.style.color = '';
        if (cText) cText.style.color = '';
        if (c3Text) c3Text.style.color = '';
        if (aText) aText.style.color = '';
    });
}
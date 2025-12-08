// Theme toggle and mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const navbar = document.querySelector('.navbar');

    // Desktop navbar scroll animation - hide at 30% scroll on specific pages
    let lastScrollTop = 0;
    let scrollTimeout;
    
    // Check if current page should have auto-hide navbar
    const currentPage = window.location.pathname;
    const pagesWithAutoHide = ['/pages/resume.html', '/pages/gallery-auto.html', '/pages/about.html', 'resume.html', 'gallery-auto.html', 'about.html'];
    const pagesWithBackToTop = ['/pages/resume.html', '/pages/gallery-auto.html', 'resume.html', 'gallery-auto.html'];
    const shouldAutoHide = pagesWithAutoHide.some(page => currentPage.includes(page));
    const hasBackToTop = pagesWithBackToTop.some(page => currentPage.includes(page));
    
    if (navbar && window.innerWidth > 768 && shouldAutoHide) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (currentScroll / documentHeight) * 100;
            
            // Clear existing timeout
            clearTimeout(scrollTimeout);
            
            // Add slight delay before hiding navbar
            scrollTimeout = setTimeout(() => {
                const isScrollingDown = currentScroll > lastScrollTop;
                
                if (hasBackToTop) {
                    // For pages with back-to-top button (resume.html, gallery-auto.html)
                    // Only show navbar when scrolled back to 84% from top (16% scrolled down)
                    if (scrollPercent <= 16) {
                        navbar.style.transform = 'translateY(0)';
                    } else {
                    navbar.style.transform = 'translateY(-100%)';
                    }
                } else {
                    // For other pages (like about.html)
                    if (scrollPercent >= 30 && isScrollingDown) {
                        // Scrolled 30% or more and scrolling down - hide navbar
                        navbar.style.transform = 'translateY(-100%)';
                    } else {
                        // Scrolling up or less than 30% scrolled - show navbar
                    navbar.style.transform = 'translateY(0)';
                    }
                }
                lastScrollTop = currentScroll;
            }, 150); // 150ms delay
        });
    }

    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    console.log('Initial theme set to:', savedTheme);

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            console.log('Switching from', currentTheme, 'to', newTheme);
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
        console.log('Theme toggle event listener attached');
    } else {
        console.error('Theme toggle button not found!');
    }

    // Hamburger menu functionality
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        const navLinkItems = navLinks.querySelectorAll('.links a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Back to top functionality
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Decrypted text animation for name (reactbits style - sequential and looping)
    const decryptedName = document.getElementById('decrypted-name');
    if (decryptedName) {
        const targetText = decryptedName.textContent.trim();
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let currentIndex = 0;
        let frameCount = 0;
        let animationInterval;

        function getRandomChar() {
            return chars[Math.floor(Math.random() * chars.length)];
        }

        function decryptText() {
            let result = '';
            
            // Build the result string
            for (let i = 0; i < targetText.length; i++) {
                if (i < currentIndex) {
                    // Already revealed characters - show the actual character
                    result += targetText[i];
                } else if (i === currentIndex) {
                    // Current character being decrypted - cycle through random chars
                    // After 7 frames, reveal the actual character
                    if (frameCount >= 7) {
                        result += targetText[i];
                        currentIndex++;
                        frameCount = 0;
                    } else {
                        result += getRandomChar();
                        frameCount++;
                    }
                } else {
                    // Not yet reached - show random character
                    result += getRandomChar();
                }
            }
            
            decryptedName.textContent = result;
            
            // If all characters are revealed, reset and loop
            if (currentIndex >= targetText.length) {
                // Show final text briefly, then reset
                setTimeout(() => {
                    currentIndex = 0;
                    frameCount = 0;
                    decryptText();
                }, 15000); // 15 second pause before restart
                return;
            }

            // Continue animation - 25% slower (43ms instead of 34ms)
            animationInterval = setTimeout(decryptText, 43);
        }

        // Start animation immediately
        decryptText();
    }

});

// Legacy code for header interactions (keeping original functionality)
const header = document.getElementById("header");
const hText = document.querySelector(".left1 h1");
const pText = document.querySelector(".left1 p");
const cText = document.querySelector(".centered h2");
const c3Text = document.querySelector(".centered h3");
const aText = document.querySelector(".centered a");

if (header) {
    header.addEventListener("mouseover", () => {
        document.body.style.background = 'linear-gradient(to right,rgb(255, 30, 0), #86a7bb)';
        document.body.style.transition = 'background 2s ease-in-out';
        header.style.background = 'linear-gradient(to right, #fff, rgba(252, 252, 252, 0.12))';
        header.style.boxShadow = ' 10px 5px 0px yellow';
        header.style.border = '1px solid yellow';
        hText.style.color = 'black';
        pText.style.color = 'black';
        cText.style.color = 'black';
        c3Text.style.color = '#5c5c5c';
        aText.style.color = 'white';
    });

    header.addEventListener("mouseout", () => {
        document.body.style.background = '';
        document.body.style.transition = '';
        header.style.background = '';
        header.style.boxShadow = '';
        header.style.border = '';
        hText.style.color = '';
        pText.style.color = '';
        cText.style.color = '';
        c3Text.style.color = '';
        aText.style.color = '';
    });
}
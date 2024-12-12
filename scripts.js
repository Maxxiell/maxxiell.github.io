document.querySelector('.menu-toggle').addEventListener('click', function() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('show');
});

document.querySelectorAll('.menu li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Remove active class from all links
        document.querySelectorAll('.menu li a').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to the clicked link
        this.classList.add('active');
    });
});

// Highlight the section in view
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop - 20 && scrollPosition < sectionTop + sectionHeight - 20) {
            document.querySelector(`.menu li a[href="#${sectionId}"]`).classList.add('active');
        } else {
            document.querySelector(`.menu li a[href="#${sectionId}"]`).classList.remove('active');
        }
    });
});

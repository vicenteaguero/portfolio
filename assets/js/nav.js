// assets/js/nav.js

function loadContent(pageName) {
    fetch(`sites/${pageName}.html`)
        .then(response => response.text())
        .then(data => {
            const rightContainer = document.querySelector('.right');
            rightContainer.innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}

let currentPage = 'default';
let hoveredPage = null;

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');

    if (navLinks.length > 0) {
        currentPage = navLinks[0].getAttribute('data-page');
        setFocus(navLinks[0]);
        loadContent(currentPage);
    }

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            hoveredPage = link.getAttribute('data-page');
            loadContent(hoveredPage);
        });

        link.addEventListener('mouseleave', () => {
            if (hoveredPage !== currentPage) {
                loadContent(currentPage);
            }
        });

        link.addEventListener('click', event => {
            event.preventDefault();
            currentPage = link.getAttribute('data-page');
            hoveredPage = null;
            setFocus(link);
            loadContent(currentPage);
        });
    });
});

function setFocus(targetLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('focused');
    });
    if (targetLink) {
        targetLink.classList.add('focused');
    }
}
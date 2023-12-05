// Add this JavaScript file to your project folder and link it in your HTML files.

// Function to determine the current page URL
function getCurrentPageUrl() {
    return window.location.href.split('/').pop();
}

// Function to update the active link in the navigation
function updateActiveLink() {
    const currentPageUrl = getCurrentPageUrl();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkUrl = link.getAttribute('href');
        if (currentPageUrl === linkUrl) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call the function to update the active link when the page loads
updateActiveLink();

const words = ["Full Stack Developer", "An amazing person", "Compassionate"];
        let wordIndex = 0;
        let isDeleting = false;
        let text = "";

        function typeWriter() {
            const current = words[wordIndex];
            const endOfWord = text.length === current.length;
            const deletedAll = text.length === 0;

            if (endOfWord && !isDeleting) {
                isDeleting = true;
            } else if (deletedAll && isDeleting) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

            if (isDeleting) {
                text = current.substring(0, text.length - 1);
            } else {
                text = current.substring(0, text.length + 1);
            }

            document.getElementById('text').innerText = text;
        }

        setInterval(typeWriter, 200);
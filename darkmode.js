// Dark Mode Script
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const htmlElement = document.documentElement;

// Check for saved dark mode preference or use system preference
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
let isDarkMode = localStorage.getItem('darkMode') === 'true' || 
                (localStorage.getItem('darkMode') === null && prefersDarkMode);

// Function to update dark mode status
function updateDarkMode() {
    if (isDarkMode) {
        htmlElement.classList.add('dark-mode');
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        htmlElement.classList.remove('dark-mode');
        darkModeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}

// Initialize dark mode
function initDarkMode() {
    updateDarkMode();
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        localStorage.setItem('darkMode', isDarkMode);
        updateDarkMode();
        
        // Add transition class to allow for animation
        htmlElement.classList.add('color-transition');
        
        // Remove transition class after animation completes
        setTimeout(() => {
            htmlElement.classList.remove('color-transition');
        }, 500);
    });
}

// Run dark mode initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initDarkMode);

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const icon = document.querySelector('.darkModeIcon i');

// Update all theme-related images
function updateImages(theme) {
    const images = document.querySelectorAll('.theme-image');
    images.forEach(image => {
        const lightSrc = image.getAttribute('data-light');
        const darkSrc = image.getAttribute('data-dark');
        if (theme === 'dark' && darkSrc) {
            image.src = darkSrc;
        } else if (theme === 'light' && lightSrc) {
            image.src = lightSrc;
        }
    });
}

// Set Light Mode Icon
function setLightIcon() {
    document.getElementById("darkmodeImage").src = "../../assets/sun.svg";
}

// Set Dark Mode Icon
function setDarkIcon() {
    document.getElementById("darkmodeImage").src = "../../assets/moon.svg";
}

// Theme switch logic
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        setDarkIcon();
        updateImages('dark'); // Update images for dark mode
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        setLightIcon();
        updateImages('light'); // Update images for light mode
    }
}

// Initial theme setup
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        toggleSwitch.checked = true;
        setDarkIcon();
        updateImages('dark'); // Update images for saved dark mode
    } else {
        toggleSwitch.checked = false;
        setLightIcon();
        updateImages('light'); // Update images for saved light mode
    }
} else {
    // Detect system preference if no saved theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleSwitch.checked = true;
        setDarkIcon();
        updateImages('dark'); // Update images for system dark mode
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        toggleSwitch.checked = false;
        setLightIcon();
        updateImages('light'); // Update images for system light mode
    }

    // Listen for changes in system preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newColorScheme = event.matches ? "dark" : "light";
        if (newColorScheme === "dark") {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleSwitch.checked = true;
            setDarkIcon();
            updateImages('dark'); // Update images for system dark mode
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleSwitch.checked = false;
            setLightIcon();
            updateImages('light'); // Update images for system light mode
        }
    });
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener('change', switchTheme, false);

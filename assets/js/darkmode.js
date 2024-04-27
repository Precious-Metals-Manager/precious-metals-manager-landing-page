const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const icon = document.querySelector('.darkModeIcon i');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        toggleSwitch.checked = true
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        toggleSwitch.checked = false
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
} else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleSwitch.checked = true
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        toggleSwitch.checked = false
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newColorScheme = event.matches ? "dark" : "light";
        if (newColorScheme == "dark") {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleSwitch.checked = true
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleSwitch.checked = false
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
}


toggleSwitch.addEventListener('change', switchTheme, false);

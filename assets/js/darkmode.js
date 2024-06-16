const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const icon = document.querySelector('.darkModeIcon i');

function setLightIcon() {
    document.getElementById("darkmodeImage").src = "../../assets/sun.svg";
}

function setDarkIcon() {
    document.getElementById("darkmodeImage").src = "../../assets/moon.svg";
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        setDarkIcon()
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        setLightIcon()
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        toggleSwitch.checked = true
        setDarkIcon()
    } else {
        toggleSwitch.checked = false
        setLightIcon()
    }
} else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleSwitch.checked = true
        setDarkIcon()
    } else {
        toggleSwitch.checked = false
        setLightIcon()
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newColorScheme = event.matches ? "dark" : "light";
        if (newColorScheme == "dark") {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleSwitch.checked = true
            setDarkIcon()
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleSwitch.checked = false
            setLightIcon()
        }
    });
}


toggleSwitch.addEventListener('change', switchTheme, false);

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const icon = document.querySelector('.darkModeIcon i');

function setLightElements() {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    document.getElementById("appStoreDownload").src = "assets/appstore.svg";
}

function setDarkElements() {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    document.getElementById("appStoreDownload").src = "assets/appstorewhite.svg";
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        setDarkElements()
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        setLightElements()
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        toggleSwitch.checked = true
        setDarkElements()
    } else {
        toggleSwitch.checked = false
        setLightElements()
    }
} else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleSwitch.checked = true
        setDarkElements()
    } else {
        toggleSwitch.checked = false
        setLightElements()
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newColorScheme = event.matches ? "dark" : "light";
        if (newColorScheme == "dark") {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleSwitch.checked = true
            setDarkElements()
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleSwitch.checked = false
            setLightElements()
        }
    });
}


toggleSwitch.addEventListener('change', switchTheme, false);

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const icon = document.querySelector('.darkModeIcon i');

function setLightImages() {
    document.getElementById("appStoreDownload").src = "assets/appstore.svg";
    document.getElementById("heroScreenshot").src = "assets/screenshot/screenshot1.webp";
    document.getElementById("feature1Screenshot").src = "assets/screenshot/screenshot2.webp";
    document.getElementById("feature2Screenshot").src = "assets/screenshot/screenshot3.webp";
    document.getElementById("feature3Screenshot").src = "assets/screenshot/screenshot4.webp";
    document.getElementById("feature4Screenshot").src = "assets/screenshot/screenshot5.webp";
}

function setDarkImages() {
    document.getElementById("appStoreDownload").src = "assets/appstorewhite.svg";
    document.getElementById("heroScreenshot").src = "assets/screenshot/screenshot1dark.webp";
    document.getElementById("feature1Screenshot").src = "assets/screenshot/screenshot2dark.webp";
    document.getElementById("feature2Screenshot").src = "assets/screenshot/screenshot3dark.webp";
    document.getElementById("feature3Screenshot").src = "assets/screenshot/screenshot4dark.webp";
    document.getElementById("feature4Screenshot").src = "assets/screenshot/screenshot5dark.webp";
}

function setLightIcon() {
    document.getElementById("darkmodeImage").src = "assets/sun.svg";
}

function setDarkIcon() {
    document.getElementById("darkmodeImage").src = "assets/moon.svg";
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        setDarkIcon()
        setDarkImages()
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        setLightIcon()
        setLightImages()
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        toggleSwitch.checked = true
        setDarkIcon()
        setDarkImages()
    } else {
        toggleSwitch.checked = false
        setLightIcon()
        setLightImages()
    }
} else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleSwitch.checked = true
        setDarkIcon()
        setDarkImages()
    } else {
        toggleSwitch.checked = false
        setLightIcon()
        setLightImages()
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newColorScheme = event.matches ? "dark" : "light";
        if (newColorScheme == "dark") {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleSwitch.checked = true
            setDarkIcon()
            setDarkImages()
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleSwitch.checked = false
            setLightIcon()
            setLightImages()
        }
    });
}


toggleSwitch.addEventListener('change', switchTheme, false);

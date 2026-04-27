document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.markdown-body img, .card-img-top').forEach(function (img) {
        if (img.complete && img.naturalWidth > 0) {
            return; // already loaded and visible — do nothing
        }
        img.classList.add('img-loading');
        img.addEventListener('load', function () {
            img.classList.remove('img-loading');
            img.classList.add('img-loaded');
        });
        img.addEventListener('error', function () {
            img.style.display = 'none';
        });
    });

    var featured = document.querySelector('.featured-image');
    if (featured) {
        var match = featured.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
        if (match) {
            var tmp = new Image();
            tmp.onload = function () { featured.classList.add('img-loaded'); };
            tmp.src = match[1];
        }
    }
});

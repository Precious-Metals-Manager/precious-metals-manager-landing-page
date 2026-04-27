document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.markdown-body img, .card-img-top').forEach(function (img) {
        if (img.complete && img.naturalWidth > 0) {
            img.classList.add('img-loaded');
        } else {
            img.addEventListener('load', function () {
                img.classList.add('img-loaded');
            });
        }
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

// Live App Store rating for the "Loved by stackers" section.
//
// Apple's lookup API sends no CORS header, so fetch()/XHR is blocked — but it
// supports JSONP, and a <script> tag isn't subject to the same-origin policy.
// On success we replace the rating/count; on any failure the server-rendered
// values from _config.yml (app_rating / app_rating_count) stay in place.
(function () {
	var el = document.querySelector('[data-app-rating]');
	if (!el) return;

	var appId = el.getAttribute('data-app-id');
	var country = el.getAttribute('data-country') || 'us';
	if (!appId) return;

	var cbName = '__pmmAppRating';
	var script;
	var settled = false;

	function cleanup() {
		if (script && script.parentNode) script.parentNode.removeChild(script);
		try { delete window[cbName]; } catch (e) { window[cbName] = undefined; }
	}

	window[cbName] = function (data) {
		settled = true;
		try {
			var r = data && data.results && data.results[0];
			if (r) {
				if (typeof r.averageUserRating === 'number') {
					var score = el.querySelector('[data-rating-score]');
					if (score) score.textContent = (Math.round(r.averageUserRating * 10) / 10).toFixed(1);
				}
				if (typeof r.userRatingCount === 'number' && r.userRatingCount > 0) {
					var count = el.querySelector('[data-rating-count]');
					if (count) count.textContent = r.userRatingCount.toLocaleString();
				}
			}
		} catch (e) { /* keep the fallback values */ }
		cleanup();
	};

	script = document.createElement('script');
	script.async = true;
	script.src = 'https://itunes.apple.com/lookup?id=' + encodeURIComponent(appId) +
		'&country=' + encodeURIComponent(country) + '&callback=' + cbName;
	script.onerror = cleanup;
	document.head.appendChild(script);

	// If Apple is slow or unreachable, give up and keep the fallback.
	setTimeout(function () { if (!settled) cleanup(); }, 6000);
})();

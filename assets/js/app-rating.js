// Live App Store rating for the "Loved by stackers" section.
//
// Apple's lookup API sends no CORS header, so fetch()/XHR is blocked — but it
// supports JSONP, and a <script> tag isn't subject to the same-origin policy.
// On success we replace the rating/count; on any failure the server-rendered
// values from _config.yml (app_rating / app_rating_count) stay in place.
//
// The same values are also written into the SoftwareApplication JSON-LD, so the
// marked-up aggregateRating never contradicts what the visitor can see. Crawlers
// may index the pre-render HTML, so the _config.yml fallback still matters —
// keep it roughly current.
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

	// Updates the visible rating. `score` is a 1-decimal string, `count` a number.
	function updateVisible(score, count) {
		if (score !== null) {
			var scoreEl = el.querySelector('[data-rating-score]');
			if (scoreEl) scoreEl.textContent = score;
		}
		if (count !== null) {
			var countEl = el.querySelector('[data-rating-count]');
			if (countEl) countEl.textContent = count.toLocaleString();
		}
	}

	// Mirrors the same values into the SoftwareApplication JSON-LD. Only an
	// aggregateRating that is already there gets updated: if the fallback values
	// are absent the schema omits the block, and marking up a rating the page
	// doesn't display would breach Google's "must be visible" guideline.
	// ratingCount stays a bare number — no thousands separators.
	function updateSchema(score, count) {
		var node = document.getElementById('app-schema');
		if (!node) {
			var blocks = document.querySelectorAll('script[type="application/ld+json"]');
			for (var i = 0; i < blocks.length; i++) {
				if (blocks[i].textContent.indexOf('"SoftwareApplication"') !== -1) {
					node = blocks[i];
					break;
				}
			}
		}
		if (!node) return;

		var data;
		try {
			data = JSON.parse(node.textContent);
		} catch (e) {
			return; // Malformed block — better left untouched.
		}
		if (!data || !data.aggregateRating) return;

		if (score !== null) data.aggregateRating.ratingValue = score;
		if (count !== null) data.aggregateRating.ratingCount = count;

		try {
			node.textContent = JSON.stringify(data);
		} catch (e) { /* leave the server-rendered block in place */ }
	}

	window[cbName] = function (data) {
		settled = true;
		try {
			var r = data && data.results && data.results[0];
			if (r) {
				var score = null;
				var count = null;

				// An explicit count of 0 means the app has no ratings yet, which
				// makes averageUserRating a meaningless 0 — publishing it next to
				// the fallback count would read as "0.0 average, 90 ratings".
				// Treat the pair as all-or-nothing in that case.
				var hasNoRatings = r.userRatingCount === 0;

				if (typeof r.averageUserRating === 'number' && !hasNoRatings) {
					score = (Math.round(r.averageUserRating * 10) / 10).toFixed(1);
				}
				if (typeof r.userRatingCount === 'number' && r.userRatingCount > 0) {
					count = r.userRatingCount;
				}

				if (score !== null || count !== null) {
					updateVisible(score, count);
					updateSchema(score, count);
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

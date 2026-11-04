(function () {
  'use strict';

  var C = {
    main: 'https://www.nomashae.org',
    eservices: 'https://citizen.nomashae.org',
    ministries: 'https://ministries.nomashae.org',
    assets: 'https://assets.nomashae.org',
    sitemap: 'https://sitemap.nomashae.org',
    discord: 'https://links.nomashae.org/discord/1',
    twitter: 'https://x.com/RepublicOfhnha',
    youtube: 'https://www.youtube.com/@republic_nomashae',
    contact: 'https://eservices.nomashae.org/contact',
    email: 'government@nomashae.org',
    tagline: 'Official website of the Republic of Nomashae'
  };
  Object.assign(C, window.NOMAD || {});

  var R = {};
  function def(tag, render, mount) { R[tag] = { render: render, mount: mount }; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function g(el, n, d) { var v = el.getAttribute(n); return v == null ? (d == null ? '' : d) : v; }
  function has(el, n) { return el.hasAttribute(n); }
  function pass(el, skip) {
    skip = skip || []; var s = '';
    for (var i = 0; i < el.attributes.length; i++) {
      var a = el.attributes[i];
      if (skip.indexOf(a.name) < 0) s += ' ' + a.name + '="' + esc(a.value) + '"';
    }
    return s;
  }
  function icon(name, wrapClass) {
    if (!name) return '';
    var cls = name.indexOf(' ') > -1 ? name : 'fa-solid fa-' + name;
    return '<div class="' + wrapClass + '"><i class="' + esc(cls) + '"></i></div>';
  }
  function logo(kind) { return C.assets + '/e-services_' + kind + '.png'; }
  function pill(el) {
    var s = g(el, 'status'); if (!s) return '';
    return '<span class="pill' + (has(el, 'live') ? ' pill-live' : '') + '">' + esc(s) + '</span>';
  }
  var SEP = ' &nbsp;·&nbsp; ';
  var DARK_BTN = '<button class="hdr-btn" id="dark-btn" type="button">Dark</button>';

  def('topbar', function (el) {
    var act = g(el, 'active');
    function a(key, label) { return '<a href="' + C[key] + '"' + (act === key ? ' class="active" aria-current="page"' : '') + '>' + label + '</a>'; }
    var es = act === 'eservices'
      ? '<a href="' + C.eservices + '" class="active" aria-current="page"><img src="' + logo('active') + '" alt="eServices" class="top-bar-img"></a>'
      : '<a href="' + C.eservices + '"><img src="' + logo('grey') + '" alt="eServices" class="top-bar-img" onmouseenter="this.src=\'' + logo('active') + '\'" onmouseleave="this.src=\'' + logo('grey') + '\'"></a>';
    return '<div class="top-bar"><span>' + esc(g(el, 'text', C.tagline)) + '</span><span>' + a('main', 'Main Page') + SEP + es + SEP + a('ministries', 'Ministries') + '</span></div>';
  });

  def('dark-toggle', function () { return DARK_BTN; });

  def('site-header', function (el) {
    var h1 = g(el, 'logo') === 'eservices'
      ? '<a href="' + esc(g(el, 'logo-href', '/')) + '"><img src="' + logo('grey') + '" alt="eServices" class="header-logo"></a>'
      : esc(g(el, 'title'));
    var actions = (has(el, 'dark-toggle') ? DARK_BTN : '') + el.innerHTML;
    return '<header><div class="header-inner">'
      + '<a href="' + esc(g(el, 'home', C.main)) + '"><img src="' + C.assets + '/flag.png" alt="Flag of Nomashae" class="flag"></a>'
      + '<div class="header-text"><h1>' + h1 + '</h1><p>' + esc(g(el, 'subtitle')) + '</p></div>'
      + (actions.trim() ? '<div class="header-actions">' + actions + '</div>' : '')
      + '</div></header>';
  });

  def('site-nav', function (el) { return '<nav' + pass(el) + '>' + el.innerHTML + '</nav>'; });

  def('site-footer', function (el) {
    function l(href, ic, label, blank) { return '<a href="' + href + '"' + (blank ? ' target="_blank"' : '') + '><i class="' + ic + '"></i> ' + label + '</a>'; }
    return '<footer><div class="footer-inner">'
      + '<div class="footer-col"><h4>Republic of Nomashae</h4>' + l(C.main, 'fa-solid fa-globe', 'Main Website', 1) + l(C.sitemap, 'fa-solid fa-sitemap', 'View full Site Map', 1) + '</div>'
      + '<div class="footer-col"><h4>Socials</h4>' + l(C.discord, 'fa-brands fa-discord', 'Discord', 1) + l(C.twitter, 'fa-brands fa-twitter', 'Twitter', 1) + l(C.youtube, 'fa-brands fa-youtube', 'YouTube', 1) + '</div>'
      + '<div class="footer-col"><h4>Contact</h4>' + l(C.contact, 'fa-solid fa-comments', 'Official contact page') + l('mailto:' + C.email, 'fa-solid fa-inbox', C.email) + '</div>'
      + el.innerHTML
      + '</div><div class="footer-bottom">Nomad UI, the design language of this site, may be remixed and reused. Any remix must state "Using Nomad UI" and must not be presented as an official government page.</div></footer>';
  });

  def('page-layout', function (el) {
    var v = g(el, 'variant');
    return '<div class="layout' + (v ? ' ' + (v === 'panel' ? 'has-panel' : v) : '') + '"' + pass(el, ['variant']) + '>' + el.innerHTML + '</div>';
  });
  def('page-main', function (el) { return '<main class="main"' + pass(el) + '>' + el.innerHTML + '</main>'; });
  def('side-bar', function (el) { return '<aside class="sidebar"' + pass(el) + '>' + el.innerHTML + '</aside>'; });

  def('side-section', function (el) {
    var head = has(el, 'logo')
      ? '<img src="' + logo('dark') + '" alt="eServices" class="sidebar-h4-img" data-nm-logo>'
      : esc(g(el, 'title'));
    return '<h4>' + head + '</h4>' + (has(el, 'plain') ? el.innerHTML : '<ul>' + el.innerHTML + '</ul>');
  });
  def('side-link', function (el) {
    var href = g(el, 'href');
    if (href) return '<li><a href="' + esc(href) + '"' + (has(el, 'current') ? ' aria-current="page"' : '') + pass(el, ['href', 'current']) + '>' + el.innerHTML + '</a></li>';
    return '<li><button type="button" class="side-btn"' + pass(el) + '>' + el.innerHTML + '</button></li>';
  });

  def('nm-card', function (el) {
    var t = g(el, 'title');
    return '<div class="card"' + pass(el, ['title']) + '>' + (t ? '<h2>' + esc(t) + '</h2>' : '') + el.innerHTML + '</div>';
  });
  def('nm-lede', function (el) { return '<p class="lede"' + pass(el) + '>' + el.innerHTML + '</p>'; });
  def('nm-stats', function (el) { return '<div class="stats' + (has(el, 'auto') ? ' auto' : '') + '"' + pass(el, ['auto']) + '>' + el.innerHTML + '</div>'; });
  def('nm-stat', function (el) {
    var nid = g(el, 'num-id'), cnt = g(el, 'count');
    return '<div class="stat"' + (cnt ? ' data-count="' + esc(cnt) + '" data-where="' + esc(g(el, 'where')) + '"' : '') + '><span class="stat-num"' + (nid ? ' id="' + esc(nid) + '"' : '') + '>' + esc(g(el, 'num', '...')) + '</span><span class="stat-label">' + esc(g(el, 'label')) + '</span></div>';
  }, function (st) {
    var c = st.getAttribute('data-count'); if (!c) return;
    var w = (st.getAttribute('data-where') || '').split('=');
    firestore().then(function (S) {
      var F = S.F, q = w[0] ? F.query(F.collection(S.db, c), F.where(w[0].trim(), '==', (w[1] || '').trim())) : F.collection(S.db, c);
      return F.getDocs(q);
    }).then(function (snap) { st.querySelector('.stat-num').textContent = snap.size; })
      .catch(function (e) { console.warn('Count unavailable:', e); });
  });
  def('nm-grid', function (el) { return '<div class="grid"' + pass(el) + '>' + el.innerHTML + '</div>'; });
  function tileLead(el) {
    var f = g(el, 'flag'); if (!f) return icon(g(el, 'icon'), 'tile-icon');
    var ic = g(el, 'icon');
    return '<div class="tile-icon has-flag"><img src="' + esc(f) + '" alt="' + esc(g(el, 'title')) + ' flag" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'\'">'
      + '<i class="fa-solid fa-' + esc(ic || 'flag') + '" style="display:none"></i></div>';
  }
  def('nm-tile', function (el) {
    var href = g(el, 'href'), tag = href ? 'a' : 'div';
    return '<' + tag + ' class="tile"' + (href ? ' href="' + esc(href) + '"' : '') + pass(el, ['href', 'title', 'icon', 'flag', 'status', 'live']) + '>'
      + tileLead(el) + '<div class="tile-name">' + esc(g(el, 'title')) + '</div><div class="tile-desc">' + el.innerHTML + '</div>' + pill(el) + '</' + tag + '>';
  });
  def('nm-project', function (el) {
    return '<div class="project"' + pass(el, ['title', 'icon', 'status', 'live', 'logo']) + '>' + icon(g(el, 'icon'), 'project-icon')
      + '<div class="project-info"><div class="project-name">' + (has(el, 'logo') ? '<img src="' + logo('dark') + '" alt="eServices" data-nm-logo style="height:17px;vertical-align:-2px;"> ' : '') + esc(g(el, 'title').trim()) + '</div><div class="project-desc">' + el.innerHTML + '</div></div>' + pill(el) + '</div>';
  });
  def('nm-pill', function (el) {
    return '<span class="pill' + (has(el, 'live') ? ' pill-live' : '') + (has(el, 'block') ? ' block' : '') + '">' + el.innerHTML + '</span>';
  });
  def('nm-notice', function (el) {
    return '<div class="notice"' + pass(el, ['tag']) + '><span class="tag">' + esc(g(el, 'tag')) + '</span>' + el.innerHTML + '</div>';
  });
  def('nm-button', function (el) {
    return '<a class="btn btn-' + esc(g(el, 'variant', 'solid')) + '"' + pass(el, ['variant']) + '>' + el.innerHTML + '</a>';
  });
  def('nm-video', function (el) {
    return '<div class="video-wrap"' + pass(el, ['src', 'title']) + '><iframe src="' + esc(g(el, 'src')) + '" title="' + esc(g(el, 'title', 'Video')) + '" loading="lazy" frameborder="0" '
      + 'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>';
  });
  def('nm-terminal', function (el) {
    return '<div class="terminal"><div class="terminal-code">' + el.innerHTML.replace(/^\n/, '') + '</div></div>';
  });
  def('nm-summary', function (el) {
    return '<div class="summary"' + pass(el, ['icon', 'status', 'live']) + '>' + icon(g(el, 'icon'), 'summary-icon')
      + '<div class="summary-body">' + el.innerHTML + (g(el, 'status') ? '<span class="pill block' + (has(el, 'live') ? ' pill-live' : '') + '">' + esc(g(el, 'status')) + '</span>' : '') + '</div></div>';
  });
  def('nm-brand', function (el) {
    return '<div class="lang-head">' + (g(el, 'mark') ? '<div class="lang-mark">' + esc(g(el, 'mark')) + '</div>' : '') + '<div><div class="lang-name">' + esc(g(el, 'name')) + '</div><div class="lang-tagline">' + esc(g(el, 'tagline')) + '</div></div></div>';
  });

  def('nm-items', function (el) {
    return '<div class="items' + (has(el, 'list') ? ' list' : '') + (has(el, 'divided') ? ' divided' : '') + '"' + pass(el, ['list', 'divided']) + '>' + el.innerHTML + '</div>';
  });
  def('nm-item', function (el) {
    var lead = g(el, 'num') ? '<span class="num">' + esc(g(el, 'num')) + '</span>'
      : g(el, 'icon') ? '<i class="fa-solid fa-' + esc(g(el, 'icon')) + '"></i>' : '';
    return '<div class="item"' + pass(el, ['num', 'icon', 'title', 'tag', 'logo', 'sev']) + '><h3>' + (has(el, 'logo') ? '<img src="' + logo('dark') + '" alt="eServices" class="inline-logo" data-nm-logo>' : '') + lead + esc(g(el, 'title')) + (g(el, 'tag') ? '<span class="item-tag' + (g(el, 'sev') ? ' sev-' + esc(g(el, 'sev')) : '') + '">' + esc(g(el, 'tag')) + '</span>' : '') + '</h3><p>' + el.innerHTML + '</p></div>';
  });
  def('nm-rules', function (el) { return '<div class="rules"' + pass(el) + '>' + el.innerHTML + '</div>'; });
  def('nm-rule', function (el) {
    var will = !has(el, 'wont');
    return '<div class="rule ' + (will ? 'will' : 'wont') + '"><i class="fa-solid fa-' + (will ? 'check' : 'xmark') + '"></i><span>' + el.innerHTML + '</span></div>';
  });

  def('nm-dropdown', function (el) {
    var code = g(el, 'code'), sub = g(el, 'sub'), tag = g(el, 'tag'), chev = '<i class="fa-solid fa-chevron-down chev"></i>';
    var head = (code || sub || tag)
      ? (code ? '<span class="archive-id">' + esc(code) + '</span>' : '')
        + '<div class="archive-summary-body"><div class="archive-name">' + esc(g(el, 'title')) + '</div>' + (sub ? '<div class="archive-sub">' + esc(sub) + '</div>' : '') + '</div>'
        + '<div class="archive-right">' + (tag ? '<span class="pill' + (has(el, 'live') ? ' pill-live' : '') + '">' + esc(tag) + '</span>' : '') + chev + '</div>'
      : '<span>' + esc(g(el, 'title')) + '</span>' + chev;
    return '<details class="archive"' + pass(el, ['title', 'code', 'sub', 'tag', 'live']) + '><summary>' + head + '</summary><div class="archive-body">' + el.innerHTML + '</div></details>';
  });
  def('nm-docs', function (el) { return '<div class="doc-grid"' + pass(el) + '>' + el.innerHTML + '</div>'; });
  def('nm-doc', function (el) {
    var s = esc(g(el, 'src'));
    return '<a href="' + s + '" target="_blank" rel="noopener" class="doc-thumb"><img src="' + s + '" alt="' + esc(g(el, 'alt')) + '"'
      + (g(el, 'w') ? ' width="' + esc(g(el, 'w')) + '"' : '') + (g(el, 'h') ? ' height="' + esc(g(el, 'h')) + '"' : '') + '></a>';
  });
  def('nm-caption', function (el) { return '<p class="archive-caption">' + el.innerHTML + '</p>'; });

  def('nm-eservices', function (el) {
    var dark = has(el, 'on-dark');
    return '<img src="' + logo(dark ? 'grey' : 'dark') + '" alt="eServices" class="inline-logo"' + (dark ? '' : ' data-nm-logo') + '>';
  });

  def('nm-search', function (el) {
    return '<div class="search" data-for="' + esc(g(el, 'for', '.archive')) + '"' + pass(el, ['for', 'placeholder', 'empty']) + '><div class="search-field"><i class="fa-solid fa-magnifying-glass"></i>'
      + '<input type="search" placeholder="' + esc(g(el, 'placeholder', 'Search…')) + '" aria-label="Search" autocomplete="off"></div>'
      + '<p class="search-empty" hidden>' + esc(g(el, 'empty', 'Nothing matches your search.')) + '</p></div>';
  }, function (box) {
    var input = box.querySelector('input'), empty = box.querySelector('.search-empty'), sel = box.getAttribute('data-for');
    input.addEventListener('input', function () {
      var words = input.value.toLowerCase().split(/\s+/).filter(Boolean), shown = 0;
      [].forEach.call(document.querySelectorAll(sel), function (n) {
        var t = n.textContent.toLowerCase(), ok = words.every(function (w) { return t.indexOf(w) > -1; });
        n.style.display = ok ? '' : 'none'; if (ok) shown++;
      });
      empty.hidden = shown > 0 || !words.length;
    });
  });

  def('nm-modal', function (el) {
    var id = g(el, 'id', 'modal');
    return '<div class="modal-overlay" id="' + esc(id) + '"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">'
      + '<button type="button" class="modal-close" data-act="close-modal" aria-label="Close" id="' + esc(id) + '-close-btn"><i class="fa-solid fa-xmark"></i></button>'
      + '<div id="' + esc(id) + '-content"></div></div></div>';
  });
  def('nm-toast', function () {
    return '<div id="toast" role="status"><i class="fa-solid fa-circle-check" id="toast-icon"></i><span id="toast-msg"></span></div>';
  });

  var WX = {
    0: ['Clear sky', 'day-sunny', 'night-clear'], 1: ['Mainly clear', 'day-sunny-overcast', 'night-alt-partly-cloudy'],
    2: ['Partly cloudy', 'day-cloudy', 'night-alt-cloudy'], 3: ['Overcast', 'cloudy'],
    45: ['Fog', 'fog', 'night-fog'], 48: ['Freezing fog', 'fog', 'night-fog'],
    51: ['Light drizzle', 'sprinkle', 'night-alt-sprinkle'], 53: ['Drizzle', 'sprinkle', 'night-alt-sprinkle'], 55: ['Heavy drizzle', 'sprinkle', 'night-alt-sprinkle'],
    56: ['Freezing drizzle', 'rain-mix', 'night-alt-rain-mix'], 57: ['Freezing drizzle', 'rain-mix', 'night-alt-rain-mix'],
    61: ['Light rain', 'rain', 'night-alt-rain'], 63: ['Rain', 'rain', 'night-alt-rain'], 65: ['Heavy rain', 'rain-wind', 'night-alt-rain-wind'],
    66: ['Freezing rain', 'rain-mix', 'night-alt-rain-mix'], 67: ['Freezing rain', 'rain-mix', 'night-alt-rain-mix'],
    71: ['Light snow', 'snow', 'night-alt-snow'], 73: ['Snow', 'snow', 'night-alt-snow'], 75: ['Heavy snow', 'snow-wind', 'night-alt-snow-wind'], 77: ['Snow grains', 'snow', 'night-alt-snow'],
    80: ['Light showers', 'showers', 'night-alt-showers'], 81: ['Showers', 'showers', 'night-alt-showers'], 82: ['Violent showers', 'storm-showers', 'night-alt-storm-showers'],
    85: ['Snow showers', 'snow', 'night-alt-snow'], 86: ['Heavy snow showers', 'snow-wind', 'night-alt-snow-wind'],
    95: ['Thunderstorm', 'thunderstorm', 'night-alt-thunderstorm'], 96: ['Thunderstorm with hail', 'storm-showers', 'night-alt-storm-showers'], 99: ['Severe thunderstorm', 'thunderstorm', 'night-alt-thunderstorm']
  };
  var COMPASS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  var DAY3 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  function wxInfo(code, day) { var w = WX[code] || ['Unknown', 'na']; return { label: w[0], cls: 'wi wi-' + (day === 0 && w[2] ? w[2] : w[1]) }; }

  def('weather-panel', function (el) {
    return '<aside class="weather-panel" aria-label="Local time and weather" data-lat="' + esc(g(el, 'lat', '41.1417')) + '" data-lon="' + esc(g(el, 'lon', '22.5025')) + '" data-tz="' + esc(g(el, 'tz', 'Europe/Skopje')) + '">'
      + '<div class="wx-hero"><i class="wi wi-time-4" data-r="icon" aria-hidden="true"></i></div><div class="wx-body">'
      + '<div class="wx-loc">' + esc(g(el, 'label', 'The Republic of Nomashae')) + '</div>'
      + '<div class="wx-clock" data-r="clock">--:--</div><div class="wx-date" data-r="date"></div><div class="wx-zone" data-r="zone"></div>'
      + '<div class="wx-now"><div class="wx-temp"><span data-r="temp">?</span><small>°C</small></div>'
      + '<div class="wx-cond" aria-live="polite"><span data-r="cond">Loading</span><br><span class="wx-feels" data-r="feelsWrap" style="visibility:hidden">Feels like <span data-r="feels">?</span>°</span></div></div>'
      + '<dl class="wx-list"><div><dt>Humidity</dt><dd data-r="hum">…</dd></div><div><dt>Wind</dt><dd data-r="wind">…</dd></div><div><dt>Sunrise</dt><dd data-r="rise">…</dd></div><div><dt>Sunset</dt><dd data-r="set">…</dd></div></dl>'
      + '<div class="wx-fc" data-r="fc" hidden><h3>Next 3 days</h3><div data-r="fcRows"></div></div>'
      + '<p class="wx-foot"><span class="wx-err">Weather service unreachable. Retrying every minute.</span><span data-r="updated"></span><br>'
      + 'Data by <a href="https://open-meteo.com/" target="_blank" rel="noopener">Open-Meteo</a><br>Weather Icons by <a href="https://erikflowers.github.io/weather-icons/" target="_blank" rel="noopener">CSS Weather Icons</a></p>'
      + '</div></aside>';
  }, function (p) {
    if (!document.getElementById('nm-wi-css')) {
      var l = document.createElement('link'); l.id = 'nm-wi-css'; l.rel = 'stylesheet';
      l.href = 'https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.12/css/weather-icons.min.css';
      document.head.appendChild(l);
    }
    var tz = p.dataset.tz, st = null, timer = null;
    function r(k) { return p.querySelector('[data-r="' + k + '"]'); }
    function fmt(o) { return new Intl.DateTimeFormat('en-GB', Object.assign({ timeZone: tz }, o)); }
    var fT = fmt({ hour: '2-digit', minute: '2-digit', hour12: false }), fD = fmt({ weekday: 'long', day: 'numeric', month: 'long' });
    function zoneText() {
      function part(style) { var x = fmt({ timeZoneName: style }).formatToParts(new Date()).filter(function (q) { return q.type === 'timeZoneName'; })[0]; return x ? x.value : ''; }
      return part('short') + ' (' + part('shortOffset').replace('GMT', 'UTC') + ')';
    }
    function tick() { var n = new Date(); r('clock').textContent = fT.format(n); r('date').textContent = fD.format(n); r('zone').textContent = zoneText(); }

    function paint(j) {
      var c = j.current, d = j.daily, i = wxInfo(c.weather_code, c.is_day);
      r('temp').textContent = Math.round(c.temperature_2m);
      r('icon').className = i.cls; r('cond').textContent = i.label;
      r('feels').textContent = Math.round(c.apparent_temperature); r('feelsWrap').style.visibility = 'visible';
      r('hum').textContent = Math.round(c.relative_humidity_2m) + '%';
      r('wind').textContent = Math.round(c.wind_speed_10m) + ' km/h ' + COMPASS[Math.round(c.wind_direction_10m / 22.5) % 16];
      var today = c.time.slice(0, 10), t = d.time.indexOf(today);
      if (t > -1) { r('rise').textContent = d.sunrise[t].slice(11, 16); r('set').textContent = d.sunset[t].slice(11, 16); }
      var html = '', n = 0;
      for (var k = 0; k < d.time.length && n < 3; k++) {
        if (d.time[k] <= today) continue;
        var w = wxInfo(d.weather_code[k], 1), pr = d.precipitation_probability_max ? d.precipitation_probability_max[k] : null;
        html += '<div class="fc-row"><span class="fc-day">' + DAY3[new Date(d.time[k] + 'T12:00:00Z').getUTCDay()] + ' ' + d.time[k].slice(8) * 1 + '</span>'
          + '<span class="fc-icon" title="' + w.label + '"><i class="' + w.cls + '"></i></span>'
          + '<span class="fc-temp">' + Math.round(d.temperature_2m_max[k]) + '°<span>' + Math.round(d.temperature_2m_min[k]) + '°</span></span>'
          + '<span class="fc-rain">' + (pr == null ? 'n/a' : Math.round(pr) + '%') + '</span></div>';
        n++;
      }
      r('fcRows').innerHTML = html; r('fc').hidden = !n;
      r('updated').textContent = 'Updated ' + fT.format(new Date());
    }
    function load() {
      var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + p.dataset.lat + '&longitude=' + p.dataset.lon
        + '&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,is_day,wind_speed_10m,wind_direction_10m'
        + '&daily=sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max'
        + '&timezone=' + encodeURIComponent(tz) + '&forecast_days=4&wind_speed_unit=kmh';
      fetch(url, { cache: 'no-store' })
        .then(function (x) { if (!x.ok) throw 0; return x.json(); })
        .then(function (j) { if (!j.current) throw 0; st = j; p.classList.remove('is-error'); paint(j); clearTimeout(timer); timer = setTimeout(load, 600000); })
        .catch(function () {
          p.classList.add('is-error');
          if (!st) { r('cond').textContent = 'Unavailable'; r('icon').className = 'wi wi-na'; r('updated').textContent = ''; }
          clearTimeout(timer); timer = setTimeout(load, 60000);
        });
    }
    tick(); setInterval(tick, 30000); load();
  });

  def('nm-form', function (el) { return '<form novalidate' + pass(el) + '>' + el.innerHTML + '</form>'; });

  def('nm-field', function (el) {
    var id = esc(g(el, 'name')), type = g(el, 'type', 'text'), ph = ' placeholder="' + esc(g(el, 'placeholder')) + '"';
    var ac = g(el, 'autocomplete') ? ' autocomplete="' + esc(g(el, 'autocomplete')) + '"' : '';
    var mx = g(el, 'max') ? ' maxlength="' + esc(g(el, 'max')) + '"' : '';
    var ctl = type === 'textarea'
      ? '<textarea id="' + id + '" rows="' + esc(g(el, 'rows', '4')) + '"' + ph + '></textarea>'
      : '<input type="' + esc(type) + '" id="' + id + '"' + ph + ac + mx + '>';
    return '<div class="form-field" data-field="' + id + '"' + (has(el, 'required') ? ' data-req' : '') + (has(el, 'nospace') ? ' data-nospace' : '') + '>'
      + '<label for="' + id + '">' + esc(g(el, 'label')) + (has(el, 'required') ? ' <span class="req">★</span>' : '') + (has(el, 'optional') ? ' <span class="opt">(optional)</span>' : '') + '</label>' + ctl
      + (g(el, 'hint') ? '<div class="field-hint"><i class="fa-solid fa-circle-info"></i> ' + esc(g(el, 'hint')) + '</div>' : '')
      + (g(el, 'error') ? '<div class="field-err">' + esc(g(el, 'error')) + '</div>' : '') + '</div>';
  });

  def('nm-btn', function (el) {
    var ic = g(el, 'icon');
    return '<button type="' + esc(g(el, 'type', 'button')) + '" class="btn-primary' + (has(el, 'block') ? ' btn-block' : '') + '"'
      + (g(el, 'act') ? ' data-act="' + esc(g(el, 'act')) + '"' : '') + pass(el, ['type', 'block', 'act', 'icon']) + '>'
      + (ic ? '<i class="fa-solid fa-' + esc(ic) + '"></i> ' : '') + el.innerHTML + '</button>';
  });

  def('nm-chips', function (el) {
    var n = esc(g(el, 'name'));
    return '<div class="form-field"><label id="' + n + '-label">' + esc(g(el, 'label')) + '</label>'
      + '<div class="cat-selector" role="radiogroup" aria-labelledby="' + n + '-label" data-chips="' + n + '">' + el.innerHTML + '</div></div>';
  });
  def('nm-chip', function (el) {
    var grp = (el.parentElement && el.parentElement.getAttribute('data-chips')) || 'chip';
    var v = g(el, 'value', el.textContent.trim()), id = grp + '-' + v.toLowerCase().replace(/\W+/g, '-');
    return '<input class="cat-opt" type="radio" name="' + esc(grp) + '" id="' + esc(id) + '" value="' + esc(v) + '"' + (has(el, 'checked') ? ' checked' : '') + '>'
      + '<label class="cat-lbl" for="' + esc(id) + '">' + el.innerHTML + '</label>';
  });

  def('nm-filters', function (el) { return '<div class="apps-filters"' + pass(el) + '>' + el.innerHTML + '</div>'; });
  def('nm-filter', function (el) {
    return '<button type="button" class="filter-btn' + (has(el, 'active') ? ' active' : '') + '" data-filter="' + esc(g(el, 'value')) + '"' + pass(el, ['value', 'active']) + '>' + el.innerHTML + '</button>';
  });

  def('nm-view', function (el) {
    return '<div class="admin-view' + (has(el, 'active') ? ' active' : '') + '" id="view-' + esc(g(el, 'name')) + '"' + pass(el, ['name', 'active']) + '>' + el.innerHTML + '</div>';
  });
  def('nm-list', function (el) {
    return '<div' + pass(el, ['loading']) + '><p class="empty">' + esc(g(el, 'loading', 'Loading…')) + '</p></div>';
  });

  def('nm-portal', function () { return '<i hidden data-nm-portal></i>'; }, function () {
    Promise.resolve().then(function () {
      var V = 'https://www.gstatic.com/firebasejs/10.12.2/';
      Promise.all([import(V + 'firebase-app.js'), import(V + 'firebase-firestore.js'), import(V + 'firebase-auth.js')])
        .then(function (m) { portal(m[0], m[1], m[2]); })
        .catch(function (e) { console.error(e); toast('Could not load Firebase.', true); });
    });
  });

  function portal(A, F, H) {
    var $ = function (id) { return document.getElementById(id); };
    var fmtDate = function (ts, o) { return ts && ts.toDate ? ts.toDate().toLocaleDateString('en-GB', o) : 'n/a'; };
    var BADGE = { pending: 'badge-pending', approved: 'badge-approved', rejected: 'badge-rejected', waitlisted: 'badge-waitlist' };
    var LOGIN_LABEL = '<i class="fa-solid fa-right-to-bracket"></i> Sign in';
    var appCache = new Map(), lastSnap = null, currentFilter = 'all';

    var app = A.initializeApp(FIREBASE_CONFIG), db = F.getFirestore(app), auth = H.getAuth(app);
    var col = function (n) { return F.collection(db, n); };
    var nameOf = function (d) { return d.firstname + (d.lastname ? ' ' + d.lastname : ''); };

    H.onAuthStateChanged(auth, function (user) {
      $('login-layout').hidden = !!user;
      $('admin-layout').hidden = !user;
      if (user) {
        $('admin-email-display').textContent = user.email;
        loadDashboard(); loadApplications(); loadNewsArchive();
      } else {
        var b = $('login-btn'); b.disabled = false; b.innerHTML = LOGIN_LABEL;
        $('login-pass').value = '';
        appCache.clear(); lastSnap = null;
        ['dash-stats', 'dash-recent', 'apps-list', 'news-admin-list'].forEach(function (id) { $(id).innerHTML = ''; });
        closeModal(); showView('dashboard');
      }
    });

    $('login-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var email = $('login-email').value.trim(), pass = $('login-pass').value, b = $('login-btn');
      if (!email || !pass) return toast('Enter your email and password.', true);
      b.disabled = true; b.innerHTML = '<span class="spinner"></span>';
      H.signInWithEmailAndPassword(auth, email, pass).catch(function (err) {
        b.disabled = false; b.innerHTML = LOGIN_LABEL; console.error(err);
        var bad = ['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found', 'auth/invalid-email'];
        toast(bad.indexOf(err.code) > -1 ? 'Sign in failed. Check your email and password.'
          : err.code === 'auth/too-many-requests' ? 'Too many attempts. Wait a few minutes and try again.'
          : 'Sign in failed (' + (err.code || 'unknown error') + ').', true);
      });
    });

    function showView(id) {
      [].forEach.call(document.querySelectorAll('.admin-view'), function (v) { v.classList.toggle('active', v.id === 'view-' + id); });
      [].forEach.call(document.querySelectorAll('.side-btn[data-view]'), function (b) {
        if (b.dataset.view === id) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function actBtn(act, id, label, cls, status) {
      return '<button type="button" class="act-btn ' + cls + '" data-act="' + act + '" data-id="' + esc(id) + '"' + (status ? ' data-status="' + status + '"' : '') + '>' + label + '</button>';
    }
    function statusBtns(act, id, d) {
      return (d.status !== 'approved' ? actBtn(act, id, 'Approve', 'approve', 'approved') : '')
        + (d.status !== 'rejected' ? actBtn(act, id, 'Reject', 'reject', 'rejected') : '')
        + (d.status !== 'waitlisted' ? actBtn(act, id, 'Waitlist', 'waitlist', 'waitlisted') : '');
    }
    function appRow(id, d) {
      retu

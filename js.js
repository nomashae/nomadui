
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
      return '<div class="app-row"><div class="app-info">'
        + '<div class="app-name">' + esc(nameOf(d)) + ' <span class="app-user">· @' + esc(d.username) + '</span></div>'
        + '<div class="app-meta"><span>' + esc(d.trackId) + '</span><span>' + esc(d.region) + '</span><span>' + esc(fmtDate(d.submittedAt, { day: 'numeric', month: 'short' })) + '</span>' + (d.email ? '<span>' + esc(d.email) + '</span>' : '') + '</div></div>'
        + '<span class="badge ' + (BADGE[d.status] || 'badge-pending') + '">' + esc(d.status) + '</span>'
        + '<div class="app-actions">' + actBtn('view', id, '<i class="fa-solid fa-eye"></i> View', '') + statusBtns('status', id, d) + '</div></div>';
    }

    async function loadDashboard() {
      try {
        var st = ['pending', 'approved', 'rejected', 'waitlisted'];
        var r = await Promise.all(st.map(function (s) { return F.getCountFromServer(F.query(col('applications'), F.where('status', '==', s))); })
          .concat([F.getCountFromServer(col('news')), F.getDocs(F.query(col('applications'), F.orderBy('submittedAt', 'desc'), F.limit(5)))]));
        var n = r.slice(0, 4).map(function (x) { return x.data().count; });
        var stats = [['Total Applications', n[0] + n[1] + n[2] + n[3]], ['Pending', n[0]], ['Approved', n[1]], ['Rejected', n[2]], ['Waitlisted', n[3]], ['News Posts', r[4].data().count]];
        $('dash-stats').innerHTML = stats.map(function (s) { return '<div class="stat"><span class="stat-num">' + s[1] + '</span><span class="stat-label">' + s[0] + '</span></div>'; }).join('');
        $('pending-badge').textContent = n[0] || '';
        var html = '';
        r[5].forEach(function (d) { appCache.set(d.id, d.data()); html += appRow(d.id, d.data()); });
        $('dash-recent').innerHTML = html || '<p class="empty">No applications yet.</p>';
      } catch (e) { console.error(e); $('dash-recent').innerHTML = '<p class="empty">Could not load the dashboard.</p>'; }
    }

    async function loadApplications() {
      try {
        var snap = await F.getDocs(F.query(col('applications'), F.orderBy('submittedAt', 'desc')));
        snap.forEach(function (d) { appCache.set(d.id, d.data()); });
        renderApps(snap);
      } catch (e) { console.error(e); $('apps-list').innerHTML = '<p class="empty" style="color:var(--err)">Error loading applications.</p>'; }
    }
    function renderApps(snap) {
      if (snap) lastSnap = snap;
      var rows = [];
      if (lastSnap) lastSnap.forEach(function (d) { rows.push({ id: d.id, data: appCache.get(d.id) || d.data() }); });
      if (currentFilter !== 'all') rows = rows.filter(function (a) { return a.data.status === currentFilter; });
      $('apps-list').innerHTML = rows.length ? rows.map(function (a) { return appRow(a.id, a.data); }).join('') : '<p class="empty">No applications found.</p>';
    }

    async function update(id, patch, ok) {
      try { await F.updateDoc(F.doc(db, 'applications', id), patch); toast(ok); await Promise.all([loadApplications(), loadDashboard()]); }
      catch (e) { toast('Error: ' + e.message, true); }
    }
    function noteVal() { var n = $('modal-note'); return n ? n.value : ''; }
    function setStatus(id, status, withNote) {
      var patch = { status: status };
      if (withNote) patch.adminNote = noteVal();
      if (status === 'approved') patch.approvedAt = F.serverTimestamp();
      return update(id, patch, 'Status updated to ' + status);
    }

    
    function openModal(id) {
      var d = appCache.get(id); if (!d) return;
      var rows = [['Track ID', d.trackId], ['Name', nameOf(d) + ' (@' + d.username + ')'], ['Email', d.email], ['Date of birth', d.dob], ['Region', d.region],
        ['Nation', d.nationKey || d.nation], ['Skills', d.skills], ['Heard via', d.source], ['Submitted', fmtDate(d.submittedAt, { day: 'numeric', month: 'long', year: 'numeric' })]]
        .filter(function (r) { return r[1] && r[1] !== 'n/a'; });
      $('modal-content').innerHTML = '<h2 id="modal-title">Application Detail</h2>'
        + rows.map(function (r) { return '<div class="modal-field"><div class="mk">' + r[0] + '</div><div class="mv">' + esc(r[1]) + '</div></div>'; }).join('')
        + '<div class="modal-field"><div class="mk">Status</div><div class="mv"><span class="badge ' + (BADGE[d.status] || 'badge-pending') + '">' + esc(d.status) + '</span></div></div>'
        + (d.statement ? '<div class="modal-label">Statement</div><div class="modal-statement">' + esc(d.statement) + '</div>' : '')
        + '<div class="form-divider"></div><div class="form-field"><label for="modal-note">Admin note (visible to applicant)</label>'
        + '<textarea id="modal-note" rows="3" placeholder="Optional note to the applicant…">' + esc(d.adminNote || '') + '</textarea></div>'
        + '<div class="modal-actions">' + statusBtns('modal-status', id, d) + actBtn('save-note', id, '<i class="fa-solid fa-floppy-disk"></i> Save Note', '') + '</div>';
      $('modal').classList.add('open'); $('modal-close-btn').focus();
    }
    function closeModal() { $('modal').classList.remove('open'); }
    $('modal').addEventListener('click', function (e) { if (e.target === $('modal')) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

    
    async function postNews() {
      var title = $('news-title').value.trim(), body = $('news-body').value.trim();
      var author = $('news-author').value.trim() || 'Ministry of Nomashae';
      var c = document.querySelector('input[name="cat"]:checked');
      if (!title || !body) return toast('Headline and body are required.', true);
      try {
        await F.addDoc(col('news'), { title: title, body: body, author: author, category: c ? c.value : 'Announcement', createdAt: F.serverTimestamp() });
        $('news-title').value = $('news-body').value = $('news-author').value = '';
        toast('News published.'); loadNewsArchive(); loadDashboard();
      } catch (e) { toast('Error: ' + e.message, true); }
    }
    async function loadNewsArchive() {
      var el = $('news-admin-list');
      try {
        var snap = await F.getDocs(F.query(col('news'), F.orderBy('createdAt', 'desc')));
        if (snap.empty) { el.innerHTML = '<p class="empty">No news posted yet.</p>'; return; }
        var html = '';
        snap.forEach(function (d) {
          var n = d.data();
          html += '<div class="news-admin-row"><div class="news-admin-info"><div class="news-admin-title">' + esc(n.title) + '</div>'
            + '<div class="news-admin-meta">' + esc(n.category) + ' · ' + esc(fmtDate(n.createdAt, { day: 'numeric', month: 'short', year: 'numeric' })) + ' · ' + esc(n.author) + '</div></div>'
            + actBtn('delete-news', d.id, '<i class="fa-solid fa-trash"></i> Delete', 'reject') + '</div>';
        });
        el.innerHTML = html;
      } catch (e) { console.error(e); el.innerHTML = '<p class="empty">Could not load the news archive.</p>'; }
    }
    async function deleteNews(id) {
      if (!confirm('Delete this news post? This cannot be undone.')) return;
      try { await F.deleteDoc(F.doc(db, 'news', id)); toast('Post deleted.'); loadNewsArchive(); loadDashboard(); }
      catch (e) { toast('Error: ' + e.message, true); }
    }

    
    document.addEventListener('click', function (e) {
      var el = e.target.closest('[data-act],[data-view],[data-filter]'); if (!el) return;
      var d = el.dataset;
      if (d.view) return showView(d.view);
      if (d.filter) {
        currentFilter = d.filter;
        [].forEach.call(document.querySelectorAll('.filter-btn'), function (b) { b.classList.toggle('active', b === el); });
        return renderApps();
      }
      switch (d.act) {
        case 'logout': H.signOut(auth).then(function () { toast('Signed out.'); }); break;
        case 'view': openModal(d.id); break;
        case 'status': setStatus(d.id, d.status); break;
        case 'modal-status': setStatus(d.id, d.status, true); closeModal(); break;
        case 'save-note': update(d.id, { adminNote: noteVal() }, 'Note saved.'); break;
        case 'close-modal': closeModal(); break;
        case 'post-news': postNews(); break;
        case 'delete-news': deleteNews(d.id); break;
      }
    });
  }

  
  def('nm-cols', function (el) { return '<div class="grid-2"' + pass(el) + '>' + el.innerHTML + '</div>'; });
  def('nm-star', function () { return '<span class="req">★</span>'; });

  def('nm-choices', function (el) {      
    var n = esc(g(el, 'name'));
    return '<div class="choice-field" data-field="' + n + '"' + (has(el, 'required') ? ' data-req' : '') + '><div class="region-grid" data-choices="' + n + '">' + el.innerHTML + '</div>'
      + (g(el, 'error') ? '<div class="field-err">' + esc(g(el, 'error')) + '</div>' : '') + '</div>';
  });
  def('nm-group', function (el) { return '<div class="nation-header">' + esc(g(el, 'title')) + '</div>' + el.innerHTML; });
  def('nm-choice', function (el) {
    var box = el.closest('[data-choices]'), grp = box ? box.getAttribute('data-choices') : 'choice';
    var v = g(el, 'value', el.textContent.trim()), id = grp + '-' + v.toLowerCase().replace(/\W+/g, '-');
    return '<input class="region-option" type="radio" name="' + esc(grp) + '" id="' + esc(id) + '" value="' + esc(v) + '">'
      + '<label class="region-label" for="' + esc(id) + '"><div class="region-dot"></div><div><span class="region-text">' + el.innerHTML + '</span>'
      + (g(el, 'sub') ? '<span class="region-sub">' + esc(g(el, 'sub')) + '</span>' : '') + '</div></label>';
  });

  def('nm-check', function (el) {
    var id = esc(g(el, 'name'));
    return '<div class="form-field check-field" data-field="' + id + '"' + (has(el, 'required') ? ' data-req' : '') + '><label class="check" for="' + id + '"><input type="checkbox" id="' + id + '"><span>'
      + el.innerHTML + (has(el, 'required') ? ' <span class="req">★</span>' : '') + '</span></label>'
      + (g(el, 'error') ? '<div class="field-err">' + esc(g(el, 'error')) + '</div>' : '') + '</div>';
  });
  def('nm-review', function (el) { return '<div class="review-block" data-items="' + esc(g(el, 'items')) + '"></div>'; });

  def('nm-step', function (el) {         
    var n = +g(el, 'n', 1), ic = g(el, 'icon');
    var nav = '<div class="step-nav">'
      + (n > 1 ? '<button type="button" class="btn-ghost" data-act="prev"><i class="fa-solid fa-arrow-left"></i> ' + esc(g(el, 'back', 'Back')) + '</button>' : '<span></span>')
      + (has(el, 'last')
        ? '<button type="button" class="btn-primary" id="submit-btn" data-act="submit"><i class="fa-solid fa-paper-plane"></i> ' + esc(g(el, 'next', 'Submit')) + '</button>'
        : '<button type="button" class="btn-primary" data-act="next">' + esc(g(el, 'next', 'Next')) + ' <i class="fa-solid fa-arrow-right"></i></button>')
      + '</div>';
    return '<div class="form-step' + (n === 1 ? ' active' : '') + '" data-step="' + n + '"' + pass(el, ['n', 'last', 'title', 'label', 'icon', 'sub', 'note', 'next', 'back']) + '>'
      + '<div class="form-title">' + (ic ? '<i class="fa-solid fa-' + esc(ic) + '"></i> ' : '') + esc(g(el, 'title')) + '</div>'
      + (g(el, 'sub') ? '<p class="form-subtitle">' + esc(g(el, 'sub')) + '</p>' : '')
      + (g(el, 'note') ? '<p class="form-note"><i class="fa-solid fa-circle-info"></i> ' + esc(g(el, 'note')) + '</p>' : '')
      + el.innerHTML + nav + '</div>';
  });

  def('nm-success', function (el) {      
    return '<div class="card success-screen"' + pass(el, ['title']) + '><div class="success-icon"><i class="fa-solid fa-check"></i></div><h2>' + esc(g(el, 'title', 'Done')) + '</h2>' + el.innerHTML + '</div>';
  });
  def('nm-tracker', function (el) {
    return '<span class="label">' + esc(g(el, 'label')) + '</span><button type="button" class="tracker-id" id="tracker-id-display" title="Click to copy" data-act="copy-id">......</button>'
      + '<p class="tracker-hint"><i class="fa-regular fa-copy"></i> ' + esc(g(el, 'hint')) + '</p>';
  });
  def('nm-actions', function (el) { return '<div class="success-actions"' + pass(el) + '>' + el.innerHTML + '</div>'; });

  def('nm-apply', function (el) {        
    var steps = [].slice.call(el.querySelectorAll(':scope > nm-step'));
    steps.forEach(function (s, i) { s.setAttribute('n', i + 1); if (i === steps.length - 1) s.setAttribute('last', ''); });
    var bar = steps.map(function (s, i) {
      return '<div class="step-node' + (i ? '' : ' active') + '" data-step="' + (i + 1) + '"><div class="step-circle">' + (i + 1) + '</div><div class="step-lbl">' + esc(g(s, 'label', g(s, 'title'))) + '</div></div>';
    }).join('');
    return '<div class="wizard" data-collection="' + esc(g(el, 'collection', 'applications')) + '" data-done="' + esc(g(el, 'done')) + '"' + pass(el, ['collection', 'done']) + '>'
      + '<div class="progress-bar">' + bar + '</div>' + el.innerHTML + '</div>';
  }, function (box) {
    var step = 1, FB = null;

    function fb() {                      
      if (!FB) {
        var V = 'https://www.gstatic.com/firebasejs/10.12.2/';
        FB = Promise.all([import(V + 'firebase-app.js'), import(V + 'firebase-firestore.js')]).then(function (m) {
          return { F: m[1], db: m[1].getFirestore(m[0].initializeApp(FIREBASE_CONFIG)) };
        });
        FB.catch(function () { FB = null; });
      }
      return FB;
    }
    Promise.resolve().then(fb).catch(function () {});

    function val(name) {
      var e = document.getElementById(name);
      if (e) return e.type === 'checkbox' ? e.checked : e.value.trim();
      var r = box.querySelector('input[name="' + name + '"]:checked');
      return r ? r.value : '';
    }
    function check(stepEl) {             
      var ok = true;
      [].forEach.call(stepEl.querySelectorAll('[data-field]'), function (f) {
        var v = val(f.getAttribute('data-field'));
        var bad = (f.hasAttribute('data-req') && !v) || (f.hasAttribute('data-nospace') && /\s/.test(v));
        f.classList.toggle('error', bad); if (bad) ok = false;
      });
      return ok;
    }
    function review() {                  
      [].forEach.call(box.querySelectorAll('.review-block'), function (b) {
        b.replaceChildren();
        b.getAttribute('data-items').split(';').forEach(function (it) {
          var p = it.split('='), row = document.createElement('div'), k = document.createElement('span'), v = document.createElement('span');
          row.className = 'review-row'; k.className = 'review-key'; v.className = 'review-val';
          k.textContent = p[0].trim(); v.textContent = val((p[1] || '').trim()) || 'Not given';
          row.append(k, v); b.append(row);
        });
      });
    }
    function show(i) {
      [].forEach.call(box.querySelectorAll('.form-step'), function (s) { s.classList.toggle('active', +s.getAttribute('data-step') === i); });
      [].forEach.call(box.querySelectorAll('.step-node'), function (nd) {
        var s = +nd.getAttribute('data-step'); nd.classList.toggle('active', s === i); nd.classList.toggle('done', s < i);
      });
      if (box.querySelector('.form-step.active .review-block')) review();
      window.scrollTo({ top: 0, behavior: 'smooth' }); step = i;
    }

    
    var CH = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';   
    function bytes(n) { return crypto.getRandomValues(new Uint8Array(n)); }
    function trackId() {
      var b = bytes(8), p = function (i) { return CH[b[i] % 32]; };
      return 'NM-' + [0, 1, 2, 3].map(p).join('') + '-' + [4, 5, 6, 7].map(p).join('');
    }
    function hex() { return '#' + Array.from(bytes(3), function (x) { return x.toString(16).padStart(2, '0'); }).join('').toUpperCase(); }
    function nationKey(r) {
      if (!r) return 'neutral';
      if (r.indexOf('Fire') > -1) return 'fire';
      if (r.indexOf('Earth') === 0 || ['Ba Sing Se', 'Omashu', 'Foggy Swamp', 'Kyoshi Island', 'Inner Earth', 'Lower Ring'].some(function (x) { return r.indexOf(x) > -1; })) return 'earth';
      if (r.indexOf('Water') > -1 || r.indexOf('Foggy Seas') > -1) return 'water';
      if (r.indexOf('Air') > -1 || r.indexOf('Sky') > -1) return 'air';
      return 'neutral';
    }

    async function submit(btn) {
      var all = box.querySelectorAll('.form-step');
      for (var i = 0; i < all.length; i++) if (!check(all[i])) return show(i + 1);

      var label = btn.innerHTML, reset = function () { btn.disabled = false; btn.innerHTML = label; };
      btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> Submitting…';

      var S;
      try { S = await fb(); }
      catch (e) { console.error(e); reset(); return toast('Cannot reach the service right now. Refresh the page and try again.', true); }

      try {
        var id = trackId(), s1 = hex(), s2 = hex(), region = val('region');
        while (s1 === s2) s2 = hex();
        await S.F.addDoc(S.F.collection(S.db, box.getAttribute('data-collection')), {
          trackId: id, firstname: val('firstname'), lastname: val('lastname'), username: val('username'),
          region: region, nationKey: nationKey(region), status: 'pending',
          secretHex1: s1, secretHex2: s2,                    
          submittedAt: S.F.serverTimestamp(), adminNote: ''
        });
        document.getElementById('tracker-id-display').textContent = id;
        box.closest('.card').hidden = true;
        document.getElementById(box.getAttribute('data-done')).classList.add('show');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {
        reset(); console.error(e);
        toast(e && (e.code === 'unavailable' || (e.message || '').indexOf('offline') > -1)
          ? 'No internet connection. Try again when you are online.'
          : 'Submission failed. Try again, and contact ' + C.email + ' if it keeps happening.', true);
      }
    }

    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]'); if (!b) return;
      var a = b.getAttribute('data-act');
      if (a === 'next') { if (check(b.closest('.form-step'))) show(step + 1); }
      else if (a === 'prev') show(step - 1);
      else if (a === 'submit') submit(b);
    });
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-act="copy-id"]'); if (!b) return;
      if (navigator.clipboard) navigator.clipboard.writeText(b.textContent).catch(function () {});
      toast('Tracking ID copied to clipboard.');
    });
  });

  
  function fmtTrack(el) {                
    var v = el.value.toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/^NM/, '');
    el.value = 'NM-' + (v.length <= 4 ? v : v.slice(0, 4) + '-' + v.slice(4, 8));
  }
  var LIBS = {};
  function lib(src) {                    
    if (!LIBS[src]) {
      LIBS[src] = new Promise(function (ok, no) {
        var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s);
      }).catch(function (e) { delete LIBS[src]; throw e; });
    }
    return LIBS[src];
  }
  var FS = null;
  function firestore() {                 
    if (!FS) {
      var V = 'https://www.gstatic.com/firebasejs/10.12.2/';
      FS = Promise.all([import(V + 'firebase-app.js'), import(V + 'firebase-firestore.js')]).then(function (m) {
        return { F: m[1], db: m[1].getFirestore(m[0].initializeApp(FIREBASE_CONFIG)) };
      });
      FS.catch(function () { FS = null; });
    }
    return FS;
  }

  def('nm-trackbar', function (el) {     
    var ic = g(el, 'icon');
    return '<div class="track-row"' + pass(el, ['button', 'icon', 'label', 'placeholder']) + '><div class="form-field"><label for="inp-track">' + esc(g(el, 'label', 'Tracking ID')) + '</label>'
      + '<input type="text" id="inp-track" placeholder="' + esc(g(el, 'placeholder', 'NM-XXXX-XXXX')) + '" maxlength="12" autocomplete="off"></div>'
      + '<button type="button" class="btn-primary" data-act="lookup">' + (ic ? '<i class="fa-solid fa-' + esc(ic) + '"></i> ' : '') + esc(g(el, 'button', 'Look up')) + '</button></div>';
  }, function (row) {
    var input = row.querySelector('input'), btn = row.querySelector('button');
    input.addEventListener('input', function () { fmtTrack(input); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') btn.click(); });
  });

  def('nm-idcard', function (el) {       
    return '<div class="idcard-app"' + pass(el) + '>' + el.innerHTML + '<div id="card-result" aria-live="polite"></div></div>';
  }, function (box) {
    var NATION = {
      fire:    { label: 'Fire Nation',   icon: '🔥', cls: 'card-fire' },
      water:   { label: 'Water Tribe',   icon: '💧', cls: 'card-water' },
      air:     { label: 'Air Nomads',    icon: '🌀', cls: 'card-air' },
      earth:   { label: 'Earth Kingdom', icon: '🌍', cls: 'card-earth' },
      neutral: { label: 'Republic City', icon: '⚖️', cls: 'card-neutral' }
    };
    var QR = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    var H2C = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    var out = function () { return box.querySelector('#card-result'); };

    async function load() {
      var raw = box.querySelector('#inp-track').value.trim().toUpperCase();
      if (!/^NM-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(raw)) return toast('Enter the full Tracking ID, e.g. NM-XXXX-XXXX.', true);
      out().innerHTML = '<div class="loading"><span class="spinner"></span></div>';

      var S;
      try { S = await firestore(); }
      catch (e) { console.error(e); out().innerHTML = ''; return toast('Cannot reach the service right now. Refresh the page and try again.', true); }

      try {
        var F = S.F, snap = await F.getDocs(F.query(F.collection(S.db, 'applications'), F.where('trackId', '==', raw)));
        if (snap.empty) {
          out().innerHTML = '<div class="card"><h2>Not Found</h2><p>No application was found with that Tracking ID. Check it and try again, or submit a new application.</p>'
            + '<div class="state-actions"><a class="btn-ghost" href="citizenship.html"><i class="fa-solid fa-scroll"></i> Apply for Citizenship</a></div></div>';
          return;
        }
        var d = snap.docs[0].data();
        if (d.status !== 'approved') {
          var label = { pending: 'Pending Review', rejected: 'Rejected', waitlisted: 'Waitlisted', waitlist: 'Waitlisted' };
          out().innerHTML = '<div class="card"><h2>Application ' + esc(label[d.status] || d.status) + '</h2>'
            + '<p>Your Citizen ID card is only available after the Ministry has <strong>approved</strong> your application.</p>'
            + '<div class="state-actions"><a class="btn-ghost" href="track.html?id=' + encodeURIComponent(d.trackId) + '"><i class="fa-solid fa-magnifying-glass"></i> Check Status</a></div></div>';
          return;
        }
        renderCard(d);
      } catch (e) { out().innerHTML = ''; toast('Could not reach the Ministry. Try again shortly.', true); console.error(e); }
    }

    function renderCard(d) {             
      var meta = NATION[d.nationKey] || NATION[d.nation] || NATION.neutral;
      var fmt = { day: 'numeric', month: 'short', year: 'numeric' };
      var issued = (d.approvedAt && d.approvedAt.toDate ? d.approvedAt.toDate() : new Date()).toLocaleDateString('en-GB', fmt);
      var num = 'C-' + d.trackId.replace('NM-', '').replace('-', '');          
      var name = d.firstname + (d.lastname ? ' ' + d.lastname : '');

      out().innerHTML = `
        <div class="card">
          <h2>Your Citizen ID</h2>
          <div class="card-scene"><div class="id-card-wrap">
            <div class="id-card ${meta.cls}" id="id-card-el">
              <div class="id-card-header">
                <div><div class="id-card-nation">${meta.icon} ${meta.label}</div><div class="id-card-logo">Nomashae</div></div>
                <div class="id-card-mark">${meta.icon}</div>
              </div>
              <div class="id-card-stripe"></div>
              <div class="id-card-body">
                <div class="id-card-track">${esc(d.trackId)}</div>
                <span class="id-card-label">Full Name</span>
                <span class="id-card-value big">${esc(name)}</span>
                <div class="id-card-row">
                  <div><span class="id-card-label">Username</span><span class="id-card-value">@${esc(d.username)}</span></div>
                  <div><span class="id-card-label">Citizen No.</span><span class="id-card-value">${esc(num)}</span></div>
                </div>
                <div class="id-card-row">
                  <div><span class="id-card-label">Region</span><span class="id-card-value small">${esc(d.region)}</span></div>
                  <div><span class="id-card-label">Issued</span><span class="id-card-value">${esc(issued)}</span></div>
                </div>
              </div>
              <div class="id-card-footer">
                <div><div class="id-card-footer-seal">⚖</div><div class="id-card-footer-text">Republic of<br>Nomashae</div></div>
                <div class="qr-box" id="qr-container"></div>
              </div>
            </div>
          </div></div>
          <div class="card-actions">
            <button type="button" class="btn-primary" data-act="download"><i class="fa-solid fa-download"></i> Download Card</button>
            <button type="button" class="btn-ghost" data-act="print"><i class="fa-solid fa-print"></i> Print</button>
          </div>
          <div class="notice result-notice"><span class="tag">Secret citizen codes</span>
            <p>Your secret codes are stored in the Ministry's records. They were assigned when you applied, are never shown publicly, and are only used by Ministry officials to verify your identity.</p></div>
        </div>`;

      
      var url = location.origin + location.pathname.replace('id-card.html', '') + 'track.html?id=' + encodeURIComponent(d.trackId);
      lib(QR).then(function () {
        new window.QRCode(box.querySelector('#qr-container'), { text: url, width: 64, height: 64, colorDark: '#000000', colorLight: '#ffffff', correctLevel: window.QRCode.CorrectLevel.M });
      }).catch(function (e) { console.error(e); });
      lib(H2C).catch(function () {});    
    }

    function download() {
      var el = box.querySelector('#id-card-el'); if (!el) return;
      lib(H2C).then(function () { return window.html2canvas(el, { scale: 3, useCORS: true, backgroundColor: null }); })
        .then(function (canvas) {
          var a = document.createElement('a'); a.download = 'nomashae-citizen-id.png'; a.href = canvas.toDataURL('image/png'); a.click();
        })
        .catch(function (e) { console.error(e); toast('The card could not be downloaded. Try again, or use Print.', true); });
    }

    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]'); if (!b) return;
      var a = b.getAttribute('data-act');
      if (a === 'lookup') load(); else if (a === 'download') download(); else if (a === 'print') window.print();
    });

    Promise.resolve().then(function () {   
      var t = new URLSearchParams(location.search).get('track'), input = box.querySelector('#inp-track');
      if (t && input) { input.value = t; fmtTrack(input); load(); }
    });
  });

  def('nm-news', function (el) {         
    return '<div class="news-list" data-collection="' + esc(g(el, 'collection', 'news')) + '" data-limit="' + esc(g(el, 'limit', '9')) + '"' + pass(el, ['collection', 'limit']) + '>'
      + '<div class="notice"><span class="tag">Loading</span><p>Loading the latest news from the Ministry…</p></div></div>';
  }, function (list) {
    function P(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; n.textContent = text; return n; }   
    function notice(tag, title, body, bodyCls, meta) {
      var box = P('div', 'notice');
      box.append(P('span', 'tag', tag));
      if (title) box.append(P('p', 'notice-title', title));
      if (body) box.append(P('p', 'desc ' + (bodyCls || ''), body));
      if (meta) box.append(P('p', 'desc', meta));
      return box;
    }
    firestore().then(function (S) {
      var F = S.F;
      return F.getDocs(F.query(F.collection(S.db, list.getAttribute('data-collection')), F.orderBy('createdAt', 'desc'), F.limit(+list.getAttribute('data-limit'))));
    }).then(function (snap) {
      list.replaceChildren();
      if (snap.empty) { list.append(notice('Nothing posted', 'No news yet.', 'New decrees and announcements will appear here.')); return; }
      snap.forEach(function (doc) {
        var d = doc.data();
        var date = d.createdAt && d.createdAt.toDate ? d.createdAt.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent';
        list.append(notice((d.category || 'Announcement') + ' · ' + date, d.title, d.body, 'news-body', d.author || 'Ministry of Nomashae'));
      });
    }).catch(function (e) {
      console.warn('News unavailable:', e);
      list.replaceChildren(notice('Unavailable', 'News could not be loaded.', 'Refresh the page to try again. If it keeps happening, contact ' + C.email + '.'));
    });
  });

  
  var SEL = Object.keys(R).join(',');
  function run(root) {
    var el, tpl = document.createElement('template');
    while ((el = (root || document).querySelector(SEL))) {   
      var d = R[el.localName];
      tpl.innerHTML = d.render(el);
      var first = tpl.content.firstElementChild;
      el.replaceWith(tpl.content);
      if (d.mount && first) d.mount(first);
    }
  }

  
  var dark = false;
  try { dark = localStorage.getItem('nmDark') === 'true'; } catch (e) {}
  function applyTheme() {
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
    var b = document.getElementById('dark-btn');
    if (b) { b.classList.toggle('active', dark); b.textContent = dark ? 'Light' : 'Dark'; }
    [].forEach.call(document.querySelectorAll('img[data-nm-logo]'), function (i) { i.src = logo(dark ? 'grey' : 'dark'); });
  }
  function toggleTheme() { dark = !dark; try { localStorage.setItem('nmDark', dark); } catch (e) {} applyTheme(); }
  document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('#dark-btn')) toggleTheme(); });

  function syncBar() {
    var bar = document.querySelector('.top-bar');
    if (bar) document.documentElement.style.setProperty('--bar-h', bar.offsetHeight + 'px');
  }
  var tt;
  function toast(msg, isErr) {
    var t = document.getElementById('toast'); if (!t) return;
    document.getElementById('toast-msg').textContent = msg;
    document.getElementById('toast-icon').className = isErr ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-circle-check';
    t.classList.add('show'); clearTimeout(tt); tt = setTimeout(function () { t.classList.remove('show'); }, 3500);
  }

  function openHash() {                  
    var id = location.hash.slice(1), d = id && document.getElementById(id);
    if (d && d.tagName === 'DETAILS') d.open = true;
  }
  function init() {
    run(); applyTheme(); syncBar(); openHash();
    window.addEventListener('hashchange', openHash);
    window.addEventListener('resize', syncBar); window.addEventListener('load', syncBar);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.Nomad = { config: C, render: run, toast: toast, toggleTheme: toggleTheme, define: def };
})();

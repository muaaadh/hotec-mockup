/* Hotec — shared behaviour: icons, navigation, footer, basket, reveal */
(function () {
  'use strict';
  var H = window.HOTEC;

  /* ---------- icons ---------- */
  var ICONS = {
    'arrow-right': '<path d="M5 12h14M12 5l7 7-7 7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    plus: '<path d="M5 12h14M12 5v14"/>',
    minus: '<path d="M5 12h14"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    bed: '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>',
    sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r="1"/>',
    store: '<path d="M3 9 4.5 3h15L21 9"/><path d="M3 9h18v1a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z"/><path d="M5 12.5V21h14v-8.5"/><path d="M10 21v-5h4v5"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8M16 13H8M16 17H8"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
  };
  function icon(name, cls) {
    return '<svg class="ic' + (name === 'star' ? ' fill' : '') + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
  }
  function hydrateIcons(root) {
    (root || document).querySelectorAll('i[data-i]').forEach(function (el) {
      var t = document.createElement('template');
      t.innerHTML = icon(el.getAttribute('data-i'), el.className);
      el.replaceWith(t.content.firstChild);
    });
  }
  function stars(rating) {
    var s = '<span class="stars" role="img" aria-label="' + rating + ' out of 5">';
    for (var i = 1; i <= 5; i++) s += icon('star', i <= Math.round(rating) ? '' : 'off');
    return s + '</span>';
  }
  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }

  /* ---------- storage ---------- */
  function read(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem('hotec.' + key)); return v == null ? fallback : v; } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem('hotec.' + key, JSON.stringify(value)); } catch (e) { /* private mode: keep going */ }
  }
  var Cart = {
    items: function () {
      return read('cart', []).filter(function (l) { return H.product(l.id) && l.qty > 0; });
    },
    count: function () { return Cart.items().reduce(function (n, l) { return n + l.qty; }, 0); },
    total: function () { return Cart.items().reduce(function (n, l) { return n + l.qty * H.product(l.id).price; }, 0); },
    add: function (id, qty) {
      var items = Cart.items(), line = items.find(function (l) { return l.id === id; });
      if (line) line.qty = Math.min(99, line.qty + (qty || 1)); else items.push({ id: id, qty: Math.min(99, qty || 1) });
      write('cart', items); Cart.changed();
    },
    set: function (id, qty) {
      var items = Cart.items().map(function (l) { return l.id === id ? { id: id, qty: Math.max(0, Math.min(99, qty)) } : l; })
        .filter(function (l) { return l.qty > 0; });
      write('cart', items); Cart.changed();
    },
    clear: function () { write('cart', []); Cart.changed(); },
    changed: function () {
      var n = Cart.count();
      document.querySelectorAll('.cart-count').forEach(function (el) { el.textContent = n; el.setAttribute('data-n', n); });
      document.dispatchEvent(new CustomEvent('hotec:cart'));
    }
  };

  /* ---------- toast ---------- */
  var toastTimer;
  function toast(msg, linkText, linkHref) {
    var el = document.querySelector('.toast');
    if (!el) { el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.innerHTML = '<span>' + esc(msg) + '</span>' + (linkText ? '<a href="' + esc(linkHref) + '">' + esc(linkText) + '</a>' : '');
    el.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-on'); }, 3600);
  }

  /* ---------- nav + footer ---------- */
  var viberHref = 'viber://chat?number=' + encodeURIComponent(H.contact.viber);
  function renderNav() {
    var host = document.getElementById('nav'); if (!host) return;
    var page = document.body.getAttribute('data-page') || '';
    var onHero = host.hasAttribute('data-on-hero');
    var session = read('session', null);
    var links = [
      ['products.html', 'Products', 'products'],
      ['index.html#why', 'Why Hotec', ''],
      ['index.html#areas', 'Who it is for', ''],
      ['index.html#reviews', 'Reviews', ''],
      ['index.html#faq', 'Questions', '']
    ];
    var linkHtml = links.map(function (l) {
      return '<a href="' + l[0] + '"' + (l[2] && l[2] === page ? ' aria-current="page"' : '') + '>' + l[1] + '</a>';
    }).join('');
    var accountLabel = session ? 'My account' : 'Sign in';
    host.outerHTML =
      '<nav class="nav' + (onHero ? ' on-hero' : ' is-solid') + '" aria-label="Main">' +
        '<div class="nav-in">' +
          '<a class="brand" href="index.html" aria-label="Hotec home"><img src="assets/img/logo.png" alt="" width="46" height="46"><span>Hotec</span></a>' +
          '<div class="nav-links">' + linkHtml + '</div>' +
          '<div class="nav-side">' +
            '<a class="nav-account" href="account.html" aria-label="' + (session ? 'My account' : 'Sign in') + '">' + icon('user') + '<span>' + accountLabel + '</span></a>' +
            '<a class="btn btn-primary" href="order.html">Order <span class="cart-count" data-n="0" aria-label="items in your order">0</span></a>' +
            '<button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">' + icon('menu') + '</button>' +
          '</div>' +
        '</div>' +
      '</nav>' +
      '<div class="mnav" id="mnav" aria-hidden="true">' +
        '<div class="mnav-sheet" role="dialog" aria-label="Menu">' +
          '<div class="mnav-top"><a class="brand" href="index.html"><img src="assets/img/logo.png" alt="" width="40" height="40"><span>Hotec</span></a>' +
          '<button class="nav-toggle" style="display:grid" type="button" aria-label="Close menu">' + icon('x') + '</button></div>' +
          links.map(function (l) { return '<a class="mlink" href="' + l[0] + '">' + l[1] + icon('arrow-right') + '</a>'; }).join('') +
          '<a class="mlink" href="account.html">' + (session ? 'My account' : 'Sign in or create an account') + icon('arrow-right') + '</a>' +
          '<a class="btn btn-primary btn-block" href="order.html">Go to your order</a>' +
        '</div>' +
      '</div>';

    var nav = document.querySelector('.nav'), mnav = document.getElementById('mnav');
    if (onHero) {
      var onScroll = function () { nav.classList.toggle('is-solid', window.scrollY > 40); };
      window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }
    var openBtn = nav.querySelector('.nav-toggle');
    function setMenu(open) {
      mnav.classList.toggle('is-open', open); mnav.setAttribute('aria-hidden', String(!open));
      openBtn.setAttribute('aria-expanded', String(open));
      document.documentElement.style.overflow = open ? 'hidden' : '';
    }
    openBtn.addEventListener('click', function () { setMenu(true); });
    mnav.addEventListener('click', function (e) {
      if (e.target === mnav || e.target.closest('.nav-toggle') || e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  function renderFoot() {
    var host = document.getElementById('foot'); if (!host) return;
    host.outerHTML =
      '<footer class="foot">' +
        '<div class="wrap foot-in">' +
          '<div class="foot-left">' +
            '<a class="brand" href="index.html"><img src="assets/img/logo.png" alt="" width="46" height="46"><span>Hotec</span></a>' +
            '<h2>Well designed, well made, well priced.</h2>' +
            '<p class="lead">Appliances and equipment for homes, restaurants and guest houses across the Maldives.</p>' +
            '<a class="btn btn-primary btn-lg" href="order.html">Start your order</a>' +
            '<div class="foot-contact">' +
              '<a href="' + viberHref + '">' + icon('chat') + 'Viber ' + H.contact.viberDisplay + '</a>' +
              '<a href="' + H.contact.instagram + '" target="_blank" rel="noopener">' + icon('instagram') + 'Instagram ' + H.contact.instagramHandle + '</a>' +
            '</div>' +
            '<div class="foot-links">' +
              '<a href="index.html">Home</a><a href="products.html">Products</a><a href="order.html">Order</a>' +
              '<a href="account.html">Account</a><a href="index.html#faq">Questions</a>' +
            '</div>' +
            '<small>© 2026 Hotec. All rights reserved.</small>' +
          '</div>' +
          '<div class="foot-media"><img src="assets/img/scene/tall.webp" alt="" loading="lazy"></div>' +
        '</div>' +
      '</footer>';
  }

  /* ---------- reveal ---------- */
  function reveal() {
    var els = document.querySelectorAll('[data-rv]');
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  window.HotecUI = { icon: icon, hydrateIcons: hydrateIcons, stars: stars, esc: esc, read: read, write: write, Cart: Cart, toast: toast, viberHref: viberHref, reveal: reveal };

  renderNav();
  renderFoot();
  hydrateIcons();
  Cart.changed();
  document.addEventListener('DOMContentLoaded', reveal);
  window.__hotecReady = true;
})();

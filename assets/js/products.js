/* Hotec — product catalogue and product detail */
(function () {
  'use strict';
  var H = window.HOTEC, UI = window.HotecUI, icon = UI.icon, esc = UI.esc;
  var params = new URLSearchParams(location.search);
  var state = { area: H.areas[params.get('for')] ? params.get('for') : 'all', cat: 'all', sort: 'popular' };

  var catalog = document.getElementById('catalog'), count = document.getElementById('count');
  var dlg = document.getElementById('dlg');

  function visible() {
    var list = H.products.filter(function (p) {
      return (state.area === 'all' || p.areas.indexOf(state.area) > -1) && (state.cat === 'all' || p.cat === state.cat);
    });
    var by = {
      popular: function (a, b) { return b.reviewCount - a.reviewCount; },
      rating: function (a, b) { return b.rating - a.rating || b.reviewCount - a.reviewCount; },
      low: function (a, b) { return a.price - b.price; },
      high: function (a, b) { return b.price - a.price; }
    };
    return list.sort(by[state.sort]);
  }

  function card(p) {
    return '<article class="card pcard">' +
      '<button class="pcard-art" type="button" data-open="' + p.id + '" aria-label="See details: ' + esc(p.brand + ' ' + p.name) + '">' +
        (p.badge ? '<span class="tag pcard-badge">' + esc(p.badge) + '</span>' : '') +
        '<img src="' + H.cutOf(p) + '" alt="" loading="lazy">' +
      '</button>' +
      '<div class="pcard-body">' +
        '<span class="pcard-brand">' + esc(p.brand) + '</span>' +
        '<h3><button type="button" data-open="' + p.id + '">' + esc(p.name) + '</button></h3>' +
        '<p class="pcard-tag">' + esc(p.tagline) + '</p>' +
        '<div class="pcard-rate">' + UI.stars(p.rating) + '<span>' + p.rating.toFixed(1) + ' (' + p.reviewCount + ')</span></div>' +
        '<div class="pcard-foot"><span class="price">' + H.money(p.price) + '</span>' +
        '<button class="btn btn-primary" type="button" data-add="' + p.id + '" aria-label="Add ' + esc(p.name) + ' to your order">' + icon('plus') + 'Add</button></div>' +
      '</div></article>';
  }

  function quoteCard() {
    return '<aside class="quote-card">' +
      '<span class="pill pill-glass" style="align-self:flex-start">' + icon('building') + 'For businesses</span>' +
      '<h3>Need commercial equipment or a full kitchen?</h3>' +
      '<p>We also supply Convotherm, Bartscher, Icematic and Bormioli Rocco. Send us your list and we will prepare a quotation.</p>' +
      '<a class="btn btn-white" href="order.html?account=business">Request a quotation</a>' +
      '</aside>';
  }

  function render() {
    var list = visible();
    document.querySelectorAll('.fchip').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-area') === state.area)); });
    count.textContent = list.length + (list.length === 1 ? ' product' : ' products') + (state.area !== 'all' ? ', ' + H.areas[state.area].toLowerCase() : '');
    if (!list.length) {
      catalog.innerHTML = '<div class="card empty" style="grid-column:1/-1"><h3 class="h3">Nothing matches those filters</h3><p style="margin-top:8px">Try another category, or message us on Viber and we will find it for you.</p></div>';
      return;
    }
    var html = list.map(card);
    if (state.area !== 'home') html.splice(Math.min(3, html.length), 0, quoteCard());
    catalog.innerHTML = html.join('');
  }

  /* ---------- product detail ---------- */
  function openProduct(id, push) {
    var p = H.product(id); if (!p) return;
    var shots = (p.cutOnly ? [] : p.photos.map(function (n) { return { src: H.photoOf(n), cut: false }; }))
      .concat([{ src: H.cutOf(p), cut: true }]);
    if (p.cutOnly) shots = shots.concat(p.photos.map(function (n) { return { src: H.photoOf(n), cut: false }; }));
    var mine = H.reviews.filter(function (r) { return r.product === p.id; });
    var shown = mine.length ? mine : H.reviews.slice(0, 2);
    var uspRows = [['sparkles', 'Design', p.usp.design], ['shield', 'Quality', p.usp.quality], ['tag', 'Value', p.usp.value]];
    var qty = 1;

    dlg.innerHTML =
      '<div class="dlg-in">' +
        '<div class="dlg-media">' +
          '<div class="dlg-main' + (shots[0].cut ? ' is-cut' : '') + '"><img src="' + shots[0].src + '" alt="' + esc(p.brand + ' ' + p.name) + '"></div>' +
          (shots.length > 1 ? '<div class="thumbs">' + shots.map(function (s, i) {
            return '<button type="button" data-shot="' + i + '" aria-pressed="' + (i === 0) + '" aria-label="Photo ' + (i + 1) + '"><img src="' + s.src + '" alt="" style="' + (s.cut ? 'object-fit:contain;padding:8px' : '') + '"></button>';
          }).join('') + '</div>' : '') +
        '</div>' +
        '<div class="dlg-body">' +
          '<button class="dlg-x" type="button" data-close aria-label="Close">' + icon('x') + '</button>' +
          '<span class="tag">' + esc(p.brand) + (p.badge ? ' · ' + esc(p.badge) : '') + '</span>' +
          '<h2 id="dlg-title">' + esc(p.name) + '</h2>' +
          '<span class="price">' + H.money(p.price) + '</span>' +
          '<div class="rating-line">' + UI.stars(p.rating) + '<span>' + p.rating.toFixed(1) + ' from ' + p.reviewCount + ' reviews</span></div>' +
          '<div class="product-desc"><p><b style="color:var(--ink);font-weight:500">' + esc(p.tagline) + '</b></p><p>' + esc(p.desc) + '</p></div>' +
          '<p class="dlg-sub">What makes it different</p>' +
          '<ul class="usp" style="margin-top:8px">' + uspRows.map(function (u) {
            return '<li><span class="u-ic">' + icon(u[0]) + '</span><div><b>' + u[1] + '</b><span>' + esc(u[2]) + '</span></div></li>';
          }).join('') + '</ul>' +
          '<div class="specs">' + p.specs.map(function (s) {
            return '<div class="card spec" style="box-shadow:inset 0 0 0 1px var(--line)"><b>' + esc(s[1]) + '</b><span>' + esc(s[0]) + '</span></div>';
          }).join('') + '</div>' +
          '<div class="buy">' +
            '<div class="qty"><button type="button" data-q="-1" aria-label="One fewer">' + icon('minus') + '</button><output aria-live="polite">1</output><button type="button" data-q="1" aria-label="One more">' + icon('plus') + '</button></div>' +
            '<button class="btn btn-primary" type="button" data-buy>Add to order</button>' +
          '</div>' +
          '<p class="hint" style="margin-top:12px">Suits: ' + p.areas.map(function (a) { return H.areas[a].replace('For ', '').replace(/^./, function (c) { return c.toUpperCase(); }); }).join(', ') + '. Buying for a business? Add it, then ask for a quotation at checkout.</p>' +
          '<p class="dlg-sub">' + (mine.length ? 'Customer reviews' : 'Recent reviews from Hotec customers') + '</p>' +
          '<div class="dlg-reviews">' + shown.map(function (r) {
            return '<div class="dlg-review">' + UI.stars(r.rating) + ' <b>' + esc(r.who) + '</b>, ' + esc(r.role) + '<br>' + esc(r.text) + '</div>';
          }).join('') + '</div>' +
        '</div>' +
      '</div>';

    dlg.onclick = function (e) {
      if (e.target === dlg || e.target.closest('[data-close]')) { dlg.close(); return; }
      var s = e.target.closest('[data-shot]');
      if (s) {
        var shot = shots[+s.getAttribute('data-shot')], main = dlg.querySelector('.dlg-main');
        main.classList.toggle('is-cut', shot.cut); main.querySelector('img').src = shot.src;
        dlg.querySelectorAll('[data-shot]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === s)); });
        return;
      }
      var q = e.target.closest('[data-q]');
      if (q) { qty = Math.max(1, Math.min(99, qty + (+q.getAttribute('data-q')))); dlg.querySelector('.qty output').textContent = qty; return; }
      if (e.target.closest('[data-buy]')) {
        UI.Cart.add(p.id, qty); dlg.close();
        UI.toast((qty > 1 ? qty + ' × ' : '') + p.name + ' added to your order', 'View order', 'order.html');
      }
    };
    if (!dlg.open) dlg.showModal();
    dlg.querySelector('.dlg-body').scrollTop = 0;
    if (push !== false) history.replaceState(null, '', '?p=' + p.id + (state.area !== 'all' ? '&for=' + state.area : ''));
  }
  dlg.addEventListener('close', function () {
    history.replaceState(null, '', state.area !== 'all' ? '?for=' + state.area : location.pathname);
  });

  /* ---------- events ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('.fchip');
    if (a) { state.area = a.getAttribute('data-area'); history.replaceState(null, '', state.area !== 'all' ? '?for=' + state.area : location.pathname); render(); return; }
    var o = e.target.closest('[data-open]');
    if (o) { openProduct(o.getAttribute('data-open')); return; }
    var add = e.target.closest('[data-add]');
    if (add) {
      var p = H.product(add.getAttribute('data-add'));
      UI.Cart.add(p.id, 1);
      UI.toast(p.name + ' added to your order', 'View order', 'order.html');
    }
  });
  document.getElementById('cat').addEventListener('change', function (e) { state.cat = e.target.value; render(); });
  document.getElementById('sort').addEventListener('change', function (e) { state.sort = e.target.value; render(); });

  render();
  if (params.get('p')) openProduct(params.get('p'), false);
})();

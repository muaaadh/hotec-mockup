/* Hotec — home page */
(function () {
  'use strict';
  var H = window.HOTEC, UI = window.HotecUI, icon = UI.icon, esc = UI.esc;

  document.querySelectorAll('[data-viber]').forEach(function (a) { a.href = UI.viberHref; });

  function addBtn(p, label, cls) {
    return '<button class="btn ' + (cls || 'btn-primary') + '" type="button" data-add="' + p.id + '">' + label + '</button>';
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-add]'); if (!b) return;
    var p = H.product(b.getAttribute('data-add'));
    UI.Cart.add(p.id, 1);
    UI.toast(p.name + ' added to your order', 'View order', 'order.html');
  });

  /* mini card in "Why Hotec" */
  var f = H.product('pizza-oven');
  var mini = document.getElementById('mini');
  if (mini) {
    mini.innerHTML =
      '<a class="mini-thumb" href="products.html?p=' + f.id + '"><img src="' + H.cutOf(f) + '" alt="' + esc(f.brand + ' ' + f.name) + '" loading="lazy"></a>' +
      '<div><h4>' + esc(f.brand + ' ' + f.name) + '</h4><p>' + esc(f.tagline) + '</p>' +
      addBtn(f, 'Add to order, ' + H.money(f.price)) + '</div>';
  }

  /* featured product */
  var fb = document.getElementById('featured-body');
  if (fb) {
    var uspRows = [['sparkles', 'Design', f.usp.design], ['shield', 'Quality', f.usp.quality], ['tag', 'Value', f.usp.value]];
    var fr = H.reviews.filter(function (r) { return r.product === f.id; })[0];
    fb.innerHTML =
      '<div class="product-left" data-rv>' +
        '<span class="pill">' + icon('star') + esc(f.badge) + '</span>' +
        '<div class="product-head"><h2>' + esc(f.brand + ' ' + f.name) + '</h2><span class="price">' + H.money(f.price) + '</span></div>' +
        '<div class="rating-line">' + UI.stars(f.rating) + '<span>' + f.rating.toFixed(1) + ' from ' + f.reviewCount + ' reviews</span></div>' +
        '<div class="product-desc"><p><b style="color:var(--ink);font-weight:500">' + esc(f.tagline) + '</b></p><p>' + esc(f.desc) + '</p></div>' +
        '<ul class="usp">' + uspRows.map(function (u) {
          return '<li><span class="u-ic">' + icon(u[0]) + '</span><div><b>' + u[1] + '</b><span>' + esc(u[2]) + '</span></div></li>';
        }).join('') + '</ul>' +
        '<button class="btn btn-primary btn-lg btn-block" type="button" data-add="' + f.id + '">Add to order</button>' +
        '<div class="specs">' + f.specs.map(function (s) {
          return '<div class="card spec"><b>' + esc(s[1]) + '</b><span>' + esc(s[0]) + '</span></div>';
        }).join('') + '</div>' +
        (fr ? '<div class="card review" style="margin-top:22px"><div class="review-top"><div class="review-who"><span class="avatar">' + esc(fr.who.charAt(0)) + '</span><div><b>' + esc(fr.who) + '</b><span>' + esc(fr.role) + '</span></div></div>' + UI.stars(fr.rating) + '</div><blockquote>' + esc(fr.text) + '</blockquote></div>' : '') +
      '</div>' +
      '<div class="product-right">' + f.photos.map(function (ph, i) {
        return '<div class="card shot" data-rv style="--i:' + (i + 1) + '"><img src="' + H.photoOf(ph) + '" alt="' + esc(f.brand + ' ' + f.name) + (i ? ', close up of the controls' : '') + '" loading="lazy" width="1080" height="675"></div>';
      }).join('') +
        '<a class="card shot" data-rv style="--i:3;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px 26px;color:var(--ink);font-weight:500" href="products.html?p=' + f.id + '"><span>Full details and all reviews</span>' + icon('arrow-right') + '</a>' +
      '</div>';
  }

  /* overall score */
  var score = document.getElementById('score');
  if (score) {
    var r = H.rating, max = Math.max.apply(null, r.breakdown);
    score.innerHTML =
      '<div><div class="score-n">' + r.average.toFixed(1) + '</div>' + UI.stars(r.average) + '<small>' + r.count + ' ratings</small></div>' +
      '<div class="bars">' + r.breakdown.map(function (n, i) {
        return '<div class="bar"><span>' + (5 - i) + '</span><i><b style="width:' + Math.round(n / max * 100) + '%"></b></i><span>' + n + '</span></div>';
      }).join('') + '</div>';
  }

  /* review cards */
  var list = document.getElementById('review-list');
  if (list) {
    list.innerHTML = H.reviews.map(function (rv, i) {
      var p = H.product(rv.product);
      return '<article class="card review" data-rv style="--i:' + (i % 3) + '">' +
        '<div class="review-top"><div class="review-who"><span class="avatar">' + esc(rv.who.charAt(0)) + '</span><div><b>' + esc(rv.who) + '</b><span>' + esc(rv.role) + '</span></div></div>' + UI.stars(rv.rating) + '</div>' +
        '<blockquote>' + esc(rv.text) + '</blockquote>' +
        '<div class="about"><span class="tag' + (rv.type === 'business' ? ' biz' : '') + '">' + (rv.type === 'business' ? 'Business account' : 'Customer account') + '</span>' +
        (p ? '<a href="products.html?p=' + p.id + '">' + esc(p.name) + '</a>' : '') + '</div>' +
      '</article>';
    }).join('');
  }

  /* popular grid: Hotec's own photos with their own captions */
  function ov(id) {
    var p = H.product(id);
    return '<a class="ov" data-rv href="products.html?p=' + p.id + '">' +
      '<img src="' + H.photoOf(p.photos[0]) + '" alt="' + esc(p.brand + ' ' + p.name) + '" loading="lazy">' +
      '<span class="ov-price pill">' + H.money(p.price) + '</span>' +
      '<span class="ov-cap"><b>' + esc(p.brand + ' ' + p.name) + '</b><span>' + esc(p.tagline) + '</span></span></a>';
  }
  var g2 = document.getElementById('popular-2'), g3 = document.getElementById('popular-3');
  if (g2) g2.innerHTML = ['food-processor', 'ice-machine'].map(ov).join('');
  if (g3) g3.innerHTML = ['blender', 'oven', 'induction'].map(ov).join('');
})();

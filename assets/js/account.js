/* Hotec — account page: customer and business accounts.
   Mockup: the account lives in this browser (localStorage). Passwords are never stored. */
(function () {
  'use strict';
  var H = window.HOTEC, UI = window.HotecUI, icon = UI.icon, esc = UI.esc;
  var authView = document.getElementById('auth-view'), dashView = document.getElementById('dash-view');
  var createForm = document.getElementById('pane-create'), signForm = document.getElementById('pane-signin');
  var side = document.getElementById('auth-side');

  var SIDE = {
    personal: {
      title: 'A customer account, for your home',
      img: 'capri-blender',
      points: [['bag', 'Track your orders', 'See what you ordered and where it is.'], ['truck', 'Saved delivery details', 'No retyping your address each time.'], ['repeat', 'Order again', 'Repeat a past order in one tap.']]
    },
    business: {
      title: 'A business account, for your team',
      img: 'ice-machine',
      points: [['file', 'Quotations first', 'Get a price for your full list before you commit.'], ['building', 'Company invoices', 'Invoices in your business name, with your GST TIN.'], ['repeat', 'Repeat orders', 'Reorder the same set for another room or outlet.']]
    }
  };

  function fieldErr(form, name, text) {
    var input = form.elements.namedItem(name), field = input.closest('.field'), err = field.querySelector('.err');
    field.classList.toggle('bad', !!text); if (err) err.textContent = text || '';
    if (text) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
    return !text;
  }
  function createType() { return createForm.querySelector('input[name="type"]:checked').value; }
  function applyType() {
    var t = createType();
    createForm.querySelectorAll('[data-only]').forEach(function (n) { n.hidden = n.getAttribute('data-only') !== t; });
    var s = SIDE[t];
    side.innerHTML = '<span class="pill pill-glass" style="align-self:flex-start">' + icon(t === 'business' ? 'building' : 'user') + (t === 'business' ? 'Business account' : 'Customer account') + '</span>' +
      '<h2>' + s.title + '</h2><ul>' + s.points.map(function (p) {
        return '<li><span class="u-ic">' + icon(p[0]) + '</span><div><b>' + p[1] + '</b>' + p[2] + '</div></li>';
      }).join('') + '</ul><img src="assets/img/cut/' + s.img + '.webp" alt="">';
  }

  /* ---------- signed out ---------- */
  function showAuth() {
    dashView.hidden = true; authView.hidden = false;
    applyType();
  }
  document.querySelectorAll('.tabs [role="tab"]').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.tabs [role="tab"]').forEach(function (t) {
        var on = t === tab; t.setAttribute('aria-selected', String(on));
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
    });
  });
  createForm.addEventListener('change', function (e) { if (e.target.name === 'type') applyType(); });
  [createForm, signForm].forEach(function (f) {
    f.addEventListener('input', function (e) { if (e.target.closest('.field.bad') && e.target.name) fieldErr(f, e.target.name, ''); });
  });

  createForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var t = createType(), ok = true, first = null, f = createForm;
    function v(name) { return f.elements.namedItem(name).value.trim(); }
    function check(name, good, text) { if (!fieldErr(f, name, good ? '' : text)) { ok = false; first = first || f.elements.namedItem(name); } }
    if (t === 'business') {
      check('business', v('business').length > 1, 'Enter your business name.');
      check('btype', !!v('btype'), 'Choose the type of business.');
    }
    check('name', v('name').length > 1, t === 'business' ? 'Enter the name of the contact person.' : 'Enter your name.');
    check('mobile', v('mobile').replace(/\D/g, '').length >= 7, 'Enter your mobile number.');
    if (t === 'business' || v('email')) check('email', /^\S+@\S+\.\S+$/.test(v('email')), 'Enter a valid email address.');
    check('password', f.elements.namedItem('password').value.length >= 6, 'Use at least 6 characters.');
    if (!ok) { first.focus(); return; }
    var account = { type: t, name: v('name'), mobile: v('mobile'), email: v('email'), business: t === 'business' ? v('business') : '', btype: t === 'business' ? v('btype') : '', tin: t === 'business' ? v('tin') : '', method: 'deliver', island: '', address: '' };
    UI.write('account', account);
    UI.write('session', { name: account.business || account.name, type: t, mobile: account.mobile });
    location.reload();
  });

  signForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = signForm, account = UI.read('account', null);
    var mobile = f.elements.namedItem('mobile').value.replace(/\D/g, '');
    var okM = fieldErr(f, 'mobile', mobile.length >= 7 ? '' : 'Enter your mobile number.');
    var okP = fieldErr(f, 'password', f.elements.namedItem('password').value.length ? '' : 'Enter your password.');
    if (!okM || !okP) return;
    if (!account || account.mobile.replace(/\D/g, '') !== mobile) {
      fieldErr(f, 'mobile', 'We could not find an account with that number. Create one in the first tab.'); return;
    }
    UI.write('session', { name: account.business || account.name, type: account.type, mobile: account.mobile });
    location.reload();
  });

  /* ---------- signed in ---------- */
  function fmtDate(iso) {
    var d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function showDash(session, account) {
    authView.hidden = true; dashView.hidden = false;
    var orders = UI.read('orders', []);
    var biz = account.type === 'business';
    var rows = orders.length ? orders.map(function (o, i) {
      return '<div class="orow">' +
        '<div><b>' + esc(o.code) + '</b> <span class="status' + (o.quote ? ' q' : '') + '">' + (o.quote ? 'Quotation requested' : 'Order received') + '</span>' +
          '<small>' + fmtDate(o.date) + ' · ' + o.items.map(function (it) { return it.qty + ' × ' + esc(it.name); }).join(', ') + '</small>' +
          '<small>' + (o.details.method === 'deliver' ? 'Deliver to ' + esc(o.details.island) : 'Collect in store') + '</small></div>' +
        '<div style="text-align:right;display:grid;gap:8px;justify-items:end;align-content:start"><b>' + H.money(o.total) + '</b>' +
          '<button class="btn btn-ghost" type="button" data-again="' + i + '" style="min-height:40px;font-size:15.5px;padding:0 16px">' + icon('repeat') + 'Order again</button></div>' +
      '</div>';
    }).join('') : '<p>No orders yet. When you send an order, it will show here with its status.</p><a class="btn btn-primary" href="products.html" style="margin-top:14px">Browse products</a>';

    function kv(label, value) { return value ? '<div><dt>' + label + '</dt><dd>' + esc(value) + '</dd></div>' : ''; }
    dashView.innerHTML =
      '<div class="dash-head">' +
        '<div><span class="pill">' + icon(biz ? 'building' : 'user') + (biz ? 'Business account' : 'Customer account') + '</span>' +
        '<h1 style="font-size:clamp(32px,4vw,48px);letter-spacing:-0.03em;margin-top:14px">Hello, ' + esc(session.name) + '</h1></div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-primary" href="order.html">' + (biz ? 'New order or quotation' : 'New order') + '</a>' +
        '<button class="btn btn-ghost" type="button" id="signout">Sign out</button></div>' +
      '</div>' +
      '<div class="dash-grid">' +
        '<section class="card panel" aria-labelledby="d-orders"><h2 id="d-orders" style="font-size:23px;margin-bottom:18px">' + (biz ? 'Orders and quotations' : 'Your orders') + '</h2>' + rows + '</section>' +
        '<div>' +
          '<section class="card panel" aria-labelledby="d-details"><h2 id="d-details" style="font-size:23px;margin-bottom:16px">' + (biz ? 'Business details' : 'Your details') + '</h2>' +
            '<dl class="kv" style="margin:0">' + kv('Business', account.business) + kv('Type', account.btype) + kv('GST TIN', account.tin) +
              kv(biz ? 'Contact' : 'Name', account.name) + kv('Mobile', account.mobile) + kv('Email', account.email) +
              kv('Delivery', account.address ? account.address + ', ' + account.island : '') + '</dl>' +
            '<p class="note">These details fill in automatically when you order.</p></section>' +
          '<section class="card panel" style="background:linear-gradient(160deg,#2c6bb0,var(--blue-d));color:#fff">' +
            '<h2 style="font-size:21px;color:#fff">Need help with an order?</h2>' +
            '<p style="color:rgba(255,255,255,.88);font-size:16.5px;margin-top:6px">Message us on Viber at ' + H.contact.viberDisplay + ' and quote your order number.</p>' +
            '<a class="btn btn-white" href="' + UI.viberHref + '" style="margin-top:16px">' + icon('chat') + 'Open Viber</a></section>' +
        '</div>' +
      '</div>';

    document.getElementById('signout').addEventListener('click', function () {
      try { localStorage.removeItem('hotec.session'); } catch (e) { /* ignore */ }
      location.reload();
    });
    dashView.addEventListener('click', function (e) {
      var b = e.target.closest('[data-again]'); if (!b) return;
      var o = orders[+b.getAttribute('data-again')];
      o.items.forEach(function (it) { if (H.product(it.id)) UI.Cart.add(it.id, it.qty); });
      location.href = 'order.html';
    });
  }

  var session = UI.read('session', null), account = UI.read('account', null);
  if (session && account) showDash(session, account); else showAuth();
})();

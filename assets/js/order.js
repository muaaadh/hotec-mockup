/* Hotec — order page: basket, customer or business account, send order.
   Mockup: orders are kept in this browser (localStorage). Nothing is sent to a server yet. */
(function () {
  'use strict';
  var H = window.HOTEC, UI = window.HotecUI, icon = UI.icon, esc = UI.esc, Cart = UI.Cart;
  var form = document.getElementById('order-form');
  var lines = document.getElementById('lines'), totals = document.getElementById('totals');
  var submit = document.getElementById('submit'), msg = document.getElementById('form-msg');
  var params = new URLSearchParams(location.search);
  var session = UI.read('session', null), account = UI.read('account', null);

  function el(name) { return form.elements.namedItem(name); }
  function type() { return form.querySelector('input[name="account"]:checked').value; }
  function method() { return form.querySelector('input[name="method"]:checked').value; }

  /* ---------- account type ---------- */
  function applyType() {
    var t = type();
    form.querySelectorAll('[data-only]').forEach(function (n) { n.hidden = n.getAttribute('data-only') !== t; });
    updateSubmit();
  }
  function applyMethod() {
    var d = method() === 'deliver';
    document.getElementById('deliver-fields').hidden = !d;
    document.getElementById('collect-note').hidden = d;
  }
  function updateSubmit() {
    var empty = Cart.count() === 0;
    var quote = type() === 'business' && el('quote').checked;
    submit.textContent = quote ? 'Request quotation' : 'Send order';
    submit.disabled = empty;
  }

  /* ---------- summary ---------- */
  function renderLines() {
    var items = Cart.items();
    if (!items.length) {
      lines.innerHTML = '<p>Your order is empty.</p><a class="btn btn-ghost" href="products.html" style="justify-self:start">Browse products ' + icon('arrow-right') + '</a>';
      totals.innerHTML = '';
      updateSubmit(); return;
    }
    lines.innerHTML = items.map(function (l) {
      var p = H.product(l.id);
      return '<div class="line">' +
        '<div class="line-art"><img src="' + H.cutOf(p) + '" alt=""></div>' +
        '<div><b>' + esc(p.name) + '</b><small>' + esc(p.brand) + ' · ' + H.money(p.price) + ' each</small>' +
          '<div class="qty"><button type="button" data-q="-1" data-id="' + p.id + '" aria-label="One fewer ' + esc(p.name) + '">' + icon('minus') + '</button>' +
          '<output>' + l.qty + '</output>' +
          '<button type="button" data-q="1" data-id="' + p.id + '" aria-label="One more ' + esc(p.name) + '">' + icon('plus') + '</button></div></div>' +
        '<div class="line-end"><b>' + H.money(p.price * l.qty) + '</b><button class="rm" type="button" data-rm="' + p.id + '">Remove</button></div>' +
      '</div>';
    }).join('');
    totals.innerHTML =
      '<div><span>Items (' + Cart.count() + ')</span><span>' + H.money(Cart.total()) + '</span></div>' +
      '<div><span>Delivery</span><span>Confirmed with you</span></div>' +
      '<div class="grand"><span>Total</span><span>' + H.money(Cart.total()) + '</span></div>';
    updateSubmit();
  }
  lines.addEventListener('click', function (e) {
    var q = e.target.closest('[data-q]'), rm = e.target.closest('[data-rm]');
    if (q) { var id = q.getAttribute('data-id'); var cur = Cart.items().find(function (l) { return l.id === id; }); Cart.set(id, (cur ? cur.qty : 0) + (+q.getAttribute('data-q'))); }
    if (rm) Cart.set(rm.getAttribute('data-rm'), 0);
  });
  document.addEventListener('hotec:cart', renderLines);

  /* ---------- validation ---------- */
  function setErr(name, text) {
    var input = el(name), field = input.closest('.field'), err = field.querySelector('.err');
    field.classList.toggle('bad', !!text); if (err) err.textContent = text || '';
    if (text) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
    return !text;
  }
  function validate() {
    var ok = true, t = type(), first = null;
    function check(name, good, text) { if (!setErr(name, good ? '' : text)) { ok = false; first = first || el(name); } }
    ['business', 'btype', 'name', 'mobile', 'email', 'island', 'address'].forEach(function (n) { setErr(n, ''); });
    if (t === 'business') {
      check('business', el('business').value.trim().length > 1, 'Enter your business name.');
      check('btype', !!el('btype').value, 'Choose the type of business.');
    }
    check('name', el('name').value.trim().length > 1, t === 'business' ? 'Enter the name of the person we should contact.' : 'Enter your name.');
    check('mobile', el('mobile').value.replace(/\D/g, '').length >= 7, 'Enter a mobile number we can reach you on.');
    var email = el('email').value.trim();
    if (t === 'business') check('email', /^\S+@\S+\.\S+$/.test(email), 'Enter an email address for your quotation and invoice.');
    else if (email) check('email', /^\S+@\S+\.\S+$/.test(email), 'That email address does not look right.');
    if (method() === 'deliver') {
      check('island', el('island').value.trim().length > 1, 'Enter the island to deliver to.');
      check('address', el('address').value.trim().length > 2, 'Enter the delivery address.');
    }
    if (first) first.focus();
    return ok;
  }

  /* ---------- submit ---------- */
  function orderCode() {
    var d = new Date(), n = UI.read('orders', []).length + 1;
    return 'HT-' + String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(1000 + n * 7 + d.getDate()).slice(-4);
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    msg.hidden = true;
    if (!Cart.count()) { msg.textContent = 'Add at least one product to your order first.'; msg.hidden = false; return; }
    if (!validate()) { msg.textContent = 'Please check the fields marked in red.'; msg.hidden = false; return; }
    var t = type(), quote = t === 'business' && el('quote').checked;
    var details = {
      type: t, name: el('name').value.trim(), mobile: el('mobile').value.trim(), email: el('email').value.trim(),
      business: t === 'business' ? el('business').value.trim() : '', btype: t === 'business' ? el('btype').value : '',
      tin: t === 'business' ? el('tin').value.trim() : '',
      method: method(), island: el('island').value.trim(), address: el('address').value.trim()
    };
    var order = {
      code: orderCode(), date: new Date().toISOString(), type: t, quote: quote,
      items: Cart.items().map(function (l) { var p = H.product(l.id); return { id: l.id, qty: l.qty, price: p.price, name: p.brand + ' ' + p.name }; }),
      total: Cart.total(), details: details, notes: el('notes').value.trim()
    };
    var orders = UI.read('orders', []); orders.unshift(order); UI.write('orders', orders);
    if (el('save').checked || session) {
      UI.write('account', details);
      UI.write('session', { name: details.business || details.name, type: t, mobile: details.mobile });
    }
    Cart.clear();
    showDone(order);
  });

  function summaryText(o) {
    return (o.quote ? 'Quotation request ' : 'Order ') + o.code + '\n' +
      o.items.map(function (i) { return i.qty + ' x ' + i.name; }).join('\n') + '\n' +
      'Total: ' + H.money(o.total) + '\n' +
      (o.details.business ? o.details.business + ' (' + o.details.name + ')' : o.details.name) + ', ' + o.details.mobile + '\n' +
      (o.details.method === 'deliver' ? 'Deliver to: ' + o.details.address + ', ' + o.details.island : 'Collect in store') +
      (o.notes ? '\nNotes: ' + o.notes : '');
  }
  function showDone(o) {
    document.getElementById('order-view').hidden = true;
    var view = document.getElementById('done-view');
    view.hidden = false;
    view.innerHTML =
      '<div class="card done">' +
        '<span class="done-ic">' + icon('check') + '</span>' +
        '<h1>' + (o.quote ? 'Quotation request sent' : 'Order sent') + '</h1>' +
        '<p class="lead" style="max-width:32em">' + (o.quote
          ? 'Thank you, ' + esc(o.details.name) + '. We will send your quotation to ' + esc(o.details.email) + ' and confirm on ' + esc(o.details.mobile) + '.'
          : 'Thank you, ' + esc(o.details.name) + '. We will message you on ' + esc(o.details.mobile) + ' to confirm availability, delivery and payment.') + '</p>' +
        '<span class="code">' + esc(o.code) + '</span>' +
        '<div class="card panel" style="width:min(560px,100%);text-align:left;box-shadow:inset 0 0 0 1px var(--line)">' +
          '<div class="lines">' + o.items.map(function (i) {
            var p = H.product(i.id);
            return '<div class="line"><div class="line-art"><img src="' + H.cutOf(p) + '" alt=""></div><div><b>' + esc(i.name) + '</b><small>Quantity ' + i.qty + '</small></div><div class="line-end"><b>' + H.money(i.price * i.qty) + '</b></div></div>';
          }).join('') + '</div>' +
          '<div class="totals"><div class="grand"><span>Total</span><span>' + H.money(o.total) + '</span></div></div>' +
        '</div>' +
        '<div class="done-actions">' +
          '<a class="btn btn-primary" id="viber-btn" href="' + UI.viberHref + '">' + icon('chat') + 'Message us on Viber</a>' +
          '<a class="btn btn-ghost" href="account.html">' + (UI.read('session', null) ? 'Track it in my account' : 'Create an account to track it') + '</a>' +
          '<a class="btn btn-ghost" href="products.html">Keep browsing</a>' +
        '</div>' +
        '<p class="note" style="max-width:34em">Tapping the Viber button copies your order summary, so you can paste it into the chat.</p>' +
      '</div>';
    document.getElementById('viber-btn').addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(summaryText(o)).then(function () { UI.toast('Order summary copied. Paste it in the chat.'); }, function () {});
    });
    var acc = document.querySelector('.nav-account');
    if (acc && UI.read('session', null)) { acc.setAttribute('aria-label', 'My account'); acc.querySelector('span').textContent = 'My account'; }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /* ---------- start ---------- */
  var wanted = params.get('account');
  if (session && account) {
    wanted = account.type;
    ['name', 'mobile', 'email', 'business', 'btype', 'tin', 'island', 'address'].forEach(function (n) { if (account[n] && el(n)) el(n).value = account[n]; });
    if (account.method) form.querySelectorAll('input[name="method"]').forEach(function (r) { r.checked = r.value === account.method; });
    var note = document.getElementById('signed-note');
    note.hidden = false;
    note.innerHTML = 'Signed in as <b style="color:var(--ink);font-weight:500">' + esc(session.name) + '</b>. Your saved details are filled in below.';
    note.style.marginBottom = '14px';
    document.getElementById('save-row').hidden = true;
  }
  if (wanted === 'business' || wanted === 'personal') form.querySelectorAll('input[name="account"]').forEach(function (r) { r.checked = r.value === wanted; });

  form.addEventListener('change', function (e) {
    if (e.target.name === 'account') applyType();
    if (e.target.name === 'method') applyMethod();
    if (e.target.name === 'quote') updateSubmit();
  });
  form.addEventListener('input', function (e) {
    var f = e.target.closest('.field.bad'); if (f && e.target.name) setErr(e.target.name, '');
  });
  applyType(); applyMethod(); renderLines();
  if (session && account) document.getElementById('save-row').hidden = true;
})();

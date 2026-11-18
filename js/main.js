/* main.js — runs on every page: hamburger menu + footer year */
(function () {
  'use strict';

  var toggle = document.querySelector('.header__toggle');
  var nav = document.getElementById('primary-nav');

  function setMenu(open) {
    nav.classList.toggle('nav--open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  document.querySelectorAll('.nav__link, .header__logo').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') setMenu(false);
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

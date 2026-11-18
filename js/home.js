/* home.js — homepage only: scroll-spy nav, project filter, photo slideshow */
(function () {
  'use strict';

  /* ---------- Active nav link on scroll ---------- */
  var links = document.querySelectorAll('.nav__link');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (e) { return e.isIntersecting; })[0];
      if (!visible) return;
      links.forEach(function (link) {
        link.classList.toggle('nav__link--active', link.getAttribute('href') === '#' + visible.target.id);
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    ['home', 'work', 'about', 'contact'].forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------- Project filter ---------- */
  var filterButtons = document.querySelectorAll('.filters__button');
  var cards = document.querySelectorAll('.project-card');

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var filter = button.getAttribute('data-filter');
      filterButtons.forEach(function (b) {
        var on = b === button;
        b.classList.toggle('filters__button--selected', on);
        b.setAttribute('aria-pressed', String(on));
      });
      cards.forEach(function (card) {
        card.hidden = !(filter === 'All' || card.getAttribute('data-category') === filter);
      });
    });
  });

  /* ---------- About photo slideshow ---------- */
  var IMG = 'assets/';
  var photos = [
    { src: IMG + 'ivy-skydiving.jpg', alt: 'Ivy skydiving above the clouds', position: '50% 50%', description: 'Jumped out of a plane. Would do it again.' },
    {
      src: IMG + 'ivy-hawker-food.jpg', alt: 'A table filled with Singaporean hawker dishes', position: '50% 50%', fit: 'contain',
      description: 'Singapore hawker food, always worth the feast.',
      labels: [
        { name: 'kangkong belacan', top: '27%', left: '2%', direction: 'down-right' },
        { name: 'fried rice', top: '29%', left: '39%', direction: 'down-right' },
        { name: 'cockles', top: '38%', left: '76%', direction: 'down-left' },
        { name: 'cereal prawns', top: '52%', left: '1%', direction: 'down-right' },
        { name: 'sambal stingray', top: '73%', left: '28%', direction: 'up-right' },
        { name: 'sugarcane juice', top: '67%', left: '72%', direction: 'up-left' }
      ]
    },
    { src: IMG + 'ivy-rome.jpg', alt: 'Ivy standing in a sunny piazza in Rome', position: '50% 54%', description: 'Sunny days in beautiful Rome.' },
    {
      src: IMG + 'ivy-cats.jpg', alt: "Ivy's cats Luna and Stella sitting together by a window", position: '50% 43%',
      description: 'Luna + Stella, my favorite little supervisors.',
      labels: [
        { name: 'Luna', top: '68%', left: '4%', direction: 'up-right' },
        { name: 'Stella', top: '54%', left: '73%', direction: 'up-left' }
      ]
    }
  ];

  var current = 0;
  var image = document.getElementById('aboutImage');
  var labelsBox = document.getElementById('aboutLabels');
  var caption = document.getElementById('aboutCaption');

  function renderPhoto() {
    var photo = photos[current];
    image.style.animation = 'none';
    void image.offsetWidth;
    image.style.animation = '';
    image.src = photo.src;
    image.alt = photo.alt;
    image.style.objectPosition = photo.position;
    image.style.objectFit = photo.fit || 'cover';
    caption.textContent = photo.description;
    labelsBox.innerHTML = '';
    (photo.labels || []).forEach(function (label) {
      var tag = document.createElement('span');
      tag.className = 'about__label about__label--' + label.direction;
      tag.style.top = label.top;
      tag.style.left = label.left;
      tag.textContent = label.name;
      labelsBox.appendChild(tag);
    });
    labelsBox.hidden = !photo.labels;
  }

  document.getElementById('aboutNext').addEventListener('click', function () {
    current = (current + 1) % photos.length;
    renderPhoto();
  });
})();

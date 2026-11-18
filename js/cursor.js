/* cursor.js — crosshair cursor with a live coordinate readout.
   - Shows x / y like hovering a scatter plot
   - Over a project card the readout shows that project's key number
     (set with data-cursor-label in the HTML)
   - Ring grows over links and buttons; shrinks while clicking
   - Mouse only: touch screens are left alone. */
(function () {
  'use strict';

  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var INTERACTIVE = 'a, button, input, textarea, select, label, summary, [role="button"]';

  var reticle = document.createElement('div');
  reticle.className = 'reticle';
  reticle.setAttribute('aria-hidden', 'true');
  reticle.innerHTML =
    '<span class="reticle__ring"></span>' +
    '<span class="reticle__tick reticle__tick--n"></span>' +
    '<span class="reticle__tick reticle__tick--s"></span>' +
    '<span class="reticle__tick reticle__tick--w"></span>' +
    '<span class="reticle__tick reticle__tick--e"></span>' +
    '<span class="reticle__dot"></span>' +
    '<span class="reticle__chip"></span>';
  document.body.appendChild(reticle);
  var chip = reticle.querySelector('.reticle__chip');

  var x = 0, y = 0, target = null, queued = false;

  function pad(n) { return String(Math.max(0, Math.round(n))).padStart(4, '0'); }

  function paint() {
    queued = false;
    reticle.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';

    var labelled = target && target.closest ? target.closest('[data-cursor-label]') : null;
    chip.textContent = labelled ? labelled.getAttribute('data-cursor-label') : 'x:' + pad(x) + ' y:' + pad(y);

    var interactive = !!(target && target.closest && target.closest(INTERACTIVE));
    var dark = !!(target && target.closest && target.closest('footer'));
    reticle.classList.toggle('reticle--hover', interactive);
    reticle.classList.toggle('reticle--dark', dark);
    reticle.classList.toggle('reticle--flip-x', x > window.innerWidth - 190);
    reticle.classList.toggle('reticle--flip-y', y > window.innerHeight - 50);
  }

  function schedule() {
    if (!queued) { queued = true; requestAnimationFrame(paint); }
  }

  document.addEventListener('mousemove', function (event) {
    x = event.clientX;
    y = event.clientY;
    target = event.target;
    if (target.tagName === 'IFRAME') {
      reticle.classList.remove('reticle--visible');
      document.documentElement.classList.remove('has-reticle');
      return;
    }
    document.documentElement.classList.add('has-reticle');
    reticle.classList.add('reticle--visible');
    schedule();
  }, { passive: true });

  document.addEventListener('mousedown', function () { reticle.classList.add('reticle--pressed'); });
  document.addEventListener('mouseup', function () { reticle.classList.remove('reticle--pressed'); });

  /* pointer left the page: hide the reticle and give the normal cursor back */
  document.documentElement.addEventListener('mouseleave', function () {
    reticle.classList.remove('reticle--visible');
    document.documentElement.classList.remove('has-reticle');
  });
})();

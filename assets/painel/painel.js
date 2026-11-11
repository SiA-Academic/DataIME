(function () {
  'use strict';

  const theme = document.getElementById('theme-toggle');
  const tooltip = document.getElementById('chart-tooltip');
  theme.addEventListener('click', () => {
    const root = document.documentElement;
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  });
  document.getElementById('print-view').addEventListener('click', () => window.print());
  document.querySelector('.skip-link').addEventListener('click', event => {
    event.preventDefault();
    document.getElementById('content').focus();
  });

  function showTooltip(mark, x, y) {
    const [heading, ...details] = mark.dataset.tip.split('|');
    const title = document.createElement('strong');
    title.textContent = heading;
    tooltip.replaceChildren(title, details.join(' · '));
    tooltip.hidden = false;
    tooltip.style.left = Math.min(window.innerWidth - tooltip.offsetWidth - 12, Math.max(10, x + 12)) + 'px';
    tooltip.style.top = Math.max(10, y - tooltip.offsetHeight - 10) + 'px';
  }
  document.addEventListener('pointerover', event => {
    const mark = event.target.closest('[data-tip]');
    if (mark) showTooltip(mark, event.clientX, event.clientY);
  });
  document.addEventListener('focusin', event => {
    const mark = event.target.closest('[data-tip]');
    if (mark) {
      const bounds = mark.getBoundingClientRect();
      showTooltip(mark, bounds.x, bounds.y);
    }
  });
  document.addEventListener('pointerout', event => {
    if (event.target.closest('[data-tip]')) tooltip.hidden = true;
  });
  document.addEventListener('focusout', () => { tooltip.hidden = true; });
  window.addEventListener('hashchange', () => { tooltip.hidden = true; });
})();

(function () {
  'use strict';

  const panel = window.SIAPOS_GRADUACAO;
  const links = [...document.querySelectorAll('#graduation-nav a')];
  const titles = Object.fromEntries(links.map(link => [link.dataset.gradView, link.querySelector('strong').textContent]));
  titles.additional = 'Dados complementares';
  titles.curricula = 'Currículos';
  const department = document.querySelector('[data-grad-view="department"] small');
  department.textContent = panel.hasCommonDepartments && panel.departmentDatasetKind !== 'course_section_registry'
    ? 'Relatórios do Júpiter' : 'Cadastro de turmas';

  function renderRoute() {
    const hash = location.hash.slice(1).replace(/^graduation\/?/, '');
    let tab = hash || 'series';
    if (tab === 'mac-adicional' && !panel.hasCommonDepartments) tab = 'department';
    const view = tab === 'coverage' ? 'sources' : tab === 'mac-adicional' ? 'additional' : tab;
    if (!Object.hasOwn(titles, view)) tab = 'series';
    const current = Object.hasOwn(titles, view) ? view : 'series';
    for (const link of links) {
      const active = link.dataset.gradView === current;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    document.getElementById('page-title').textContent = titles[current];
    document.title = titles[current] + ' · SIA-Grad · IME-USP';
    panel.setTab(tab);
    panel.mount(document.getElementById('grad-root'));
  }
  window.addEventListener('hashchange', renderRoute);
  renderRoute();
})();

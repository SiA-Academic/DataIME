(function () {
  'use strict';

  const target = new URL('../SIAPos/', location.href);
  if (target.protocol === 'file:') target.pathname += 'index.html';
  target.search = location.search;
  const section = location.hash.slice(1);
  if (section) {
    target.hash = section === 'graduation' || section.startsWith('graduation/')
      ? section : 'graduation/' + section;
  }
  location.replace(target.href);
})();

/* Em uma instalação local completa, os acessos a Docentes abrem as fichas institucionais. */
(() => {
  const local = location.protocol === 'file:' || ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
  if (!local) return;

  const root = new URL('../', document.currentScript.src);
  const publicBase = new URL('SiADoce/', root).href;
  const localBase = new URL('SiADoce-institucional/', root);
  const links = [...document.querySelectorAll('a[href]')].filter(link => link.href.startsWith(publicBase));
  if (links.length === 0) return;

  // Uma imagem da edição instalada também pode ser verificada ao abrir por file://.
  const installation = new Image();
  installation.onload = () => {
    for (const link of links) {
      link.href = new URL(link.href.slice(publicBase.length), localBase).href;
    }
  };
  installation.src = new URL('img/usp_horizontal.svg', localBase).href;
})();

;(function() {
  function addIcon(){
    if (!document.querySelector('link[rel="icon"]')) {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = '../favicon.svg';
      document.head.appendChild(link);
    }
  }

  function init(){
    addIcon();
    const LINKS = window.LINK_PAGES || [];
    const current = location.pathname.split('/').pop().replace('.html', '');
    const nav = document.createElement('nav');
    nav.className = 'tabs';
    LINKS.forEach(link => {
      const a = document.createElement('a');
      a.href = link.id + '.html';
      a.textContent = link.label;
      a.className = 'tab' + (link.id === current ? ' active' : '');
      nav.appendChild(a);
    });
    const main = document.querySelector('main');
    if (main) main.parentNode.insertBefore(nav, main);
  }

  if (window.LINK_PAGES) {
    init();
  } else {
    const s = document.createElement('script');
    s.src = 'pages.js';
    s.onload = init;
    document.head.appendChild(s);
  }
})();

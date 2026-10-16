(() => {
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') theme = saved;
  } catch {}

  function applyTheme() {
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#000000' : '#f7f6f2';
  }
  applyTheme();

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    function updateButton() {
      button.textContent = theme === 'dark' ? 'Light' : 'Dark';
      button.setAttribute('aria-pressed', String(theme === 'dark'));
    }
    updateButton();
    button.hidden = false;
    button.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      updateButton();
      try { localStorage.setItem('theme', theme); } catch {}
    });
  });
})();

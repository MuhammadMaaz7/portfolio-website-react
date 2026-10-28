// Apply preferences before paint; React reads the same values after hydration.
(function () {
  var theme = 'system';
  var motion = null;
  try {
    theme = localStorage.getItem('portfolio-theme') || 'system';
    motion = localStorage.getItem('portfolio-motion');
  } catch (_) {}
  var dark = theme === 'dark' || (theme !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  document.documentElement.dataset.motion = reduced || motion === 'off' ? 'off' : 'on';
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? '#252f38' : '#f7f3ea');
})();

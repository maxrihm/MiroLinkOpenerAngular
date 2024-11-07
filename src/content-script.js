(function() {
  function injectApp() {
    const appRoot = document.createElement('app-root');
    document.body.appendChild(appRoot);

    const scripts = ['runtime.js', 'polyfills.js', 'main.js'];

    scripts.forEach((scriptName) => {
      const script = document.createElement('script');
      script.src = chrome.runtime.getURL(scriptName);
      script.type = 'module';
      document.body.appendChild(script);
    });

    // Include styles
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = chrome.runtime.getURL('styles.css');
    document.head.appendChild(styles);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectApp);
  } else {
    injectApp();
  }
})();

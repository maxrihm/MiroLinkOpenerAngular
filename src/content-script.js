(function() {
  function injectApp() {
    const appRoot = document.createElement('app-root');
    document.body.appendChild(appRoot);

    // Load the Angular app
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('runtime.js');
    script.type = 'module';
    document.body.appendChild(script);

    const scriptMain = document.createElement('script');
    scriptMain.src = chrome.runtime.getURL('main.js');
    scriptMain.type = 'module';
    document.body.appendChild(scriptMain);

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

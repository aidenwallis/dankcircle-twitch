(() => {
    if (!String.prototype.includes || !Array.prototype.findIndex) {
        return;
    }
    if (window.location.pathname.endsWith('.html')) {
        return;
    }

    const whitelistedSites = ['www.twitch.tv', 'canary.twitch.tv', 'clips.twitch.tv'];
    if (!whitelistedSites.includes(window.location.hostname)) {
        return;
    }

    function getImageURL(url) {
        if (browser && browser.extension) {
            return browser.extension.getURL(url);
        }
        if (chrome && chrome.runtime) {
            return chrome.runtime.getURL(url);
        }
        return url;
    }
    
    // !important because twitch loads shit in slowly and I can't be bothered to do an actual solution Pepega
    const cssToInject = `
        .tw-loading-spinner {
            -webkit-animation: none !important;
            animation: none;
            border: none !important;
            background: url(${getImageURL('images/dankCircle.gif')});
            border-radius: 0 !important;
            background-size: cover;
        }
    `;

    console.log('Initializing dankCircle replacer...');

    const styleNode = document.createElement('style');
    styleNode.innerHTML = cssToInject;

    document.getElementsByTagName('head')[0].appendChild(styleNode);
})();

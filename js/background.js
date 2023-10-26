class TheMovieDb {
    url_tmdb = "https://www.themoviedb.org";
    regex_detect_tmdb = /https\:\/\/www\.themoviedb\.org\/(tv|movie)\/([\d]+)/;
    constructor() {
        chrome.contextMenus.onClicked.addListener(info => {
            this.genericOnClick(info);
        });
        // Add contextMenus
        chrome.runtime.onInstalled.addListener(function () {
            const contexts = [
                "all",
                "page",
                "selection",
                "link",
                "editable",
                "image",
                "video",
                "audio"
            ];
            // Create contentText parent (Bad Way)
            const parent = chrome.contextMenus.create({
                title: "Bad Way",
                contexts: ["all"],
                id: "parent"
            });
            // Create content text child play movie current tab
            chrome.contextMenus.create({
                title: "Play",
                contexts: ["all"],
                parentId: parent,
                id: "play"
            });
            // Create Content text child play movie new tab
            chrome.contextMenus.create({
                title: "Play New Tab",
                contexts: ["all"],
                parentId: parent,
                id: "play_new_tab"
            });
            // Create contentText child open The Move DB
            chrome.contextMenus.create({
                title: "The Movie",
                parentId: parent,
                contexts: ["all"],
                id: "open_tmdb"
            });
        });
    }
    openMovie(id) {
        return `https://vidsrc.to/embed/movie/${id}`;
    }
    openTV(id) {
        return `https://vidsrc.to/embed/tv/${id}`;
    }
    genericOnClick(info) {
        switch (info.menuItemId) {
            case "play_new_tab":
                chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
                    const url = tabs[0].url;
                    const groupMatch = url?.match(this.regex_detect_tmdb);
                    if (groupMatch || groupMatch?.length === 3) {
                        const key = groupMatch[1];
                        const id = groupMatch[2];
                        this.open(key, id, true);
                    }
                });
                break;
            case "play":
                chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
                    const url = tabs[0].url;
                    const groupMatch = url?.match(this.regex_detect_tmdb);
                    if (groupMatch || groupMatch?.length === 3) {
                        const key = groupMatch[1];
                        const id = groupMatch[2];
                        this.open(key, id, false);
                    }
                });
                break;
            case "open_tmdb":
                chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
                    chrome.tabs.update(tabs[0].id, { url: this.url_tmdb });
                });
                break;
            default:
        }
    }
    async open(key, id, newTab) {
        if (!key || !id) {
            return;
        }
        switch (key) {
            case "movie":
                if (newTab) {
                    chrome.tabs.create({ url: this.openMovie(id) });
                }
                else {
                    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
                        chrome.tabs.update(tabs[0].id, { url: this.openMovie(id) });
                    });
                }
                break;
            case "tv":
                if (newTab) {
                    chrome.tabs.create({ url: this.openTV(id) });
                }
                else {
                    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
                        chrome.tabs.update(tabs[0].id, { url: this.openTV(id) });
                    });
                }
                break;
            default:
                break;
        }
    }
}
new TheMovieDb();

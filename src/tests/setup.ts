window.matchMedia = window.matchMedia ||
    (() => ({
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
        onchange: null,
        media: '',
        addListener: () => {},
        removeListener: () => {}
    }));
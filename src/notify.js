'use strict';

export default function TabNotify(config) {
    const defaultConfig = {
        message: 'Hey!',
        delay: '1000',
        showOnExit: true
    }

    config = {...defaultConfig, ...config, state: {}, title: document.title, interval: null}

    //////////////////
    // Public API
    /////////////////

    ///////////////
    // Initialize
    const _show = () => {
        config.interval = setInterval(() => {
            document.title === config.message
                ? document.title = config.title
                : document.title = config.message
        }, config.delay)
    }

    /////////////
    // Kill
    const _hide = () => {
        clearInterval(config.interval)
        document.title = config.title
        config.interval = null
    }

    (() => {
        if (!config.showOnExit) return

        window.focus()

        const visibilityHandler = () => {
            if (document[config.state.hidden]) {
                _show()
            } else {
                _hide()
            }
        }

        //////////////////////////////////////////////
        // Determine the user browser via Page Visibiltiy API
        // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
        // Set the name of the hidden property and the change event for visibility
        if (typeof document.hidden !== "undefined") {
            config.state.hidden = "hidden"
            config.state.visibilityChange = "visibilitychange"
        } else if (typeof document.msHidden !== "undefined") {
            config.state.hidden = "msHidden"
            config.state.visibilityChange = "msvisibilitychange"
        } else if (typeof document.webkitHidden !== "undefined") {
            config.state.hidden = "webkitHidden"
            config.state.visibilityChange = "webkitvisibilitychange"
        } else if (typeof document.mozHidden !== "undefined") {
            config.state.hidden = "mozHidden"
            config.state.visibilityChange = "mozvisibilitychange"
        }
        
        if (typeof document.onfocusin !== "undefined") {
            config.state.hidden = "onfocusin"
            document.onfocusin = _show()
            document.onfocusout = _hide()
        } else if (typeof document.addEventListener !== "undefined" && config.state.hidden !== undefined) {
            document.addEventListener(config.state.visibilityChange, visibilityHandler, false)
        } else {
            window.onpageshow = window.onfocus = _show()
            window.onpagehide = window.onblur = _hide()
        }
    })();

    return {
        show: _show,
        hide: _hide
    }
}

'use strict';

export default function TabNotify(config) {
    const defaultConfig = {
        message: 'Hey!',
        interval: 1000,
        flash: true,
        showOnExit: true,
        onHide: null,
        onShow: null
    }

    config = {...defaultConfig, ...config, state: {}, title: document.title, interval: null}

    //////////////////
    // Public API
    /////////////////

    ///////////////
    // Initialize
    const _showNotification = () => {
        if (
            config.onShow &&
            typeof config.onShow === 'function'
        ) {
            config.onShow()
        }
        
        if (!config.flash) {
            document.title = config.message
            return
        }

        config.interval = setInterval(() => {
            document.title === config.message
                ? document.title = config.title
                : document.title = config.message
        }, config.interval)
    }

    /////////////
    // Kill
    const _hideNotification = () => {
        if (
            config.onHide &&
            typeof config.onHide === 'function'
        ) {
            config.onHide()
        }

        document.title = config.title

        if (config.flash) {
            clearInterval(config.interval)
            config.interval = null
        }
    }

    (() => {
        if (!config.showOnExit) return

        // window.focus()

        const visibilityHandler = () => {
            if (document[config.state.hidden]) {
                _showNotification()
            } else {
                _hideNotification()
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
            document.onfocusin = _showNotification()
            document.onfocusout = _hideNotification()
        } else if (typeof document.addEventListener !== "undefined" && config.state.hidden !== undefined) {
            document.addEventListener(config.state.visibilityChange, visibilityHandler, false)
        } else {
            window.onpageshow = window.onfocus = _showNotification()
            window.onpagehide = window.onblur = _hideNotification()
        }
    })();

    return {
        show: _showNotification,
        hide: _hideNotification
    }
}

'use strict';

export default function TabNotify(config) {
    const defaultConfig = {
        message: 'Hey!',
        delay: '1000',
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
        config.interval = setInterval(() => {
            document.title === config.message
                ? document.title = config.title
                : document.title = config.message
        }, config.delay)

        if (this.config.onShow) this.config.onShow()
    }

    /////////////
    // Kill
    const _hideNotification = () => {
        clearInterval(config.interval)
        document.title = config.title
        config.interval = null

        if (this.config.onHide) this.config.onHide()
    }

    (() => {
        if (!config.showOnExit) return

        window.focus()

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

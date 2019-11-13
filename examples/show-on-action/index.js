import TabNotify from 'tab-notify'

(() => {
    const notify = TabNotify({
        message: 'Notify via hooks',
        showOnExit: false
    })

    document.querySelector('#start').addEventListener('click', notify.show, false)
    document.querySelector('#stop').addEventListener('click', notify.hide, false)
})()

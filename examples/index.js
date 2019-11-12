import TabNotify from './src/TabNotify';

(() => {
    const notify = TabNotify()

    document.querySelector('#start').addEventListener('click', notify.show, false)
    document.querySelector('#stop').addEventListener('click', notify.hide, false)
})();
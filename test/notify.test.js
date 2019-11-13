import test from 'ava';
import TabNotify from '../dist/index';


// Notification shows when the document loses visibility
test('show notification on exit', t => {
    document.title = 'Wow';

    const notify = TabNotify({
        message: 'Such test',
        flash: false,
    });

    const visibilityChange = document.createEvent('Event');
    visibilityChange.initEvent('visibilitychange', true, true);

    document.dispatchEvent(visibilityChange);

    t.timeout(1000);
    t.is(document.title, 'Such test');
});

// Notification hides when the document gains visibility
test('hide notification on enter', t => {
    t.plan(2);

    document.title = 'Wow';

    const notify = TabNotify({
        message: 'Such test',
        flash: false,
    });

    const visibilityChange = document.createEvent('Event');
    visibilityChange.initEvent('visibilitychange', true, true);

    document.dispatchEvent(visibilityChange);

    t.timeout(1000);
    t.is(document.title, 'Such test');

    Object.defineProperty(document, "hidden", {
        get() { return false; }
    });

    document.dispatchEvent(visibilityChange);

    t.timeout(1000);
    t.is(document.title, 'Wow');
});

test('manually show notification', t => {
    document.title = 'Wow';

    const notify = TabNotify({
        message: 'Such test',
        flash: false,
        showOnExit: false
    });

    notify.show();
    t.is(document.title, 'Such test');
});

test('manually hide notification', t => {
    t.plan(2);

    document.title = 'Wow';

    const notify = TabNotify({
        message: 'Such test',
        flash: false,
        showOnExit: false
    });

    notify.show();
    t.is(document.title, 'Such test');

    notify.hide();
    t.is(document.title, 'Wow');
});

test('callback on notification show', t => {
    const onNotificationShow = () => {
        document.body.classList.add('wow');
    };

    const notify = TabNotify({
        message: 'Such test',
        onShow: onNotificationShow
    });

    notify.show();
    t.true(document.body.classList.contains('wow'));
});

test('callback on notification hide', t => {
    t.plan(2);

    const onNotificationShow = () => {
        document.body.classList.add('wow');
    };

    const onNotificationHide = () => {
        document.body.classList.remove('wow');
    };

    const notify = TabNotify({
        message: 'Such test',
        onShow: onNotificationShow,
        onHide: onNotificationHide
    });

    notify.show();
    t.true(document.body.classList.contains('wow'));

    notify.hide();
    t.false(document.body.classList.contains('wow'));
});
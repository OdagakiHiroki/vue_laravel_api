window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

//  util.jsからgetCookieValueメソッドをインポート
import { getCookieValue } from './util';

window.axios = require('axios');

// Ajaxリクエストであることを示すヘッダーを付与
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// トークンをX-XSRF-TOKENヘッダに付与することでLravelはフォームではなくヘッダーを見てCSRFトークンチェックを行う
// configにはrequest送信前の情報が入っている
window.axios.interceptors.request.use(config => {
    // クッキーからトークンを取り出してヘッダーに添付する
    config.headers['X-XSRF-TOKEN'] = getCookieValue('XSRF-TOKEN');
    return config;
});

// レスポンスを受けた後の処理を上書きする
window.axios.interceptors.response.use(
    // 成功時の処理
    response => response,
    // 失敗時の処理
    error => error.response || error
);

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

/** こちらはheadのメタタグ内に以下のようなメタタグを記述し、csrfトークンをヘッダーに付与する方法だが今回はやらない
 *<meta name="csrf-token" content="{{ csrf_token() }}"></meta>
 */

// let token = document.head.querySelector('meta[name="csrf-token"]');

// if (token) {
//     window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
// } else {
//     console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
// }

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });

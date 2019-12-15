requirejs.config({
    baseUrl: 'js/libs',

    paths: {
        app: '../app'
    }
});

requirejs(['jquery', 'app/canvas'], function($, canvas) {});
require.config({
    baseUrl: '',
    urlArgs: 'v=1.0'
});

require(
    [
        'js/login',
        'js/config',
        'js/services/authService'
    ],
    function () {
        angular.bootstrap(document, ['myApp']);
    });
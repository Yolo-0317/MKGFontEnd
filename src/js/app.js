/**
 * Created by baymax on 17/3/2.
 */
var app = angular.module('myApp', ['nvd3', 'ui.router', 'ngFileUpload']);

app.config(function ($compileProvider,$stateProvider, $urlRouterProvider, $httpProvider) {
    $compileProvider.debugInfoEnabled(false);   //关闭 debug，提高性能
    //配置cors
    // $httpProvider.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /*******配置路由*********/
    //所有路由放到一个数组里
    var states = [
        {
            name: 'introduction',
            url:'/introduction',
            templateUrl: 'src/templates/introduction.html',
            controller: introCtrl,
            controllerAs: 'vm'
        },
        {
            name: 'search',
            url:'/search',
            templateUrl: 'src/templates/search.html',
            controller: searchCtrl,
            controllerAs: 'vm'
        },
        {
            name: 'manage',
            url:'/manage',
            templateUrl: 'src/templates/manage.html',
            controller: manageCtrl,
            controllerAs: 'vm'
        },
        {
            name: 'api',
            url:'/api',
            templateUrl: 'src/templates/api.html',
            controller: apiCtrl,
            controllerAs: 'vm'
        }
    ];

    //遍历路由数组，设置 state
    states.forEach(function (state) {
        $stateProvider.state(state);
    });

    $urlRouterProvider.otherwise('/introduction');
});
var app = angular.module("app", ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl : "pages/home.html",
            controller : "homeController"
        })
        .when("/partners", {
            templateUrl : "pages/partners.html",
            controller : "partnersController"
        })
        .when("/stories", {
            templateUrl : "pages/stories.html",
            controller : "storiesController"
        })
        .when("/donate", {
            templateUrl : "pages/donate.html",
            controller : "donateController"
        });
        // .when("/login", {
        //     templateUrl : "pages/contact.html",
        //     controller : "contactController"
        // });
});

app.controller("homeController", function($scope, $location, $anchorScroll){
    $scope.scrollTo = function(id) {
        $location.hash(id);
        $anchorScroll();
    }
});

app.controller("partnersController", function($scope){
    //TODO
});

app.controller("storiesController", function($scope){
    //TODO
});

app.controller("donateController", function($scope){
    //TODO
});

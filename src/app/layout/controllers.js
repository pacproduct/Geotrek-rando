'use strict';

function LayoutController($rootScope, $state, resultsService) {
    $rootScope.currentState_name = $state.current.name;

    $rootScope.$on("$stateChangeSuccess",  function (event, toState, toParams, fromState, fromParams) {
        // to be used for back button //won't work when page is reloaded.
        $rootScope.previousState_name = fromState.name;
        $rootScope.currentState_name = toState.name;
    });
    //back button function called from back button's ng-click="back()"
    $rootScope.back = function () {
        if (!$rootScope.previousState_name) {
            $state.go('layout.root');
        } else {
            window.history.back();
        }
    };

    $rootScope.$on('startSwitchGlobalLang', function () {
        resultsService.getAllResults(true)
            .then(
                function () {
                    $rootScope.$emit('switchGlobalLang');
                }
            );
    });
}

function HeaderController() {
}

function SidebarHomeController() {
}

function SidebarDetailController($scope, $rootScope, $stateParams, resultsService, favoritesService) {

    function getResultDetails(refresh) {
        if ($stateParams.slug) {
            resultsService.getAResultBySlug($stateParams.slug)
                .then(
                    function (data) {
                        $scope.result = data;
                    }
                );
        }
    }

    $scope.toggleFavorites = function (currentElement) {
        var currentAction = '';
        if (favoritesService.isInFavorites(currentElement)) {
            currentAction = 'remove';
        } else {
            currentAction = 'add';
        }
        $rootScope.$broadcast('changeFavorite', {element: currentElement, action: currentAction});
    };

    $scope.isInFavorites = favoritesService.isInFavorites;

    $scope.back = $rootScope.back;

    getResultDetails();

}

function FooterController() {
}


module.exports = {
    LayoutController: LayoutController,
    HeaderController: HeaderController,
    SidebarHomeController: SidebarHomeController,
    SidebarDetailController: SidebarDetailController,
    FooterController: FooterController
};
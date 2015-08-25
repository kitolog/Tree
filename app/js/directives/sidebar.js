treeDirectives.directive(
    'sidebarDirective', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            controller: [
                '$scope',
                '$modal',
                'TreeService',
                function ($scope, $modal, TreeService) {
                    var sidebarData = {
                        modalInstance: {},
                        element: {},
                        treeService: TreeService,
                        showAddModal: function (parentElement) {
                            this.modalInstance = $modal.open({
                                templateUrl: '/templates/modal/element/form.html',
                                controller: 'ModalElementAddController',
                                size: 'small',
                                resolve: {
                                    parentElement: function () {
                                        return parentElement;
                                    }
                                }
                            });
                        }
                    };

                    $scope.sidebarData = sidebarData;
                }],
            templateUrl: '/templates/directives/sidebar.html'
        };
    }
);
treeDirectives.directive(
    'sidebarTreeDirective', function (RecursionHelper) {
        return {
            restrict: 'E',
            scope: {
                element: '='
            },
            transclude: true,
            replace: true,
            controller: [
                '$scope',
                '$modal',
                'TreeService',
                function ($scope, $modal, TreeService) {
                    var treeData = {
                        element: $scope.element,
                        treeService: TreeService,
                        modalInstance: {},
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
                        },
                        showEditModal: function (element) {
                            this.modalInstance = $modal.open({
                                animation: $scope.animationsEnabled,
                                templateUrl: '/templates/modal/element/form.html',
                                controller: 'ModalElementEditController',
                                size: 'small',
                                resolve: {
                                    element: function () {
                                        return element;
                                    }
                                }
                            });
                        },
                        showRemoveModal: function (index, parentElement) {
                            this.modalInstance = $modal.open({
                                animation: $scope.animationsEnabled,
                                templateUrl: '/templates/modal/element/remove.html',
                                controller: 'ModalElementRemoveController',
                                size: 'small',
                                resolve: {
                                    parentElement: function () {
                                        return parentElement;
                                    },
                                    index: function () {
                                        return index;
                                    }
                                }
                            });
                        }
                    };

                    $scope.treeData = treeData;
                }],
            compile: function (element) {
                return RecursionHelper.compile(element);
            },
            templateUrl: '/templates/directives/sidebar/tree.html'
        };
    }
);
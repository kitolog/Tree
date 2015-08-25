treeControllers
    .controller(
    'ModalElementEditController', [
        '$scope',
        '$modalInstance',
        'TreeService',
        'element',
        function ($scope, $modalInstance, TreeService, element) {
            var modalData = {
                treeService: TreeService,
                element: {
                    name: element.name
                },
                save: function () {
                    this.treeService.editElement(this.element.name, element);
                    $modalInstance.dismiss('cancel');
                },
                cancel: function () {
                    $modalInstance.dismiss('cancel');
                }
            };

            $scope.modalData = modalData;
        }
    ]
);
treeControllers
    .controller(
    'ModalElementAddController', [
        '$scope',
        '$modalInstance',
        'TreeService',
        'parentElement',
        function ($scope, $modalInstance, TreeService, parentElement) {
            var modalData = {
                treeService:TreeService,
                element: {
                    name: ''
                },
                save: function () {
                    this.treeService.addElement(this.element.name, parentElement);
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
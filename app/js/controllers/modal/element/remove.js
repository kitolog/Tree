treeControllers
    .controller(
    'ModalElementRemoveController', [
        '$scope',
        '$modalInstance',
        'TreeService',
        'parentElement',
        'index',
        function ($scope, $modalInstance, TreeService, parentElement, index) {
            var modalData = {
                treeService: TreeService,
                remove: function () {
                    this.treeService.removeElement(index, parentElement);
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
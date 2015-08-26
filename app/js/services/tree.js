treeServices.factory(
    'TreeService',
    [
        '$timeout',
        'StorageService',
        function ($timeout, StorageService) {

            var treeData = {
                elements: []
            };

            var addElement = function (name, parent) {
                if (name && name.length) {
                    if ((typeof parent == 'undefined') || !parent) {
                        parent = treeData;
                    }

                    if ((typeof parent['elements'] == 'undefined') || !parent['elements']) {
                        parent['elements'] = [];
                    }

                    var element = {
                        name: name,
                        elements: []
                    };

                    parent['elements'].push(element);

                    StorageService.setObject('tree', treeData.elements);

                    element['isNew'] = 1;
                    (function (element) {
                        $timeout(function () {
                            delete element['isNew'];
                        }, 1000)
                    })(element);
                }
            };

            var editElement = function (name, element) {
                if ((typeof element != 'undefined') && element && (name && name.length)) {
                    element['name'] = name;
                    StorageService.setObject('tree', treeData.elements);

                    element['isNew'] = 1;
                    (function (element) {
                        $timeout(function () {
                            delete element['isNew'];
                        }, 1000)
                    })(element);
                }
            };

            var removeElement = function (index, parent) {
                if ((typeof parent == 'undefined') || !parent) {
                    parent = treeData;
                }

                if ((index >= 0) && (typeof parent['elements'] != 'undefined') && (typeof parent['elements'][index] != 'undefined') && parent['elements'][index]) {
                    if (index <= parent['elements'].length) {
                        parent['elements'] = parent['elements'].slice(0, index).concat(parent['elements'].slice(index + 1));
                        StorageService.setObject('tree', treeData.elements);
                    }
                }
            };

            var init = function () {
                var elementsData = StorageService.getObject('tree');
                if ((typeof elementsData != 'undefined') && elementsData && elementsData.length) {
                    var i;
                    for (i = 0; i < elementsData.length; i++) {
                        treeData.elements.push(elementsData[i]);
                    }
                }
            };

            init();

            return {
                treeData: treeData,
                addElement: function (name, parent) {
                    addElement(name, parent);
                },
                editElement: function (name, element) {
                    editElement(name, element);
                },
                removeElement: function (index, parent) {
                    removeElement(index, parent);
                }
            };
        }
    ]
);
describe('ChildElement', function () {

    beforeEach(module('Tree'));

    var $compile,
        treeService,
        parentElement,
        $rootScope,
        testParentElementName = 'testName' + Math.ceil(Math.random() * 100),
        testElementName = 'testChildName' + Math.ceil(Math.random() * 100),
        testElementSubChildName = 'testSubChildName' + Math.ceil(Math.random() * 100),
        testElementNameUpdated = testElementName + 'Updated';

    beforeEach(inject(function (_$compile_, _$rootScope_, TreeService) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        treeService = TreeService;
    }));

    it('Set new child element', function () {

        treeService.addElement(testParentElementName);
        expect(treeService.treeData).toBeDefined();
        expect(treeService.treeData.elements).toBeDefined();
        expect(treeService.treeData.elements.length).toBeGreaterThan(0);

        var index = treeService.treeData.elements.length - 1;

        expect(treeService.treeData.elements[index]).toBeDefined();
        expect(treeService.treeData.elements[index]['name']).toBeDefined();
        expect(treeService.treeData.elements[index]['name']).toEqual(testParentElementName);

        parentElement = treeService.treeData.elements[index];

        treeService.addElement(testElementName, parentElement);
        expect(parentElement['elements']).toBeDefined();
        expect(parentElement['elements'].length).toBeGreaterThan(0);

        var childIndex = parentElement['elements'].length - 1;

        expect(parentElement['elements'][childIndex]).toBeDefined();
        expect(parentElement['elements'][childIndex]['name']).toEqual(testElementName);
    });

    it('Call sidebar directive and check new child element in the tree', function () {
        var element = $compile("<sidebar-directive></sidebar-directive>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).not.toBe(null);
        expect(element.html()).toMatch(new RegExp('<span.*?>' + testElementName + '<\/span>'));
    });

    it('Set new subchild element', function () {

        var childIndex,
            childElement,
            subChildIndex,
            parentElement = treeService.treeData.elements[treeService.treeData.elements.length - 1];

        childIndex = parentElement['elements'].length - 1;
        childElement = parentElement['elements'][childIndex];
        treeService.addElement(testElementSubChildName, childElement);

        expect(childElement['elements']).toBeDefined();
        expect(childElement['elements'].length).toBeGreaterThan(0);

        subChildIndex = childElement['elements'].length - 1;

        expect(childElement['elements'][subChildIndex]).toBeDefined();
        expect(childElement['elements'][subChildIndex]['name']).toEqual(testElementSubChildName);
    });

    it('Call sidebar directive and check new subchild element in the tree', function () {
        var element = $compile("<sidebar-directive></sidebar-directive>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).not.toBe(null);
        expect(element.html()).toMatch(new RegExp('<span.*?>' + testElementSubChildName + '<\/span>'));
    });

    it('Edit child element', function () {

        var childIndex,
            newElement,
            parentElement = treeService.treeData.elements[treeService.treeData.elements.length - 1];

        childIndex = parentElement['elements'].length - 1;
        newElement = parentElement['elements'][childIndex];
        treeService.editElement(testElementNameUpdated, newElement);

        expect(parentElement['elements'][childIndex]['name']).not.toEqual(testElementName);
        expect(parentElement['elements'][childIndex]['name']).toEqual(testElementNameUpdated);
    });

    it('Call sidebar directive and check child element changes in the tree', function () {
        var element = $compile("<sidebar-directive></sidebar-directive>")($rootScope);
        $rootScope.$digest();

        expect(element.html()).not.toBe(null);
        expect(element.html()).not.toMatch(new RegExp('<span.*?>' + testElementName + '<\/span>'));
        expect(element.html()).toMatch(new RegExp('<span.*?>' + testElementNameUpdated + '<\/span>'));
    });

    it('Deletes child element', function () {

        var childIndex,
            parentElement = treeService.treeData.elements[treeService.treeData.elements.length - 1];

        childIndex = parentElement['elements'].length - 1;

        treeService.removeElement(childIndex, parentElement);

        expect(parentElement['elements']).toBeDefined();
        expect(parentElement['elements'].length).toEqual(0);
        expect(parentElement['elements'][childIndex]).not.toBeDefined();

        treeService.removeElement(treeService.treeData.elements.length - 1);

        expect(treeService.treeData.elements).toBeDefined();
        expect(treeService.treeData.elements.length).toEqual(0);
        expect(treeService.treeData.elements[treeService.treeData.elements.length - 1]).not.toBeDefined();
    });

    it('Call sidebar directive and check child elements array is empty', function () {
        var element = $compile("<sidebar-directive></sidebar-directive>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).not.toBe(null);
        expect(element.html()).not.toMatch(new RegExp('<span.*?>' + testElementNameUpdated + '<\/span>'));
    });

    it('Set new child element and remove parent', function () {
        treeService.addElement(testParentElementName);
        var index = treeService.treeData.elements.length - 1;
        parentElement = treeService.treeData.elements[index];
        treeService.addElement(testElementName, parentElement);

        var element = $compile("<sidebar-directive></sidebar-directive>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).not.toBe(null);
        expect(element.html()).toMatch(new RegExp('<span.*?>' + testParentElementName + '<\/span>'));
        expect(element.html()).toMatch(new RegExp('<span.*?>' + testElementName + '<\/span>'));

        treeService.removeElement(index);
        $rootScope.$digest();

        expect(element.html()).not.toBe(null);
        expect(element.html()).not.toMatch(new RegExp('<span.*?>' + testParentElementName + '<\/span>'));
        expect(element.html()).not.toMatch(new RegExp('<span.*?>' + testElementName + '<\/span>'));
    });
});
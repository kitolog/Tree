describe('RootElement', function () {

    beforeEach(module('Tree'));

    var $compile,
        treeService,
        $rootScope,
        testElementName = 'testName' + Math.ceil(Math.random() * 100),
        testElementNameUpdated = testElementName + 'Updated';

    beforeEach(inject(function (_$compile_, _$rootScope_, TreeService) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        treeService = TreeService;
    }));

    it('Set new root element', function () {

        treeService.addElement(testElementName);
        expect(treeService.treeData).toBeDefined();
        expect(treeService.treeData.elements).toBeDefined();
        expect(treeService.treeData.elements.length).toBeGreaterThan(0);

        var index = treeService.treeData.elements.length - 1;

        expect(treeService.treeData.elements[index]).toBeDefined();
        expect(treeService.treeData.elements[index]['name']).toBeDefined();
        expect(treeService.treeData.elements[index]['name']).toEqual(testElementName);
    });

    it('Call sidebar directive and check new root element in the tree', function () {
        var element = $compile("<sidebar-directive></sidebar-directive>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).not.toBe(null);
        expect(element.html()).toMatch(new RegExp('<span.*?>' + testElementName + '<\/span>'));
    });

    it('Edit root element', function () {

        var newElement = treeService.treeData.elements[treeService.treeData.elements.length - 1];
        treeService.editElement(testElementNameUpdated, newElement);
        var index = treeService.treeData.elements.length - 1;

        expect(treeService.treeData.elements[index]['name']).not.toEqual(testElementName);
        expect(treeService.treeData.elements[index]['name']).toEqual(testElementNameUpdated);
    });

    it('Call sidebar directive and check root element changes in the tree', function () {
        var element = $compile("<sidebar-directive></sidebar-directive>")($rootScope);
        $rootScope.$digest();

        expect(element.html()).not.toBe(null);
        expect(element.html()).not.toMatch(new RegExp('<span.*?>' + testElementName + '<\/span>'));
        expect(element.html()).toMatch(new RegExp('<span.*?>' + testElementNameUpdated + '<\/span>'));
    });

    it('Deletes root element', function () {

        treeService.removeElement(treeService.treeData.elements.length - 1);

        expect(treeService.treeData).toBeDefined();
        expect(treeService.treeData.elements).toBeDefined();
        expect(treeService.treeData.elements.length).toEqual(0);
        expect(treeService.treeData.elements[treeService.treeData.elements.length - 1]).not.toBeDefined();
    });

    it('Call sidebar directive and check elements array is empty', function () {
        var element = $compile("<sidebar-directive></sidebar-directive>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).not.toBe(null);
        expect(element.html()).not.toMatch(new RegExp('<span.*?>' + testElementNameUpdated + '<\/span>'));
    });
});
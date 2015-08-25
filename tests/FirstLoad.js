describe('FirstLoad', function () {

    beforeEach(module('Tree'));

    var $httpBackend;

    var $compile,
        $rootScope;

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Call sidebar directive', function () {
        var element = $compile("<sidebar-directive></sidebar-directive>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).not.toBe(null);
        expect(element.html()).toMatch(/tree /);
    });
});

// falsy values=== null, undefined, false,0 ,"", NaN
let methods = require('../../my-app/methods')
let square = methods.square;
let sum = methods.sum;

describe("My calculator class", () => {

    test("should test sum method", () => {

        expect(sum(2, 3)).toBe(5);
        expect(sum(-2, -4)).toBe(-6)
        expect(sum()).toBe(0);
        expect(sum("a", 4)).toBe('please enter numbers')

    })

    it("should test square method", () => {

        expect(square(2)).toBe(4);
        expect(square()).toBe('please pass the number');
        expect(square(-2)).toBe(4);
        expect(square('3')).toBe('please pass the number');
        expect(square(3, 5)).toBe(9);
        expect(square(Infinity)).toBe(Infinity);

    })

})


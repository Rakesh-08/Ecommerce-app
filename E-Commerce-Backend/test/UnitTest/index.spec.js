// falsy values=== null, undefined, false,0 ,"", NaN
let methods = require('../../my-app/methods')
let square = methods.square;
let sum = methods.sum;

describe("My calculator class", () => {

    let totalSum;

    // SETUP

    beforeEach(() => {
        totalSum = 0;
        console.log('BEFORE Each')
    });

    beforeAll(() => {

        console.log('BEFORE All')
    })

    // TEAR DOWN

    afterAll(() => {

        console.log('After All')
    })

    afterEach(() => {

        console.log('AFTER EACH')
    })

    xtest("should test sum method", () => {

        expect(sum(2, 3)).toBe(5);
        expect(sum(-2, -4)).toBe(-6)
        expect(sum()).toBe(0);
        expect(sum("a", 4)).toBe('please enter numbers')

    })

    xit("should test square method", () => {

        expect(square(2)).toBe(4);
        expect(square()).toBe('please pass the number');
        expect(square(-2)).toBe(4);
        expect(square('3')).toBe('please pass the number');
        expect(square(3, 5)).toBe(9);
        expect(square(Infinity)).toBe(Infinity);

    })

    xtest('add total', () => {
        let total = sum(2, 4);
        totalSum = totalSum + total;

        expect(totalSum).toBe(6)
    })


    xtest('add total again', () => {
        let total = sum(3, 4);
        totalSum = totalSum + total;

        expect(totalSum).toBe(7)
    })

})


const { mockRequest, mockResponse } = require('../interceptor')
let db = require('../../../model/index')
let cartController = require('../../../controller/cart.controller')



describe('it test the cart controller', () => {

    let req, res;

    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
    })
    let dummyCost = { id: 1, cost: 988 };
    const searchedProducts = [{
        "productId": 1,
        "ProductName": "samsung s22",
        "Price": 7999,
        "description": "samsung smartphone for mid-range budget",
        "categoryId": 2
    },

    {
        "productId": 3,
        "ProductName": "Full sleeve jacket",
        "Price": 1500,
        "description": "best jackets for winter",
        "categoryId": 1
    }];

    it('should test createCart method', async () => {
        req.body = dummyCost;

        try {

            let spy1 = jest.spyOn(db.CartModel, 'create').mockImplementation(() =>
                new Promise((resolve, reject) => resolve()));

            await cartController.createCart(req, res);

            expect(spy1).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Cart created " })
        } catch (err) {
            expect(res.status).toHaveBeenCalled(401);
            expect(res.json).toHaveBeenCalledWith({ message: "some internal error happend" })

        }
    })

    xit('should test updateCart', async () => {
        req.params.cartId = 1;
        req.body.productIds = [1, 3]

        let setProducts = jest.fn();
        let getProducts = jest.fn().mockReturnValue(searchedProducts)
        let spy1 = jest.spyOn(db.CartModel, 'findByPk').mockImplementation(() =>
            new Promise((resolve, reject) => resolve(dummyCost)));

        let spy2 = jest.spyOn(db.CartModel, 'findAll').mockImplementation(() =>
            new Promise((resolve, reject) => resolve(searchedProducts)));

        spy1.setProducts = jest.fn();
        spy1.getProducts = jest.fn().mockReturnValue(searchedProducts)

        await cartController.updateCart(req, res)

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 1, productSelected: [{ id: 1, name: 'samsung s22', cost: 7999 }] })


    })



})
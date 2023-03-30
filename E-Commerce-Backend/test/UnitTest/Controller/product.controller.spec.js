const { mockRequest, mockResponse } = require("../interceptor");
const db = require('../../../model/index');
const productController = require('../../../controller/product.controller')

describe("product controller", () => {
    let req, res;

    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
    })

    const testPayload = [{
        ProductName: "samsung s22",
        Price: 7999,
        description: "samsung smartphone for mid-range budget",
        categoryId: 2
    }];

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

    test('it should test the getAllProducts ', async () => {

        const spy = jest.spyOn(db.ProductModel, 'findAll').mockImplementation(() => new Promise((resolve, reject) => resolve(searchedProducts)));


        await productController.getAllProducts(req, res);

        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ data: searchedProducts, message: "sucess" }
        )
    });

    test("it should test the addNewProducts method with payload", async () => {
        let spy = jest.spyOn(db.ProductModel, "bulkCreate").mockImplementation((testPayload) =>
            new Promise((resolve, reject) => {
                resolve(testPayload)
            })
        );

        req.body = testPayload;
        await productController.addNewProducts(req, res);

        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(testPayload)
    });

    it('should test the selectedProduct Method', async () => {

        const spy3 = jest.spyOn(db.ProductModel, 'findByPk').mockImplementation(() => new Promise((resolve, reject) => resolve(searchedProducts[0])));

        req.params.productId = 1;
        await productController.getSelectedProduct(req, res);

        expect(spy3).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(searchedProducts[0])


    })

    it('should test the delete method', async () => {

        try {
            const spy4 = jest.spyOn(db.ProductModel, 'findByPk').mockImplementation(() => new Promise((resolve, reject) => resolve(searchedProducts[0])));


            req.params.productId = 1;


            await productController.deleteProductById(req, res);

            expect(spy4).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith('product removed from table')

        } catch (err) {
            expect(res.status).toHaveBeenCalledWith(400)
            expect(err).toHaveBeenCalledWith("Category not found");

        }
    })

    it('should test the updateProducts method', async () => {
        req.body = { Price: 3444 };
        req.params.productId = 3;


        let spy6 = jest.spyOn(db.ProductModel, "update").mockImplementation(() => new Promise((resolve, reject) => resolve()));

        let spy7 = jest.spyOn(db.ProductModel, 'findByPk').mockImplementation(() => new Promise((resolve, reject) =>
            resolve({ ...searchedProducts[1], Price: req.body.Price })))


        await productController.updateProductById(req, res);

        expect(spy6).toHaveBeenCalled();
        expect(spy7).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ ...searchedProducts[1], Price: req.body.Price })

    })




})









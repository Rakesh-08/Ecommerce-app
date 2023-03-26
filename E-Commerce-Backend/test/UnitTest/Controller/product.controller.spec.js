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
    })




})









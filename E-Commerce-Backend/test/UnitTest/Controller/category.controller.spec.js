const { mockRequest, mockResponse } = require('../interceptor')
const db = require('../../../model/index');
const categoryController = require("../../../controller/category.controller")

describe("category controller", () => {

    let req, res;

    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();

    })

    let allCategories = [
        {
            id: 1,
            name: "books"
        },
        {
            id: 2,
            name: "Footwear"
        }
    ]

    let searchedCategory = {
        id: 3,
        name: "Hardware Products",
        class: 'concrete'
    }


    test('the getAllCategories method from categoryController', async () => {

        const spy1 = jest.spyOn(db.CategoryModel, 'findAll').mockImplementation(() => new Promise((resolve, reject) => {
            resolve(allCategories)
        }));

        await categoryController.getAllCategories(req, res);

        expect(spy1).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(allCategories)

    });



    it('should test the error in getAllCategories method', async () => {
        const spy2 = jest.spyOn(db.CategoryModel, 'findAll').mockImplementation(() => new Promise((resolve, reject) => {
            reject()
        }));

        await categoryController.getAllCategories(req, res);

        expect(spy2).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith("some internal error occurred")


    })

    it('should test the getCategoryById method ', async () => {

        const spy3 = jest.spyOn(db.CategoryModel, 'findOne').mockImplementation(() => new Promise((resolve, reject) => {
            resolve(searchedCategory)
        }));

        req.params.categoryId = 3;
        await categoryController.getCategoryById(req, res);

        expect(spy3).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(searchedCategory);

    })

    it('should test the addNewCategories method', async () => {

        let spy4 = jest.spyOn(db.CategoryModel, 'bulkCreate').mockImplementation((allCategories) =>
            new Promise((resolve, reject) =>
                resolve(allCategories)));

        req.body = allCategories;

        await categoryController.addNewCategory(req, res);

        expect(spy4).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(allCategories)


    })

    it('should test the deleteCategory method', async () => {
        let spy5 = jest.spyOn(db.CategoryModel, "destroy").mockImplementation(() =>
            new Promise((resolve, reject) =>
                resolve()));

        req.params.categoryId = 3;
        await categoryController.deleteCategoryById(req, res);

        expect(spy5).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith("Above category is removed")
    })

    it('should test the updateCategory method', async () => {
        req.body = { name: "software Products" };
        req.params.categoryId = 3;


        let spy6 = jest.spyOn(db.CategoryModel, "update").mockImplementation(() =>
            new Promise((resolve, reject) =>
                resolve()));

        let spy7 = jest.spyOn(db.CategoryModel, 'findByPk').mockImplementation(() => new Promise((resolve, reject) =>
            resolve({ ...searchedCategory, name: req.body.name })))


        await categoryController.updateCategoryById(req, res);

        expect(spy6).toHaveBeenCalled();
        expect(spy7).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ id: 3, name: 'software Products', class: 'concrete' })

    })


})














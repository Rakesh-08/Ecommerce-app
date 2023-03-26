const expressApp = require('../../../app');
const request = require('supertest');
const db = require('../../../model/index')



const api_v1_endpoint = '/ecomm/api/v1/products';

describe('product routes', () => {

    it('should get all products', async () => {
        const res = await request(expressApp).get(api_v1_endpoint)

        expect(res.statusCode).toEqual(401);
    })

    it('should add new product', async () => {
        const res = await request(expressApp).post(api_v1_endpoint).send(
            {
                ProductName: 'jbl',
                Price: 4444,
                description: 'cool product',
                categoryId: 3,
            })

        expect(res.statusCode).toEqual(201);
    })
})

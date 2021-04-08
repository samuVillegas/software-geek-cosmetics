const request = require('supertest');
const faker = require('faker');
const app = require('../index');

describe("API services for the G-Cosmetics project are to be tested.",()=>{
    it('Check save the products stored in the JSON in DB',async()=>{
        const res = await request(app)
        .get('/api/saveProducts')
        expect(res.statusCode).toEqual(265)
        expect(res.body).toHaveProperty('message','PRODUCTS_STORED_CORRECTLY')
        
    })

    it('Check return the products stored in the JSON',async()=>{
        const res = await request(app)
        .get('/api/getProducts')
        expect(res.statusCode).toEqual(275)
        expect(res.body).toHaveProperty('message')
    })

    it('Check return the sales stored in the DB',async()=>{
        const res = await request(app)
        .get('/api/getSales')
        expect(res.statusCode).toEqual(275)
        expect(res.body).toHaveProperty('message')
    })

    it('Check creation of sale in BD',async()=>{
        const res = await request(app)
        .post('/api/createSale')
        .send({
            NumberSale: Math.floor(Math.random()*999999)+1,
            SubTotal: 20000,
            TotalIVA: 3800,
            CreationDate: 20200407205700,
            NameUser: faker.name.firstName(),
            Total: 23800
        })
        expect(res.statusCode).toEqual(265)
        expect(res.body).toHaveProperty('message','SUCCESSFUL_CREATION_SALE')
    })
    
})
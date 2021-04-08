const { Router } = require('express');
const router = Router();
const {
    getMain,
    getProducts,
    createSale,
    getSales,
    saveProducts
} = require('../controller/controller');

/**
 * @swagger
 * components:
 *  schemas:
 *      Sale:
 *          type: object
 *          required:
 *              -NumbreSale
 *              -SubTotal
 *              -TotalIVA
 *              -CreationDate
 *              -NameUser
 *              -Total
 *          properties:
 *              NumbreSale:
 *                  type: integer
 *                  description: Identifier of a sale
 *              SubTotal:
 *                  type: integer
 *                  description: Subtotal of sale
 *              TotalIVA:
 *                  type: integer
 *                  description: TotalIVA of sale
 *              CreationDate: 
 *                  type: date
 *                  description: Date and time of creation of the sale
 *              NameUser:
 *                  type: string
 *                  description: Name of the user who made the purchase
 *              Total:
 *                  type: integer
 *                  description: Total of sale
 *           
 *          example:
 *              NumbreSale: 1
 *              SubTotal: 90000
 *              TotalIVA: 17100
 *              CreationDate: 20210501170500
 *              NameUser: Fernando
 *              Total: 107100
 *      Product:
 *          type: object
 *          required:
 *              -Id
 *              -Description
 *              -Price
 *              -Existence
 *          properties:
 *              Id: 
 *                  type: integer
 *                  description: Product identifier
 *              Description:
 *                  type: string
 *                  description: Short description of the product
 *              Price:
 *                  type: integer
 *                  description: Price of product
 *              Existence: 
 *                  type: integer
 *                  description: Number of existing products
 * 
 *          example:
 *              Id: 1
 *              Description: Foam
 *              Price: 17000
 *              Existence: 1000
 *  
 *                     
 *      
 *                
 */

router.get('/', getMain);

/**
 * @swagger
 * /saveProducts:
 *  get:
 *      summary: Save the products stored in the JSON in DB
 *      tags: [Product]
 *      responses:
 *          265:
 *              description: Products stored correctly    
 *          255:
 *              description: Server error
 * 
 */
router.get('/saveProducts',saveProducts);


/**
 * @swagger
 * /getProducts:
 *  get:
 *      summary: Get the products stored in the JSON
 *      tags: [Product]
 *      responses:
 *          275:
 *              description: A JSON is returned with the products and their respective values in propierty (message)
 *              content:
 *                  application/json:
 *                          schema: 
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'                   
 *          255:
 *              description: Server error
 * 
 */
router.get('/getProducts', getProducts);

/**
 * @swagger
 * /createSale:
 *  post:
 *      summary: Create one sale in the DB
 *      tags: [Sale]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/Sale'  
 *      responses:
 *          265:
 *              description: Sale successfully created
 *          255:
 *              description: Server error
 * 
 */
router.post('/createSale', createSale);

/**
 * @swagger
 * /getSales:
 *  get:
 *      summary: Get the sales stored in the DB
 *      tags: [Sale]
 *      responses:
 *          275:
 *              description: A JSON is returned with the sales and their respective values
 *              content:
 *                  application/json:
 *                          schema: 
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Sale'  
 *          285: 
 *              description: There are no sales
 *          255:
 *              description: Server error
 * 
 */
router.get('/getSales', getSales);

module.exports = router;
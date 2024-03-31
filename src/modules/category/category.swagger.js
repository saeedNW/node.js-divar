/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategory:
 *              type: object
 *              required:
 *                  -   name
 *                  -   icon
 *              properties:
 *                  name:
 *                      type: string
 *                      description: category's name
 *                  slug:
 *                      type: string
 *                      description: category's slug
 *                  icon:
 *                      type: string
 *                      description: category's icon
 *                  parent:
 *                      type: string
 *                      description: category's parent id
 */

/**
 * @swagger
 *  definitions:
 *      DefaultCreate:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  description: response http status code
 *                  example: 201
 *              success:
 *                  type: boolean
 *                  description: define process ending status
 *                  example: true
 *              message:
 *                  type: string
 *                  description: response message
 *                  example: "your request ended successfully"
 *              data:
 *                  type: object
 *      ConflictError:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  description: response http status code
 *                  example: 409
 *              success:
 *                  type: boolean
 *                  description: define process ending status
 *                  example: true
 *              message:
 *                  type: string
 *                  description: response message
 *                  example: "your request ended successfully"
 *              data:
 *                  type: object
 */

/**
 * @swagger
 * 	/category/new:
 *      post:
 *          summary: new category creation process
 *          tags:
 *              -   Category
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateCategory'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateCategory'
 *          responses:
 *              201:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/DefaultCreate'
 *              409:
 *                  description: conflict error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ConflictError'
 *              422:
 *                  description: validation error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ValidationError'
 *              500:
 *                  description: server internal error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ServerError'
 */

/**
 * @swagger
 *  /category/list:
 *      get:
 *          summary: retrieve all categories
 *          tags:
 *              -   Category
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/DefaultSuccess'
 *              500:
 *                  description: server internal error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ServerError'
 */

/**
 * @swagger
 *  /category/single/{id}:
 *      get:
 *          summary: retrieve single category
 *          tags:
 *              -   Category
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/DefaultSuccess'
 *              404:
 *                  description: notfound
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/NotFound'
 *              422:
 *                  description: validation error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ValidationError'
 *              500:
 *                  description: server internal error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ServerError'
 */

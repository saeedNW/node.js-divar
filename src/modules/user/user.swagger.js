/**
 * @swagger
 * tags:
 *  name: UserPanel(Profile)
 *  description: User Module and Routes
 */

/**
 * @swagger
 *  definitions:
 *      DefaultSuccess:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  description: response http status code
 *                  example: 200
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
 * /user/profile:
 *  get:
 *      summary: retrieve user profile data
 *      tags: [UserPanel(Profile)]
 *      responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/DefaultSuccess'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Unauthorized'
 *              500:
 *                  description: server internal error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ServerError'
 */
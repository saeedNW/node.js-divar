/**
 * @swagger
 * tags:
 *  name: Public(Auth)
 *  description: Auth Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          SendOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: user mobile number
 *                      minLength: 11
 *                      maxLength: 11
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: user mobile number
 *                  code:
 *                      type: string
 *                      description: user verification code
 */

/**
 * @swagger
 *  definitions:
 *      SendOTPSuccess:
 *          type: object
 *          properties:
 *              status:
 *                  type: string
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
 *                  properties:
 *                      otp:
 *                          type: string
 *                          description: user otp code (accessible only in dev environment)
 *                          example: 15248
 *      CheckOTPSuccess:
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
 *                  properties:
 *                      token:
 *                          type: string
 *                          description: user JWT access token
 */

/**
 * @swagger
 *  definitions:
 *      BadRequest:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  description: response http status code
 *                  example: 400
 *              success:
 *                  type: boolean
 *                  description: define process ending status
 *                  example: false
 *              message:
 *                  type: string
 *                  description: response message
 *                  example: "Bad request"
 *      ServerError:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  description: response http status code
 *                  example: 500
 *              success:
 *                  type: boolean
 *                  description: define process ending status
 *                  example: false
 *              message:
 *                  type: string
 *                  description: response message
 *                  example: "server internal error"
 *      ValidationError:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  description: response http status code
 *                  example: 422
 *              success:
 *                  type: boolean
 *                  description: define process ending status
 *                  example: false
 *              message:
 *                  type: string
 *                  description: response message
 *                  example: "Validation error"
 *              errors:
 *                  type: object
 *                  properties:
 *                      filedName#1:
 *                          type: string
 *                          description: Name of the filed that got error
 *                          example: "error message"
 *                      filedName#2:
 *                          type: string
 *                          description: Name of the filed that got error
 *                          example: "error message"
 *                      filedName#3:
 *                          type: string
 *                          description: Name of the filed that got error
 *                          example: "error message"
 *      Unauthorized:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  description: response http status code
 *                  example: 401
 *              success:
 *                  type: boolean
 *                  description: define process ending status
 *                  example: false
 *              message:
 *                  type: string
 *                  description: response message
 *                  example: "please login to your account"
 *      NotFound:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  description: response http status code
 *                  example: 404
 *              success:
 *                  type: boolean
 *                  description: define process ending status
 *                  example: false
 *              message:
 *                  type: string
 *                  description: response message
 *                  example: "requested data was not found"
 */

/**
 * @swagger
 * /auth/send-otp:
 *  post:
 *      summary: users' otp creation process
 *      tags: [Public(Auth)]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/SendOTP'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SendOTP'
 *      responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/SendOTPSuccess'
 *              400:
 *                  description: bad request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/BadRequest'
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
 * /auth/check-otp:
 *  post:
 *      summary: users' check otp process
 *      tags: [Public(Auth)]
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOTP'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOTP'
 *      responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/CheckOTPSuccess'
 *              401:
 *                  description: Unauthorized
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/Unauthorized'
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

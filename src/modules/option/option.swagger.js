/**
 * @swagger
 * tags:
 *  name: Option
 *  description: Option Module and Routes
 */

/**
 * @swagger
 *  components:
 *      parameters:
 *          OptionId:
 *              name: id
 *              description: option object id
 *              in: path
 *              type: string
 *      schemas:
 *          CreateOption:
 *              type: object
 *              required:
 *                  -   title
 *                  -   key
 *                  -   type
 *                  -   category
 *              properties:
 *                  title:
 *                      type: string
 *                      description: new option's title
 *                      example: رنگ
 *                  key:
 *                      type: string
 *                      description: new option's identifier key
 *                      example: color
 *                  category:
 *                      type: string
 *                      description: new option's related category object id
 *                  guid:
 *                      type: string
 *                      description: new option's HELP description
 *                      example: رنگ های قابل انتخاب برای آیتم مورد نظر
 *                  required:
 *                      type: boolean
 *                      description: new option's required status
 *                  type:
 *                      type: string
 *                      description: new option's value type
 *                      enum:
 *                          -   number
 *                          -   string
 *                          -   boolean
 *                          -   array
 *                  enum:
 *                      type: array
 *                      description: new option's default value that user should chose from
 *                      items:
 *                          type: string
 *          UpdateOption:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: option's title
 *                  key:
 *                      type: string
 *                      description: option's identifier key
 *                  category:
 *                      type: string
 *                      description: option's related category object id
 *                  guid:
 *                      type: string
 *                      description: option's HELP description
 *                  required:
 *                      type: boolean
 *                      description: option's required status
 *                  type:
 *                      type: string
 *                      description: option's value type
 *                      enum:
 *                          -   number
 *                          -   string
 *                          -   boolean
 *                          -   array
 *                  enum:
 *                      type: array
 *                      description: option's default value that user should chose from
 *                      items:
 *                          type: string
 */

/**
 * @swagger
 *  definitions:
 *      OptionsListByCategoryId:
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
 *                      options:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: 661f8dc2a8beb247f4e445a5
 *                                  title:
 *                                      type: string
 *                                      example: عنوان
 *                                  key:
 *                                      type: string
 *                                      example: klyd_mrbwth
 *                                  type:
 *                                      type: string
 *                                      example: string
 *                                  enum:
 *                                      type: array
 *                                      example: ["enum #1", "enum #2"]
 *                                  required:
 *                                      type: boolean
 *                                      example: true
 *                                  category:
 *                                      type: object
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                              example: 66094408e8ba23256a5caaf0
 *                                          name:
 *                                              type: string
 *                                              example: کوروت
 *                                          slug:
 *                                              type: string
 *                                              example: corvette
 *                                          children:
 *                                              type: array
 *                                              example: []
 *                                  createdAt:
 *                                      type: string
 *                                      example: "2024-04-17T08:52:18.606Z"
 *                                  updatedAt:
 *                                      type: string
 *                                      example: "2024-04-17T08:52:18.606Z"
 *      OptionsListByCategorySlug:
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
 *                      options:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: 661f8dc2a8beb247f4e445a5
 *                                  title:
 *                                      type: string
 *                                      example: عنوان
 *                                  key:
 *                                      type: string
 *                                      example: klyd_mrbwth
 *                                  type:
 *                                      type: string
 *                                      example: string
 *                                  enum:
 *                                      type: array
 *                                      example: ["enum #1", "enum #2"]
 *                                  required:
 *                                      type: boolean
 *                                      example: true
 *                                  categorySlug:
 *                                      type: string
 *                                      example: corvette
 *                                  categoryName:
 *                                      type: string
 *                                      example: کوروت
 *                                  categoryIcon:
 *                                      type: string
 *                                      example: car
 *                                  createdAt:
 *                                      type: string
 *                                      example: "2024-04-17T08:52:18.606Z"
 *                                  updatedAt:
 *                                      type: string
 *                                      example: "2024-04-17T08:52:18.606Z"
 *      SingleOption:
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
 *                      option:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  example: 661f8dc2a8beb247f4e445a5
 *                              title:
 *                                  type: string
 *                                  example: عنوان
 *                              key:
 *                                  type: string
 *                                  example: klyd_mrbwth
 *                              type:
 *                                  type: string
 *                                  example: string
 *                              enum:
 *                                  type: array
 *                                  example: ["enum #1", "enum #2"]
 *                              required:
 *                                  type: boolean
 *                                  example: true
 *                              category:
 *                                  type: string
 *                                  example: 661f8dc2a8beb247f4e445a5
 *                              createdAt:
 *                                  type: string
 *                                  example: "2024-04-17T08:52:18.606Z"
 *                              updatedAt:
 *                                  type: string
 *                                  example: "2024-04-17T08:52:18.606Z"
 *
 */

/**
 * @swagger
 *  /option/new:
 *      post:
 *          summary: create new option for category
 *          tags:
 *              -   Option
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateOption'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateOption'
 *          responses:
 *              201:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/DefaultCreate'
 *              404:
 *                  description: notfound
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/NotFound'
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
 *  /option/list:
 *      get:
 *          summary: get all options list
 *          tags:
 *              -   Option
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/OptionsListByCategoryId'
 *              500:
 *                  description: server internal error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ServerError'
 */

/**
 * @swagger
 *  /option/by-category/{categoryId}:
 *      get:
 *          summary: get all options of category object is
 *          tags:
 *              -   Option
 *          parameters:
 *              -   $ref: '#/components/parameters/CategoryId'
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/OptionsListByCategoryId'
 *              500:
 *                  description: server internal error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ServerError'
 */

/**
 * @swagger
 *  /option/by-category-slug/{categorySlug}:
 *      get:
 *          summary: get all options of category slug
 *          tags:
 *              -   Option
 *          parameters:
 *              -   $ref: '#/components/parameters/CategorySlug'
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/OptionsListByCategorySlug'
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
 *  /option/single/{id}:
 *      get:
 *          summary: get single option by its object id
 *          tags:
 *              -   Option
 *          parameters:
 *              -   $ref: '#/components/parameters/OptionId'
 *          responses:
 *              200:
 *                  description: successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/SingleOption'
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

/**
 * @swagger
 *  /option/update/{id}:
 *      put:
 *          summary: option update process
 *          tags:
 *              -   Option
 *          parameters:
 *              -   $ref: '#/components/parameters/OptionId'
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateOption'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateOption'
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
 *  /option/remove/{id}:
 *      delete:
 *          summary: option removal process
 *          tags:
 *              -   Option
 *          parameters:
 *              -   $ref: '#/components/parameters/OptionId'
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
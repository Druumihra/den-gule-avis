# API SPEC

## Types

Product:
- image: string
- title: string
- description: string
- comments: Comment[]

Comment:
- text: string
- user_id: string

## Routes

### GET /products

Request: [empty]
Response: 200 - Product[]

### GET /products/{id}

Request: [empty]
Response: 200 - Product

### POST /products

Request: Product
Response: 204 - [empty]

### DELETE /products/{id}

Request: [empty]
Response: 204 - [empty]

### PUT /products/{id}

Request: Product
Response: 204 - [empty]

### POST /products/{id}/comments

Request: string
Response: 204 - [empty]


# API Documentation

## Base URL
```
http://localhost:3000
```

---

## Users

### Create User
**POST** `/users`

**Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string (min 6 characters)",
  "role": "string (optional)",
  "phone": "string (optional)"
}
```

**Response:** `201 Created`
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phone": "string | null",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Get All Users
**GET** `/users`

**Response:** `200 OK`
```json
[
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "string",
    "phone": "string | null",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### Get User by ID
**GET** `/users/:id`

**Response:** `200 OK`
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phone": "string | null",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Update User
**PATCH** `/users/:id`

**Body:**
```json
{
  "name": "string (optional)",
  "email": "string (optional)",
  "password": "string (optional)",
  "role": "string (optional)",
  "phone": "string (optional)"
}
```

**Response:** `200 OK`
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phone": "string | null",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Delete User
**DELETE** `/users/:id`

**Response:** `200 OK`
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phone": "string | null",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

## Categories

### Create Category
**POST** `/categories`

**Body:**
```json
{
  "name": "string"
}
```

**Response:** `201 Created`
```json
{
  "id": "string",
  "name": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Get All Categories
**GET** `/categories`

**Response:** `200 OK`
```json
[
  {
    "id": "string",
    "name": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### Get Category by ID
**GET** `/categories/:id`

**Response:** `200 OK`
```json
{
  "id": "string",
  "name": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Update Category
**PATCH** `/categories/:id`

**Body:**
```json
{
  "name": "string (optional)"
}
```

**Response:** `200 OK`
```json
{
  "id": "string",
  "name": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Delete Category
**DELETE** `/categories/:id`

**Response:** `200 OK`
```json
{
  "id": "string",
  "name": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

## Establishments

### Create Establishment
**POST** `/establishments`

**Body:**
```json
{
  "name": "string",
  "address": "string",
  "province": "string",
  "userId": "string",
  "categoryId": "string"
}
```

**Response:** `201 Created`
```json
{
  "id": "string",
  "name": "string",
  "address": "string",
  "province": "string",
  "userId": "string",
  "categoryId": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Get All Establishments
**GET** `/establishments`

**Response:** `200 OK`
```json
[
  {
    "id": "string",
    "name": "string",
    "address": "string",
    "province": "string",
    "userId": "string",
    "categoryId": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### Get Establishment by ID
**GET** `/establishments/:id`

**Response:** `200 OK`
```json
{
  "id": "string",
  "name": "string",
  "address": "string",
  "province": "string",
  "userId": "string",
  "categoryId": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Get Establishments by User ID
**GET** `/establishments/user/:userId`

**Response:** `200 OK`
```json
[
  {
    "id": "string",
    "name": "string",
    "address": "string",
    "province": "string",
    "userId": "string",
    "categoryId": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### Update Establishment
**PATCH** `/establishments/:id`

**Body:**
```json
{
  "name": "string (optional)",
  "address": "string (optional)",
  "province": "string (optional)",
  "categoryId": "string (optional)"
}
```

**Response:** `200 OK`
```json
{
  "id": "string",
  "name": "string",
  "address": "string",
  "province": "string",
  "userId": "string",
  "categoryId": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Delete Establishment
**DELETE** `/establishments/:id`

**Response:** `200 OK`
```json
{
  "id": "string",
  "name": "string",
  "address": "string",
  "province": "string",
  "userId": "string",
  "categoryId": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

## Queues

### Create Queue
**POST** `/queues`

**Body:**
```json
{
  "name": "string",
  "prefix": "string",
  "establishId": "string",
  "status": "string (optional, default: 'active')"
}
```

**Response:** `201 Created`
```json
{
  "id": "string",
  "name": "string",
  "prefix": "string",
  "status": "string",
  "currentNum": 0,
  "startAt": "date | null",
  "endAt": "date | null",
  "establishId": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Get All Queues
**GET** `/queues`

**Response:** `200 OK`
```json
[
  {
    "id": "string",
    "name": "string",
    "prefix": "string",
    "status": "string",
    "currentNum": "number",
    "startAt": "date | null",
    "endAt": "date | null",
    "establishId": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### Get Queue by ID
**GET** `/queues/:id`

**Response:** `200 OK`
```json
{
  "id": "string",
  "name": "string",
  "prefix": "string",
  "status": "string",
  "currentNum": "number",
  "startAt": "date | null",
  "endAt": "date | null",
  "establishId": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Get Queues by Establishment ID
**GET** `/queues/establishment/:establishId`

**Response:** `200 OK`
```json
[
  {
    "id": "string",
    "name": "string",
    "prefix": "string",
    "status": "string",
    "currentNum": "number",
    "startAt": "date | null",
    "endAt": "date | null",
    "establishId": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### Update Queue
**PATCH** `/queues/:id`

**Body:**
```json
{
  "name": "string (optional)",
  "prefix": "string (optional)",
  "status": "string (optional)",
  "currentNum": "number (optional)"
}
```

**Response:** `200 OK`
```json
{
  "id": "string",
  "name": "string",
  "prefix": "string",
  "status": "string",
  "currentNum": "number",
  "startAt": "date | null",
  "endAt": "date | null",
  "establishId": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Delete Queue
**DELETE** `/queues/:id`

**Response:** `200 OK`
```json
{
  "id": "string",
  "name": "string",
  "prefix": "string",
  "status": "string",
  "currentNum": "number",
  "startAt": "date | null",
  "endAt": "date | null",
  "establishId": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

## Tickets

### Create Ticket
**POST** `/tickets`

**Body:**
```json
{
  "position": "number",
  "userId": "string",
  "queueId": "string"
}
```

**Response:** `201 Created`
```json
{
  "id": "string",
  "number": "string (auto-generated: prefix + currentNum)",
  "position": "number",
  "status": "string (default: 'pending')",
  "userId": "string",
  "queueId": "string",
  "calledAt": "date | null",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Get All Tickets
**GET** `/tickets`

**Response:** `200 OK`
```json
[
  {
    "id": "string",
    "number": "string",
    "position": "number",
    "status": "string",
    "userId": "string",
    "queueId": "string",
    "calledAt": "date | null",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### Get Ticket by ID
**GET** `/tickets/:id`

**Response:** `200 OK`
```json
{
  "id": "string",
  "number": "string",
  "position": "number",
  "status": "string",
  "userId": "string",
  "queueId": "string",
  "calledAt": "date | null",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Get Tickets by Queue ID
**GET** `/tickets/queue/:queueId`

**Response:** `200 OK`
```json
[
  {
    "id": "string",
    "number": "string",
    "position": "number",
    "status": "string",
    "userId": "string",
    "queueId": "string",
    "calledAt": "date | null",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### Get Tickets by User ID
**GET** `/tickets/user/:userId`

**Response:** `200 OK`
```json
[
  {
    "id": "string",
    "number": "string",
    "position": "number",
    "status": "string",
    "userId": "string",
    "queueId": "string",
    "calledAt": "date | null",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

### Update Ticket
**PATCH** `/tickets/:id`

**Body:**
```json
{
  "status": "string (optional)",
  "calledAt": "date (optional)"
}
```

**Response:** `200 OK`
```json
{
  "id": "string",
  "number": "string",
  "position": "number",
  "status": "string",
  "userId": "string",
  "queueId": "string",
  "calledAt": "date | null",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Delete Ticket
**DELETE** `/tickets/:id`

**Response:** `200 OK`
```json
{
  "id": "string",
  "number": "string",
  "position": "number",
  "status": "string",
  "userId": "string",
  "queueId": "string",
  "calledAt": "date | null",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["validation error messages"],
  "error": "Bad Request"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "Conflict message (e.g., Email already exists)",
  "error": "Conflict"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## Database Schema

### User
- `id`: string (PK)
- `name`: string
- `email`: string (unique)
- `password`: string
- `role`: string (default: "user")
- `phone`: string | null
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Category
- `id`: string (PK)
- `name`: string (unique)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Establishment
- `id`: string (PK)
- `name`: string
- `address`: string
- `province`: string
- `userId`: string (FK → User)
- `categoryId`: string (FK → Category)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Queue
- `id`: string (PK)
- `name`: string
- `prefix`: string
- `status`: string (default: "active")
- `currentNum`: number (default: 0)
- `startAt`: DateTime | null
- `endAt`: DateTime | null
- `establishId`: string (FK → Establishment)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Ticket
- `id`: string (PK)
- `number`: string (unique, auto-generated)
- `position`: number
- `status`: string (default: "pending")
- `userId`: string (FK → User)
- `queueId`: string (FK → Queue)
- `calledAt`: DateTime | null
- `createdAt`: DateTime
- `updatedAt`: DateTime

---

## Relationships

- User → Establishments (1:N)
- User → Tickets (1:N)
- Category → Establishments (1:N)
- Establishment → Queues (1:N)
- Queue → Tickets (1:N)

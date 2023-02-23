# auth api

## `POST /login`

### REQUEST

```ts
{
    username: string,
    password: string,
}
```

### RESPONSE

`status: 200 | 400 | 500`

```ts
{
    message: "Success" | "invalid login" | "server error",
    token?: "abcdefghijkl",
    
}
```

## `POST /register`

### REQUEST

```ts
{
    username: string,
    password: string,
}
```

### RESPONSE

`status: 200 | 400 | 500`

```ts
{
    message: "Success" | "invalid username" | "server error",
}
```

## `GET /tokenToUser/:token`

### RESPONSE

`status: 200 | 400 | 500`

```ts
{
    message: "Success" | "invalid token" | "server error",
    user: {
        id: "...",
        username: "...",
    }
}
```

## `POST /logout`

### REQUEST

```ts
{
    userId: string
    token: string
}
```

### RESPONSE

`status: 200 | 400| 500`

```ts
{
    message: "Success" | "Invalid session token" | "server error"
}

```
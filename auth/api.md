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
    message: "Success" | "Invalid login" | "Server error",
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
    message: "Success" | "Invalid username" | "Server error",
}
```

## `GET /tokenToUser/:token`

### RESPONSE

`status: 200 | 400 | 500`

```ts
{
    message: "Success" | "Invalid token" | "Server error",
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
  userId: string;
  token: string;
}
```

### RESPONSE

`status: 200 | 400| 500`

```ts
{
  message: "Success" | "Invalid session token" | "Server error";
}
```

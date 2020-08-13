# EXPRESS API endpoints

**For each route, you have to put the prefix /api**



##  Authentication routes

**For each routes, you have to put the prefix /user**



### To login (POST) : /login

```json
{
    "username" : "example",
    "password" : "password"
}
```

**Response :**

````json
{
    "access_token" : "MY_SECRET_TOKEN",
}
````



### To register (POST) : /register

```json
{
    "username" : "example",
    "password" : "password",
    "readonly" : true
}
```

**Response :**

```json
{
    "user" : "userid"
}
```



### To get user role (GET) : /readonly

*Need to be logged in*

**Response :**

```json
{
   "readonly" : true
}
```



## Post routes

**For each route, you need to be authenticated and put the prefix /post **



### Get all posts (GET) : /

**Response : **

```json
[
    {
        "_id" : "id",
        "title" : "Post title",
        "content" : "Lorem ipsum dolor ipset",
        "created_at" : "2018/01/20"
    },
    {
        "_id" : "id2",
        "title" : "2 Post title",
        "content" : "Lorem ipsum dolor ipset vacum loream chantare",
        "created_at" : "2018/06/20"
    },
]
```



### Add a new post (POST) : /

```json
{
   "title" : "Post title",
   "content" : "Lorem ipsum dolor ipset"
}
```



 **Response : **

```json
{
    "_id" : "id",
    "title" : "Post title",
    "content" : "Lorem ipsum dolor ipset",
    "created_at" : "2018/01/20"
}
```



### Get specific post (GET) : /:postId

 **Response : **

```json
{
    "_id" : "id",
    "title" : "Post title",
    "content" : "Lorem ipsum dolor ipset",
    "created_at" : "2018/01/20"
}
```



### Delete post (DELETE) : /:postId

**Response :**

```json
{
    "message" : "Post removed successfully"
}
```



### Update post (PUT) : /:postId

**Response :**

```json
{
    "message" : "Post updated successfully"
}
```


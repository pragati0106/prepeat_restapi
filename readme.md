***Sign Up***

Base URL: http://localhost:3000/users/

ENDPOINT:
1. POST /signup
   Request:
   Body:
       email: User's email address.
       password: User's password.
       name: User's name.
    Response:
       Success (201):
       Successfully signed up.
    Example:
        {
            "message": "User signed up successfully"
        }


***LOGIN***

ENDPOINT:
1. POST/Login
    Request:
    Body:
        email: User's email address.
        password: User's password.
    Response:
        Success (200):
        Authentication successful. Returns a JWT token and user ID.
        Example:
        {
           "message": "Authentication successful",
            "token": "your_jwt_token",
            "_id": "user_id"
        }

***Change Password***

Endpoint:
1. PUT /changepassword
    Request:
    Body:
        email: User's email address.
        password: Current password.
        newpassword: New password.
    Response:
        Success (200):
        Password changed successfully.
        Example:
        {
             "message": "Password changed successfully"
        }

***Get All Users***

Endpoint:
1. GET /
    Request:
    Headers:
        Authorization: Bearer token (JWT).
    Response:
        Success (200):
        Returns a list of all users.
        Example:
        [
            {
                "_id": "user_id",
                "email": "user@example.com",
                "name": "User Name",
                "role": "user",
               "ownedRestaurant": null
            },
            // ... other users
        ]

***Delete User and Associated Restaurant***

Endpoint:
1. DELETE /:id
    Request:
    Headers:
        Authorization: Bearer token (JWT).
    Params:
        id: User ID to be deleted.
    Response:
        Success (200):
        User and associated restaurant deleted successfully.
        Example:
        {
            "message": "User and associated restaurant deleted successfully"
        }



# Restaurant API Documentation

Introduction:

This API provides endpoints to manage restaurants and their associated operations.

Base URL:

http://localhost:3000/restaurants/

Authentication:

Most endpoints require valid authentication. Include the user's JWT token in the request headers.

Endpoints:

Get All Restaurants:

Endpoint:

`GET /`

Description:

Retrieve a list of all restaurants.

Request:

- Method: `GET`
- Authentication: Required

Response:

- Status: `200 OK`
- Body: JSON array of restaurant objects

Create a New Restaurant:

Endpoint:

`POST /`

Description:

Create a new restaurant and associate it with the authenticated user.

Request:

- Method: `POST`
- Authentication: Required
- Body: JSON object with restaurant details

Response:

- Status: `200 OK`
- Body: JSON object with the details of the created restaurant

Get a Specific Restaurant:

Endpoint:

`GET /:id`

Description:

Retrieve details of a specific restaurant.

Request:

- Method: `GET`
- Authentication: Required
- Path Parameter: `id` - Restaurant ID

Response:

- Status: `200 OK`
- Body: JSON object with the details of the specified restaurant

Update a Restaurant:

Endpoint:

`PUT /:id`

Description:

Update details of a specific restaurant.

Request:

- Method: `PUT`
- Authentication: Required
- Authorization: Admin privileges required
- Path Parameter: `id` - Restaurant ID
- Body: JSON object with updated restaurant details

Response:

- Status: `200 OK`
- Body: JSON object with the updated details of the specified restaurant

Error Responses:

Invalid User ID Format:

- Status: `400 Bad Request`
- Body: JSON object with an error message

User Already a Restaurant Owner:

- Status: `400 Bad Request`
- Body: JSON object with an error message

Invalid Restaurant ID Format:

- Status: `400 Bad Request`
- Body: JSON object with an error message

Restaurant Not Found:

- Status: `404 Not Found`
- Body: JSON object with an error message

Update Error:

- Status: `500 Internal Server Error`
- Body: JSON object with an error message




# Restaurant Category API Documentation

Introduction:

This API provides an endpoint to fetch all restaurants of a specific category.

Base URL:

http://localhost:3000/category/pizza

Endpoints:

Get Restaurants by Category:

Endpoint:

`GET /:category`

Description:

Retrieve a list of all restaurants that offer dishes in a specific category.

Request:

- Method: `GET`
- Path Parameter: `category` - The category of dishes to filter restaurants by

Response:

- Status: `200 OK`
- Body: JSON array of restaurant objects

Error Responses:

Internal Server Error:

- Status: `500 Internal Server Error`
- Body: JSON object with an error message

Notes:

- The category parameter is case-sensitive.
- All date/time values are in UTC.

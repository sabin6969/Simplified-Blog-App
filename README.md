
# Blog API

This is a Node.js Express API for a blog application with user authentication and blog post management.

## Environment Variables

Create a `.env` file in the root directory with the following variables:
- `PORT = PORT_NUMBER`
- `MONGODB_CONNECTION_STRING = MONGODB_CONNECTION_STRING`
- `FIREBASE_API = FIREBASE_API`
- `FIREBASE_PROJECT_ID = FIREBASE_PROJECT_ID`


## Firebase Setup

1. Download your Firebase service account JSON file from the Firebase Console
2. Place the file inside the `src` folder
3. Update the path in `firebase.admin.js` at line 7:
```javascript
credential: cert(Path.join("src/simplified-blog-app-firebase-adminsdk-fbsvc-0577a28f1f.json"))
```
## API Routes
### User Routes (`user.router.js`)
- `POST api/auth/login` - User login endpoint
- `POST api/auth/register` - User registration endpoint

### Blog Routes (`blog.route.js`)
#### Unsecured Routes
- `GET api/posts` - Get all blog posts
- `GET api/posts/:id` - Get a specific blog post by ID

#### Secured Routes (Requires Authentication)
- `POST api/posts` - Create a new blog post
- `DELETE api/posts/:id` - Delete a blog post
- `PATCH api/posts/:id` - Update a blog post

## Controllers

### User Controller (`user.controller.js`)
- `loginUser`: Handles user login with email and password
  - Returns user data and authentication token
  - Sets token in cookies
- `signupUser`: Handles user registration
  - Creates new user with email and password
  - Returns user data and authentication token

### Blog Controller (`blog.controller.js`)
- `createBlogPost`: Creates a new blog post
  - Requires title and content
  - Broadcasts new post via WebSocket
- `allPosts`: Retrieves all blog posts
- `blogPostById`: Retrieves a specific blog post by ID
- `deleteBlogById`: Deletes a blog post by ID
- `updateBlogById`: Updates a blog post by ID

## Dependencies
- express: Web framework
- mongoose: MongoDB ODM
- firebase/auth: Authentication service
- Custom utilities:
  - asyncHandler: Async error handling
  - ApiResponse: Standardized API responses
  - ErrorResponse: Error response formatting
  - authenticationMiddleware: Auth verification
  - authorizationMiddleware: Access control
  - webSocketManager: Real-time updates

## Features
- User authentication with Firebase
- CRUD operations for blog posts
- MongoDB database integration
- WebSocket support for real-time updates
- Middleware for authentication and authorization
- Error handling and standardized responses
- Cookie-based authentication

## Prerequisites
- Node.js
- MongoDB
- Firebase project setup

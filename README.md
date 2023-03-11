# News UA API Server

## How to start

1. Duplicate `.example.env`, rename it to `.env` and fill in fields
2. Run `npm ci` to install packages
3. Run `npm start` to start the server

## Endpoints

- `GET /api/posts?q=&page=1&perPage=18` - Search posts using query(`q`) with pagination
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Find one post by id
- `PUT /api/posts/:id` - Find and update one post by id with given data
- `DELETE /api/posts/:id` - Find and delete one post by id

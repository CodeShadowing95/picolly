import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
/* `router.post('/', auth, createPost);` is creating a route for handling HTTP POST requests to the
root URL path. It is using the `auth` middleware to authenticate the user before allowing access to
the `createPost` controller function. */
router.post('/', auth, createPost);
/* `router.patch('/:id', auth, updatePost);` is creating a route for handling HTTP PATCH requests to a
specific post identified by its `id`. It is using the `auth` middleware to authenticate the user
before allowing access to the `updatePost` controller function, which updates the post with the
specified `id`. */
router.patch('/:id', auth, updatePost);
/* `router.delete('/:id', auth, deletePost);` is creating a route for handling HTTP DELETE requests to
a specific post identified by its `id`. It is using the `auth` middleware to authenticate the user
before allowing access to the `deletePost` controller function, which deletes the post with the
specified `id`. */
router.delete('/:id', auth, deletePost);
/* `router.patch('/:id/likePost', auth, likePost);` is creating a route for handling HTTP PATCH
requests to a specific post identified by its `id` and updating the number of likes for that post.
It is using the `auth` middleware to authenticate the user before allowing access to the `likePost`
controller function, which updates the post with the specified `id` by incrementing the number of
likes. */
router.patch('/:id/likePost', auth, likePost);

export default router;

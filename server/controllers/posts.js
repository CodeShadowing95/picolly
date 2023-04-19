import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    // PostMessage.find() takes time to execute, so it's a Promise
    // It's an async function
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  console.log(post);

  if(!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('Sorry, no post with that ID was found');
  }

  // Create the updated version of the post
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('Sorry, no post with that ID was found');
  }

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
  const { id } = req.params;

  /* This line of code is checking if the `userId` property is present in the `req` object. If it is
  not present, it means that the user is not logged in, so the function returns a JSON response with
  a message asking the user to log in first. */
  if(!req.userId) return res.json({ message: 'You must login first.' });

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('Sorry, no post with that ID was found');
  }

  const post = await PostMessage.findById(id);

  /* `This line is finding the index of
  the user's ID in the `likes` array of a post. It uses the `findIndex()` method to iterate through
  the `likes` array and return the index of the first element that satisfies the provided testing
  function, which in this case is checking if the ID is equal to the user's ID converted to a
  string. The resulting index is stored in the `index` constant. */
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if(index === -1) {
    /* `post.likes.push(req.userId);` is adding the ID of the user who liked the post to the `likes`
    array of that post. It is using the `push()` method to add the `req.userId` to the end of the
    `likes` array. */
    post.likes.push(req.userId);
  } else {
    /* `post.likes = post.likes.filter((id) => id !== String(req.userId));` is removing the ID of the
    user who unliked the post from the `likes` array of that post. It is using the `filter()` method
    to create a new array that includes all elements of the `likes` array except for the one that
    matches the user's ID converted to a string. The resulting array is then assigned back to the
    `likes` property of the `post` object. */
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.json(updatedPost);
}

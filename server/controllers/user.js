// Useful for hashing passwords
import bcrypt from 'bcryptjs';
// Safest way to store the user (store user in the browser for some period of time)
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

/**
 * The function is for handling user sign-in requests and it is an asynchronous function.
 * @param req - req stands for request and it is an object that contains information about the incoming
 * HTTP request such as the request method, headers, URL, and any data that was sent with the request.
 * It is used to retrieve data from the client-side and pass it to the server-side for processing.
 * @param res - `res` is the response object that is used to send a response back to the client who
 * made the request. It contains methods such as `send`, `json`, `status`, etc. that can be used to
 * send different types of responses such as HTML, JSON, or status codes. In
 */
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if(!existingUser) return res.status(404).json({ message: 'User not found' });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, 'test', { expiresIn: "1h"});

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong when logging the user.' });
  }
}

/**
 * This is a function for user signup that checks if the user already exists, validates the password,
 * hashes the password, creates a new user, generates a JWT token, and returns the result and token.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - The "res" parameter is the response object that will be sent back to the client after
 * the server has processed the request. It contains information such as the status code, headers, and
 * data that will be sent back to the client.
 * @returns The function `signup` is returning a JSON response with the `result` and `token` properties
 * if the user is successfully registered, or a JSON response with a `message` property if there is an
 * error. The response status code will be 200 if the user is successfully registered, or 400 or 500 if
 * there is an error.
 */
export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    
    if(existingUser) return res.status(400).json({ message: 'User already exists' });

    if(password !== confirmPassword) return res.status(400).json({ message: 'Passwords don\'t match' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result.id }, 'test', { expiresIn: "1h"});

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong when registering the user.' });
  }
}
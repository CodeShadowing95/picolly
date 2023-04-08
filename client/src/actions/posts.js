import * as api from '../api';

// Action creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    // payload is actually a data where we store all of our posts
    dispatch({ type: 'FETCH_ALL', payload: data });

  } catch (error) {
    console.log(error.message);
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
}
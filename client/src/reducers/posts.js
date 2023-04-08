export const reducer =  (posts = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return action.payload;
    case 'CREATE':
      return [...posts, action.payload];
    case 'UPDATE':
      // action.payload is here the newly updated post or memory
      return posts.map((post) => post._id === action.payload._id ? action.payload : post);
    default:
      return posts;
  }
}
import axios from 'axios';

const BASE_URL = 'https://posts-pw2021.herokuapp.com/api/v1';

export const getAllPosts = async (token, page = 0) => {
  let response = undefined;
  try {
    const posts = await axios({
      method: 'GET',
      baseURL: BASE_URL,
      url: `/post/all?limit=10&page=${page}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (posts) {
      // console.log(posts.data.data);
      response = posts.data.data;
    }
  } catch (error) {
    console.log(error);
  }

  return { isLoading: false, posts: response ?? [] };
};

export const getMyPosts = async (token, page = 0) => {
  let response = undefined;
  try {
    const posts = await axios({
      method: 'GET',
      baseURL: BASE_URL,
      url: `/post/owned?limit=3&page=${page}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (posts) {
      // console.log(posts.data.data);
      response = posts.data.data;
    }
  } catch (error) {
    console.log(error);
  }

  return { isLoading: false, posts: response ?? [] };
};

/* one post */

export const getOnePost = async (token, id) => {
  let response = undefined;
  try {
    response = await axios({
      method: 'GET',
      baseURL: BASE_URL,
      url: `/post/one/${id}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      response = response.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    return response;
  }
};

/* Favorite posts */

const getFavoritesIds = async (token) => {
  let response = undefined;
  try {
    const posts = await axios({
      method: 'GET',
      baseURL: BASE_URL,
      url: '/post/fav',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (posts) {
      response = posts.data.favorites;
    }
  } catch (error) {
    console.log(error);
  }

  return response ?? [];
};

export const getFavorites = async (token) => {
  const id_array = await getFavoritesIds(token);
  const promisesArray = id_array.map((id) => getOnePost(token, id));
  const results = await Promise.all(promisesArray);

  return { isLoading: false, posts: results ?? [] };
};

export const setNewFavorite = async (token, id) => {
  let response = undefined;
  try {
    response = await axios({
      method: 'PATCH',
      baseURL: BASE_URL,
      url: `/post/fav/${id}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    return response;
  }
};

/* Like posts */

export const setNewLike = async (token, id) => {
  let response = undefined;
  try {
    response = await axios({
      method: 'PATCH',
      baseURL: BASE_URL,
      url: `/post/like/${id}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    return response;
  }
};

// Comment Posts
export const setNewComment = async (token, id, message) => {
  let response = undefined;
  try {
    response = await axios({
      method: 'PATCH',
      baseURL: BASE_URL,
      url: `/post/comment/${id}`,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        description: `${message}`,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    return response;
  }
};

// Create posts
export const setNewPost = async (token, title, desc, image) => {
  let response = undefined;
  try {
    response = await axios({
      method: 'POST',
      baseURL: BASE_URL,
      url: '/post/create',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        title: `${title}`,
        description: `${desc}`,
        image: `${image}`,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    return response;
  }
};

// Enable/disable posts
export const setStatusPost = async (token, id) => {
  let response = undefined;
  try {
    response = await axios({
      method: 'PATCH',
      baseURL: BASE_URL,
      url: `/post/toggle/${id}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    return response;
  }
};

// Edit posts
export const editPost = async (token, id, title, desc, image) => {
  let response = undefined;
  try {
    response = await axios({
      method: 'PUT',
      baseURL: BASE_URL,
      url: `/post/update/${id}`,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      data: {
        title: `${title}`,
        description: `${desc}`,
        image: `${image}`,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    return response;
  }
};

import * as ReadableAPI from '../utils/ReadableAPI'

import { normalize } from 'normalizr';
import { categorySchema } from '../schemas';

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"
export const UPDATE_SETTINGS = "UPDATE_SETTINGS"
export const POST_VOTE_UP = "POST_VOTE_UP"


export const updateSettings = (key, value) => ({
  type: UPDATE_SETTINGS,
  key,
  value
})


export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const fetchComments = (postId) => dispatch => (
  ReadableAPI
    .getCommentByPostId(postId)
    .then(comments => dispatch(receiveComments(comments)))
)


export const postVoteUp = id => ({
  type: POST_VOTE_UP,
  id
})

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = () => dispatch => (
  ReadableAPI
    .getAllPosts()
    .then((posts) => {
      //console.log('fetchPosts' + JSON.stringify(posts))

      posts.map(post =>
        dispatch(fetchComments(post.id))
      )

      dispatch(receivePosts(posts))

    })
)


export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => (
  ReadableAPI
    .getAllCategories()
    .then(categories => {
      //console.log('fetchCategories: ' + JSON.stringify(categories))

      let normalizedCategories = normalize(categories, categorySchema)

      //console.log('normalizedCategories: ' + JSON.stringify(normalizedCategories))

      let myCategories = normalizedCategories.entities.categories

      dispatch(receiveCategories(myCategories))
    })
)
import { api } from './apiConnection.js'

// User - API calls

export const getUsers = async () => {
  api.get('/users')
}

export const getUserById = async (id) => {
  api.get(`/users/${id}`)
}

export const createUser = async (payload) => {
  api.post('/users', payload)
}

export const updateUserById = async (id, payload) => {
  api.put(`/users/${id}`, payload)
}

export const deleteUserById = async (id) => {
  api.delete(`/users/${id}`)
}

// Auth - API calls

export const signup = (payload) => {
  api.post(`/auth/signup`, payload)
}

export const login = (payload) => {
  api.post(`/auth/login`, payload)
}

export const verifyLoggedIn = () => {
  api.post(`/auth/verifyLoggedIn`)
}

// Conversations - API calls

export const getConversations = async () => {
  api.get('/conversations')
}

export const getConversationById = async (id) => {
  api.get(`/conversations/${id}`)
}

export const createConversation = async (payload) => {
  api.post('/conversations', payload)
}

export const updateConversationById = async (id, payload) => {
  api.put(`/conversations/${id}`, payload)
}

export const deleteConversationById = async (id) => {
  api.delete(`/conversations/${id}`)
}

// Messages - API calls

export const getMessages = async () => {
  api.get('/messages')
}

export const getMessageById = async (id) => {
  api.get(`/messages/${id}`)
}

export const createMessageAndCreateConversation = async (payload) => {
  api.post('/messages/new-conversation', payload)
}

export const createMessageAndUpdateConversation = async (conversationId, payload) => {
  api.post(`/messages/update-conversation/${conversationId}`, payload)
}

export const updateMessageById = async (id, payload) => {
  api.put(`/messages/${id}`, payload)
}

export const deleteMessageById = async (id) => {
  api.delete(`/messages/${id}`)
}

// Profile - API calls

export const getProfiles = async () => {
  api.get('/profiles')
}

export const getProfileById = async (id) => {
  api.get(`/profiles/${id}`)
}

export const createProfile = async (payload) => {
  api.post('/profiles/', payload)
}

export const updateProfileById = async (id, payload) => {
  api.put(`/profiles/${id}`, payload)
}

export const deleteProfileById = async (id) => {
  api.delete(`/profiles/${id}`)
}

// Schools - API calls

export const getSchools = async () => {
  api.get('/schools')
}

export const getSchoolById = async (id) => {
  api.get(`/schools/${id}`)
}

export const createSchool = async (payload) => {
  api.post('/schools/', payload)
}

export const updateSchoolById = async (id, payload) => {
  api.put(`/schools/${id}`, payload)
}

export const deleteSchoolById = async (id) => {
  api.delete(`/schools/${id}`)
}

// Favorites - API calls

export const getFavorites = async () => {
  api.get('/favorites')
}

export const getFavoriteById = async (id) => {
  api.get(`/favorites/${id}`)
}

export const getAllFavoritesByUserId = async (userId) => {
  api.get(`/favorites/my-favorites/${userId}`)
}

export const createFavorite = async (payload) => {
  api.post('/favorites/', payload)
}

export const updateFavoriteById = async (id, payload) => {
  api.put(`/favorites/${id}`, payload)
}

export const deleteFavoriteById = async (id) => {
  api.delete(`/favorites/${id}`)
}
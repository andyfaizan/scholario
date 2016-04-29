import { createSelector } from 'reselect'



export const getUser = (state) => {
  if (state.user._id)
    return state.entities.users[state.user._id]
  return {}
}

export const getUniversities = (state) => state.entities.universities

export const getUserUniversity = createSelector(
  [getUser, getUniversities],
  (user, universities) => {
    return universities[user.university]
  }
)

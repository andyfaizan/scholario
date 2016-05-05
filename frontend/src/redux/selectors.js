import { createSelector } from 'reselect'



export const getUser = (state) => state.entities.users[state.user._id]
export const getUsers = (state) => state.entities.users
export const getUniversities = (state) => state.entities.universities
export const getPrograms = (state) => state.entities.programs
export const getCourses = (state) => state.entities.courses
export const getQuestions = (state) => state.entities.questions


export const getUserUniversity = createSelector(
  [getUser, getUniversities],
  (user, universities) => universities[user.university]
)

export const getUserProgram = createSelector(
  [getUser, getPrograms],
  (user, programs) => programs[user.program]
)

export const getUserCourses = createSelector(
  [getUser, getCourses, getUniversities, getUsers],
  (user, courses, universities, users) => user.courses.map((id) => {
    var c = courses[id]
    c.university = universities[c.university]
    c.prof = users[c.prof]
    return c
  })
)

export const getUserQuestions = createSelector(
  [getUser, getQuestions, getUsers],
  (user, questions, users) => user.questions.map((id) => questions[id])
)

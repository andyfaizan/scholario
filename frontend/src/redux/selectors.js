import { createSelector } from 'reselect'
import _ from 'lodash'



export const getUser = (state) => state.entities.users[state.user._id]
export const getUsers = (state) => state.entities.users
export const getUniversities = (state) => state.entities.universities
export const getPrograms = (state) => state.entities.programs
export const getCourses = (state) => state.entities.courses
export const getQuestions = (state) => state.entities.questions
export const getCurrentCourse = (state, id) => {
  var c = Object.assign({}, state.entities.courses[id])
  c.prof = state.entities.users[c.prof]
  c.university = state.entities.universities[c.university]
  c.program = state.entities.programs[c.program]
  return c
}

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
    var c = Object.assign({}, courses[id])
    c.university = universities[c.university]
    c.prof = users[c.prof]
    return c
  })
)

export const getUserQuestions = createSelector(
  [getUser, getQuestions, getUsers],
  (user, questions, users) => user.questions.map((id) => questions[id])
)

export const getUserFollowings = createSelector(
  [getUser, getUsers, getUniversities, getPrograms],
  (user, users, universities, programs) => user.followings.map((id) => {
    var u = Object.assign({}, users[id])
    u.university = universities[u.university]
    u.program = programs[u.program]
    console.log(u)
    return u
  })
)

export const getUniversitiesWithPrograms = createSelector(
  [getUniversities, getPrograms],
  (universities, programs) => {
    if (universities) {
      var res = _.values(universities).map((u) => {
        var new_u = Object.assign({}, u)
        new_u.programs = _.values(programs).filter((p) => p.university === u._id)
        return new_u
      })
      return res
    }
    return []
  }
)

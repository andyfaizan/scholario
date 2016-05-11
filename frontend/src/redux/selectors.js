import { createSelector } from 'reselect'
import _ from 'lodash'



export const getUser = (state) => state.entities.users[state.user._id]
export const getUsers = (state) => state.entities.users
export const getUniversities = (state) => state.entities.universities
export const getPrograms = (state) => state.entities.programs
export const getCourses = (state) => state.entities.courses
export const getCourseInstances = (state) => state.entities.courseInstances
export const getQuestions = (state) => state.entities.questions
export const getCurrentCourseInstance = (state, id) => {
  var ci = Object.assign({}, state.entities.courseInstances[id])
  ci.prof = state.entities.users[c.prof]
  var c = Object.assign({}, state.entities.courses[ci.course])
  c.university = state.entities.universities[c.university]
  c.program = state.entities.programs[c.program]
  ci.course = c
  return ci
}

export const getUserUniversity = createSelector(
  [getUser, getUniversities],
  (user, universities) => universities[user.universities[0]]
)

export const getUserProgram = createSelector(
  [getUser, getPrograms],
  (user, programs) => programs[user.programs[0]]
)

export const getUserCourseInstances = createSelector(
  [getUser, getCourseInstances, getCourses, getUniversities, getUsers],
  (user, courses, universities, users) => user.courseInstances.map((id) => {
    var ci = Object.assign({}, courseInstances[id])
    ci.prof = users[c.prof]
    var c = Object.assign({}, courses[ci.course])
    c.university = universities[c.university]
    c.program = programs[c.program]
    ci.course = c
    return ci
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
    u.university = universities[u.universities[0]]
    u.program = programs[u.programs[0]]
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

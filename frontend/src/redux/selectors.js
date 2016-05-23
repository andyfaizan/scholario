import { createSelector } from 'reselect'
import _ from 'lodash'
import moment from 'moment'



export const getUser = (state) => state.entities.users[state.user._id]
export const getUserMetadata = (state) => state.user
export const getUsers = (state) => state.entities.users
export const getUniversities = (state) => state.entities.universities
export const getPrograms = (state) => state.entities.programs
export const getCourses = (state) => state.entities.courses
export const getShallowCourseInstances = (state) => state.entities.courseInstances
export const getShallowQuestions = (state) => state.entities.questions
export const getShallowAnswers = (state) => state.entities.answers
export const getShallowPkgs = (state) => state.entities.pkgs
export const getMaterials = (state) => state.entities.materials
export const getCurs = (state) => state.curs
export const getCurCourseInstanceId = (state) => state.curs.courseInstance
export const getCurPkgId = (state) => state.curs.pkg
export const getCurMaterialId = (state) => state.curs.material
export const getCurQuestionId = (state) => state.curs.question
export const getRecommendedCourseInstanceIds = (state) => state.recommendedCourseInstances
export const getRequests = (state) => state.requests
export const getRequest = (state, type) => state.requests[type]

export const getUserUniversity = createSelector(
  [getUser, getUniversities],
  (user, universities) => universities[user.universities[0]]
)

export const getUserProgram = createSelector(
  [getUser, getPrograms],
  (user, programs) => programs[user.programs[0]]
)

export const getCourseInstances = createSelector(
  [getShallowCourseInstances, getCourses, getUniversities,
    getPrograms, getUsers, getShallowPkgs],
  (shallowCourseInstances, courses, universities, programs, users, pkgs) => {
    var res = {}
    for (var k in shallowCourseInstances) {
      if (shallowCourseInstances.hasOwnProperty(k)) {
        res[k] = Object.assign({}, shallowCourseInstances[k])
        res[k].prof = users[res[k].prof]
        var c = Object.assign({}, courses[res[k].course])
        c.university = universities[c.university]
        c.program = programs[c.program]
        res[k].course = c
        res[k].pkgs = _.values(pkgs).filter(pkg => pkg.courseInstance === k)
      }
    }
    return res
  }
)

export const getCurCourseInstance = createSelector(
  [getCurCourseInstanceId, getCourseInstances],
  (curCourseInstanceId, courseInstances) => {
    var ci = Object.assign({}, courseInstances[curCourseInstanceId])
    return ci
  }
)

export const getUserCourseInstances = createSelector(
  [getUser, getCourseInstances],
  (user, courseInstances) => user.courseInstances.map((id) => {
    var ci = Object.assign({}, courseInstances[id])
    ci.following = true
    return ci
  })
)

export const getRecommendedCourseInstances = createSelector(
  [getCourseInstances, getRecommendedCourseInstanceIds],
  (courseInstances, recommendedCourseInstanceIds) => recommendedCourseInstanceIds.map(id => {
    var ci = Object.assign({}, courseInstances[id])
    ci.following = false
    return ci
  })
)

export const getAnswers = createSelector(
  [getShallowAnswers, getUsers],
  (shallowAnswers, users) => {
    var res = {}

    for (var k in shallowAnswers) {
      if (shallowAnswers.hasOwnProperty(k)) {
        res[k] = Object.assign({}, shallowAnswers[k])
        if (res[k].user)
          res[k].user = users[res[k].user]
      }
    }

    return res
  }
)
export const getQuestions = createSelector(
  [getShallowQuestions, getUsers, getCourseInstances, getAnswers],
  (shallowQuestions, users, courseInstances, answers) => {
    var res = {}

    for (var k in shallowQuestions) {
      if (shallowQuestions.hasOwnProperty(k)) {
        res[k] = Object.assign({}, shallowQuestions[k])
        res[k].user = users[res[k].user]
        if (res[k].answers && res[k].answers.length > 0)
          res[k].answers = res[k].answers.map(id => answers[id])
        //res[k].courseInstance = courseInstances[res[k].courseInstance]
      }
    }
    return res
  }
)

export const getCurQuestion = createSelector(
  [getCurQuestionId, getQuestions],
  (curQuestionId, questions) => Object.assign({}, questions[curQuestionId])
)

export const getUserQuestions = createSelector(
  [getUser, getQuestions],
  (user, questions) => _.values(questions)
    .filter((question) => (user.courseInstances.indexOf(question.courseInstance) > -1))
)

function sortQuestionsByDate(a, b) {
      const c = moment(a.createDate)
      const d = moment(b.createDate)
      if (c.isAfter(d)) return -1
      else if (c.isBefore(d)) return 1
      else return sortQuestionsByVote(a, b)
}

function sortQuestionsByVote(a, b) {
      if (a.votes.length > b.votes.length) return -1
      else if (a.votes.length < b.votes.length) return 1
      else return sortQuestionsByDate(a, b)
}

export function getCurQuestionsFactory(page, orderBy, limit=5) {
  var sortF = sortQuestionsByDate
  if (orderBy === 'date') sortF = sortQuestionsByDate
  else if (orderBy === 'vote') sortF = sortQuestionsByVote

  return createSelector(
    [getQuestions, state => getCurs(state)[page]],
    (questions, id) => _.slice(
      _.values(questions)
       .filter((question) => (question[page] === id))
       .sort(sortF),
      0, limit)
  )
}

export const getCurrentCourseInstanceMaterials = createSelector(
  [getCurCourseInstance, getMaterials, getCourseInstances],
  (currentCourse, materials, courseInstances) => currentCourse.materials.map((id) => materials[id])
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

export const getPkgs = createSelector(
  [getShallowPkgs, getCourseInstances, getUsers, getMaterials],
  (shallowPkgs, courseInstances, users, materials) => {
    var res = {}
    for (var k in shallowPkgs) {
      if (shallowPkgs.hasOwnProperty(k)) {
        res[k] = Object.assign({}, shallowPkgs[k])
        if (users[res[k].owner])
          res[k].owner = users[res[k].owner]
        //res[k].courseInstance = courseInstances[res[k].courseInstance]
        res[k].materials = _.values(materials, material => material.pkg === k)
      }
    }

    return res
  }
)

export const getCurPkg = createSelector(
  [getCurPkgId, getPkgs],
  (curPkgId, pkgs) => {
    var pkg = Object.assign({}, pkgs[curPkgId])
    return pkg
  }
)

export function getPkgFactory(pid) {
  return createSelector(
    [state => getPkgs(state)[pid]],
    (pkg) => Object.assign({}, pkg)
  )
}

export const getCurMaterial = createSelector(
  [getCurMaterialId, getMaterials],
  (curMaterialId, materials) => materials[curMaterialId]
)

export function getMaterialFactory(mid) {
  return createSelector(
    [state => getMaterials(state)[mid]],
  )
}

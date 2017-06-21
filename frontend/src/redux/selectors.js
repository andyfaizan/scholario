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
export const getBookmarks = (state) => state.entities.bookmarks
export const getCurs = (state) => state.curs
export const getCurCourseInstanceId = (state) => state.curs.courseInstance
export const getCurPkgId = (state) => state.curs.pkg
export const getCurMaterialId = (state) => state.curs.material
export const getCurQuestionId = (state) => state.curs.question
export const getCurFileProgress = (state) => state.misc.progress
export const getRecommendedCourseInstanceIds = (state) => state.recommendedCourseInstances
export const getRequests = (state) => state.requests
export const getRequest = (state, type) => state.requests[type]
export const getShallowEvents = (state) => state.entities.events

export const getQuestionFormValues = (state) => {
  if (state.form && state.form.AddQuestion) {
    return (state.form.AddQuestion.values)
  }
  return null
}

export const getUserUniversity = createSelector(
  [getUser, getUniversities],
  (user, universities) => {
    if (user && user.universities && user.universities.length > 0) return universities[user.universities[0]]
    return {}
  }
)

export const getUserProgram = createSelector(
  [getUser, getPrograms],
  (user, programs) => {
    if (user && user.programs && user.programs.length > 0) {
      return programs[user.programs[0]]
    }
    return {}
  }
)

export const getCourseInstances = createSelector(
  [getShallowCourseInstances, getCourses, getUniversities,
    getPrograms, getUsers, getShallowPkgs],
  (shallowCourseInstances, courses, universities, programs, users, pkgs) => {
    const res = {}
    _.forOwn(shallowCourseInstances, (val, k) => {
      res[k] = Object.assign({}, val)
      res[k].prof = users[res[k].prof]
      const c = Object.assign({}, courses[res[k].course])
      c.university = universities[c.university]
      c.program = programs[c.program]
      res[k].course = c
      res[k].pkgs = _.values(pkgs).filter(pkg => pkg.courseInstance === k)
    })
    return res
  }
)

export const getCurCourseInstance = createSelector(
  [getCurCourseInstanceId, getCourseInstances],
  (curCourseInstanceId, courseInstances) => {
    const ci = Object.assign({}, courseInstances[curCourseInstanceId])
    return ci
  }
)

export const getUserCourseInstances = createSelector(
  [getUser, getCourseInstances],
  (user, courseInstances) => {
    if (user && user.courseInstances) {
      return user.courseInstances.map((id) => {
        const ci = Object.assign({}, courseInstances[id])
        ci.following = true
        return ci
      })
    }
    return []
  }
)

export const getRecommendedCourseInstances = createSelector(
  [getCourseInstances, getRecommendedCourseInstanceIds],
  (courseInstances, recommendedCourseInstanceIds) => recommendedCourseInstanceIds.map(id => {
    const ci = Object.assign({}, courseInstances[id])
    ci.following = false
    return ci
  })
)

export const getAllAssignments = createSelector(
  [getCourseInstances],
  (courseInstances) => {
    const instanceArray = _.values(courseInstances)
    const assignArray = instanceArray.map((ci) => (ci.assignments))
    return assignArray
  }
)

export const getAnswers = createSelector(
  [getShallowAnswers, getUsers],
  (shallowAnswers, users) => {
    const res = {}

    _.forOwn(shallowAnswers, (val, k) => {
      res[k] = Object.assign({}, val)
      if (res[k].user) res[k].user = users[res[k].user]
    })

    return res
  }
)
export const getQuestions = createSelector(
  [getShallowQuestions, getUsers, getCourseInstances, getAnswers],
  (shallowQuestions, users, courseInstances, answers) => {
    const res = {}

    _.forOwn(shallowQuestions, (val, k) => {
      res[k] = Object.assign({}, val)
      res[k].user = users[res[k].user]
      if (res[k].answers && res[k].answers.length > 0) {
        res[k].answers = res[k].answers.map(id => answers[id])
      }
      // res[k].courseInstance = courseInstances[res[k].courseInstance]
    })
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

export function sortQuestionsByVote(a, b) {
  if (!a || !b) return -1
  if (a.votes.length > b.votes.length) return -1
  else if (a.votes.length < b.votes.length) return 1
  return sortQuestionsByDate(a, b)
}

export function sortQuestionsByDate(a, b) {
  const c = moment(a.createDate)
  const d = moment(b.createDate)
  if (c.isAfter(d)) return -1
  else if (c.isBefore(d)) return 1
  return sortQuestionsByVote(a, b)
}

export function getCurQuestionsFactory(page, orderBy, limit = 5) {
  let sortF = sortQuestionsByDate
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
  [getCurCourseInstance, getMaterials],
  (currentCourse, materials) => currentCourse.materials.map((id) => materials[id])
)

export const getUserFollowings = createSelector(
  [getUser, getUsers, getUniversities, getPrograms],
  (user, users, universities, programs) => {
    if (user && user.followings && user.followings.length > 0) {
      return user.followings.map((id) => {
        const u = Object.assign({}, users[id])
        u.university = universities[u.universities[0]]
        u.program = programs[u.programs[0]]
        return u
      })
    }
    return []
  }
)

export const getUniversitiesWithPrograms = createSelector(
  [getUniversities, getPrograms],
  (universities, programs) => {
    if (universities) {
      const res = _.values(universities).map((u) => {
        const newU = Object.assign({}, u)
        newU.programs = _.values(programs).filter((p) => p.university === u._id)
        return newU
      })
      return res
    }
    return []
  }
)

export const getPkgs = createSelector(
  [getShallowPkgs, getCourseInstances, getUsers, getMaterials, getBookmarks],
  (shallowPkgs, courseInstances, users, materials, bookmarks) => {
    const res = {}
    _.forOwn(shallowPkgs, (val, k) => {
      res[k] = Object.assign({}, val)
      if (users[res[k].owner]) res[k].owner = users[res[k].owner]
      // res[k].courseInstance = courseInstances[res[k].courseInstance]
      res[k].materials = _.values(materials).filter(material => material.pkg === k)
      res[k].bookmarks = _.values(bookmarks).filter(bookmark => bookmark.pkg === k)
    })
    return res
  }
)

export const getCurPkg = createSelector(
  [getCurPkgId, getPkgs],
  (curPkgId, pkgs) => {
    const pkg = Object.assign({}, pkgs[curPkgId])
    return pkg
  }
)

export function getPkgFactory(pid) {
  return createSelector(
    [state => getPkgs(state)[pid]],
    (pkg) => Object.assign({}, pkg)
  )
}

export const getCurCIProfPkgs = createSelector(
  [getCurCourseInstance, getUsers],
  (curCourseInstance, users) => {
    if (curCourseInstance && curCourseInstance.pkgs) {
      return curCourseInstance.pkgs.filter(p => {
        if (users[p.owner]) {
          return (users[p.owner].role === 'Prof')
        }
        return false
      })
    }
    return []
  }
)

export const getCurCIStudentPkgs = createSelector(
  [getCurCourseInstance, getUsers],
  (curCourseInstance, users) => {
    if (curCourseInstance && curCourseInstance.pkgs) {
      return curCourseInstance.pkgs.filter(p => {
        if (users[p.owner]) {
          return (users[p.owner].role === 'Student')
        }
        return false
      })
    }
    return []
  }
)

export const getCurMaterial = createSelector(
  [getCurMaterialId, getMaterials],
  (curMaterialId, materials) => materials[curMaterialId]
)

export function getMaterialFactory(mid) {
  return createSelector(
    [state => getMaterials(state)[mid]],
  )
}

export const getEvents = createSelector(
  [getShallowEvents, getUsers, getQuestions,
    getAnswers],
  (shallowEvents, users, questions, answers) => {
    const res = {}
    _.forOwn(shallowEvents, (val, k) => {
      res[k] = Object.assign({}, val)
      if (res[k].user) res[k].user = users[res[k].user]
      if (res[k].by) res[k].by = users[res[k].by]
      if (res[k].question) res[k].question = questions[res[k].question]
      if (res[k].answer) res[k].answer = answers[res[k].answer]
    })
    return res
  }
)

// export const getCurAssignment = createSelector(
//   [getLatestAssignments],
//   (latestAssignments) => {
//     const curAssignment = Object.assign({}, latestAssignments[latestAssignments.length - 1])
//     return curAssignment
//   }
// )

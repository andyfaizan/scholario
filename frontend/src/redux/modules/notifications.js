import urlJoin from 'url-join'
import { merge } from 'lodash'
import config from '../../config'
import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import { userSchema } from '../schemas'

const request = superagentPromise(superagent, Promise)

export const PUT_NOTIFICATION_REQUEST = 'PUT_NOTIFICATION_REQUEST'
export const PUT_NOTIFICATION_OK = 'PUT_NOTIFICATION_OK'
export const PUT_NOTIFICATION_ERR = 'PUT_NOTIFICATION_ERR'

export function putNotifications(questions = '', material = '', friends = '', course = '', announcements = '') {
  const endpoint = urlJoin(config.apiURL, 'notifications')

  const data = {}
  if (questions) data.questions = questions
  if (material) data.material = material
  if (friends) data.friends = friends
  if (course) data.course = course
  if (announcements) data.announcements = announcements

  return {
    types: [PUT_NOTIFICATION_REQUEST, PUT_NOTIFICATION_OK, PUT_NOTIFICATION_ERR],
    callAPI: () => request.put(endpoint).send(data),
    schema: userSchema,
  }
}

// Reducer
export function notificationsReducer(state = {}, action) {
  switch (action.type) {
  default:
    if (action.response && action.response.notifications) {
      return merge({}, state, action.response.entities.notifications)
    }
    return state
  }
}

// Constants
// export const constants = { }

export const NOTIFICATION_OFF = 'NOTIFICATION_OFF'
export const NOTIFICATION_ON = 'NOTIFICATION_ON'

export const QUESTION_NOTIFICATIONS = 'QUESTION_NOTIFICATIONS'
export const MATERIAL_NOTIFICATIONS = 'MATERIAL_NOTIFICATIONS'
export const FRIEND_NOTIFICATIONS = 'FRIEND_NOTIFICATIONS'
export const COURSE_NOTIFICATIONS = 'COURSE_NOTIFICATIONS'
export const ANNOUNCEMENT_NOTIFICATIONS = 'ANNOUNCEMENT_NOTIFICATIONS'


// Action Creators
// export const actions = { }

export function noticationOff(notificationType) {
  return {
    type: NOTIFICATION_OFF,
    state: false,
    notificationType,
  }
}

export function noticationOn(notificationType) {
  return {
    type: NOTIFICATION_ON,
    state: true,
    notificationType,
  }
}

// Reducer
export function notificationsReducer(state = {}, action) {
  switch (action.type) {
  case NOTIFICATION_ON:
  case NOTIFICATION_OFF:
    return { state: action.state, notificationType: action.notificationType }
  default:
    return state
  }
}

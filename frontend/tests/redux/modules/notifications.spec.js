import reducer, { initialState } from 'redux/modules/notifications'

describe('(Redux) notifications', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})

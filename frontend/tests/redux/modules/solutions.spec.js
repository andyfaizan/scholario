import reducer, { initialState } from 'redux/modules/assignment'

describe('(Redux) assignment', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})

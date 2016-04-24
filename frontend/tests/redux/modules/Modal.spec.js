import reducer, { initialState } from 'redux/modules/modal'

describe('(Redux) Modals', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})

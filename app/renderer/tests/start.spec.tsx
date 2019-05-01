import * as React from 'react'
import * as Renderer from 'react-test-renderer'

import Start from '../pages/start'

test('page Start', () => {
  const component = Renderer.create(
    <Start />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

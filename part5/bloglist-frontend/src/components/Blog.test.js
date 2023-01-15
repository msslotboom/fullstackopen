import { React } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('renders content', () => {
  const blogObject = {
    title: 'test blog',
    id: 1,
    author: 'dev',
    url: '',
    likes: 1
  }

  const { container } = render(<Blog blog={blogObject} />)

  screen.debug(container)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'test blog'
  )

})
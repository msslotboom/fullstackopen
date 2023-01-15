import { React } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('renders title', () => {
  const blogObject = {
    title: 'test blog',
    id: 1,
    author: 'dev',
    url: 'testurl',
    likes: 1
  }

  render(<Blog blog={blogObject} />)
  const element = screen.getByText('test blog')
  expect(element).toBeDefined()
  const element2 = screen.queryByText('testurl')
  expect(element2).toBeNull()
  const element3 = screen.queryByText('dev')
  expect(element3).toBeNull()

})

test('renders likes, url, user if button pressed', async () => {
  const blogObject = {
    title: 'test blog',
    id: 1,
    author: 'dev',
    url: 'testurl',
    likes: 1
  }
  const user = userEvent.setup()
  const { container } = render(<Blog blog={blogObject} />)
  const button = screen.getByText('View')
  await user.click(button)

  // screen.debug()
  expect(container).toHaveTextContent('dev')
  expect(container).toHaveTextContent('testurl')
  expect(container).toHaveTextContent('1')
})
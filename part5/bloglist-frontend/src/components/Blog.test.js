import { React } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('renders title', () => {
  const blogObject = {
    title: 'test blog',
    id: 1,
    author: 'dev',
    url: '',
    likes: 1
  }

  render(<Blog blog={blogObject} />)

  const element = screen.getByText('test blog')

  expect(element).toBeDefined()

})
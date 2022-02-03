import Course from './components/Course'
const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}
/*const Header = (props) => {
  return(
  <h1>{props.name}</h1>
  )
}
const Content = (props) => {
  return(
  <div>
    <Part name = {props.parts[0].name} exercises = {props.parts[0].exercises}></Part>
    <Part name = {props.parts[1].name} exercises = {props.parts[1].exercises}></Part>
    <Part name = {props.parts[2].name} exercises = {props.parts[2].exercises}></Part>
  </div>
  )
}
const Part = (props) => {
  return(<p>
    {props.name} {props.exercises}
  </p>)
}
const Total = (props) => {
  console.log(props.exercises)
  return(
  <p>Number of exercises {(props.exercises[0].exercises)+(props.exercises[1].exercises)+(props.exercises[2].exercises)}</p>
  )
}*/
export default App
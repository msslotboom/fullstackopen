const Course = ({course}) =>  {
    return(
        <>
        <h2>{course.name}</h2>
        <ul>
            {course.parts.map(course => 
                <CourseContent key = {course.id} course={course}/>
                )}
        </ul>
        </>
    )
}
const CourseContent = ({course}) => {
    console.log(course)
    return(
        <li>{course.name}</li>
    )
}
export default Course
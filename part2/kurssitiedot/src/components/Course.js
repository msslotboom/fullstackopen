const Course = ({course}) =>  {
    return(
        <>
        <h2>{course.name}</h2>

            {course.parts.map(course => 
                <CourseContent key = {course.id} course={course}/>
                )}
        
        <TotalExercises parts = {course.parts}/>
        </>
    )
}
const CourseContent = ({course}) => {
    return(
        <><div>{course.name} {course.exercises}</div><br></br></>
    )
}
const TotalExercises = ({parts}) => {
    const total = parts.reduce(function(sum, part){
        return sum + part.exercises
    },0)
    return(
        <b>Total of  {total} exercises</b>
    )
}
export default Course
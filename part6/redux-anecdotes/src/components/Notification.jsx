import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notification = useSelector(state => {
    return state.notification
  })

  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    if (notification !== '') {
      setShowNotification(true)
    }
    const timer = setTimeout(() => {
      setShowNotification(false)
    }, 5000)
  }, [notification])

  return (
    <>
      {showNotification && (<div style={style}>{notification}</div>)}
    </>
    
  )
}

export default Notification
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
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, notification.time*1000)
  }, [notification])

  return (
    <>
      {showNotification && (<div style={style}>{notification.content}</div>)}
    </>
    
  )
}

export default Notification
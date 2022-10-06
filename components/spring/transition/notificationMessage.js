import { loremIpsum } from 'lorem-ipsum'
import { useRef } from 'react'
import NotificationHub from './notificationHub'
import { Main, Container, Message, Button, Content, Life } from './styles'

const NotificationMessage = () => {
  const ref = useRef(null)
  const handleClick = () => {
    ref.current?.(loremIpsum())
  }

  return (
    <Main onClick={handleClick}>
      Click here to create notifications
      <NotificationHub
        children={(add) => {
          ref.current = add
        }}
      />
    </Main>
  )
}

export default NotificationMessage
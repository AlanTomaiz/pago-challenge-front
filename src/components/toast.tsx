import { ToastData, useToast } from '../hooks/toast'
import { Container, ToastItem } from './styles'

type Props = {
  messages: ToastData[]
}

export function ToastContainer({ messages }: Props) {
  const { removeToast } = useToast()

  return (
    <Container>
      {messages.map((item) => (
        <ToastItem
          key={item.id}
          type={item.type}
          onClick={() => removeToast(item.id)}
        >
          {item.message}
        </ToastItem>
      ))}
    </Container>
  )
}

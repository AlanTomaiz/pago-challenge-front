import styled from 'styled-components'

import ContactForm from './components/form'
import ContactList from './components/list'

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: auto;
`

export default function App() {
  return (
    <Container>
      <h1>Agenda de Endereços</h1>
      <ContactForm />
      <ContactList />
    </Container>
  )
}

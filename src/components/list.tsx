import styled from 'styled-components'
import { useContacts } from '../store/contacts'

const List = styled.ul`
  margin-top: 2rem;
  list-style: none;
`

const Item = styled.li`
  display: flex;
  align-items: center;
  background: #fff;
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 4px;
`

const Wrapper = styled.div`
  flex: 1;
`

const Button = styled.button`
  height: 40px;
  max-height: 40px;
  padding: 10px 15px;
  border: 1px solid #ededed;
  background: #ededed;
  color: #333;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
`

export default function ContactList() {
  const { contacts, removeContact } = useContacts()

  return (
    <List>
      {contacts.map((row) => (
        <Item key={row.id}>
          <Wrapper>
            <strong>{row.displayName}</strong> ({row.username})<br />
            {`${row.address.logradouro}, ${row.address.bairro}, ${row.address.localidade} - ${row.address.uf}`}
          </Wrapper>
          <Button onClick={() => removeContact(row.id)}>Remover</Button>
        </Item>
      ))}
    </List>
  )
}

import { useState } from 'react'
import { useContacts } from '../store/contacts'
import { Button, FilterBar, Input, Item, List, Wrapper } from './styles'

export default function ContactList() {
  const { contacts, removeContact } = useContacts()
  const [filters, setFilters] = useState({
    username: '',
    cidade: '',
    uf: '',
    displayName: '',
  })

  const handleFilter = (event: any) => {
    const { name, value } = event.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const filtered = contacts.filter((row) => {
    const { username, cidade, uf, displayName } = filters

    return (
      row.username.toLowerCase().includes(username.toLowerCase()) &&
      row.address.localidade.toLowerCase().includes(cidade.toLowerCase()) &&
      row.address.uf.toLowerCase().includes(uf.toLowerCase()) &&
      row.displayName.toLowerCase().includes(displayName.toLowerCase())
    )
  })

  return (
    <>
      <FilterBar>
        <Input name="username" placeholder="Usuário" onChange={handleFilter} />
        <Input name="cidade" placeholder="Cidade" onChange={handleFilter} />
        <Input name="uf" placeholder="Estado (UF)" onChange={handleFilter} />
        <Input
          name="displayname"
          placeholder="Nome de Exibição"
          onChange={handleFilter}
        />
      </FilterBar>
      <List>
        {filtered.map((row) => (
          <Item key={row.id}>
            <Wrapper>
              <strong>{row.displayName}</strong> ({row.username})<br />
              {`${row.address.logradouro}, ${row.address.bairro}, ${row.address.localidade} - ${row.address.uf}`}
            </Wrapper>
            <Button stype="default" onClick={() => removeContact(row.id)}>
              Remover
            </Button>
          </Item>
        ))}
      </List>
    </>
  )
}

import { Check, Pen } from '@phosphor-icons/react'
import { useState } from 'react'
import { useContacts } from '../store/contacts'
import { Button, FilterBar, Input, Item, List, Wrapper } from './styles'

export default function ContactList() {
  const { contacts, removeContact, updateContact } = useContacts()
  const [edditing, setEdditing] = useState('')
  const [display, setDisplay] = useState('')
  const [filters, setFilters] = useState({
    username: '',
    cidade: '',
    uf: '',
    displayName: '',
  })

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleUpdate = () => {
    updateContact(edditing, display)
    setEdditing('')
    setDisplay('')
  }

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
              {edditing ? (
                <Input
                  placeholder="Nome de exibição"
                  style={{ width: '100%', marginBottom: '8px' }}
                  onChange={(event) => setDisplay(event.target.value)}
                />
              ) : (
                <>
                  <strong>{row.displayName}</strong> ({row.username})
                </>
              )}
              <br />
              {`${row.address.logradouro}, ${row.address.bairro}, ${row.address.localidade} - ${row.address.uf}`}
            </Wrapper>
            {edditing ? (
              <>
                <Button stype="transparent" onClick={handleUpdate}>
                  <Check size={22} weight="thin" />
                </Button>
                <Button stype="default" onClick={() => setEdditing('')}>
                  Cancelar
                </Button>
              </>
            ) : (
              <>
                <Button stype="transparent" onClick={() => setEdditing(row.id)}>
                  <Pen size={22} weight="thin" />
                </Button>
                <Button stype="default" onClick={() => removeContact(row.id)}>
                  Remover
                </Button>
              </>
            )}
          </Item>
        ))}
      </List>
    </>
  )
}

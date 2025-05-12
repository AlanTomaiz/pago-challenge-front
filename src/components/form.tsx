import axios from 'axios'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { useContacts } from '../store/contacts'
import { Button, Form, Input } from './styles'

type FormProps = {
  username: string
  displayName: string
  cep: string
}

export default function ContactForm() {
  const { register, handleSubmit, reset } = useForm<FormProps>()
  const { addContact } = useContacts()

  const getData = async (form: FormProps) => {
    try {
      const { username, displayName, cep } = form
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

      if (data.erro) throw new Error('CEP inválido')
      reset()
      addContact({
        id: uuidv4(),
        username,
        displayName,
        address: data,
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Form onSubmit={handleSubmit(getData)}>
      <Input {...register('username')} placeholder="Usuário" required />
      <Input
        {...register('displayName')}
        placeholder="Nome de exibição"
        required
      />
      <Input {...register('cep')} placeholder="CEP" required />
      <Button stype="info" type="submit">
        Buscar e Adicionar
      </Button>
    </Form>
  )
}

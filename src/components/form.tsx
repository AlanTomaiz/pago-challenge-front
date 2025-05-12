import axios from 'axios'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { useToast } from '../hooks/toast'
import { useContacts } from '../store/contacts'
import { Button, Form, Input } from './styles'

type FormProps = {
  username: string
  displayName: string
  cep: string
}

export default function ContactForm() {
  const { addContact } = useContacts()
  const { addToast } = useToast()

  const { register, handleSubmit, reset } = useForm<FormProps>()

  const getData = async (form: FormProps) => {
    try {
      const { username, displayName, cep } = form
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

      if (data.erro) throw new Error(data)
      reset()
      addContact({
        id: uuidv4(),
        username,
        displayName,
        address: data,
      })

      addToast({ type: 'success', message: 'Endereço adicionado com sucesso!' })
    } catch (err) {
      console.error(err)
      addToast({ type: 'error', message: 'CEP inválido' })
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

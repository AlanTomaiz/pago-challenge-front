import axios from 'axios'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import { useContacts } from '../store/contacts'

const Form = styled.form`
  margin-top: 24px;
  display: flex;
  gap: 8px;
`

const Input = styled.input`
  color: #555555;
  height: 40px;
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  transition: 0.4s;

  &:focus {
    border-color: #6675df;
  }

  outline: none;
`

const Button = styled.button`
  height: 40px;
  max-height: 40px;
  padding: 10px 15px;
  border: 1px solid #ededed;
  background: #7284ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
`

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
      <Button type="submit">Buscar e Adicionar</Button>
    </Form>
  )
}

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AddressData {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
}

export interface Contact {
  id: string
  username: string
  displayName: string
  address: AddressData
}

interface ContactState {
  contacts: Contact[]
  addContact: (contact: Contact) => void
}

export const useContacts = create<ContactState>()(
  persist(
    (set) => ({
      contacts: [],
      addContact: (contact) =>
        set((state) => ({ contacts: [...state.contacts, contact] })),
    }),
    { name: 'contacts-storage' },
  ),
)

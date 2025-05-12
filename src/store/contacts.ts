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
  removeContact: (id: string) => void
  updateContact: (id: string, displayName: string) => void
}

export const useContacts = create<ContactState>()(
  persist(
    (set) => ({
      contacts: [],
      addContact: (contact) =>
        set((state) => ({ contacts: [...state.contacts, contact] })),
      removeContact: (id) =>
        set((state) => ({
          contacts: state.contacts.filter((row) => row.id !== id),
        })),
      updateContact: (id, displayName) =>
        set((state) => ({
          contacts: state.contacts.map((row) =>
            row.id === id ? { ...row, displayName } : row,
          ),
        })),
    }),
    { name: 'contacts-storage' },
  ),
)

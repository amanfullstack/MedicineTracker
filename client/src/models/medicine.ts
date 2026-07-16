export type Medicine = {
  id: string
  fullName: string
  notes: string
  expiryDate: string
  quantity: number
  price: number
  brand: string
}

export type MedicineFormState = {
  fullName: string
  notes: string
  expiryDate: string
  quantity: string
  price: string
  brand: string
}

export const emptyMedicineForm: MedicineFormState = {
  fullName: '',
  notes: '',
  expiryDate: '',
  quantity: '',
  price: '',
  brand: '',
}

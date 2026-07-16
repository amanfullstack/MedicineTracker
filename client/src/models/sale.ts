export type SaleRecord = {
  id: string
  medicineId: string
  medicineName: string
  quantitySold: number
  unitPrice: number
  totalAmount: number
  soldOn: string
}

export type SaleFormState = {
  medicineId: string
  quantitySold: string
}

export const emptySaleForm: SaleFormState = {
  medicineId: '',
  quantitySold: '1',
}

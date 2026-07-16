import type { ICellRendererParams } from 'ag-grid-community'
import type { Medicine } from '../models/medicine'
import { daysUntilExpiry } from '../utils/medicine'

type MedicineCellRendererParams = ICellRendererParams<Medicine, string | number | null | undefined>

export function MedicineCellRenderer({ value, valueFormatted, data }: MedicineCellRendererParams) {
  const toneClass = getToneClass(data)
  const displayValue = valueFormatted ?? value ?? ''

  return <div className={`medicine-cell ${toneClass}`}>{displayValue}</div>
}

function getToneClass(medicine?: Medicine | null) {
  if (!medicine) {
    return ''
  }

  if (daysUntilExpiry(medicine.expiryDate) < 30) {
    return 'tone-expiring'
  }

  if (medicine.quantity < 10) {
    return 'tone-low-stock'
  }

  return ''
}

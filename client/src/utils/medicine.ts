import type { Medicine } from '../models/medicine'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export function daysUntilExpiry(expiryDate: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const expiry = new Date(expiryDate)
  expiry.setHours(0, 0, 0, 0)

  return Math.ceil((expiry.getTime() - today.getTime()) / 86400000)
}

export function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}

export function formatDate(value: string) {
  return dateFormatter.format(new Date(value))
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

export function getStatusLabel(medicine: Medicine) {
  if (daysUntilExpiry(medicine.expiryDate) < 30) {
    return 'Expiring soon'
  }

  if (medicine.quantity < 10) {
    return 'Low stock'
  }

  return 'Healthy'
}

export function getMedicineRowClass(medicine?: Medicine | null) {
  if (!medicine) {
    return ''
  }

  if (daysUntilExpiry(medicine.expiryDate) < 30) {
    return 'row-expiring'
  }

  if (medicine.quantity < 10) {
    return 'row-low-stock'
  }

  return ''
}

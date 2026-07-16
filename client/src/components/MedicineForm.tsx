import type { FormEvent, InputHTMLAttributes } from 'react'
import type { MedicineFormState } from '../models/medicine'

type MedicineFormProps = {
  form: MedicineFormState
  saving: boolean
  onChange: (name: keyof MedicineFormState, value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function MedicineForm({ form, saving, onChange, onSubmit }: MedicineFormProps) {
  return (
    <form className="panel form-panel" onSubmit={onSubmit}>
      <h2>Add medicine</h2>
      <div className="form-fields">
        <Field label="Full name" value={form.fullName} onChange={(value) => onChange('fullName', value)} required />
        <Field label="Brand" value={form.brand} onChange={(value) => onChange('brand', value)} required />
        <Field label="Expiry date" type="date" value={form.expiryDate} onChange={(value) => onChange('expiryDate', value)} required />
        <Field label="Quantity" type="number" min="0" value={form.quantity} onChange={(value) => onChange('quantity', value)} required />
        <Field label="Price" type="number" min="0" step="0.01" value={form.price} onChange={(value) => onChange('price', value)} required />
        <label className="field field-span-2">
          <span>Notes</span>
          <textarea value={form.notes} onChange={(event) => onChange('notes', event.target.value)} rows={3} />
        </label>
      </div>
      <button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Save medicine'}
      </button>
    </form>
  )
}

type FieldProps = {
  label: string
  value: string
  type?: string
  min?: string
  step?: string
  required?: boolean
  onChange: (value: string) => void
}

function Field({ label, value, onChange, ...props }: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} {...props} />
    </label>
  )
}

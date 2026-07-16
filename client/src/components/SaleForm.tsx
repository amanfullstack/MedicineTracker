import type { FormEvent, InputHTMLAttributes } from 'react'
import type { Medicine } from '../models/medicine'
import type { SaleFormState } from '../models/sale'

type SaleFormProps = {
  form: SaleFormState
  medicines: Medicine[]
  saving: boolean
  onChange: (name: keyof SaleFormState, value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function SaleForm({ form, medicines, saving, onChange, onSubmit }: SaleFormProps) {
  return (
    <form className="panel form-panel" onSubmit={onSubmit}>
      <h2>Record sale</h2>
      <div className="form-fields">
        <label className="field field-span-2">
          <span>Medicine</span>
          <select
            name="medicineId"
            value={form.medicineId}
            onChange={(event) => onChange('medicineId', event.target.value)}
            required
          >
            {medicines.map((medicine) => (
              <option key={medicine.id} value={medicine.id}>
                {medicine.fullName}
              </option>
            ))}
          </select>
        </label>
        <Field
          label="Quantity sold"
          type="number"
          min="1"
          value={form.quantitySold}
          onChange={(value) => onChange('quantitySold', value)}
          required
        />
      </div>
      <button type="submit" disabled={saving || medicines.length === 0}>
        {saving ? 'Saving...' : 'Save sale'}
      </button>
    </form>
  )
}

type FieldProps = {
  label: string
  value: string
  type?: string
  min?: string
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

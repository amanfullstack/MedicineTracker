import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import { AppHeader } from './components/AppHeader'
import { FormTabs } from './components/FormTabs'
import { MedicineForm } from './components/MedicineForm'
import { MedicineGrid } from './components/MedicineGrid'
import { SaleForm } from './components/SaleForm'
import { SalesGrid } from './components/SalesGrid'
import type { Medicine, MedicineFormState } from './models/medicine'
import { emptyMedicineForm } from './models/medicine'
import type { SaleFormState, SaleRecord } from './models/sale'
import { emptySaleForm } from './models/sale'
import { request } from './utils/api'
import { daysUntilExpiry, formatCurrency } from './utils/medicine'

function App() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [sales, setSales] = useState<SaleRecord[]>([])
  const [medicineForm, setMedicineForm] = useState<MedicineFormState>(emptyMedicineForm)
  const [saleForm, setSaleForm] = useState<SaleFormState>(emptySaleForm)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [savingMedicine, setSavingMedicine] = useState(false)
  const [savingSale, setSavingSale] = useState(false)
  const [error, setError] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [activeTab, setActiveTab] = useState<'medicine' | 'sale'>('medicine')

  const loadDashboard = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const [medicineData, saleData] = await Promise.all([
        request<Medicine[]>('/medicines'),
        request<SaleRecord[]>('/sales'),
      ])

      setMedicines(medicineData)
      setSales(saleData)
      setSaleForm((current) => {
        if (current.medicineId || medicineData.length === 0) {
          return current
        }

        return {
          ...current,
          medicineId: medicineData[0].id,
        }
      })
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to load data.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadDashboard()
  }, [loadDashboard])

  const filteredMedicines = useMemo(
    () =>
      medicines.filter((medicine) =>
        medicine.fullName.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [medicines, search],
  )

  const expiringSoonCount = useMemo(
    () => medicines.filter((medicine) => daysUntilExpiry(medicine.expiryDate) < 30).length,
    [medicines],
  )

  const lowStockCount = useMemo(
    () => medicines.filter((medicine) => medicine.quantity < 10).length,
    [medicines],
  )

  const totalRevenue = useMemo(() => sales.reduce((sum, sale) => sum + sale.totalAmount, 0), [sales])

  async function handleMedicineSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavingMedicine(true)
    setError('')
    setStatusMessage('')

    try {
      await request<Medicine>('/medicines', {
        method: 'POST',
        body: JSON.stringify({
          ...medicineForm,
          quantity: Number(medicineForm.quantity),
          price: Number(medicineForm.price),
        }),
      })

      setMedicineForm(emptyMedicineForm)
      setStatusMessage('Medicine saved.')
      await loadDashboard()
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to save medicine.')
    } finally {
      setSavingMedicine(false)
    }
  }

  async function handleSaleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavingSale(true)
    setError('')
    setStatusMessage('')

    try {
      await request<SaleRecord>(`/medicines/${saleForm.medicineId}/sales`, {
        method: 'POST',
        body: JSON.stringify({ quantitySold: Number(saleForm.quantitySold) }),
      })

      setSaleForm((current) => ({
        ...current,
        quantitySold: '1',
      }))
      setStatusMessage('Sale recorded.')
      await loadDashboard()
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to save sale.')
    } finally {
      setSavingSale(false)
    }
  }

  return (
    <main className="app-shell">
      <AppHeader
        medicineCount={medicines.length}
        lowStockCount={lowStockCount}
        expiringSoonCount={expiringSoonCount}
        totalRevenue={formatCurrency(totalRevenue)}
        search={search}
        onSearchChange={setSearch}
      />

      <section className="panel">
        <h2>Medicines</h2>
        <MedicineGrid medicines={filteredMedicines} loading={loading} />
      </section>

      <section className="panel">
        <FormTabs activeTab={activeTab} onChange={setActiveTab} />

        <div className="tab-panel">
          {activeTab === 'medicine' ? (
            <MedicineForm
              form={medicineForm}
              saving={savingMedicine}
              onChange={(name, value) =>
                setMedicineForm((current) => ({ ...current, [name]: value }))
              }
              onSubmit={handleMedicineSubmit}
            />
          ) : (
            <SaleForm
              form={saleForm}
              medicines={medicines}
              saving={savingSale}
              onChange={(name, value) => setSaleForm((current) => ({ ...current, [name]: value }))}
              onSubmit={handleSaleSubmit}
            />
          )}
        </div>
      </section>

      <SalesGrid sales={sales} />

      {(error || statusMessage) && <p className={error ? 'message error' : 'message success'}>{error || statusMessage}</p>}
    </main>
  )
}

export default App

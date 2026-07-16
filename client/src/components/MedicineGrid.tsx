import { AgGridReact } from 'ag-grid-react'
import type { ColDef } from 'ag-grid-community'
import type { Medicine } from '../models/medicine'
import { MedicineCellRenderer } from './MedicineCellRenderer'
import { formatCurrency, formatDate, getStatusLabel } from '../utils/medicine'

type MedicineGridProps = {
  medicines: Medicine[]
  loading: boolean
}

export function MedicineGrid({ medicines, loading }: MedicineGridProps) {
  const columnDefs: ColDef<Medicine>[] = [
    {
      field: 'fullName',
      headerName: 'Name',
      flex: 1.5,
      minWidth: 220,
      cellRenderer: MedicineCellRenderer,
      cellStyle: { padding: 0 },
    },
    {
      field: 'brand',
      headerName: 'Brand',
      flex: 1,
      minWidth: 140,
      cellRenderer: MedicineCellRenderer,
      cellStyle: { padding: 0 },
    },
    {
      field: 'expiryDate',
      headerName: 'Expiry',
      minWidth: 130,
      valueFormatter: ({ value }) => formatDate(String(value ?? '')),
      cellRenderer: MedicineCellRenderer,
      cellStyle: { padding: 0 },
    },
    {
      field: 'quantity',
      headerName: 'Qty',
      width: 90,
      type: 'numericColumn',
      cellRenderer: MedicineCellRenderer,
      cellStyle: { padding: 0 },
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 120,
      valueFormatter: ({ value }) => formatCurrency(Number(value ?? 0)),
      cellRenderer: MedicineCellRenderer,
      cellStyle: { padding: 0 },
    },
    {
      headerName: 'Status',
      minWidth: 160,
      valueGetter: ({ data }) => (data ? getStatusLabel(data) : ''),
      cellRenderer: MedicineCellRenderer,
      cellStyle: { padding: 0 },
    },
  ]

  return (
    <div className="ag-theme-quartz grid-frame">
      <AgGridReact<Medicine>
        rowData={medicines}
        columnDefs={columnDefs}
        loading={loading}
        domLayout="autoHeight"
        rowHeight={42}
        overlayNoRowsTemplate={loading ? 'Loading medicines...' : 'No medicines found.'}
      />
    </div>
  )
}

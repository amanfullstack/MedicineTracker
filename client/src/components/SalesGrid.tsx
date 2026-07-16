import { AgGridReact } from 'ag-grid-react'
import type { ColDef } from 'ag-grid-community'
import type { SaleRecord } from '../models/sale'
import { formatCurrency, formatDateTime } from '../utils/medicine'

type SalesGridProps = {
  sales: SaleRecord[]
}

export function SalesGrid({ sales }: SalesGridProps) {
  const columnDefs: ColDef<SaleRecord>[] = [
    { field: 'medicineName', headerName: 'Medicine', flex: 1.5, minWidth: 220 },
    { field: 'quantitySold', headerName: 'Qty', width: 90, type: 'numericColumn' },
    {
      field: 'unitPrice',
      headerName: 'Unit Price',
      width: 130,
      valueFormatter: ({ value }) => formatCurrency(Number(value ?? 0)),
    },
    {
      field: 'totalAmount',
      headerName: 'Total',
      width: 130,
      valueFormatter: ({ value }) => formatCurrency(Number(value ?? 0)),
    },
    {
      field: 'soldOn',
      headerName: 'Sold On',
      minWidth: 160,
      valueFormatter: ({ value }) => formatDateTime(String(value ?? '')),
    },
  ]

  return (
    <section className="panel">
      <h2>Sales</h2>
      <div className="ag-theme-quartz grid-frame">
        <AgGridReact<SaleRecord>
          rowData={sales}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          rowHeight={42}
        />
      </div>
    </section>
  )
}

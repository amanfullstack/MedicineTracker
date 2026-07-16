type AppHeaderProps = {
  medicineCount: number
  lowStockCount: number
  expiringSoonCount: number
  totalRevenue: string
  search: string
  onSearchChange: (value: string) => void
}

export function AppHeader({
  medicineCount,
  lowStockCount,
  expiringSoonCount,
  totalRevenue,
  search,
  onSearchChange,
}: AppHeaderProps) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">ABC Pharmacy</p>
        <h1>Medicine tracker</h1>
      </div>
      <div className="summary">
        <span>{medicineCount} medicines</span>
        <span>{lowStockCount} low stock</span>
        <span>{expiringSoonCount} expiring soon</span>
        <span>{totalRevenue} sales</span>
      </div>
      <label className="field field-inline">
        <span>Search</span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name"
        />
      </label>
    </header>
  )
}

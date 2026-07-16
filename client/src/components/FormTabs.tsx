type FormTabsProps = {
  activeTab: 'medicine' | 'sale'
  onChange: (tab: 'medicine' | 'sale') => void
}

export function FormTabs({ activeTab, onChange }: FormTabsProps) {
  return (
    <div className="tabs" role="tablist" aria-label="Medicine forms">
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'medicine'}
        className={activeTab === 'medicine' ? 'tab active' : 'tab'}
        onClick={() => onChange('medicine')}
      >
        Add medicine
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'sale'}
        className={activeTab === 'sale' ? 'tab active' : 'tab'}
        onClick={() => onChange('sale')}
      >
        Record sale
      </button>
    </div>
  )
}

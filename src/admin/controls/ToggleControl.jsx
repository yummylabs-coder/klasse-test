import '../AdminPanel.css'

export default function ToggleControl({ label, checked, onChange, description }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <span className="text-sm text-gray-300">{label}</span>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`admin-toggle ${checked ? 'admin-toggle--on' : ''}`}
      >
        <span className="admin-toggle__thumb" />
      </button>
    </div>
  )
}

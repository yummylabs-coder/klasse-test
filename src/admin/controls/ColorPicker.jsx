export default function ColorPicker({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <label className="text-sm text-gray-300 shrink-0">{label}</label>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 font-mono uppercase">{value}</span>
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border border-gray-600 bg-transparent"
        />
      </div>
    </div>
  )
}

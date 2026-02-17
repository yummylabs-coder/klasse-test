export default function SliderControl({ label, value, onChange, min, max, step = 0.125, unit = 'rem' }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-300">{label}</label>
        <span className="text-xs text-gray-500 font-mono">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={parseFloat(value)}
        onChange={e => onChange(String(e.target.value))}
        className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-500"
      />
    </div>
  )
}

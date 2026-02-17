export default function TextControl({ label, value, onChange, multiline = false, maxLength, placeholder }) {
  const shared = "w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500"

  return (
    <div className="space-y-1.5">
      <label className="text-sm text-gray-300 block">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          maxLength={maxLength}
          placeholder={placeholder}
          rows={3}
          className={`${shared} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          maxLength={maxLength}
          placeholder={placeholder}
          className={shared}
        />
      )}
    </div>
  )
}

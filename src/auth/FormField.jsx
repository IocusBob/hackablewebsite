export default function FormField({ label, type = 'text', value, onChange, name, placeholder, autoComplete }) {
  return (
    <label className="form-field">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </label>
  )
}

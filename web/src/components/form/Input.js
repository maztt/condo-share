function Input({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  multiple
}) {
  return (
    <div>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        {...Input(multiple ? { multiple } : '')}
      />
    </div>
  )
}

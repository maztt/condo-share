function Select({text, name, options, handleOnChange, value}) {
  return (
    <div>
      <label htmlFor="{name}">{text}:</label>
      <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
        <option>Select an option</option>
        {options.map((option) => (
          <option value="{option}" key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
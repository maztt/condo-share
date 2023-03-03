import { useState } from 'react'

import formStyles from './Form.module.css'
import Input from './Input.js'
import Select from './Select.js'

function ToolForm({ handleSubmit, toolData, btnText }) {
  const [tool, setTool] = useState(toolData || {})
  const [preview, setPreview] = useState([])
  const categories = [
    'Electrical',
    'Engineering Tools',
    'Garden Tools',
    'Ladders & Sack Trucks',
    'Materials',
    'Welding Tools'
  ]

  function onFileChange(e) {
    setPreview(Array.from(e.target.files))
    setTool({ ...tool, images: [...e.target.files] })
  }

  function handleChange(e) {
    setTool({ ...tool, [e.target.name]: e.target.value })
  }

  function handleCategory(e) {
    setTool({
      ...tool,
      category: e.target.options[e.target.selectedIndex].text
    })
  }

  function submit(e) {
    e.preventDefault()
    handleSubmit(tool)
  }

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_tool_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt={tool.name}
                key={`${tool.name}+${index}`}
              />
            ))
          : tool.images &&
            tool.images.map((image, index) => (
              <img
                src={`${process.env.REACT_APP_API}/images/tools/${tool}`}
                alt={tool.name}
                key={`${tool.name}+${index}`}
              />
            ))}
      </div>
      <Input
        text="Tool photos"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Tool name"
        type="text"
        name="name"
        handleOnChange={handleChange}
        value={tool.name || ''}
      />
      <Select
        name="category"
        text="What's the category?"
        options={categories}
        handleOnChange={handleCategory}
        value={tool.category || ''}
      />
      <input type="submit" value={btnText} />
    </form>
  )
}

export default ToolForm

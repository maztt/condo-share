import api from '../../../utils/api.js'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './AddTool.module.css'
import ToolForm from '../../form/ToolForm.js'
import useFlashMessage from '../../../hooks/useFlashMessage.js'

function EditTool () {

  const [tool, setTool] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const { id } = useParams()

  useEffect(() => {
    api.get(`/tools/${id}`, {
      Authorization: `Bearer ${JSON.parse(token)}`
    }).then((response) => {
      setTool(response.data.tool)
    })
  }, [token, id])

  async function updateTool(tool) {
    let msgType = 'success'
    const formData = new FormData()

    await Object.keys(tool).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < tool[key].length; i++) {
          formData.append(`images`, tool[key][i])
        }
      } else {
        formData.append(key, tool[key])
      }
    })

    const data = await api.patch(`tools/${tool._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      return response.data
    }).catch((err) => {
      msgType = 'error'
      return err.response.data
    })

    setFlashMessage(data.message, msgType)

  }

  return (
    <section>
      <div className={styles.addtool_header}>
        <h1>Editing: {tool.name}</h1>
      </div>
      {tool.name && (
        <ToolForm 
          handleSubmit={updateTool}
          toolData={tool}
          btnText="Update"
        />
      )}
    </section>
  )
}

export default EditTool
import api from '../../../utils/api.js'
import styles from './AddTool.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage.js'
import ToolForm from '../../form/ToolForm.js'

function AddTool() {
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  async function publishTool(tool) {
    let msgType = 'success'

    const formData = new FormData()

    await Object.keys(tool).forEach(key => {
      if (key === 'images') {
        for (let i = 0; i < tool[key].length; i++) {
          formData.append('images', tool[key][i])
        }
      } else {
        formData.append(key, tool[key])
      }
    })

    const data = await api
      .post('tools/create', formData, {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)

    if (msgType !== 'error') {
      navigate('/tools/mytools')
    }
  }

  return (
    <section>
      <div className={styles.addtool_header}>
        <h1>Assign a new Tool</h1>
        <p>All condos will be able to claim a sharing</p>
      </div>
      <ToolForm btnText="Publish Tool" handleSubmit={publishTool} />
    </section>
  )
}

export default AddTool

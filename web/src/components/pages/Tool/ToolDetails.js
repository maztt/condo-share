import api from '../../../utils/api.js'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage.js'
import styles from './ToolDetails.module.css'

function ToolDetails() {
const [tool, setTool] = useState({})
const { id } = useParams()
const { setFlashMessage } = useFlashMessage()
const [token] = useState(localStorage.getItem('token') || '')

useEffect(() => {
  api.get(`/tools/${id}`).then((response) => {
    setTool(response.data.tool)
  })
}, [id])

async function schedule() {
  let msgType = 'success'

  const data = await api.patch(`/tools/schedule/${tool._id}`, {
    Authorization: `Bearer ${JSON.parse(token)}`
  }).then((response) => {
    return response.data
  }).catch((err) => {
    msgType = 'error'
    return err.response.data
  })

  setFlashMessage(data.message, msgType)
}

  return (
    <>
      {tool.name && (
        <section className={styles.tool_details_container}>
          <div className={styles.tooldetails_header}>
            <h1>
              {tool.name}
            </h1>
            <p>Does this tool answer to your needs?</p>
          </div>
          <div className={styles.tool_images}>
            {tool.images.map((image, index) => (
              <img 
                src={`${process.env.REACT_APP_API}/images/tools/${image}`} 
                alt={tool.name} 
                key={index}
              />
            ))}
          </div>
          <p>
            <span className="bold">Category:</span> {tool.category}
          </p>
          {token ? (
            <button onClick={schedule}>Claim</button>
          ) : (
            <p>Get yourself an <Link to='/register'>account</Link> to claim items.</p>
          )}
        </section>
      )}
    </>
  )
}

export default ToolDetails
import api from '../../../utils/api.js'
import styles from './Dashboard.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RoundedImage from '../../layout/RoundedImage.js'
import useFlashMessage from '../../../hooks/useFlashMessage.js'

function MyTools() {
  const [tools, setTools] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api
      .get('tools/mytools', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      })
      .then(response => {
        setTools(response.data.tools)
      })
  }, [token])

  async function removeTool(id) {
    let msgType = 'success'

    const data = await api
      .delete(`/tools/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      })
      .then(response => {
        const updatedTools = tools.filter(tool => tool._id !== id)
        setTools(updatedTools)

        return response.data
      })
      .catch(err => {
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
  }

  async function confirmClaiming(id) {
    let msgType = 'success'

    const data = await api.patch(`/tools/conclude/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
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
      <div className={styles.toolslist_header}>
        <h1>My Tools</h1>
        <Link to="/tool/add">Publish a new Tool</Link>
      </div>
      <div className={styles.toolslist_container}>
        {tools.length > 0 &&
          tools.map(tool => (
            <div key={tool._id} className={styles.toolslist_row}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/tools/${tool.images[0]}`}
                alt={tool.name}
                width="px75"
              />
              <span className="bold">{tool.name}</span>
              {tool.available && tool.taker &&
                (<span>{(tool.taker.name)} wants to claim it</span>)
              }
              
              <div className={styles.actions}>
                {tool.available ? (
                  <>
                    {tool.taker && (
                      <button className={styles.conclude_btn} onClick={() => {
                        confirmClaiming(tool._id)
                      }}>
                        Confirm Claim
                      </button>
                    )}
                    <Link to={`/tool/edit/${tool._id}`}>Edit</Link>
                    <button
                      onClick={() => {
                        removeTool(tool._id)
                      }}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <p>Currently in use by {tool.taker.name}.</p>
                )}
              </div>
            </div>
          ))}
        {tools.length === 0 && <p>You have not published any tools.</p>}
      </div>
    </section>
  )
}

export default MyTools

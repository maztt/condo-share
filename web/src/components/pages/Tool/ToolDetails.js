import api from '../../../utils/api.js'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage.js'

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

  return (
    <>
      {tool.name && (
        <section>
          <div>
            <h1>
              {tool.name}
            </h1>
            <p>Does this tool answer to your needs?</p>
          </div>
          <div>
            {tool.images.map((image, index) => (
              <img 
                src={`${process.env.REACT_APP_API}/images/tools/${image}`} 
                alt={tool.name} 
                key={index}
              />
            ))}
          </div>
          <p>
            <span>Category:</span> {tool.category}
          </p>
          {token ? (
            <button>Claim.</button>
          ) : (
            <p>Get yourself an <Link to='/register'>account</Link> to claim items.</p>
          )}
        </section>
      )}
    </>
  )
}

export default ToolDetails
import api from '../../utils/api.js'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [tools, setTools] = useState([])

  useEffect(() => {
    api.get('/tools').then(response => {
      setTools(response.data.tools)
    })
  }, [])

  return (
    <section>
      <div>
        <h1>Claim a Tool</h1>
      </div>
      <div>
        {tools.length > 0 &&
          tools.map(tool => (
            <div>
              <h3>{tool.name}</h3>
              {tool.available ? (
                <p>Available</p>
              ) : (
                <p>Not available</p>
              )}
            </div>
          ))}
        {tools.length === 0 && (
          <p>There are no tools available at this moment.</p>
        )}
      </div>
    </section>
  )
}

export default Home

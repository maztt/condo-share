import api from '../../utils/api.js'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

function Home() {
  const [tools, setTools] = useState([])

  useEffect(() => {
    api.get('/tools').then(response => {
      setTools(response.data.tools)
    })
  }, [])

  return (
    <section>
      <div className={styles.tool_home_header}>
        <h1>Claim a Tool</h1>
      </div>
      <div className={styles.tool_container}>
        {tools.length > 0 &&
          tools.map(tool => (
            <div className={styles.tool_card} key={tool._id}>
              <h3>{tool.name}</h3>
              {tool.available ? (
                <Link to={`/tool/${tool._id}`}>Available</Link>
              ) : (
                <p className="bold">Not available</p>
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

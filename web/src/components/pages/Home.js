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
              <div
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_API}/images/tools/${tool.images[0]})`,
                }}
                className={styles.tool_card_image}
              ></div>
              <h3>{tool.name}</h3>
              <div className={styles.tool_card_info}>
              <p><span className="bold">Category:</span> {tool.category}</p>
              <p><span className="bold">Owner:</span> {tool.owner.name} | Block: {tool.owner.block}, Ap: {tool.owner.apartment}</p>
              </div>
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

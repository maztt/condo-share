import api from '../../../utils/api.js'
import { useState, useEffect } from 'react'
import styles from './Dashboard.module.css'
import RoundedImage from '../../layout/RoundedImage.js'

function MyClaimings() {
    const [tools, setTools] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get('tools/mytakings', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(response => {
            setTools(response.data.tools)
        })
    }, [token])

    return (
        <section>
            <div className={styles.toolslist_header}>
                <h1>My Claimings</h1>
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
                            <div className={styles.contacts}>
                                <p>
                                    <span className="bold">Call to:</span>{' '}
                                    {tool.owner.phone}
                                </p>
                                <p>
                                    <span className="bold">Speak to:</span>{' '}
                                    {tool.owner.name}
                                </p>
                            </div>
                            <div className={styles.actions}>
                                {tool.available ? (
                                    <p>Pending approval</p>
                                ) : (
                                    <p>Currently claimed</p>
                                )}
                            </div>
                        </div>
                    ))}
                {tools.length === 0 && (
                    <p>You still have not claimed any tools.</p>
                )}
            </div>
        </section>
    )
}

export default MyClaimings

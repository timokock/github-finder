import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'

const Alert = () => {

    const { alert } = useContext(AlertContext)

    return (
        alert !== null && (
            <div className={`alert-${alert.type} p`}><i className="fas fa-info-circle" style={{marginLeft: "10px"}}></i>  {alert.msg}</div>
        )
    )
}

export default Alert
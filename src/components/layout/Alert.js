import React from 'react'

export const Alert = ({ alert }) => {
    return (
        alert !== null && (
            <div className={`alert-${alert.type} p`}><i className="fas fa-info-circle" style={{marginLeft: "10px"}}></i>  {alert.message}</div>
        )
    )
}

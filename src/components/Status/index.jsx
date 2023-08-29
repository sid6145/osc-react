import React from 'react'
import "./Status.css"

const Status = ({connected, className}) => {
  return (
    <div className={`status-root ${connected ? "connected" : ""} ${className || ""}`}>
        <h4>{connected ? "Live" : "Connecting"}</h4>
    </div>
  )
}

export default Status 
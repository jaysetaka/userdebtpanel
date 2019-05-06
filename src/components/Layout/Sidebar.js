import React from 'react';
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div>
      <Link to="/client/add" className="btn btn-danger btn-block">
        <i className="fas fa-plus"></i> New Client
      </Link>
    </div>
  )
}

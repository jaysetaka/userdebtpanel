import React from 'react';
import Clients from '../Clients/Clients';
import Sidebar from '../Layout/Sidebar';

export default () => {
  return (
    <div className="row">
      <div className="col-md-10">
        <Clients />
      </div>
      <div className="col-md-2">
        <Sidebar />
      </div>
    </div>
  )
}

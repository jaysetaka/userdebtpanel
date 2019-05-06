import React from 'react';
import spinner from './374.gif';

export default () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading"
        style={{ width: '50px', margin: 'auto', display: 'block' }}
        className="loader"
      />
    </div>
  );
};

// ChefAbout.js
import React from 'react'

const ChefAbout = ({ about }) => {
  return (
    <div className="bg-white px-8 py-4 rounded-md">
      <div>
        {about.split('\n').map((i, key) => {
          return <div key={key}>{i}</div>
        })}
      </div>
      
    </div>
  )
}

export default ChefAbout

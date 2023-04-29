import React from 'react'

const ChefAbout = ({ isChef, about }) => {
  return (
    <div>
      {isChef && (
        <button className="mt-2 bg-green-700 text-white px-4 py-2 rounded-md">
          Edit About
        </button>
      )}
      <pre className="font-light whitespace-pre-wrap">{about}</pre>
    </div>
  )
}

export default ChefAbout

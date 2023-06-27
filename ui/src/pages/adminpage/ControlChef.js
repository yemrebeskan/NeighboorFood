import React, { useState, useEffect } from 'react'
import ControlAChef from './ControlAChef'
import axios from 'axios'
const ControlChef = () => {
  const [nominees, setNominees] = useState([])

  const fetchNominations = async () => {
    try {
      const res = await axios.get(
        'http://127.0.0.1:3001/api/v1/admin/applications'
      )
      const nominations = res.data.data.users.map((nom) => {
        return {
          id: nom._id,
          name: nom.userInfos.name,
          surname: nom.userInfos.surname,
          aboutNewChef: nom.informationAboutChef,
          country: nom.country,
          streetAddress: nom.streetAddress,
          city: nom.city,
          Image: nom.userInfos.image,
        }
      })
      setNominees(nominations)
    } catch (error) {
      console.log('Error fetching nominations:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchNominations()
    }
    fetchData()
  }, [])

  const updateNominees = (id) => {
    const updatedNominees = nominees.filter((nominee) => nominee.id !== id)
    setNominees(updatedNominees)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold flex justify-center mt-4">
        Aday Kontrol
      </h1>
      <div className="justify-center m-16">
        {nominees.map((data, index) => (
          <div
            key={index}
            className="flex justify-center m-16 bg-gray-200 h-32 rounded-xl"
          >
            <ControlAChef data={data} onUpdate={(id) => updateNominees(id)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ControlChef

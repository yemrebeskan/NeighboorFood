import React, { useContext, useState } from 'react'
import {
  AiOutlinePlus,
  AiFillLike,
  AiFillDislike,
  AiOutlineClose,
} from 'react-icons/ai'
import { FaShoppingBasket } from 'react-icons/fa'
import OrderedFoodContext from '../../context/OrderedFoodContext'
import EditImage from './EditImage'
import Modal from 'react-modal'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const dummyMenu = []

const Menu = ({
  menu,
  isChef,
  isEditing,
  onMenuChange,
  onPhotoChange,
  onDelete,
}) => {
  const foodCtx = useContext(OrderedFoodContext)

  const [isDeleteModalOpen, setIsDeleteModelOpen] = useState(false)

  const addBasketHandler = async (menu) => {
    const uid = localStorage.getItem('uid')
    const res = await axios.put('http://127.0.0.1:3001/api/v1/users/cart', {
      userId: uid,
      foodId: menu._id,
    })
    if (res.data.status === 'success') {
      if (foodCtx.orderedFoods.some((item) => item._id === menu._id)) {
        foodCtx.incrementCountOfFood(menu._id)
      } else {
        foodCtx.addItemToOrders(menu)
      }
    } else {
      // ERROR MODAL MENU CAN NOT BE ADDED
    }
  }

  const openDeleteModel = () => {
    //if (window.confirm('Do you really want to delete this menu?')) {
    //
    //}
    setIsDeleteModelOpen(true)
  }
  const handleDelete = () => {
    //TODO: BACKEND
    onDelete(menu._id)
  }

  return (
    <div className="grid grid-cols-8 w-full py-8 my-4 mb-8 bg-white rounded-lg relative">
      {isEditing && (
        <button
          onClick={openDeleteModel}
          className="absolute right-0 top-0 m-2 text-white text-lg border-2 rounded-xl border-red-600 bg-red-600 p-2"
        >
          Delete
        </button>
      )}
      {isEditing && isDeleteModalOpen && (
        <div className="flex flex-col justify-center items-center">
          <Modal
            onRequestClose={() => {
              setIsDeleteModelOpen(false)
            }}
            isOpen={isDeleteModalOpen}
            style={{
              content: {
                width: '40%',
                height: '20%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              },
              overlay: {
                zIndex: 9999,
              },
            }}
          >
            <div className="flex flex-col relative">
              <h2 className="text-2xl text-center ">
                Do you really want to delete <strong>{menu.name}</strong>?
              </h2>
              <div className="basis-20"></div>
              <div className="flex flex-row-reverse gap-4 relative">
                <button
                  className="border-2 border-gray-400 bg-gray-400 text-white p-2 rounded-lg"
                  onClick={() => setIsDeleteModelOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="border-2 border-red-600 bg-red-600 text-white p-2 rounded-lg "
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        </div>
      )}
      <div className="col-span-2 flex justify-center items-center w-full h-full relative">
        {menu.isToday ? (
          <div className="absolute -mt-44 text-3xl text-[#4f7472] font-bold font-dancing">
            Today's Menu
          </div>
        ) : null}
        <div className="flex flex-col items-center justify-center">
          <img
            className="w-[150px] h-[150px] rounded-full bg-cover"
            src={menu.image}
          />
          {isEditing && (
            <EditImage
              className="absolute bottom-[-20px] left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2"
              circle={true}
              onPictureChange={() => console.log('Profile picture changed')}
              onPictureRemove={() => console.log('Profile picture removed')}
            />
          )}
        </div>
      </div>

      <div className="col-span-4">
        {isEditing ? (
          <div className="flex flex-col">
            <input
              className="font-bold text-2xl text-[#484743]"
              type="text"
              value={menu.name}
              onChange={(e) => onMenuChange(menu.id, 'name', e.target.value)}
            />
            <input
              className="font-thin text-md w-24"
              type="text"
              value={menu.kcal}
              onChange={(e) => onMenuChange(menu.id, 'kcal', e.target.value)}
            />
            <span className="text-3xl">
              $
              <input
                className="font-extrabold text-3xl mt-8 w-24 text-[#484743]"
                type="number"
                value={menu.price}
                onChange={(e) => onMenuChange(menu.id, 'price', e.target.value)}
              />
            </span>
          </div>
        ) : (
          <div>
            <h2 className="font-bold text-2xl text-[#484743]">{menu.name}</h2>
            <p className="font-thin text-md">{menu.kcal} kcal</p>
            <p className="font-extrabold text-3xl pt-8 text-[#484743]">
              ${menu.price}
            </p>
          </div>
        )}
      </div>

      <div className="col-span-2 grid grid-rows-6">
        <div className="row-span-5 w-full h-full flex justify-center items-center">
          <button onClick={() => addBasketHandler(menu)}>
            <AiOutlinePlus
              className="bg-[#87bfb3] w-16 h-16 rounded-full cursor-pointer mr-2 mb-2 hover:mb-0 hover:mr-0 relative z-10"
              size={36}
              color="white"
            />
          </button>

          <div className="absolute w-16 h-16 rounded-full z-0 bg-[#537a72]"></div>
        </div>

        <div className="row-span-1 h-full w-full flex flex-row items-end">
          <div className="mr-4">
            <div className="absolute z-10 cursor-default w-4 h-4 flex justify-center items-center text-[#537a72] text-[12px] font-extrabold -mt-2 ml-4">
              {menu.carts}
            </div>
            <FaShoppingBasket
              size={24}
              color="#537a72"
              className="cursor-pointer relative z-0"
            />
          </div>

          <div className="mr-4">
            <div className="absolute z-10 cursor-default w-4 h-4 flex justify-center items-center text-[#537a72] text-[12px] font-extrabold -mt-2 ml-4">
              {menu.likes}
            </div>
            <AiFillLike
              size={24}
              color="#537a72"
              className="cursor-pointer relative z-0"
            />
          </div>

          <div>
            <div className="absolute z-10 cursor-default w-4 h-4 flex justify-center items-center text-[#537a72] text-[12px] font-extrabold -mt-2 ml-4">
              {menu.dislikes}
            </div>
            <AiFillDislike
              size={24}
              color="#537a72"
              className="cursor-pointer relative z-0"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const ChefMenus = ({ isChef, chefMenu }) => {
  // TODO: This should come from backend

  const [menus, setMenus] = useState(chefMenu ? chefMenu : dummyMenu)
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [newMenu, setNewMenu] = useState({
    name: '',
    kcal: '',
    price: 0,
    image: '',
  })
  const { id } = useParams()
  const uid = localStorage.getItem('uid')

  const handleMenuChange = (id, field, value) => {
    setMenus(
      menus.map((menu) => (menu.id === id ? { ...menu, [field]: value } : menu))
    )
  }

  const handlePhotoChange = (id) => {
    // Handle photo change here
  }

  const handleDeleteMenu = (id) => {
    setMenus(menus.filter((menu) => menu.id !== id))
  }

  const handleAddMenu = () => {
    setIsAdding(true)
  }

  const handleSaveNewMenu = () => {
    // Save the new menu here
    setMenus([...menus, { id: Date.now(), ...newMenu }])
    setIsAdding(false)
  }

  const handleCancelAddMenu = () => {
    if (window.confirm('Do you want to cancel?')) {
      setIsAdding(false)
    }
  }

  return (
    <div className="w-full">
      {isChef && uid == id && (
        <div>
          <button
            className="mt-2 bg-green-700 text-white px-4 py-2 rounded-md"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button
            className="mt-2 bg-green-700 text-white px-4 py-2 rounded-md"
            onClick={handleAddMenu}
          >
            Add Menu
          </button>
        </div>
      )}
      {menus.length === 0 ? (
        <div className="mt-5 px-4 text-xl py-2">No menu was found.</div>
      ) : (
        menus.map((menu) => (
          <Menu
            key={menu.id}
            menu={menu}
            isEditing={isEditing}
            onMenuChange={handleMenuChange}
            onPhotoChange={handlePhotoChange}
            isChef={isChef}
            onDelete={handleDeleteMenu}
          />
        ))
      )}
      {isAdding && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-6 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-2xl leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Add Menu
                    </h3>
                    <div className="mt-4 space-y-6">
                      <div className="rounded-md shadow-sm">
                        <input
                          type="text"
                          value={newMenu.name}
                          onChange={(e) =>
                            setNewMenu({ ...newMenu, name: e.target.value })
                          }
                          placeholder="Menu Name"
                          className="focus:ring-green-500 focus:border-green-500 block w-full pr-12 sm:text-lg border-gray-300 rounded-md p-3"
                        />
                      </div>
                      <div className="rounded-md shadow-sm">
                        <input
                          type="text"
                          value={newMenu.kcal}
                          onChange={(e) =>
                            setNewMenu({ ...newMenu, kcal: e.target.value })
                          }
                          placeholder="Kcal"
                          className="focus:ring-green-500 focus:border-green-500 block w-full pr-12 sm:text-lg border-gray-300 rounded-md p-3"
                        />
                      </div>
                      <div className="p-3 rounded-md shadow-sm">
                        <label className="block text-l font-medium text-gray-700 mb-1">
                          Price:
                        </label>

                        <input
                          type="number"
                          value={newMenu.price}
                          onChange={(e) =>
                            setNewMenu({ ...newMenu, price: e.target.value })
                          }
                          placeholder="Price"
                          className="focus:ring-green-500 focus:border-green-500 block w-full pr-4 sm:text-lg border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        {selectedImage && (
                          <img
                            src={URL.createObjectURL(selectedImage)}
                            className="object-cover rounded-full h-28 w-28"
                            alt="Selected Menu"
                          />
                        )}
                        <label
                          htmlFor="menuImage"
                          className="flex cursor-pointer text-green-500"
                        >
                          {selectedImage
                            ? 'Change Menu Image'
                            : 'Add Menu Image'}
                        </label>
                        <input
                          type="file"
                          id="menuImage"
                          accept="image/*"
                          onChange={(event) => {
                            const file = event.target.files[0]
                            if (file && file.type.substr(0, 5) === 'image') {
                              setSelectedImage(file)
                            } else {
                              setSelectedImage(null)
                            }
                          }}
                          className="mt-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSaveNewMenu}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={handleCancelAddMenu}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChefMenus

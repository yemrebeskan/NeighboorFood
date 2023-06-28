import React, { useState } from 'react';
import { BsArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs";

const OrderCart = ({ menu, date, state }) => {
    const [isOpen, setIsOpen] = useState(false);
    let name = ""; 
    let total = 0;
    menu.forEach(m => {
        name += m.name;
        name += ", ";
        total += m.price;
    });
    return (
        <div className='container max-w-7xl m-auto my-10'>
            <div onClick={() => setIsOpen(!isOpen)} className={`grid grid-cols-10 mt-5 py-5 px-5 ${isOpen ? "rounded-t-md" : "rounded-md"} text-sm text-white cursor-pointer ${state == "completed" ? "bg-[#104eb1]" : state == "accepted" ? "bg-[#0d914f]" : state == "rejected" ? "bg-[#9a0e34]" : state == "pending" ? "bg-[#f06087]" : "bg-black"}`}>
                <h1 className='col-span-6'>{name}</h1>
                <p className=' col-span-2'>{date.toString().slice(0, 15)}</p>

                <p className='font-light mr-10 col-span-1'>{state}</p>

                <div className='flex justify-end'>
                    {isOpen ? <BsFillArrowUpCircleFill color='yellow' size={24} /> : <BsArrowDownCircleFill size={24} />}
                </div>
            </div>


            {isOpen &&
            <div className={`py-5 px-7 ${state == "completed" ? "bg-[#467cd2]" : state == "accepted" ? "bg-[#44c886]" : state == "rejected" ? "bg-[#b64d69]" : state == "pending" ? "bg-[#f28ea8]" : "bg-black"}`}>
                {menu.map(m => (
                    <div className='grid grid-cols-5 py-1 items-center'>
                        <p className='col-span-2'>{m.name}</p>
                        <p className='col-span-2 italic text-black/60'>from {m.chef}</p>
                        <p className='text-end font-bold text-xl'>${m.price}</p>
                    </div>
                ))}
                <div className='w-full border-2 border-black/60 mt-8' />
                <p className='mt-3'>Total: ${total}</p>
            </div>
            }
        </div>
    )
}

const PastOrders = () => {
    const tempOrders = [
      {
        user: "1",
        menu: [
          {
            name: "Shrimp with Meat",
            price: 20,
            chef: "Alice",
          },
          {
            name: "Spaghetti with Minced Meat",
            price: 12,
            chef: "Alice",
          }
        ],
        date: new Date("2023-03-26"),
        state: "completed",
      },
      {
        user: "1",
        menu: [
          {
            name: "Shrimp with Meat",
            price: 20,
            chef: "Alice",
          },
          {
            name: "Spaghetti with Minced Meat",
            price: 12,
            chef: "Alice",
          }
        ],
        date: new Date("2023-03-26"),
        state: "completed",
      },
      {
        user: "1",
        menu: [
          {
            name: "Shrimp with Meat",
            price: 20,
            chef: "Alice",
          },
          {
            name: "Spaghetti with Minced Meat",
            price: 12,
            chef: "Alice",
          }
        ],
        date: new Date("2023-03-26"),
        state: "completed",
      },
      {
        user: "1",
        menu: [
          {
            name: "Shrimp with Meat",
            price: 20,
            chef: "Alice",
          },
          {
            name: "Spaghetti with Minced Meat",
            price: 12,
            chef: "Alice",
          },
          {
            name: "A101 Mantısı <3",
            price: 12,
            chef: "Alice",
          },
        ],
        date: new Date("2023-06-26"),
        state: "rejected",
      },
      {
        user: "1",
        menu: [
          {
            name: "Spaghetti with Minced Meat",
            price: 12,
            chef: "Alice",
          },
          {
            name: "A101 Mantısı <3",
            price: 12,
            chef: "Alice",
          },
        ],
        date: new Date("2023-06-26"),
        state: "accepted",
      },
      {
        user: "1",
        menu: [
          {
            name: "Shrimp with Meat",
            price: 20,
            chef: "Alice",
          }
        ],
        date: new Date("2023-06-28"),
        state: "pending",
      },
    ];
    
  return (
    <div>
        {
            tempOrders.reverse().map((order, index) => (
                <OrderCart key={index} menu={order.menu} date={order.date} state={order.state} />
            ))
        }
    </div>
  )
}

export default PastOrders
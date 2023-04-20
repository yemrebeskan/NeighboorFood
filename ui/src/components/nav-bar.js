import logo from './homepageComponents.js/logo.png'

const NavBar = () => {
    return (
        <div className="">
            <nav className="flex bg-stone-200 justify-end">
                <div className="buttons">
                    <div className="flex justify-end mr-8">
                        <button className="text-green-700 items-end mb-10 mt-10 mr-16">
                            About Us
                        </button>
                        <div className="border-r-4 border-gray-50 mt-8 mb-7">
                            <button className="text-green-700 mb-10 mt-2 mb-3 mr-10">
                                SIGN UP
                            </button>
                        </div>

                        <button className="text-green-700 items-end mb-10 mt-10 mr-16 ml-12">
                            LOG IN
                        </button>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-10 h-10 mt-8 "
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>
                </div>
            </nav>
            <img src={logo} className="w-40 -mt-16 ml-10 absolute mb-10"></img>
        </div>
    )
}

export default NavBar

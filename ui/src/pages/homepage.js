import Foods from '../components/homepageComponents.js/foods'
const HomePage = () => {
    return (
        <div className="">
            <div className="py-60 bg-gray-100"></div>

            <div className=" bg-teal-600 flex justify-center">
                <div className="">
                    <Foods></Foods>
                </div>
                <div className=" bg-orange-200 rounded-full px-36 py-36 absolute mt-48"></div>
            </div>
            <div className="py-44 bg-orange-200"></div>
        </div>
    )
}

export default HomePage

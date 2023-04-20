import img1 from './food_pictures/picture1.png'
import img2 from './food_pictures/picture2.png'
import img3 from './food_pictures/picture3.png'
import img4 from './food_pictures/picture4.png'
import img5 from './food_pictures/picture5.png'
import img6 from './food_pictures/picture6.png'
import img7 from './food_pictures/picture7.png'

const Foods = () => {
    const imageList = [img1, img2, img3, img7, img4, img5, img6]
    console.log(Math.round(imageList.length / 2))
    return (
        <div className="flex space-x-20 md:order-2">
            {imageList.map((item, index) =>
                index === Math.round(imageList.length / 2) - 1 ? (
                    <img src={item} className="w-40 h-40 mt-4 mb-32"></img>
                ) : (
                    <img src={item} className="w-40 h-40 mt-16 mb-12"></img>
                )
            )}
        </div>
    )
}

export default Foods

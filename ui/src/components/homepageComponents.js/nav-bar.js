import logo from './logo.jpeg'

const NavBar = () => {
    return (
        <nav>
            <img src={logo}></img>
            <button className="bg-lime-400">Log In</button>
        </nav>
    )
}

export default NavBar

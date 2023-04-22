import './SearchBar.css'
const SearchBar = (props) => {
  return (
    <form className=" border-solid border-2 border-slate-400 rounded-lg flex">
      <input
        placeholder="Search your best chefs..."
        className="w-96 h-12 mr-4 mt-5 ml-2 rounded-lg border-slate-400 border-2 input_bar p-2"
      ></input>
      <button className="border-solid border-2 border-slate-400 mt-4 mb-4 bg-teal-500 mr-4 rounded-lg p-4 w-40 text-slate-50 hover:bg-teal-700">
        <p className="ml-2 mr-2"> Search </p>
      </button>
    </form>
  )
}

export default SearchBar

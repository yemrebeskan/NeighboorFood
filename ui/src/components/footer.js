import "./footerclass.css";
const Footer = () => {
  return (
    <div className="footerclass bg-teal-900 flex text-slate-200 p-4">
      <div className="mt-8 flex">
        <p className="mr-16 ml-12 h-40">© 2023 NeighborFood</p>
        <div>
          <ul className="flex">
            <li className="ml-36">
              <button className="">Kullanım koşulları</button>
            </li>
            <li className="ml-36">
              <button>İletişim</button>
            </li>
            <li className="ml-36">
              <button>İletişim</button>
            </li>
            <li className="ml-36">
              <button>İletişim</button>
            </li>
            <li className="ml-36">
              <button>İletişim</button>
            </li>
          </ul>
          <ul></ul>
          <ul className="flex">
            <li className="ml-36 mt-8">
              <button>İletişim</button>
            </li>
            <li className="ml-52 mt-8">
              <button>İletişim</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer

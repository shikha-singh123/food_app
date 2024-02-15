import { useEffect, useState ,useContext} from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  //  const btnNameReact = "Login";
  const {loggedInUser}= useContext(UserContext);
  
  const initialButtonText = "Login";

  const [btnNameReact, setbtnNameReact] = useState(initialButtonText);
  console.log("Header render");

  useEffect(() => {
    console.log("useEffect called");
  }, [initialButtonText]);

  const onlineStatus = useOnlineStatus();

 
  console.log(loggedInUser);
  //subscribing to the store
  const cartItems=
  useSelector((store)=>store.cart.items); 
     

  return (
    <div className="flex justify-between bg-pink-50 shadow-lg m-1 mb-1 sm:bg-yellow-50 lg:bg-green-50 ">
      <div className="logo-container">
        <img className="w-46" src={LOGO_URL} />
      </div>
      <div className="flex items-center ">
        <ul className="flex p-4 m-4">
        <li className="px-3">
  Online Status: {onlineStatus ? "✅" : "🔴"} 
</li>
          <li className="px-3"> 
            <Link to="/"> Home</Link>
          </li>
          <li className="px-3">
            <Link to="/about"> About us</Link>
          </li>
          <li className="px-3">
            <Link to="/contact"> Contact us</Link>
          </li>
          <li className="px-3">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-3 font-bold text-xl" >
          <Link to="/cart">
          Cart({cartItems.length}items)</Link></li>
        
          <button
            className="login"
            onClick={() => {
              setbtnNameReact((prevText) =>
                prevText === "Login" ? "Logout" : "Login"
              );
            }}
          >
            {btnNameReact}
          </button>
          <li className="px-3 font-bold">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

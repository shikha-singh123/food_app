import React ,{lazy,Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import myImage from './pic1.jpg';  
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";
// import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
// import Grocery from "./components/Grocery";
import UserContext from "./utils/UserContext";
import {Provider} from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
// chunking
// Code Splitting
// Dynamic Bundling
// Lazy loading
// on demand loading
// Dynamic import


const Grocery = lazy(() => import ("./components/Grocery"));

const About = lazy(() => import("./components/About"));





const AppLayout = () => {

  const [userName,setUserName] = useState();

  // Authentication

  useEffect(() => {
      // Make an Api call and send username and password
      const data = {
        name: "Sanket Singh"
      };
      setUserName(data.name);
  },[])

    return (
      //Default
      <Provider store={appStore}>
      <UserContext.Provider value= {{loggedInUser : userName,setUserName}}>
      {/* Sanket Singh */}
      <div className ="app">
      {/* <UserContext.Provider value= {{loggedInUser : "Elon Musk"}}> */}
      {/* Elon Musk */}
      <Header/>
      {/* </UserContext.Provider> */}
      <Outlet />
      
      </div>
      </UserContext.Provider>
      </Provider>
    );
};

const appRouter = createBrowserRouter([
    {
     path: "/",
     element:<AppLayout />,
     children: [
      {
        path: "/",
        element:<Body />,
      },
      {
        path: "/about",
        element:<Suspense fallback={<h1>Loading....</h1>}><About /></Suspense>,
      },
      {
        path: "/contact",
        element:<Contact/>,
      },
      {
        path: "/grocery",
        element:<Suspense fallback={<h1>Loading....</h1>}><Grocery /></Suspense>,
      },
      {
        path: "/restaurants/:resId",
        element:<RestaurantMenu />,
      },
      {
        path: "/cart",
        element:<Cart/>,
      }
     ],
     errorElement: <Error />,
    },
   
]);

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(<RouterProvider router={appRouter} />);
// root.render(AppLayout());

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./components/routes/home/home.component";
import { Routes, Route } from 'react-router-dom'
import Navigation from "./components/routes/navigation/navigation.component";
import Authentication from "./components/routes/authentication/authentication.component";
import Shop from "./components/routes/shop/shop.component";
import Checkout from "./components/routes/checkout/checkout.component";
import { checkUserSession } from "./components/store/user/user.action";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
     dispatch(checkUserSession());
    }, [])


  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element ={<Home/>} />   
        <Route path='shop/*' element ={<Shop/>} />
        <Route path='auth' element ={<Authentication/>} />
        <Route path='checkout' element ={<Checkout/>} />
      </Route>         
    </Routes>
  );
}

export default App;

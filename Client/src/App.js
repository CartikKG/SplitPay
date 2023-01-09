import AllRoutes from './Components/AllRoutes/AllRoutes';
import AllRoutesAfterLogin from './Components/AllRoutes/AllRoutesAfterLogin';
import { useSelector } from "react-redux";
// import {} from 'dotenv';
// require().config()
function App() {
  // console.log(process.env)
  const store=useSelector((state)=>state);
  console.log(store);
  return (
    <div className="App">
      {store.isLogin ? <AllRoutesAfterLogin/> :  <AllRoutes/> }   
    </div>
  );
}

export default App;

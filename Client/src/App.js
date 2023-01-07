import AllRoutes from './Components/AllRoutes/AllRoutes';
import AllRoutesAfterLogin from './Components/AllRoutes/AllRoutesAfterLogin';
import { useSelector } from "react-redux";

function App() {
  const store=useSelector((state)=>state);
  console.log(store);
  return (
    <div className="App">
      {store.isLogin ? <AllRoutesAfterLogin/> :  <AllRoutes/> }   
    </div>
  );
}

export default App;

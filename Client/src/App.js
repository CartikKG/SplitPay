import { ChakraProvider } from '@chakra-ui/react'
import AllRoutes from './Components/AllRoutes/AllRoutes';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      
       <ChakraProvider>

         <Navbar/>
         </ChakraProvider>
         <AllRoutes/>
       
       
    </div>
  );
}

export default App;

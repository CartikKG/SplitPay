import { ChakraProvider } from '@chakra-ui/react'
import AllRoutes from './Components/AllRoutes/AllRoutes';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      
     
       <ChakraProvider>
         <Navbar/>
        </ChakraProvider>
       
         <AllRoutes/>
         <ChakraProvider>
         <Footer/>
         </ChakraProvider>
    </div>
  );
}

export default App;

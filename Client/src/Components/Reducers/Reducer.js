let intial={
    isLogin:false,
    userData:{},
   
   }
 const Reducer=(state=intial,action)=>{
       switch (action.type){
           case "LOGIN":
               return {
             
                isLogin:true,userData:action.payload
           }
           case "LOGOUT":return {
            isLogin:false,userData:{}
           }
           default: return state
         
       }
   
}
export default Reducer;
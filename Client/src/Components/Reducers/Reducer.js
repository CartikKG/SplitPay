let intial={
    isLogin:false,
    userData:{},
    PEXPENCE:{},
    allgroup:[],
   
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
           case "PEXPENCE":return{
            ...state,
            PEXPENCE:action.payload,
           }
           case "ALLGROUP":return{
            ...state,
            allgroup:action.payload,
           }
           default: return state
         
       }
   
}
export default Reducer;
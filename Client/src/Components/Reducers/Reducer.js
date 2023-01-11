let intial={
    isLogin:false,
    userData:{},
    PEXPENCE:{},
    allgroup:[],
    CurrentGroup:"",
    CurrentGroupData:{}
   
   }
 const Reducer=(state=intial,action)=>{
       switch (action.type){
           case "LOGIN":
               return {
                ...state,
              isLogin:true,userData:action.payload
           }
           case "LOGOUT":return {
            ...state,
            isLogin:false,userData:{}
           }
           case "PEXPENCE":return{
            ...state,
            PEXPENCE:action.payload,
           }
           case "ALLGROUP":return{
            ...state,
            allgroup:action.payload
           }
           case "CurrentGroup":return{
            ...state,
            CurrentGroup:action.payload
           }
           case "CurrentGroupData":return{
            ...state,
            CurrentGroupData:action.payload
           }
           default: return state
         
       }
   
}
export default Reducer;
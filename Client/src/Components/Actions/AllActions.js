// import { toast } from "reacta-toastify";
export const loginUser =async(token,dispatch)=>{
    try{
  
        let res2 = await fetch(`http://localhost:3005/users/login/loggedInUser`, {
          method: "GET",
          headers: { Authorization: token },
        });
        let {data} = await res2.json();
        localStorage.setItem('userId',data._id);
       
        dispatch({
            type:"LOGIN",
            payload:data
        })
        
    }catch(err){
       // console.log(err);
    }
}
export const logoutUser =async(dispatch)=>{
    dispatch({
            type:"LOGOUT"
    })
}

export const addPersonalExpense=async(data)=>{
    

}
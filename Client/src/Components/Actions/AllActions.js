// import { toast } from "reacta-toastify";
export const loginUser =async(token,dispatch)=>{
    try{
  
        let res2 = await fetch(`${process.env.REACT_APP_URL_API}/users/login/loggedInUser`, {
          method: "GET",
          headers: { Authorization: token },
        });
        let {data} = await res2.json();
        localStorage.setItem('userId',data._id);
       
        dispatch({
            type:"LOGIN",
            payload:data
        })
        fetchPrnlEx(dispatch,data._id);
    }catch(err){
       // console.log(err);
    }
}
export const logoutUser =async(dispatch)=>{
    dispatch({
            type:"LOGOUT"
    })
}

export const addPersonalExpense=async(data,dispatch)=>{
    let userId=localStorage.getItem('userId');
    try {
        let res= await fetch(`${process.env.REACT_APP_URL_API}/expense/personal/${userId}`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        let ress=await res.json();
        // console.log(ress);
        fetchPrnlEx(dispatch,userId);
    } catch (error) {
        console.log(error)
    }
}
const fetchPrnlEx=async(dispatch,userId)=>{
    try {
        let res= await fetch(`${process.env.REACT_APP_URL_API}/expense/${userId}`);
        let data=await res.json();
//    console.log(data)
        dispatch({
            type:"PEXPENCE",
            payload:{...data}
        })
    } catch (error) {
        
    }
}
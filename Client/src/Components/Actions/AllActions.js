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
export const fetchPrnlEx=async(dispatch,userId)=>{
    try {
        let res= await fetch(`${process.env.REACT_APP_URL_API}/expense/${userId}`)
        let ress=await res.json();
        // console.log(ress);
        dispatch({
            type:"PEXPENCE",
            payload:{...ress}
        })
    } catch (error) {
        
    }
}
export const patchPrnlEx=async(dispatch,userId,data)=>{
    try {
        let res= await fetch(`${process.env.REACT_APP_URL_API}/expense/${userId}`,{
            method:"PATCH",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        fetchPrnlEx(dispatch,userId)
    } catch (error) {
        
    }
}
export const deletePrnlEx=async(dispatch,data)=>{
    let userId=localStorage.getItem('userId');
    console.log(data)
    try {
        let res= await fetch(`${process.env.REACT_APP_URL_API}/expense/${userId}`,{
            method:"DELETE",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        fetchPrnlEx(dispatch,userId)
    } catch (error) {
        
    }
}
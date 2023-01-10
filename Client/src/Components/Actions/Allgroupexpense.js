export const createNewgroup=async(dispatch, data)=>{
    let userId=localStorage.getItem('userId');
    try {
        let res= await fetch(`${process.env.REACT_APP_URL_API}/group/${userId}`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        let ress=await res.json();
        console.log(ress)
        // fetchAllGroup(dispatch);
    } catch (error) {
        console.log(error)
    }
}
export const addDatatogroup=()=>{
            
}
export const editDatafromgroup=()=>{
            
}
export const fetchAllGroup=async(dispatch)=>{
    let userId=localStorage.getItem('userId');
    try {
        let res= await fetch(`${process.env.REACT_APP_URL_API}/group/${userId}`)
        let ress=await res.json();
        // console.log(ress);
        dispatch({
            type:"ALLGROUP",
            payload:{...ress}
        })
    } catch (error) {
        
    }
}
export const deleteDatafromgroup=()=>{
             
}
export const inviteUsertogroup=()=>{
            
}
export const switchgroup=()=>{
            
}
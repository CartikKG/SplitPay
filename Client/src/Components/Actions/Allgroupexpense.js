import store from "../Store/store"
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
        dispatch({
            type:"CurrentGroup",
            payload:ress.data._id
        })
        fetchAllGroup(dispatch);
    } catch (error) {
        console.log(error)
    }
}
export const addDatatogroup=async(data,dispatch)=>{
    let {CurrentGroup} =store.getState();
    try {
        let res= await fetch(`${process.env.REACT_APP_URL_API}/group/current/${CurrentGroup}`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        let res2=await res.json();
        console.log(res2)
        dispatch({
            type:"CurrentGroupData",
            payload:{...res2}
        })
    } catch (error) {
        console.log(error)
    }       
}
export const editDatafromgroup=async(data, dispatch)=>{
    let {CurrentGroup} =store.getState();
    try {
        let res= await fetch(`${process.env.REACT_APP_URL_API}/group/current/${CurrentGroup}`,{
            method:"PATCH",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        let res2=await res.json();
        dispatch({
            type:"CurrentGroupData",
            payload:{...res2}
        })
       

    } catch (error) {
        
        console.log(error)
        return error;
    }       
}
export const fetchAllGroup=async(dispatch)=>{
    let userId=localStorage.getItem('userId');
    try {
        let res= await fetch(`${process.env.REACT_APP_URL_API}/group/${userId}`)
        let ress=await res.json();
        dispatch({
            type:"ALLGROUP",
            payload:{...ress}
        })
        fetchStartGroup(dispatch);
    } catch (error) {
        console.log(error)
    }
}
export const deleteDatafromgroup=async (itemId,dispatch)=>{
    let {CurrentGroup} =store.getState();
       try {
        let res= await fetch(`${process.env.REACT_APP_URL_API}/group/current/${CurrentGroup}`,{
            method:"DELETE",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({itemId})
        })
        let res2=await res.json();
        dispatch({
            type:"CurrentGroupData",
            payload:{...res2}
        })

    } catch (error) {
        
        console.log(error)
        // return error;
    }        
}
export const inviteUsertogroup=async(data)=>{
    // 
    let {CurrentGroup} =store.getState();
    try {
        let res= await fetch(`${process.env.REACT_APP_URL_API}/group/invite/${CurrentGroup}`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        let res2=await res.json();
        return res2;


    } catch (error) {
        
        console.log(error)
        return error;
    }       
}
export const fetchStartGroup=(dispatch)=>{
    let {allgroup,CurrentGroupData} =store.getState();
//    console.log("OK-4")
   if(!CurrentGroupData.data&&allgroup.data &&allgroup.data.length!=0){
       console.log("OK-2")
       getCurrentgroup(allgroup.data[0]._id, dispatch);
    }
   
}
export const getCurrentgroup=async(groupId,dispatch)=>{
    dispatch({
        type:"CurrentGroup",
        payload:groupId
    })
    try {
        let res= await fetch(`${process.env.REACT_APP_URL_API}/group/current/${groupId}`)
        let ress=await res.json();
        console.log(ress)
        dispatch({
            type:"CurrentGroupData",
            payload:{...ress}
        })
    } catch (error) {
        console.log(error)
    }
}
export const joinGroup=async (groupId,dispatch)=>{
    let {userData} =store.getState();
    try {
        let res= await fetch(`${process.env.REACT_APP_URL_API}/group/joining/${userData._id}`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({groupId})
        })
        let res2=await res.json();
        // console.log(res2)
        // return res2;
        fetchAllGroup(dispatch);

    } catch (error) {
        
        console.log(error)
        // return error;
    }   
}
export const switchgroup=()=>{
            
}
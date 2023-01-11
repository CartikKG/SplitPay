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
export const addDatatogroup=async(data)=>{
    let {CurrentGroup} =store.getState();
    try {
        let res= await fetch(`${process.env.REACT_APP_URL_API}/group/current/${CurrentGroup}`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })

    } catch (error) {
        console.log(error)
    }       
}
export const editDatafromgroup=()=>{
            
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
export const deleteDatafromgroup=()=>{
             
}
export const inviteUsertogroup=()=>{
            
}
export const fetchStartGroup=(dispatch)=>{
    let {allgroup,CurrentGroupData} =store.getState();
   console.log("OK-4")
   if(!CurrentGroupData.data&&allgroup.data &&allgroup.data.length!=0){
       console.log("OK-2")
       getCurrentgroup(allgroup.data[0]._id, dispatch);
    }
   
}
export const getCurrentgroup=async(groupId,dispatch)=>{
    // console.log("gf")
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
export const switchgroup=()=>{
            
}
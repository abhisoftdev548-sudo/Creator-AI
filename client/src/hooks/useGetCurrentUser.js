import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../App"
import { linkWithCredential } from "firebase/auth"
import { useDispatch } from "react-redux"
import { setUserData } from "../redux/userSlice"

const useGetCurrentUser = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const getCurrentUser = async () => {
            try{
                const result = await axios.get(`${serverUrl}/user/get-me`,{withCredentials: true})
                dispatch(setUserData(result.data.data))
                console.log(result)
            }catch(error){
                console.log(error)
            }
        }
        getCurrentUser()
    },[])
}

export default useGetCurrentUser
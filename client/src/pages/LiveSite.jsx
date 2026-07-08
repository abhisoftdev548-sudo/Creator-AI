import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import axios from 'axios'

const LiveSite = () => {
    const {id} = useParams()
    const [html, setHtml] = useState("")
    const [error, setError] = useState("")

    useEffect(()=>{
        const handleGetWebsite = async () => {
            try{
                const result = await axios.get(`${serverUrl}/website/get-by-slug/${id}`, {withCredentials: true})
                console.log(result)
                setHtml(result.data.data.latestCode)
            }catch(error){
                console.log(error)
                setError(error)
            }
        }
        handleGetWebsite()
    },[id])

    if(error){
        return(
            <div className='h-screen flex items-center justify-center bg-black text-red-400'>
                        {error}
            </div>
        )
    }
  return (
    <div>
      <iframe title='Live Site' srcDoc={html} className='w-screen h-screen border-none' sandbox='allow-scripts allow-same-origin allow-forms'/>
      ssss
    </div>
  )
}

export default LiveSite

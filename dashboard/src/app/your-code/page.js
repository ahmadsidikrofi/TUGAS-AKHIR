'use client'

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const YourCodePage = () => {
    // const searchParams = useSearchParams()
    // const code = searchParams.get('code')
    const [code, setCode] = useState(null)

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search)
      const codeParam = urlParams.get('code')
      setCode(codeParam)
    }, [])
    return ( 
        <div className="flex justify-center items-center h-screen">
            <p>Your Code: {code}</p>
        </div>
    )
}
 
export default YourCodePage;
'use client'

import { useSearchParams } from "next/navigation"

const YourCodePage = () => {
    const searchParams = useSearchParams()
    const code = searchParams.get('code')
    return ( 
        <div className="flex justify-center items-center h-screen">
            <p>Your Code: {code}</p>
        </div>
    )
}
 
export default YourCodePage;
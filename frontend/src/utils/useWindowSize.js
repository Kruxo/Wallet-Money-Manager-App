import { useEffect, useState } from "react"

//Creating a hook for our Orb to get the current window's viewheight vh
export const useWindowSize = () =>{
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]) 
    
    //Everytime the window size is updated/its state gets updated or resized it runs useEffect
    useEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight])
        }
        window.addEventListener('resize', updateSize)

        return () => window.removeEventListener('resize', updateSize) //Clean up of the function, removes the eventlistener
    }, []) //Empty dependency array

    return {
        width: size[0],
        height: size[1]
    }
}
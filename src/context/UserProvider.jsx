// import React, { useState } from 'react';
// import userContext from './userContext';

// function UserProvider({children}) {

//     const [user,setUser]=useState({
//         data:{},
//         login:false
//     }).catch(error=>{
//       console.log(error);
      
//     })
    
   




//   return (
//    <userContext.Provider value={{user,setUser}}>
//     {children}
//    </userContext.Provider> 
//   )
// }

// export default UserProvider
import React, { useEffect, useState } from 'react'
import { getCurrentUserDetail, IsLoggedIn } from '../auth'
import userContext from './userContext'
function UserProvider({ children }) {

    const [user, setUser] = useState({
        data: {},
        login: false
    })

    useEffect(() => {
        setUser({
            data: getCurrentUserDetail(),
            login: IsLoggedIn()
        })
    }, [])



    return (

        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>

    )
}

export default UserProvider
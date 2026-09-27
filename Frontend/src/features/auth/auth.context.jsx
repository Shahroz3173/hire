import { createContext,useState,useEffect } from "react"
import { UserDetails } from "./services/auth.api.js"
import supabase from "../../utils/supabase.js"

const AuthContext=createContext()

const AuthProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    
    useEffect(()=>{
        const GetAndSetUser=async()=>{
            try{
                const { data: { session } } = await supabase.auth.getSession()
                if (session) {
                    const data=await UserDetails()
                    setUser(data.user)
                }
            }
            catch{
                setUser(null)
            }
            finally{
                setLoading(false)
            }
        }
        GetAndSetUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (!session) {
                    setUser(null)
                    setLoading(false)
                    return
                }
                try {
                    const data = await UserDetails()
                    setUser(data.user)
                } catch {
                    setUser(null)
                } finally {
                    setLoading(false)
                }
            }
        )

        return () => subscription.unsubscribe()
    },[])

    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthContext,AuthProvider}
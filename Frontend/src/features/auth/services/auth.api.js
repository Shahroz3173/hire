import api from './api.js'
import supabase from '../../../utils/supabase.js'

const register = async ({ username, email, password }) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { username },
            emailRedirectTo: `${window.location.origin}/login`
        }
    })
    if (error) throw error
    return data
}

const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const profile = await api.get('/auth/user')
    return { ...data, user: profile.data.user }
}

const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
}

const UserDetails = async () => {
    const res = await api.get('/auth/user')
    return res.data
}

export {
    register,
    login,
    logout,
    UserDetails
}

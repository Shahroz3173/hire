import User from "../models/user.models.js"
import supabase from "../config/supabase.config.js"

const authUser = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        const token = authorization?.startsWith("Bearer ")
            ? authorization.slice(7)
            : null

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const { data, error } = await supabase.auth.getUser(token)
        if (error || !data.user) {
            return res.status(401).json({ message: "Invalid Supabase session" })
        }

        const supabaseUser = data.user
        let user = await User.findOne({ supabaseId: supabaseUser.id })

        if (!user && supabaseUser.email) {
            user = await User.findOne({ email: supabaseUser.email })
            if (user) {
                user.supabaseId = supabaseUser.id
                user.verified = true
                await user.save()
            }
        }

        if (!user) {
            const username = supabaseUser.user_metadata?.username ||
                supabaseUser.email?.split("@")[0] ||
                `user-${supabaseUser.id.slice(0, 8)}`

            user = await User.create({
                supabaseId: supabaseUser.id,
                username,
                email: supabaseUser.email,
                verified: true
            })
        }

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        req.user = user
        next()
    }
    catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}
export {authUser}
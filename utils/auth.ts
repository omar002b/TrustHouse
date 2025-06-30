import supabase from "@/lib/supabaseClient"
import { Database } from "@/database.types"
import { redirect } from "next/navigation"

export async function signupAction(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })
    if (data.user) {
        redirect("/login")
    }
    return { data, error }
}

export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    if (data.user) {
        redirect("/")
    }
    return { data, error }
}

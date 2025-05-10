import { z } from "zod";
import { createClient } from '@/util/supabase/server';
import { AuthError } from "@supabase/supabase-js";

const loginSchema = z.object({
    email: z.string().email({ message: "Ongeldig e-mailadres" }),
    password: z.string().min(8, { message: "Wachtwoord moet minstens 8 tekens bevatten" }),
});
type LoginSchema = z.infer<typeof loginSchema>;

export { loginSchema };
export type { LoginSchema };

const signupSchema = z.object({
    email: z.string().email({ message: "Ongeldig e-mailadres" }),
    password: z.string().min(8, { message: "Wachtwoord moet minstens 8 tekens bevatten" }),
    firstname: z.string().min(1, { message: "Voornaam moet minstens 1 teken bevatten" }),
    lastname: z.string().min(1, { message: "Achteraam moet minstens 1 teken bevatten" }),
});
type SignupSchema = z.infer<typeof signupSchema>;

export { signupSchema };
export type { SignupSchema };


export type LoginResponse = { error: AuthError | null, data: { user_role: string | undefined } }

export async function login(credentials: LoginSchema): Promise<LoginResponse> {
    const supabase = await createClient();
    //supabase.auth.setSession()
    const { error, data } = await supabase.auth.signInWithPassword(credentials);
    return { error, data: { user_role: data.user?.role} };
}

export async function signup(data: SignupSchema) {
    const supabase = await createClient();
    // autoconfirm on? execute above, autoconfirm off? show text about confirmation mail sent
    const { data: signup_data, error } = await supabase.auth.signUp({ email: data.email, password: data.password });
    console.log(signup_data)
    if (!error) {
        await supabase.from('customers').insert({ id: signup_data.user!.id, firstname: data.firstname, lastname: data.lastname });
    }
    return { error: error };
}

export async function getRole(user_id: string) {
    const supabase = await createClient();
    const { data: userProfile } = await supabase
    .from('user_info')
    .select(`
        user_roles (
            role
        )
    `)
    .eq('id', user_id)
    .single();

    return userProfile?.user_roles.role;
}

export const loginPath = "/login";
export const signupPath = "/signup";
export const adminPath = "/admin";
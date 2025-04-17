import { z } from "zod";
import { createClient } from '@/util/supabase/server';

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
});
type SignupSchema = z.infer<typeof signupSchema>;

export { signupSchema };
export type { SignupSchema };


export async function login(data: LoginSchema) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(data);
    return { error: error };
}

export async function signup(data: SignupSchema) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp(data);
    return { error: error };
}
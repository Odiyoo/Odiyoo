"use client"

import { useEffect } from "react"
import { createClient} from "@/util/supabase/client"
import { useRouter } from 'next/navigation';

export default function LogoutPage() {

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.signOut();
    router.push('/');
  }, []);

  return (
    <div>Uitloggen...</div>
  )
}

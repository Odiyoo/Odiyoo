import { useEffect, useState } from "react";
import { Customer } from "@/domain/customers";
import { createClient } from "@/util/supabase/client";
import { User } from "@supabase/supabase-js";

export type AuthenticatedUserHook = {
    user: User | null,
    customer: Customer | null,
    isUserLoading: boolean,
}

export function useAuthenticatedUser(): AuthenticatedUserHook {

    const supabase = createClient();

    const [user, setUser] = useState<User | null>(null);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        const getUser = async () => {
            setLoading(true);
            if (!ignore) {
                const { data } = await supabase.auth.getUser();
                if (data.user) {
                    const { data: customerData } = await supabase.from('customers').select('*').eq('id', data.user.id).single();
                    setCustomer(customerData);
                }
                setUser(data?.user ?? null);
                setLoading(false);
            }
        };

        getUser();

        return () => {
            ignore = true;
        };
    }, []);

    return { user, customer, isUserLoading: isLoading };
}
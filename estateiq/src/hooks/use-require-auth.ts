"use client";

import { useAuthModalStore } from "@/stores/auth-modal";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function useRequireAuth() {
    const { openModal } = useAuthModalStore();
    const router = useRouter();
    const supabase = createClient();

    const requireAuthAction = async (action: () => void, redirectUrl?: string) => {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            openModal(redirectUrl);
        } else {
            action();
        }
    };

    const requireAuthNavigate = async (path: string) => {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            openModal(path);
        } else {
            router.push(path);
        }
    };

    return { requireAuthAction, requireAuthNavigate };
}

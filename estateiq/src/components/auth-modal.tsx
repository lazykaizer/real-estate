"use client";

import { useAuthModalStore } from "@/stores/auth-modal";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Building2 } from "lucide-react";
import { AuthForm } from "@/components/auth-form";

export function AuthModal() {
    const { isOpen, closeModal } = useAuthModalStore();

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-0 shadow-2xl">
                <div className="flex flex-col space-y-2 text-center bg-muted/50 p-6 pb-2">
                    <div className="flex justify-center mb-2">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <Building2 className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <DialogTitle className="text-2xl font-bold font-playfair tracking-tight">
                        EstateIQ
                    </DialogTitle>
                </div>
                <div className="px-6 pb-6 pt-2">
                    <AuthForm onSuccess={closeModal} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

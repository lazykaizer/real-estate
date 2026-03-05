"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, ArrowLeft, CheckCircle2, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/lib/supabase/client";
import { useAuthModalStore } from "@/stores/auth-modal";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

const COUNTRY_CODES = [
    { code: "+91", country: "IN", label: "India (+91)" },
    { code: "+1", country: "US", label: "USA (+1)" },
    { code: "+44", country: "GB", label: "UK (+44)" },
    { code: "+971", country: "AE", label: "UAE (+971)" },
    { code: "+65", country: "SG", label: "Singapore (+65)" },
    { code: "+61", country: "AU", label: "Australia (+61)" },
    { code: "+1", country: "CA", label: "Canada (+1)" },
];

interface AuthFormProps {
    onSuccess?: () => void;
    defaultTab?: string;
    redirectAfterAuth?: string;
}

export function AuthForm({ onSuccess, defaultTab = "login", redirectAfterAuth = "/home" }: AuthFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const { redirectUrl, closeModal } = useAuthModalStore();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
            return;
        }

        // Success
        setIsLoading(false);
        if (onSuccess) onSuccess();
        closeModal();

        if (redirectUrl) {
            router.push(redirectUrl);
        } else {
            router.push(redirectAfterAuth);
        }
    };

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        const formData = new FormData(e.currentTarget);
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const phoneCode = formData.get("phoneCode") as string;
        const phoneNumber = formData.get("phoneNumber") as string;

        const fullPhone = `${phoneCode}${phoneNumber}`;

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            setIsLoading(false);
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    firstName,
                    lastName,
                    phone: fullPhone,
                },
                emailRedirectTo: `${window.location.origin}/home`,
            },
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
            return;
        }

        setIsLoading(false);

        // If email confirmation is required, the session will be null
        if (data.session) {
            // Auto-confirmed — redirect immediately
            if (onSuccess) onSuccess();
            closeModal();
            if (redirectUrl) {
                router.push(redirectUrl);
            } else {
                router.push(redirectAfterAuth);
            }
        } else {
            // Email confirmation required — show success message
            setSuccessMessage(
                `Account created! We've sent a verification email to ${email}. Please check your inbox (and spam folder) to confirm your account, then log in.`
            );
        }
    };

    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
            redirectTo: `${window.location.origin}/auth/callback?next=/account`,
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
        setSuccessMessage(
            `Password reset link sent to ${forgotEmail}. Please check your inbox (and spam folder).`
        );
    };

    // ── Forgot Password View ──
    if (showForgotPassword) {
        return (
            <Card className="border-0 shadow-none sm:shadow-lg sm:ring-1 sm:ring-gray-200">
                <CardHeader className="space-y-2 px-0 sm:px-6">
                    <button
                        onClick={() => {
                            setShowForgotPassword(false);
                            setError(null);
                            setSuccessMessage(null);
                        }}
                        className="flex items-center gap-1 text-sm text-gray-mid hover:text-blue transition-colors mb-2 w-fit"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to Login
                    </button>
                    <CardTitle className="text-2xl font-semibold tracking-tight">Reset Password</CardTitle>
                    <CardDescription className="text-gray-500">
                        Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
                    </CardDescription>
                    {error && <div className="text-sm font-medium text-destructive mt-2">{error}</div>}
                    {successMessage && (
                        <div className="flex items-start gap-2 text-sm font-medium text-green bg-green-light px-4 py-3 rounded-lg mt-2">
                            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                            {successMessage}
                        </div>
                    )}
                </CardHeader>
                <CardContent className="space-y-4 px-0 sm:px-6">
                    {!successMessage && (
                        <form onSubmit={handleForgotPassword} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="forgot-email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="forgot-email"
                                        value={forgotEmail}
                                        onChange={(e) => setForgotEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        type="email"
                                        className="pl-10 h-11"
                                        required
                                    />
                                </div>
                            </div>
                            <Button type="submit" disabled={isLoading} className="w-full h-11 text-base font-medium">
                                {isLoading ? "Sending..." : "Send Reset Link"}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        );
    }

    // ── Main Login / Signup Tabs ──
    return (
        <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login" onClick={() => { setError(null); setSuccessMessage(null); }}>Log In</TabsTrigger>
                <TabsTrigger value="signup" onClick={() => { setError(null); setSuccessMessage(null); }}>Sign Up</TabsTrigger>
            </TabsList>

            {/* --- LOG IN TAB --- */}
            <TabsContent value="login">
                <Card className="border-0 shadow-none sm:shadow-lg sm:ring-1 sm:ring-gray-200">
                    <CardHeader className="space-y-2 px-0 sm:px-6">
                        <CardTitle className="text-2xl font-semibold tracking-tight">Welcome back</CardTitle>
                        <CardDescription className="text-gray-500">
                            Enter your email and password to access your account.
                        </CardDescription>
                        {error && <div className="text-sm font-medium text-destructive mt-2">{error}</div>}
                        {successMessage && (
                            <div className="flex items-start gap-2 text-sm font-medium text-green bg-green-light px-4 py-3 rounded-lg mt-2">
                                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                                {successMessage}
                            </div>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-4 px-0 sm:px-6">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email-login">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input id="email-login" name="email" placeholder="name@example.com" type="email" className="pl-10 h-11" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password-login">Password</Label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowForgotPassword(true);
                                            setError(null);
                                            setSuccessMessage(null);
                                        }}
                                        className="text-sm font-medium text-primary hover:underline"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input id="password-login" name="password" type="password" placeholder="••••••••" className="pl-10 h-11" required />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 pt-1">
                                <Checkbox id="remember" />
                                <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600">
                                    Remember me for 30 days
                                </label>
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full h-11 text-base font-medium mt-6 group">
                                {isLoading ? "Signing In..." : "Sign In"}
                                {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* --- SIGN UP TAB --- */}
            <TabsContent value="signup">
                <Card className="border-0 shadow-none sm:shadow-lg sm:ring-1 sm:ring-gray-200">
                    <CardHeader className="space-y-2 px-0 sm:px-6">
                        <CardTitle className="text-2xl font-semibold tracking-tight">Create an account</CardTitle>
                        <CardDescription className="text-gray-500">
                            Sign up to save properties and contact agents directly.
                        </CardDescription>
                        {error && <div className="text-sm font-medium text-destructive mt-2">{error}</div>}
                        {successMessage && (
                            <div className="flex items-start gap-2 text-sm font-medium text-green bg-green-light px-4 py-3 rounded-lg mt-2">
                                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                                {successMessage}
                            </div>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-4 px-0 sm:px-6">
                        {!successMessage ? (
                            <form onSubmit={handleSignup} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input id="firstName" name="firstName" placeholder="Arjun" required className="pl-10 h-11" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last name</Label>
                                        <Input id="lastName" name="lastName" placeholder="Sharma" required className="h-11" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email-signup">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input id="email-signup" name="email" placeholder="name@example.com" type="email" required className="pl-10 h-11" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password-signup">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input id="password-signup" name="password" type="password" placeholder="Min. 6 characters" required minLength={6} className="pl-10 h-11" />
                                    </div>
                                    <p className="text-xs text-gray-mid">Must be at least 6 characters.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="flex gap-2">
                                        <div className="w-[120px] shrink-0">
                                            <Select name="phoneCode" defaultValue="+91">
                                                <SelectTrigger className="h-11 border-gray-200">
                                                    <SelectValue placeholder="+91" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {COUNTRY_CODES.map((c) => (
                                                        <SelectItem key={`${c.country}-${c.code}`} value={c.code}>
                                                            {c.country} {c.code}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="relative flex-1">
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                type="tel"
                                                placeholder="10 digit number"
                                                required
                                                pattern="[0-9]{10}"
                                                maxLength={10}
                                                className="pl-10 h-11"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-mid">Enter 10-digit mobile number without leading 0 or code.</p>
                                </div>

                                <Button type="submit" disabled={isLoading} className="w-full h-11 text-base font-medium mt-6 group">
                                    {isLoading ? "Creating Account..." : "Create Account"}
                                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                                </Button>
                            </form>
                        ) : (
                            <div className="text-center py-4">
                                <Button
                                    variant="outline"
                                    className="border-blue text-blue hover:bg-blue-light"
                                    onClick={() => {
                                        setSuccessMessage(null);
                                        setError(null);
                                    }}
                                >
                                    Back to Log In
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}

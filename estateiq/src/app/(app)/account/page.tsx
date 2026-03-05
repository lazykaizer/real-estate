"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Heart,
  Settings,
  Home,
  Bell,
  Shield,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
  ChevronRight,
  Building2,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const MENU_ITEMS = [
  { icon: Heart, label: "Saved Homes", href: "/account/saved", description: "Properties you've bookmarked" },
  { icon: Home, label: "My Listings", href: "/sell", description: "Properties you've listed for sale" },
  { icon: Building2, label: "Browse Properties", href: "/buy", description: "Search for your dream home" },
  { icon: Key, label: "Rental Search", href: "/rent", description: "Find rental properties" },
];

export default function AccountPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<{
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    createdAt: string;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({ firstName: "", lastName: "", phone: "", city: "" });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Password change state
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const userData = {
          email: authUser.email || "",
          firstName: authUser.user_metadata?.firstName || "",
          lastName: authUser.user_metadata?.lastName || "",
          phone: authUser.user_metadata?.phone || "",
          city: authUser.user_metadata?.city || "",
          createdAt: authUser.created_at || "",
        };
        setUser(userData);
        setEditForm({
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          city: userData.city,
        });
      }
    };
    getUser();
  }, [supabase.auth]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setMessage(null);
    const { error } = await supabase.auth.updateUser({
      data: {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        phone: editForm.phone,
        city: editForm.city,
      },
    });
    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setUser((prev) =>
        prev
          ? { ...prev, firstName: editForm.firstName, lastName: editForm.lastName, phone: editForm.phone, city: editForm.city }
          : prev
      );
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);
    }
    setIsSaving(false);
  };

  const handleChangePassword = async () => {
    setMessage(null);
    if (!user) return;

    if (!passwordForm.currentPassword) {
      setMessage({ type: "error", text: "Please enter your current password." });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setMessage({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    setIsChangingPassword(true);

    // 1. Verify current password by attempting a sign-in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: passwordForm.currentPassword,
    });

    if (signInError) {
      setMessage({ type: "error", text: "Current password is incorrect." });
      setIsChangingPassword(false);
      return;
    }

    // 2. Update to new password
    const { error: updateError } = await supabase.auth.updateUser({ password: passwordForm.newPassword });

    if (updateError) {
      setMessage({ type: "error", text: updateError.message });
    } else {
      setMessage({ type: "success", text: "Password changed successfully!" });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }
    setIsChangingPassword(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (!user) {
    return (
      <div className="pt-20 lg:pt-24 min-h-screen bg-gray-light flex items-center justify-center">
        <div className="animate-pulse text-gray-mid">Loading profile...</div>
      </div>
    );
  }

  const userInitials = `${(user.firstName?.[0] || user.email[0] || "U").toUpperCase()}${(user.lastName?.[0] || "").toUpperCase()}`;
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  const fullName = user.firstName ? `${user.firstName} ${user.lastName}`.trim() : user.email.split("@")[0];
  const displayName = capitalize(fullName);
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : "";

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-gray-light">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {/* ── Message Banner ── */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between ${message.type === "success" ? "bg-green-light text-green" : "bg-red-50 text-red-600"
                }`}
            >
              {message.text}
              <button onClick={() => setMessage(null)}>
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {/* ── Profile Header Card ── */}
          <Card className="mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-navy to-blue h-28" />
            <CardContent className="relative pt-0 pb-6 -mt-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                <div className="h-20 w-20 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="h-full w-full rounded-full bg-blue flex items-center justify-center border-4 border-white">
                    <span className="text-3xl font-extrabold text-white">{userInitials}</span>
                  </div>
                </div>
                <div className="flex-1 pb-2">
                  <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-none tracking-tight">
                    {displayName}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm font-semibold text-slate-500">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> {user.email}
                    </span>
                    {user.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" /> {user.phone}
                      </span>
                    )}
                    {user.city && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {user.city}
                      </span>
                    )}
                    {memberSince && (
                      <span className="flex items-center gap-1.5 bg-blue/5 text-blue px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wider">
                        <Calendar className="h-3 w-3" /> Since {memberSince}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-slate-900 hover:bg-black text-white rounded-xl shadow-lg shadow-slate-200"
                  >
                    {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit3 className="h-4 w-4 mr-2" />}
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-white border shadow-sm w-full justify-start h-12">
              <TabsTrigger value="profile" className="data-[state=active]:bg-blue-light data-[state=active]:text-blue font-medium">
                <User className="h-4 w-4 mr-2" /> Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-blue-light data-[state=active]:text-blue font-medium">
                <Shield className="h-4 w-4 mr-2" /> Security
              </TabsTrigger>
              <TabsTrigger value="quicklinks" className="data-[state=active]:bg-blue-light data-[state=active]:text-blue font-medium">
                <Settings className="h-4 w-4 mr-2" /> Quick Links
              </TabsTrigger>
            </TabsList>

            {/* ═══ Profile Tab ═══ */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>First Name</Label>
                          <Input
                            value={editForm.firstName}
                            onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                            placeholder="First name"
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Last Name</Label>
                          <Input
                            value={editForm.lastName}
                            onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                            placeholder="Last name"
                            className="h-11"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Phone Number</Label>
                          <Input
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            placeholder="+91 9876543210"
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Input
                            value={editForm.city}
                            onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                            placeholder="Mumbai"
                            className="h-11"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input value={user.email} disabled className="h-11 bg-gray-50 text-gray-mid" />
                        <p className="text-xs text-gray-mid">Email cannot be changed.</p>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <Button
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          className="bg-blue hover:bg-blue/90 text-white"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-medium text-gray-mid uppercase tracking-wider mb-1">First Name</p>
                          <p className="text-base text-navy font-medium">{user.firstName || "—"}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-mid uppercase tracking-wider mb-1">Last Name</p>
                          <p className="text-base text-navy font-medium">{user.lastName || "—"}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-mid uppercase tracking-wider mb-1">Email</p>
                          <p className="text-base text-navy font-medium">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-mid uppercase tracking-wider mb-1">Phone</p>
                          <p className="text-base text-navy font-medium">{user.phone || "—"}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-mid uppercase tracking-wider mb-1">City</p>
                          <p className="text-base text-navy font-medium">{user.city || "—"}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-mid uppercase tracking-wider mb-1">Member Since</p>
                          <p className="text-base text-navy font-medium">{memberSince || "—"}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ═══ Security Tab ═══ */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="max-w-md space-y-4">
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <Input
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        placeholder="Enter current password"
                        className="h-11"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        placeholder="Enter new password"
                        className="h-11"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm New Password</Label>
                      <Input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        placeholder="Confirm new password"
                        className="h-11"
                        required
                      />
                    </div>
                    <Button
                      onClick={handleChangePassword}
                      disabled={isChangingPassword || !passwordForm.currentPassword || !passwordForm.newPassword}
                      className="bg-slate-900 hover:bg-black text-white w-full h-11"
                    >
                      {isChangingPassword ? "Verifying..." : "Update Password"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-navy">Log Out</p>
                      <p className="text-sm text-gray-mid">Sign out of your account on this device.</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="border-red-200 text-red-600 hover:bg-red-50">
                      <LogOut className="h-4 w-4 mr-2" /> Log Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ═══ Quick Links Tab ═══ */}
            <TabsContent value="quicklinks">
              <Card>
                <CardContent className="p-0">
                  {MENU_ITEMS.map((item, idx) => (
                    <div key={item.label}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-4 px-6 py-5 hover:bg-blue-light/50 transition-colors group"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue/10 text-blue group-hover:bg-blue group-hover:text-white transition-colors">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-semibold text-navy">{item.label}</span>
                          <p className="text-xs text-gray-mid">{item.description}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue transition-colors" />
                      </Link>
                      {idx < MENU_ITEMS.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

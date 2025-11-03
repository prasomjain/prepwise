"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signout", { method: "POST" });
      if (res.ok) {
        // redirect to sign-in page
        router.push("/sign-in");
      } else {
        console.error("Logout failed", await res.text());
        router.push("/sign-in");
      }
    } catch (err) {
      console.error("Logout error", err);
      router.push("/sign-in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      disabled={loading}
    >
      {loading ? "Signing out..." : "Logout"}
    </Button>
  );
}

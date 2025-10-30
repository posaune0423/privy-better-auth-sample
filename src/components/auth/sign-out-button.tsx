"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("サインアウトエラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleSignOut} variant="outline" disabled={isLoading}>
      {isLoading ? "ログアウト中..." : "ログアウト"}
    </Button>
  );
}

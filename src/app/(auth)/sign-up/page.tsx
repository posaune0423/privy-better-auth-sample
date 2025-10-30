import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">新規登録</CardTitle>
          <CardDescription>アカウントを作成して始めましょう</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            すでにアカウントをお持ちですか？{" "}
            <Link href="/sign-in" className="text-primary hover:underline font-medium">
              ログイン
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Calendar, Activity, Shield, Clock } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { user } = session;
  const createdDate = new Date(user.createdAt);
  const now = new Date();
  const daysSinceCreated = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-8 space-y-8 mx-auto">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            ようこそ、{user.name || "ユーザー"}さん！
          </h1>
          <p className="text-lg text-muted-foreground">
            ダッシュボードへようこそ。アカウント情報と最近のアクティビティを確認できます。
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">アカウント状態</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">アクティブ</div>
              <p className="text-xs text-muted-foreground mt-1">認証済み</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">登録日数</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{daysSinceCreated}日</div>
              <p className="text-xs text-muted-foreground mt-1">
                {createdDate.toLocaleDateString("ja-JP")}から
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">セッション</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground mt-1">アクティブなセッション</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">最終ログイン</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">今</div>
              <p className="text-xs text-muted-foreground mt-1">現在ログイン中</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card className="lg:col-span-2 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                ユーザー情報
              </CardTitle>
              <CardDescription>アカウントの詳細情報</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <User className="h-4 w-4" />
                    名前
                  </div>
                  <p className="text-lg font-medium">{user.name || "未設定"}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    メールアドレス
                  </div>
                  <p className="text-lg font-medium">{user.email}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    ユーザーID
                  </div>
                  <p className="text-sm font-mono bg-muted px-3 py-2 rounded-md">{user.id}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    登録日時
                  </div>
                  <p className="text-lg font-medium">
                    {new Date(user.createdAt).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full md:w-auto">
                  プロフィールを編集
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>クイックアクション</CardTitle>
              <CardDescription>よく使う機能</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" disabled>
                <User className="mr-2 h-4 w-4" />
                プロフィール編集
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <Shield className="mr-2 h-4 w-4" />
                セキュリティ設定
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <Mail className="mr-2 h-4 w-4" />
                メール設定
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <Activity className="mr-2 h-4 w-4" />
                アクティビティログ
              </Button>
              <p className="text-xs text-muted-foreground pt-2">
                ※ これらの機能は現在開発中です
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Session Info Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              セッション情報
            </CardTitle>
            <CardDescription>現在のセッションに関する詳細情報</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">セッションID</p>
                <p className="text-sm font-mono bg-muted px-3 py-2 rounded-md break-all">
                  {session.session.id}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">有効期限</p>
                <p className="text-lg font-medium">
                  {new Date(session.session.expiresAt).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack Card */}
        <Card className="border-2 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle>使用技術</CardTitle>
            <CardDescription>このアプリケーションで使用している技術スタック</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="font-semibold">Better Auth</p>
                <p className="text-sm text-muted-foreground">認証ライブラリ</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold">Next.js 16</p>
                <p className="text-sm text-muted-foreground">Reactフレームワーク</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold">Shadcn UI</p>
                <p className="text-sm text-muted-foreground">UIコンポーネント</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold">TypeScript</p>
                <p className="text-sm text-muted-foreground">型安全な開発</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

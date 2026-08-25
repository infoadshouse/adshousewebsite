import { Suspense } from "react";
import { LoginForm } from "@/components/marketplace/LoginForm";
import { getSessionUser } from "@/lib/auth";
import { createMetadata } from "@/lib/seo";
import { LogoutAndStay } from "@/components/marketplace/LogoutAndStay";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Sign in | Ads House Marketplace",
  description: "Sign in to Ads House Marketplace to manage your account, campaigns, and messages.",
  path: "/marketplace/login",
  noIndex: true,
});

export default async function LoginPage() {
  const user = await getSessionUser();

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-surface px-5 py-28 md:py-32">
      <div className="w-full max-w-md rounded-3xl border border-line bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky">Marketplace</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-sky-dark">Sign in</h1>
        {user ? (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-muted">
              You are already signed in as <span className="font-semibold text-sky-dark">{user.name}</span> ({user.role}
              ).
            </p>
            <a
              href="/dashboard"
              className="btn-primary inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
            >
              Go to dashboard
            </a>
            <LogoutAndStay />
          </div>
        ) : (
          <>
            <p className="mt-2 mb-8 text-sm text-muted">Sign in with your creator, business, or admin account.</p>
            <Suspense>
              <LoginForm />
            </Suspense>
          </>
        )}
      </div>
    </div>
  );
}

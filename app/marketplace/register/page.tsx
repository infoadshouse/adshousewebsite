import { redirect } from "next/navigation";
import { Suspense } from "react";
import { RegisterForm } from "@/components/marketplace/RegisterForm";
import { getSessionUser } from "@/lib/auth";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Join the marketplace",
  description: "Create a creator, business, or agency account on Ads House Marketplace.",
  path: "/marketplace/register",
  noIndex: true,
});

export default async function RegisterPage() {
  const user = await getSessionUser();
  if (user) redirect("/dashboard");

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-surface px-5 py-28 md:py-32">
      <div className="w-full max-w-lg rounded-3xl border border-line bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky">Marketplace</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-sky-dark">Create an account</h1>
        <p className="mt-2 mb-8 text-sm text-muted">Choose Creator or Business. You will manage your profile after sign in.</p>
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}

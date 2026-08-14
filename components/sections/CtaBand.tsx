import Image from "next/image";
import { InquiryForm } from "@/components/InquiryForm";

export function CtaBand({ withForm = true }: { withForm?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky via-[#1d4ed8] to-purple py-20 text-white md:py-28" id="start">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
              Start a project
            </p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
              Ready to turn attention into growth?
            </h2>
            <p className="mt-5 text-lg text-white/85">
              Tell us what you are building. We will figure out how to make it bigger.
            </p>
            <div className="img-zoom relative mt-8 hidden h-56 overflow-hidden rounded-[1.6rem] border border-white/20 lg:block">
              <Image
                src="/images/cta-studio.png"
                alt="Ads House studio with campaign LED wall"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>
          {withForm ? (
            <div className="rounded-[1.4rem] border border-white/20 bg-white p-4 text-[var(--text)] sm:p-6 md:p-10">
              <InquiryForm />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

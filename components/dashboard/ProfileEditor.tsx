"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/marketplace/client";
import { uploadMedia } from "@/lib/marketplace/upload";
import {
  AVAILABILITY,
  BUSINESS_CATEGORIES,
  CONTENT_TYPES,
  CREATOR_CATEGORIES,
  LANGUAGES,
  SOCIAL_PLATFORMS,
} from "@/lib/marketplace/constants";

type Role = "creator" | "business" | "agency" | "admin";

export function ProfileEditor({ role }: { role: Role }) {
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [pending, setPending] = useState(false);
  const [photo, setPhoto] = useState("");
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [ready, setReady] = useState(false);

  const endpoint =
    role === "creator"
      ? "/api/marketplace/profiles/influencer"
      : role === "business"
        ? "/api/marketplace/profiles/business"
        : "/api/marketplace/profiles/agency";

  useEffect(() => {
    api<{ profile: Record<string, unknown> }>(endpoint)
      .then((data) => {
      setForm(JSON.parse(JSON.stringify(data.profile)));
        setPhoto(String(data.profile.photo ?? ""));
        setReady(true);
      })
      .catch((err: Error) => setError(err.message));
  }, [endpoint]);

  async function upload(file: File) {
    const url = await uploadMedia(file);
    setPhoto(url);
    setForm((prev) => ({ ...prev, photo: url }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");
    setSaved(false);
    try {
      await api(endpoint, { method: "PATCH", json: { ...form, photo } });
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setPending(false);
    }
  }

  if (!ready && !error) return <p className="text-muted">Loading profile…</p>;

  return (
    <form onSubmit={save} className="space-y-6">
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase text-muted">Photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file).catch((err: Error) => setError(err.message));
          }}
        />
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="" className="mt-3 h-20 w-20 rounded-2xl object-cover" />
        ) : null}
      </label>

      {role === "creator" ? <CreatorFields form={form} setForm={setForm} /> : null}
      {role === "business" ? <BusinessFields form={form} setForm={setForm} /> : null}
      {role === "agency" || role === "admin" ? <AgencyFields form={form} setForm={setForm} /> : null}

      {error ? <p className="text-sm text-pink">{error}</p> : null}
      {saved ? <p className="text-sm text-sky">Saved.</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="btn-primary rounded-full px-6 py-3 text-sm font-semibold disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save profile"}
      </button>
    </form>
  );
}

function CreatorFields({
  form,
  setForm,
}: {
  form: Record<string, unknown>;
  setForm: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}) {
  const location = (form.location ?? {}) as Record<string, unknown>;
  const audience = (form.audienceLocation ?? {}) as Record<string, unknown>;
  const pricing = (form.pricing ?? {}) as Record<string, unknown>;
  const socials = (form.socialAccounts as Record<string, unknown>[]) ?? [
    { platform: "Instagram", handle: "", followers: 0, engagementRate: 0, avgViews: 0, avgLikes: 0, url: "" },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Text label="Display name" value={String(form.displayName ?? "")} onChange={(v) => setForm({ ...form, displayName: v })} />
        <Text label="Username" value={String(form.username ?? "")} onChange={(v) => setForm({ ...form, username: v })} />
      </div>
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase text-muted">Bio</span>
        <textarea
          className="min-h-28 w-full rounded-xl border border-line px-3 py-2"
          value={String(form.bio ?? "")}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />
      </label>
      <Multi label="Categories" options={[...CREATOR_CATEGORIES]} value={(form.categories as string[]) ?? []} onChange={(v) => setForm({ ...form, categories: v })} />
      <Multi label="Languages" options={[...LANGUAGES]} value={(form.languages as string[]) ?? []} onChange={(v) => setForm({ ...form, languages: v })} />
      <Multi label="Content types" options={[...CONTENT_TYPES]} value={(form.contentTypes as string[]) ?? []} onChange={(v) => setForm({ ...form, contentTypes: v })} />
      <LocationFields
        location={location}
        onChange={(next) => setForm({ ...form, location: next })}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Text label="Audience city" value={String(audience.city ?? "")} onChange={(v) => setForm({ ...form, audienceLocation: { ...audience, city: v } })} />
        <Text label="Audience note" value={String(audience.note ?? "")} onChange={(v) => setForm({ ...form, audienceLocation: { ...audience, note: v } })} />
        <Text
          label="Service radius (km)"
          value={String(form.serviceRadiusKm ?? 25)}
          onChange={(v) => setForm({ ...form, serviceRadiusKm: Number(v) || 0 })}
        />
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-semibold uppercase text-muted">Availability</span>
          <select
            className="w-full rounded-xl border border-line px-3 py-2"
            value={String(form.availability ?? "available")}
            onChange={(e) => setForm({ ...form, availability: e.target.value })}
          >
            {AVAILABILITY.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <Text label="Price min (₹)" value={String(pricing.min ?? "")} onChange={(v) => setForm({ ...form, pricing: { ...pricing, min: Number(v) || 0 } })} />
        <Text label="Price max (₹)" value={String(pricing.max ?? "")} onChange={(v) => setForm({ ...form, pricing: { ...pricing, max: Number(v) || 0 } })} />
      </div>
      <div className="space-y-3 rounded-2xl bg-surface p-4">
        <p className="text-xs font-semibold uppercase text-muted">Primary social</p>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block text-xs text-muted">Platform</span>
            <select
              className="w-full rounded-xl border border-line px-3 py-2"
              value={String(socials[0]?.platform ?? "Instagram")}
              onChange={(e) => {
                const next = [...socials];
                next[0] = { ...next[0], platform: e.target.value };
                setForm({ ...form, socialAccounts: next });
              }}
            >
              {SOCIAL_PLATFORMS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <Text
            label="Handle"
            value={String(socials[0]?.handle ?? "")}
            onChange={(v) => {
              const next = [...socials];
              next[0] = { ...next[0], handle: v };
              setForm({ ...form, socialAccounts: next });
            }}
          />
          <Text
            label="Followers"
            value={String(socials[0]?.followers ?? "")}
            onChange={(v) => {
              const next = [...socials];
              next[0] = { ...next[0], followers: Number(v) || 0 };
              setForm({ ...form, socialAccounts: next });
            }}
          />
          <Text
            label="Engagement %"
            value={String(socials[0]?.engagementRate ?? "")}
            onChange={(v) => {
              const next = [...socials];
              next[0] = { ...next[0], engagementRate: Number(v) || 0 };
              setForm({ ...form, socialAccounts: next });
            }}
          />
        </div>
      </div>
    </>
  );
}

function BusinessFields({
  form,
  setForm,
}: {
  form: Record<string, unknown>;
  setForm: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}) {
  const location = (form.location ?? {}) as Record<string, unknown>;
  return (
    <>
      <Text label="Business name" value={String(form.name ?? "")} onChange={(v) => setForm({ ...form, name: v })} />
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase text-muted">Category</span>
        <select
          className="w-full rounded-xl border border-line px-3 py-2"
          value={String(form.category ?? "")}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select</option>
          {BUSINESS_CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase text-muted">About</span>
        <textarea
          className="min-h-28 w-full rounded-xl border border-line px-3 py-2"
          value={String(form.about ?? "")}
          onChange={(e) => setForm({ ...form, about: e.target.value })}
        />
      </label>
      <Text label="Website" value={String(form.website ?? "")} onChange={(v) => setForm({ ...form, website: v })} />
      <LocationFields location={location} onChange={(next) => setForm({ ...form, location: next })} />
    </>
  );
}

function AgencyFields({
  form,
  setForm,
}: {
  form: Record<string, unknown>;
  setForm: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}) {
  const location = (form.location ?? {}) as Record<string, unknown>;
  return (
    <>
      <Text label="Agency name" value={String(form.name ?? "")} onChange={(v) => setForm({ ...form, name: v })} />
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase text-muted">About</span>
        <textarea
          className="min-h-28 w-full rounded-xl border border-line px-3 py-2"
          value={String(form.about ?? "")}
          onChange={(e) => setForm({ ...form, about: e.target.value })}
        />
      </label>
      <Text label="Website" value={String(form.website ?? "")} onChange={(v) => setForm({ ...form, website: v })} />
      <LocationFields location={location} onChange={(next) => setForm({ ...form, location: next })} />
    </>
  );
}

function LocationFields({
  location,
  onChange,
}: {
  location: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
}) {
  const geo = location.geo as { coordinates?: number[] } | undefined;
  const lng = geo?.coordinates?.[0] ?? "";
  const lat = geo?.coordinates?.[1] ?? "";
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Text label="City" value={String(location.city ?? "")} onChange={(v) => onChange({ ...location, city: v })} />
      <Text label="State" value={String(location.state ?? "")} onChange={(v) => onChange({ ...location, state: v })} />
      <Text label="District" value={String(location.district ?? "")} onChange={(v) => onChange({ ...location, district: v })} />
      <Text label="Locality" value={String(location.locality ?? "")} onChange={(v) => onChange({ ...location, locality: v })} />
      <Text
        label="Latitude"
        value={String(lat)}
        onChange={(v) => onChange({ ...location, lat: Number(v) || undefined, lng: lng || undefined })}
      />
      <Text
        label="Longitude"
        value={String(lng)}
        onChange={(v) => onChange({ ...location, lng: Number(v) || undefined, lat: lat || undefined })}
      />
    </div>
  );
}

function Text({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-semibold uppercase text-muted">{label}</span>
      <input className="w-full rounded-xl border border-line px-3 py-2" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Multi({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-semibold uppercase text-muted">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const on = value.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(on ? value.filter((v) => v !== option) : [...value, option])}
              className={`rounded-full px-3 py-1 text-xs ${on ? "bg-sky text-white" : "bg-surface text-sky-dark"}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

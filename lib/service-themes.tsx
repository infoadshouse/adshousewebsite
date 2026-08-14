import type { ReactNode } from "react";

export const serviceThemes: Record<string, { wrap: string; text: string; icon: ReactNode }> = {
  "brand-building": {
    wrap: "bg-[#f3e8ff] text-[#7c3aed]",
    text: "text-[#7c3aed]",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M4.2 16.2 13.4 3.8c.4-.6 1.3-.7 1.9-.2l.7.6c.6.5.7 1.4.2 2L7 16.8l-3.2.6.4-1.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12.2 5.4 15 7.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  "performance-marketing": {
    wrap: "bg-[#dbeafe] text-sky",
    text: "text-sky",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M3.5 16.5h13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M6 13.5v-4m4 4v-7m4 7v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  "marketing-strategy": {
    wrap: "bg-[#dcfce7] text-[#16a34a]",
    text: "text-[#16a34a]",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="10" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 2.4v2.2M10 15.4v2.2M2.4 10h2.2M15.4 10h2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  "web-development": {
    wrap: "bg-[#e0e7ff] text-[#4f46e5]",
    text: "text-[#4f46e5]",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M7.2 5.8 3.8 10l3.4 4.2M12.8 5.8 16.2 10l-3.4 4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "custom-software": {
    wrap: "bg-[#e0f2fe] text-[#0284c7]",
    text: "text-[#0284c7]",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect x="3.2" y="4.2" width="13.6" height="9.2" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 16.2h6M10 13.4v2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  "creative-content": {
    wrap: "bg-[#ffedd5] text-orange",
    text: "text-orange",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M5 15.6 13.6 4.8c.4-.5 1.2-.6 1.7-.2l.6.5c.5.4.6 1.2.2 1.7L7.4 16.6 4.6 17l.4-1.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14.8 3.4 16.6 5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  seo: {
    wrap: "bg-[#ccfbf1] text-[#0f766e]",
    text: "text-[#0f766e]",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="8.5" cy="8.5" r="5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12.2 12.2 16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
};

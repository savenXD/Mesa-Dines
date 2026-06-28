"use client";

import dynamic from "next/dynamic";

export const UpgradesSlider = dynamic(
  () => import("./UpgradesSlider"),
  { ssr: false }
);

export const FAQAccordion = dynamic(
  () => import("./FAQAccordion"),
  { ssr: false }
);

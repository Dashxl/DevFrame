import type { ReactNode } from "react";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: ReactNode;
};

export const SectionHeader = ({ index, label, title }: SectionHeaderProps) => (
  <div className="mb-8 md:mb-12">
    <p className="label mb-5">
      <span className="text-accent">{index}</span>
      <span className="mx-3 text-border">/</span>
      {label}
    </p>
    <h2 className="max-w-3xl display text-4xl leading-[1.1] md:text-5xl">{title}</h2>
  </div>
);

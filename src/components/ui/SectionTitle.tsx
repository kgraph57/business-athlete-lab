interface Props {
  readonly label?: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: "left" | "center";
}

export function SectionTitle({
  label,
  title,
  description,
  align = "left",
}: Props) {
  const alignClass =
    align === "center" ? "text-center items-center" : "items-start";

  return (
    <div className={`flex flex-col ${alignClass} mb-16`}>
      {label && <span className="text-label mb-4">{label}</span>}
      <h2 className="font-serif text-ink">{title}</h2>
      <div
        className="divider mt-6"
        style={align === "center" ? { margin: "24px auto" } : undefined}
      />
      {description && (
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-stone">
          {description}
        </p>
      )}
    </div>
  );
}

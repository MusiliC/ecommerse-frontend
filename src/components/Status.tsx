import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Tailwind class merging utility, optional

type StatusBadgeProps = {
  text: string;
  color: "green" | "red" | "yellow" | "blue" | "gray"; // add more as needed
  icon?: ReactNode;
};

const colorVariants: Record<
  StatusBadgeProps["color"],
  { bg: string; text: string }
> = {
  green: { bg: "bg-green-100", text: "text-green-800" },
  red: { bg: "bg-red-100", text: "text-red-700" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-800" },
  blue: { bg: "bg-blue-100", text: "text-blue-800" },
  gray: { bg: "bg-gray-100", text: "text-gray-700" },
};

export function StatusBadge({ text, color, icon }: StatusBadgeProps) {
  const { bg, text: textColor } = colorVariants[color];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold",
        bg,
        textColor
      )}
    >
      {icon && <span className="text-base">{icon}</span>}
      <span>{text}</span>
    </div>
  );
}

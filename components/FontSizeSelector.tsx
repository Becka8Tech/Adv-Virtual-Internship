// components/FontSizeSelector.tsx
import { usePathname } from "next/navigation";
import styles from "@/styles/FontSizeSelector.module.css";
import { Dispatch, SetStateAction } from "react";

interface FontSizeSelectorProps {
  fontSize: number;
  setFontSize: Dispatch<SetStateAction<number>>;
}

export default function FontSizeSelector({
  fontSize,
  setFontSize,
}: FontSizeSelectorProps) {
  const pathname = usePathname();

  // Only render if on player/[id] route
  const isPlayerPage = /^\/player\/[^/]+$/.test(pathname || "");

  if (!isPlayerPage) return null;

  return (
    <div className={styles.fontSizeSelector}>
      {[16, 18, 22, 26].map((size) => (
        <button
          key={size}
          className={`${styles.fontSizeOption} ${
            fontSize === size ? styles.activeFontSize : ""
          }`}
          onClick={() => setFontSize(size)}
          style={{ fontSize: `${size}px` }}
        >
          Aa
        </button>
      ))}
    </div>
  );
}

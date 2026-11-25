"use client";

import { useTheme } from "next-themes";
import { GlyphMatrix } from "@/components/ui/glyph-matrix";

export function AnimatedBackground() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  // Crisp Matrix emerald green in both Light Mode & Dark Mode (single lightweight canvas, zero lag)
  const glyphColor = isDark ? "#22c55e" : "#15803d";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
      <div className={isDark ? "absolute inset-0 opacity-[0.26]" : "absolute inset-0 opacity-[0.50]"}>
        <GlyphMatrix
          glyphs="01·•+*/\<>={}[]#@&%$!?~^_|;:ΣΩπλδ"
          cellSize={22}
          mutationRate={0.03}
          interval={180}
          fadeBottom={0}
          color={glyphColor}
        />
      </div>
    </div>
  );
}

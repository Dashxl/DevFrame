import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Sandro Ramírez — Full Stack & Mobile Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same palette as the site (light theme)
const BG = "#faf8f3";
const INK = "#1d1b22";
const MUTED = "#6b6872";
const ACCENT = "#6a40b0";
const BORDER = "#e4e0d8";

const asset = (...parts: string[]) => readFile(join(process.cwd(), "assets", ...parts));

export default async function Image() {
  const [regular, medium, mediumItalic, photo] = await Promise.all([
    asset("fonts", "DMSans-Regular.ttf"),
    asset("fonts", "DMSans-Medium.ttf"),
    asset("fonts", "DMSans-MediumItalic.ttf"),
    asset("og-photo.jpg"),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  const headline = { fontSize: 104, fontWeight: 500, lineHeight: 1.04, letterSpacing: "-0.035em", color: INK } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: BG,
          padding: "64px 84px",
          fontFamily: "DM Sans",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 14, height: 14, borderRadius: 14, background: ACCENT }} />
            <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "0.14em", color: MUTED }}>
              OPEN TO NEW OPPORTUNITIES
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ ...headline, display: "flex" }}>Full Stack</div>
            <div style={{ ...headline, display: "flex" }}>
              and&nbsp;
              <span style={{ color: ACCENT, fontStyle: "italic" }}>Mobile</span>
            </div>
            <div style={{ ...headline, display: "flex" }}>Developer.</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 34, fontWeight: 500, color: INK }}>Sandro Ramírez</div>
            <div style={{ fontSize: 26, fontWeight: 400, color: MUTED }}>Flutter · Next.js · Node.js</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: 380,
            height: 380,
            borderRadius: 380,
            overflow: "hidden",
            border: `2px solid ${BORDER}`,
          }}
        >
          <img src={photoSrc} alt="" width={380} height={380} style={{ width: 380, height: 380, objectFit: "cover" }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "DM Sans", data: regular, weight: 400, style: "normal" },
        { name: "DM Sans", data: medium, weight: 500, style: "normal" },
        { name: "DM Sans", data: mediumItalic, weight: 500, style: "italic" },
      ],
    },
  );
}

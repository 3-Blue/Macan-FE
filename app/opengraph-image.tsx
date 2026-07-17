import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MACAN";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "white",
          fontSize: 72,
          fontWeight: 700,
        }}
      >
        MACAN
      </div>
    ),
    { ...size }
  );
}
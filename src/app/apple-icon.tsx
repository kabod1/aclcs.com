import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#07102B",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#29ABE2",
            fontSize: "110px",
            fontWeight: "900",
            lineHeight: 1,
            fontFamily: "serif",
            letterSpacing: "-6px",
          }}
        >
          AC
        </span>
      </div>
    ),
    { ...size }
  );
}

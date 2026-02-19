import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export function GET(req: NextRequest) {
  const size = parseInt(req.nextUrl.searchParams.get("size") || "192");
  const fontSize = Math.round(size * 0.58);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f172a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#f97316",
            fontSize: `${fontSize}px`,
            fontWeight: "bold",
            lineHeight: 1,
          }}
        >
          A
        </span>
      </div>
    ),
    { width: size, height: size }
  );
}

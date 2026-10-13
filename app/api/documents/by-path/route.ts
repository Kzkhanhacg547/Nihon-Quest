import path from "node:path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serveCatalogedFile } from "@/lib/document-file-server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawPath = (searchParams.get("path") || "").trim();
    if (!rawPath || rawPath.includes("..")) {
      return NextResponse.json({ error: "Đường dẫn không hợp lệ." }, { status: 400 });
    }

    const normNfc = rawPath.replace(/\\/g, "/").normalize("NFC");
    const normNfd = rawPath.replace(/\\/g, "/").normalize("NFD");

    const doc = await prisma.documentResource.findFirst({
      where: {
        OR: [
          { relativePath: rawPath },
          { relativePath: normNfc },
          { relativePath: normNfd },
          { fileName: path.basename(rawPath) },
        ],
      },
    });

    if (doc) {
      return serveCatalogedFile(req, doc);
    }

    return NextResponse.json(
      { error: "Tài liệu chưa được lập danh mục trong hệ thống." },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error in GET /api/documents/by-path:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi phát tệp âm thanh/tài liệu." },
      { status: 500 }
    );
  }
}


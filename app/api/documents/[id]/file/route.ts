import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serveCatalogedFile } from "@/lib/document-file-server";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const idOrSlug = decodeURIComponent(params.id || "");
    if (!idOrSlug) {
      return NextResponse.json({ error: "Thiếu mã tài liệu." }, { status: 400 });
    }

    const doc = await prisma.documentResource.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
    });

    if (!doc) {
      return NextResponse.json(
        { error: "Tài liệu không tồn tại trong danh mục Kho tài liệu." },
        { status: 404 }
      );
    }

    return serveCatalogedFile(req, doc);
  } catch (error) {
    console.error("Error in GET /api/documents/[id]/file:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ khi truy xuất tài liệu." },
      { status: 500 }
    );
  }
}


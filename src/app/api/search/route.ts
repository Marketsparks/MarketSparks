import { NextRequest, NextResponse } from "next/server";

import {
  searchProductsService,
} from "@/services/search.service";

export async function GET(
  request: NextRequest
) {
  try {
    const {
      searchParams,
    } = new URL(request.url);

    const query =
      searchParams
        .get("q")
        ?.trim() ?? "";

    if (!query) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const products =
      await searchProductsService(
        query
      );

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Search failed.",
      },
      {
        status: 500,
      }
    );
  }
}
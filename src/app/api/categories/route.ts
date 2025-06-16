import { NextRequest, NextResponse } from "next/server";
import { getAllCategories, createCategory } from "@/lib/models/category";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/categories - Get all categories
export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.slug) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if name is an object with locale keys
    if (typeof data.name !== "object") {
      return NextResponse.json(
        { error: "Name must be an object with locale keys" },
        { status: 400 }
      );
    }

    // Check if description is provided and is an object with locale keys
    if (data.description && typeof data.description !== "object") {
      return NextResponse.json(
        { error: "Description must be an object with locale keys" },
        { status: 400 }
      );
    }

    // Set category data
    const categoryData = {
      name: data.name,
      description: data.description || { en: "", ar: "" },
      slug: data.slug,
    };

    // Create category
    const category = await createCategory(categoryData);

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

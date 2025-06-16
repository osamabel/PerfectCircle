import { NextRequest, NextResponse } from "next/server";
import {
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "@/lib/models/category";
import { query } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/categories/[id] - Get a specific category
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const category = await getCategoryById(id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

// PUT /api/categories/[id] - Update a category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
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

    // Check if category exists
    const existingCategory = await getCategoryById(id);
    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Set category data
    const categoryData = {
      name: data.name,
      description: data.description || { en: "", ar: "" },
      slug: data.slug,
    };

    // Update category
    const updatedCategory = await updateCategory(id, categoryData);

    if (!updatedCategory) {
      return NextResponse.json(
        { error: "Failed to update category" },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id] - Delete a category
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if category exists
    const existingCategory = await getCategoryById(id);
    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Check if category is being used by any projects
    const projectsUsingCategory = await query(
      "SELECT COUNT(*) as count, array_agg(title) as project_titles FROM projects WHERE category_id = $1",
      [id]
    );

    const projectCount = parseInt(projectsUsingCategory.rows[0].count);

    if (projectCount > 0) {
      const projectTitles = projectsUsingCategory.rows[0].project_titles;
      const titlesList = projectTitles
        .map((title: any) => {
          // Parse the JSONB title and get English title
          const parsedTitle =
            typeof title === "string" ? JSON.parse(title) : title;
          return parsedTitle.en || "Untitled Project";
        })
        .slice(0, 3) // Show only first 3 projects
        .join(", ");

      const moreProjectsText =
        projectCount > 3 ? ` and ${projectCount - 3} more` : "";

      return NextResponse.json(
        {
          error: `This category is currently being used by ${projectCount} project${projectCount > 1 ? "s" : ""}: ${titlesList}${moreProjectsText}. Please remove or reassign these projects before deleting the category.`,
        },
        { status: 400 }
      );
    }

    // Delete category
    const deletedCategory = await deleteCategory(id);

    if (!deletedCategory) {
      return NextResponse.json(
        { error: "Failed to delete category" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}

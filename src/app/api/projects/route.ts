// src/app/api/projects/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getAllProjectsWithCategories,
  createProject,
} from "@/lib/models/project";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/projects - Get all projects with categories
export async function GET() {
  try {
    const projects = await getAllProjectsWithCategories();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.slug || !data.description || !data.content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if title and descriptions are objects with locale keys
    if (
      typeof data.title !== "object" ||
      typeof data.description !== "object" ||
      typeof data.content !== "object"
    ) {
      return NextResponse.json(
        {
          error:
            "Title, description, and content must be objects with locale keys",
        },
        { status: 400 }
      );
    }

    // Set defaults for optional fields
    const projectData = {
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      featured_image: data.featured_image || "",
      client: data.client || "",
      category_id: data.category_id || "",
      status: data.status || "draft",
      published_at: data.status === "published" ? new Date() : null,
    };

    // Create project
    const project = await createProject(projectData);

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

import { query } from "../db";

export interface Category {
  id: string;
  name: Record<string, string>; // Localized names (e.g., {en: 'Web Development', ar: 'تطوير الويب'})
  description: Record<string, string>; // Localized descriptions (e.g., {en: 'Description', ar: 'الوصف'})
  slug: string;
  created_at: Date;
  updated_at: Date;
}

export async function getAllCategories() {
  const result = await query(
    "SELECT * FROM categories ORDER BY created_at ASC"
  );
  return result.rows as Category[];
}

export async function getCategoryById(id: string) {
  const result = await query("SELECT * FROM categories WHERE id = $1", [id]);
  return result.rows[0] as Category | undefined;
}

export async function getCategoryBySlug(slug: string) {
  const result = await query("SELECT * FROM categories WHERE slug = $1", [
    slug,
  ]);
  return result.rows[0] as Category | undefined;
}

export async function createCategory(
  category: Omit<Category, "id" | "created_at" | "updated_at">
) {
  const result = await query(
    `INSERT INTO categories (name, description, slug) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [
      JSON.stringify(category.name),
      JSON.stringify(category.description),
      category.slug,
    ]
  );
  return result.rows[0] as Category;
}

export async function updateCategory(
  id: string,
  category: Partial<Omit<Category, "id" | "created_at" | "updated_at">>
) {
  // Build update query dynamically based on provided fields
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  if (category.name !== undefined) {
    updates.push(`name = $${paramCount}`);
    values.push(JSON.stringify(category.name));
    paramCount++;
  }

  if (category.description !== undefined) {
    updates.push(`description = $${paramCount}`);
    values.push(JSON.stringify(category.description));
    paramCount++;
  }

  if (category.slug !== undefined) {
    updates.push(`slug = $${paramCount}`);
    values.push(category.slug);
    paramCount++;
  }

  // Add updated_at timestamp
  updates.push(`updated_at = NOW()`);

  // Add id as the last parameter
  values.push(id);

  const result = await query(
    `UPDATE categories SET ${updates.join(", ")} WHERE id = $${paramCount} RETURNING *`,
    values
  );

  return result.rows[0] as Category | undefined;
}

export async function deleteCategory(id: string) {
  const result = await query(
    "DELETE FROM categories WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0] as Category | undefined;
}

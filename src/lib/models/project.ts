// src/lib/models/project.ts
import { query } from '../db';

export interface Project {
  id: string;
  title: Record<string, string>; // Localized titles (e.g., {en: 'Web Design', ar: 'تصميم الويب'})
  slug: string;
  description: Record<string, string>; // Localized short descriptions
  content: Record<string, string>; // Localized full content
  featured_image: string;
  client: string;
  category: string;
  status: string;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export async function getAllProjects() {
  const result = await query('SELECT * FROM projects ORDER BY created_at DESC');
  return result.rows as Project[];
}

export async function getPublishedProjects() {
  const result = await query(
    'SELECT * FROM projects WHERE status = $1 ORDER BY created_at DESC', 
    ['published']
  );
  return result.rows as Project[];
}

export async function getProjectById(id: string) {
  const result = await query('SELECT * FROM projects WHERE id = $1', [id]);
  return result.rows[0] as Project | undefined;
}

export async function getProjectBySlug(slug: string) {
  const result = await query('SELECT * FROM projects WHERE slug = $1', [slug]);
  return result.rows[0] as Project | undefined;
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  const result = await query(
    `INSERT INTO projects (
      title, 
      slug, 
      description, 
      content, 
      featured_image, 
      client, 
      category, 
      status, 
      published_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [
      JSON.stringify(project.title),
      project.slug,
      JSON.stringify(project.description),
      JSON.stringify(project.content),
      project.featured_image,
      project.client,
      project.category,
      project.status,
      project.published_at
    ]
  );
  return result.rows[0] as Project;
}

export async function updateProject(
  id: string, 
  project: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>
) {
  // Build update query dynamically based on provided fields
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;
  
  if (project.title !== undefined) {
    updates.push(`title = $${paramCount}`);
    values.push(JSON.stringify(project.title));
    paramCount++;
  }
  
  if (project.slug !== undefined) {
    updates.push(`slug = $${paramCount}`);
    values.push(project.slug);
    paramCount++;
  }
  
  if (project.description !== undefined) {
    updates.push(`description = $${paramCount}`);
    values.push(JSON.stringify(project.description));
    paramCount++;
  }
  
  if (project.content !== undefined) {
    updates.push(`content = $${paramCount}`);
    values.push(JSON.stringify(project.content));
    paramCount++;
  }
  
  if (project.featured_image !== undefined) {
    updates.push(`featured_image = $${paramCount}`);
    values.push(project.featured_image);
    paramCount++;
  }
  
  if (project.client !== undefined) {
    updates.push(`client = $${paramCount}`);
    values.push(project.client);
    paramCount++;
  }
  
  if (project.category !== undefined) {
    updates.push(`category = $${paramCount}`);
    values.push(project.category);
    paramCount++;
  }
  
  if (project.status !== undefined) {
    updates.push(`status = $${paramCount}`);
    values.push(project.status);
    paramCount++;
  }
  
  if (project.published_at !== undefined) {
    updates.push(`published_at = $${paramCount}`);
    values.push(project.published_at);
    paramCount++;
  }
  
  // Add updated_at timestamp
  updates.push(`updated_at = NOW()`);
  
  // Add id as the last parameter
  values.push(id);
  
  const result = await query(
    `UPDATE projects SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  );
  
  return result.rows[0] as Project | undefined;
}

export async function deleteProject(id: string) {
  const result = await query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
  return result.rows[0] as Project | undefined;
}

export async function publishProject(id: string) {
  const result = await query(
    'UPDATE projects SET status = $1, published_at = NOW() WHERE id = $2 RETURNING *',
    ['published', id]
  );
  return result.rows[0] as Project | undefined;
}

export async function unpublishProject(id: string) {
  const result = await query(
    'UPDATE projects SET status = $1 WHERE id = $2 RETURNING *',
    ['draft', id]
  );
  return result.rows[0] as Project | undefined;
}
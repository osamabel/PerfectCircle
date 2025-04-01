// src/lib/models/service.ts
import { query } from '../db';

export interface Service {
  id: string;
  title: Record<string, string>; // Localized titles (e.g., {en: 'Web Design', ar: 'تصميم الويب'})
  slug: string;
  short_description: Record<string, string>; // Localized short descriptions
  description: Record<string, string>; // Localized full descriptions
  icon: string; // Icon name (e.g., 'Globe', 'Layers')
  created_at: Date;
  updated_at: Date;
}

export async function getAllServices() {
  const result = await query('SELECT * FROM services ORDER BY created_at DESC');
  return result.rows as Service[];
}

export async function getServiceById(id: string) {
  const result = await query('SELECT * FROM services WHERE id = $1', [id]);
  return result.rows[0] as Service | undefined;
}

export async function getServiceBySlug(slug: string) {
  const result = await query('SELECT * FROM services WHERE slug = $1', [slug]);
  return result.rows[0] as Service | undefined;
}

export async function createService(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>) {
  const result = await query(
    `INSERT INTO services (title, slug, short_description, description, icon) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [
      JSON.stringify(service.title),
      service.slug,
      JSON.stringify(service.short_description),
      JSON.stringify(service.description),
      service.icon
    ]
  );
  return result.rows[0] as Service;
}

export async function updateService(
  id: string, 
  service: Partial<Omit<Service, 'id' | 'created_at' | 'updated_at'>>
) {
  // Build update query dynamically based on provided fields
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;
  
  if (service.title !== undefined) {
    updates.push(`title = $${paramCount}`);
    values.push(JSON.stringify(service.title));
    paramCount++;
  }
  
  if (service.slug !== undefined) {
    updates.push(`slug = $${paramCount}`);
    values.push(service.slug);
    paramCount++;
  }
  
  if (service.short_description !== undefined) {
    updates.push(`short_description = $${paramCount}`);
    values.push(JSON.stringify(service.short_description));
    paramCount++;
  }
  
  if (service.description !== undefined) {
    updates.push(`description = $${paramCount}`);
    values.push(JSON.stringify(service.description));
    paramCount++;
  }
  
  if (service.icon !== undefined) {
    updates.push(`icon = $${paramCount}`);
    values.push(service.icon);
    paramCount++;
  }
  
  // Add updated_at timestamp
  updates.push(`updated_at = NOW()`);
  
  // Add id as the last parameter
  values.push(id);
  
  const result = await query(
    `UPDATE services SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  );
  
  return result.rows[0] as Service | undefined;
}

export async function deleteService(id: string) {
  const result = await query('DELETE FROM services WHERE id = $1 RETURNING *', [id]);
  return result.rows[0] as Service | undefined;
}
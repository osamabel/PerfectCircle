import { query } from '../db';

export interface BlogPost {
  id: string;
  title: Record<string, string>; // Localized titles (e.g., {en: 'Blog Post Title', ar: 'عنوان المقال'})
  slug: string;
  excerpt: Record<string, string>; // Localized excerpts
  content: Record<string, string>; // Localized full content
  featured_image: string;
  author_id: string;
  status: string;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface Author {
  id: string;
  name: string;
  email: string;
  role: string;
}

export async function getAllBlogPosts() {
  const result = await query(`
    SELECT b.*, u.name as author_name, u.email as author_email, u.role as author_role 
    FROM blog_posts b
    LEFT JOIN users u ON b.author_id = u.id
    ORDER BY b.created_at DESC
  `);
  
  return result.rows.map(row => ({
    ...row,
    author: {
      id: row.author_id,
      name: row.author_name,
      email: row.author_email,
      role: row.author_role
    }
  }));
}

export async function getPublishedBlogPosts() {
  const result = await query(`
    SELECT b.*, u.name as author_name, u.email as author_email, u.role as author_role 
    FROM blog_posts b
    LEFT JOIN users u ON b.author_id = u.id
    WHERE b.status = $1
    ORDER BY b.published_at DESC
  `, ['published']);
  
  return result.rows.map(row => ({
    ...row,
    author: {
      id: row.author_id,
      name: row.author_name,
      email: row.author_email,
      role: row.author_role
    }
  }));
}

export async function getBlogPostById(id: string) {
  const result = await query(`
    SELECT b.*, u.name as author_name, u.email as author_email, u.role as author_role 
    FROM blog_posts b
    LEFT JOIN users u ON b.author_id = u.id
    WHERE b.id = $1
  `, [id]);
  
  if (result.rows.length === 0) {
    return undefined;
  }
  
  const row = result.rows[0];
  return {
    ...row,
    author: {
      id: row.author_id,
      name: row.author_name,
      email: row.author_email,
      role: row.author_role
    }
  };
}

export async function getBlogPostBySlug(slug: string) {
  const result = await query(`
    SELECT b.*, u.name as author_name, u.email as author_email, u.role as author_role 
    FROM blog_posts b
    LEFT JOIN users u ON b.author_id = u.id
    WHERE b.slug = $1
  `, [slug]);
  
  if (result.rows.length === 0) {
    return undefined;
  }
  
  const row = result.rows[0];
  return {
    ...row,
    author: {
      id: row.author_id,
      name: row.author_name,
      email: row.author_email,
      role: row.author_role
    }
  };
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
  const result = await query(
    `INSERT INTO blog_posts (
      title,
      slug,
      excerpt,
      content,
      featured_image,
      author_id,
      status,
      published_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
    RETURNING *`,
    [
      JSON.stringify(post.title),
      post.slug,
      JSON.stringify(post.excerpt),
      JSON.stringify(post.content),
      post.featured_image,
      post.author_id,
      post.status,
      post.published_at
    ]
  );
  
  return result.rows[0];
}

export async function updateBlogPost(
  id: string, 
  post: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>
) {
  // Build update query dynamically based on provided fields
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;
  
  if (post.title !== undefined) {
    updates.push(`title = $${paramCount}`);
    values.push(JSON.stringify(post.title));
    paramCount++;
  }
  
  if (post.slug !== undefined) {
    updates.push(`slug = $${paramCount}`);
    values.push(post.slug);
    paramCount++;
  }
  
  if (post.excerpt !== undefined) {
    updates.push(`excerpt = $${paramCount}`);
    values.push(JSON.stringify(post.excerpt));
    paramCount++;
  }
  
  if (post.content !== undefined) {
    updates.push(`content = $${paramCount}`);
    values.push(JSON.stringify(post.content));
    paramCount++;
  }
  
  if (post.featured_image !== undefined) {
    updates.push(`featured_image = $${paramCount}`);
    values.push(post.featured_image);
    paramCount++;
  }
  
  if (post.author_id !== undefined) {
    updates.push(`author_id = $${paramCount}`);
    values.push(post.author_id);
    paramCount++;
  }
  
  if (post.status !== undefined) {
    updates.push(`status = $${paramCount}`);
    values.push(post.status);
    paramCount++;
  }
  
  if (post.published_at !== undefined) {
    updates.push(`published_at = $${paramCount}`);
    values.push(post.published_at);
    paramCount++;
  }
  
  // Add updated_at timestamp
  updates.push(`updated_at = NOW()`);
  
  // Add id as the last parameter
  values.push(id);
  
  const result = await query(
    `UPDATE blog_posts SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  );
  
  return result.rows[0];
}

export async function deleteBlogPost(id: string) {
  const result = await query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

export async function publishBlogPost(id: string) {
  const result = await query(
    'UPDATE blog_posts SET status = $1, published_at = NOW() WHERE id = $2 RETURNING *',
    ['published', id]
  );
  return result.rows[0];
}

export async function unpublishBlogPost(id: string) {
  const result = await query(
    'UPDATE blog_posts SET status = $1 WHERE id = $2 RETURNING *',
    ['draft', id]
  );
  return result.rows[0];
}

export async function getAllAuthors() {
  const result = await query('SELECT id, name, email, role FROM users');
  return result.rows;
}
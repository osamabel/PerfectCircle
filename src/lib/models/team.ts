import { query } from '../db';

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  social_links: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  created_at: Date;
  updated_at: Date;
}

export async function getAllTeamMembers() {
  const result = await query('SELECT * FROM team_members ORDER BY created_at DESC');
  return result.rows as TeamMember[];
}

export async function getTeamMemberById(id: string) {
  const result = await query('SELECT * FROM team_members WHERE id = $1', [id]);
  return result.rows[0] as TeamMember | undefined;
}

export async function createTeamMember(member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>) {
  const result = await query(
    `INSERT INTO team_members (name, position, image, social_links) 
     VALUES ($1, $2, $3, $4) 
     RETURNING *`,
    [member.name, member.position, member.image, JSON.stringify(member.social_links)]
  );
  return result.rows[0] as TeamMember;
}

export async function updateTeamMember(
  id: string, 
  member: Partial<Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>>
) {
  // Build update query dynamically based on provided fields
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;
  
  if (member.name !== undefined) {
    updates.push(`name = $${paramCount}`);
    values.push(member.name);
    paramCount++;
  }
  
  if (member.position !== undefined) {
    updates.push(`position = $${paramCount}`);
    values.push(member.position);
    paramCount++;
  }
  
  if (member.image !== undefined) {
    updates.push(`image = $${paramCount}`);
    values.push(member.image);
    paramCount++;
  }
  
  if (member.social_links !== undefined) {
    updates.push(`social_links = $${paramCount}`);
    values.push(JSON.stringify(member.social_links));
    paramCount++;
  }
  
  // Add updated_at timestamp
  updates.push(`updated_at = NOW()`);
  
  // Add id as the last parameter
  values.push(id);
  
  const result = await query(
    `UPDATE team_members SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  );
  
  return result.rows[0] as TeamMember | undefined;
}

export async function deleteTeamMember(id: string) {
  const result = await query('DELETE FROM team_members WHERE id = $1 RETURNING *', [id]);
  return result.rows[0] as TeamMember | undefined;
}
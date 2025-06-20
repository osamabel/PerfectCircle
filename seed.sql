-- Create admin user (password: Admin123!)
-- Note: In a real application, you should use a proper password hashing mechanism
-- This is just for demonstration purposes
INSERT INTO users (name, email, password, role)
VALUES (
  'Admin User',
  'admin@dawood.com',
  '$2a$10$t27OpVXW9RP4eHmHkbQu4uwZGWNwCF9h.dQiZuKfSPxodmwyq/EYi', -- hashed 'q2I$0yw643]'
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- Insert default categories
INSERT INTO categories (name, slug) VALUES
  ('{"en": "Web Development", "ar": "تطوير الويب"}', 'web-development'),
  ('{"en": "Mobile App", "ar": "تطبيق جوال"}', 'mobile-app'),
  ('{"en": "UI/UX Design", "ar": "تصميم واجهة المستخدم"}', 'ui-ux-design'),
  ('{"en": "E-commerce", "ar": "التجارة الإلكترونية"}', 'e-commerce'),
  ('{"en": "Digital Marketing", "ar": "التسويق الرقمي"}', 'digital-marketing'),
  ('{"en": "Branding", "ar": "العلامة التجارية"}', 'branding'),
  ('{"en": "SEO", "ar": "تحسين محركات البحث"}', 'seo')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample team members
INSERT INTO team_members (name, position, image, social_links)
VALUES
  (
    'Oscar Andrews',
    'Founder',
    'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/11.jpg',
    '{"facebook": "https://facebook.com", "twitter": "https://twitter.com", "linkedin": "https://linkedin.com"}'
  ),
  (
    'Jamie Williams',
    'Co-Founder',
    'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/6.jpg',
    '{"facebook": "https://facebook.com", "twitter": "https://twitter.com", "linkedin": "https://linkedin.com"}'
  ),
  (
    'Bethany Brooks',
    'Business Manager',
    'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/13.jpg',
    '{"facebook": "https://facebook.com", "twitter": "https://twitter.com", "linkedin": "https://linkedin.com"}'
  ),
  (
    'Mason Lawson',
    'Marketing Manager',
    'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/9.jpg',
    '{"facebook": "https://facebook.com", "twitter": "https://twitter.com", "linkedin": "https://linkedin.com"}'
  )
ON CONFLICT DO NOTHING;

-- Seed initial services data
INSERT INTO services (title, slug, short_description, description, icon) VALUES
(
  '{"en": "Web Design", "ar": "تصميم الويب"}',
  'web-design',
  '{"en": "Habitant risus facilisis vitae curabitur hac nullam.", "ar": "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى."}',
  '{"en": "Netus condimentum erat vestibulum sollicitudin sem tempor lacinia. Torquent fringilla facilisi placerat magna pellentesque facilisis nisi faucibus.", "ar": "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات."}',
  'Globe'
),
(
  '{"en": "Web Development", "ar": "تطوير الويب"}',
  'web-development',
  '{"en": "Habitant risus facilisis vitae curabitur hac nullam.", "ar": "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى."}',
  '{"en": "Netus condimentum erat vestibulum sollicitudin sem tempor lacinia. Torquent fringilla facilisi placerat magna pellentesque facilisis nisi faucibus.", "ar": "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات."}',
  'Layers'
),
(
  '{"en": "Digital Marketing", "ar": "التسويق الرقمي"}',
  'digital-marketing',
  '{"en": "Habitant risus facilisis vitae curabitur hac nullam.", "ar": "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى."}',
  '{"en": "Netus condimentum erat vestibulum sollicitudin sem tempor lacinia. Torquent fringilla facilisi placerat magna pellentesque facilisis nisi faucibus.", "ar": "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات."}',
  'TrendingUp'
),
(
  '{"en": "Visual Identity", "ar": "الهوية البصرية"}',
  'visual-identity',
  '{"en": "Habitant risus facilisis vitae curabitur hac nullam.", "ar": "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى."}',
  '{"en": "Netus condimentum erat vestibulum sollicitudin sem tempor lacinia. Torquent fringilla facilisi placerat magna pellentesque facilisis nisi faucibus.", "ar": "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات."}',
  'Puzzle'
),
(
  '{"en": "Consultation", "ar": "الاستشارات"}',
  'consultation',
  '{"en": "Habitant risus facilisis vitae curabitur hac nullam.", "ar": "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى."}',
  '{"en": "Netus condimentum erat vestibulum sollicitudin sem tempor lacinia. Torquent fringilla facilisi placerat magna pellentesque facilisis nisi faucibus.", "ar": "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات."}',
  'MessageCircle'
),
(
  '{"en": "Web Maintenance", "ar": "صيانة الويب"}',
  'web-maintenance',
  '{"en": "Habitant risus facilisis vitae curabitur hac nullam.", "ar": "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى."}',
  '{"en": "Netus condimentum erat vestibulum sollicitudin sem tempor lacinia. Torquent fringilla facilisi placerat magna pellentesque facilisis nisi faucibus.", "ar": "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات."}',
  'Settings'
)
ON CONFLICT (slug) DO NOTHING;
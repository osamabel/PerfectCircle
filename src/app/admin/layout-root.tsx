// src/app/admin/layout-root.tsx
export default function AdminRootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    );
  }
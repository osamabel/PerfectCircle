// src/app/admin/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import {
  Menu,
  X,
  Users,
  LogOut,
  Home,
  Layout,
  FileText,
  Settings,
  SquareMenu,
  FolderOpen,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If path is /admin/login, don't show the layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Check if the user is not authenticated or not an admin
  if (status !== "authenticated" || session?.user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold text-red-500 mb-2">
            Access Denied
          </h1>
          <p className="mb-4">You don't have permission to access this area.</p>
          <Link
            href="/admin/login"
            className="bg-[#65DBA8] border-[1px] border-[#3c3c3c] text-black font-medium px-4 py-2 rounded-full hover:bg-transparent hover:border-[#73e896]/40 hover:text-[#65DBA8] transition-all duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  // Navigation items
  const navItems = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Team Members", href: "/admin/team", icon: Users },
    { name: "Blog Posts", href: "/admin/blog", icon: FileText },
    { name: "Services", href: "/admin/services", icon: SquareMenu },
    { name: "Projects", href: "/admin/projects", icon: Layout },
    { name: "Categories", href: "/admin/categories", icon: FolderOpen },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="p-4 border-b flex items-center justify-between">
            <Link href="/admin" className="flex items-center space-x-2">
              <Image src="/logoWhile.png" alt="Logo" width={40} height={40} />
              <span className="text-xl font-bold">Admin Panel</span>
            </Link>
            <button
              className="lg:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                        isActive(item.href)
                          ? "bg-gradient-to-r from-green-400 to-cyan-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={20} className="mr-3" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User info */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  {session?.user?.name || "Admin"}
                </p>
                <p className="text-sm text-gray-500">{session?.user?.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                title="Sign out"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow z-10">
          <div className="px-4 py-4 flex items-center justify-between">
            <button
              className="lg:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="text-xl font-semibold sm:text-2xl">
              {navItems.find((item) => isActive(item.href))?.name ||
                "Dashboard"}
            </div>
            <div>
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                target="_blank"
              >
                <span className="hidden sm:inline mr-1">Visit</span> Website
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

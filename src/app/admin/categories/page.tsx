"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, RefreshCw, Search, X } from "lucide-react";
import { Category } from "@/lib/models/category";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Add/Edit category form state
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    slug: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError("Error loading categories. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) => {
    return (
      category.name.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.name.ar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.en
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      category.description?.ar?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Create slug from string
  const createSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nameEn.trim() || !formData.nameAr.trim()) {
      setError("Please fill in both English and Arabic names");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const slug = formData.slug || createSlug(formData.nameEn);

      const categoryData = {
        name: {
          en: formData.nameEn,
          ar: formData.nameAr,
        },
        description: {
          en: formData.descriptionEn || "",
          ar: formData.descriptionAr || "",
        },
        slug,
      };

      const url = editingCategory
        ? `/api/categories/${editingCategory.id}`
        : "/api/categories";

      const method = editingCategory ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            `Failed to ${editingCategory ? "update" : "create"} category`
        );
      }

      const savedCategory = await response.json();

      if (editingCategory) {
        // Update existing category in state
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === editingCategory.id ? savedCategory : cat
          )
        );
      } else {
        // Add new category to state
        setCategories((prev) => [...prev, savedCategory]);
      }

      // Reset form
      resetForm();
    } catch (err: any) {
      console.error(err);
      setError(
        err.message ||
          `Error ${editingCategory ? "updating" : "creating"} category. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (category: Category) => {
    if (
      !confirm(
        `Are you sure you want to delete the category "${category.name.en}"?`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/categories/${category.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete category");
      }

      // Remove deleted category from state
      setCategories((prev) => prev.filter((cat) => cat.id !== category.id));
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error deleting category. Please try again.");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      nameEn: "",
      nameAr: "",
      descriptionEn: "",
      descriptionAr: "",
      slug: "",
    });
    setEditingCategory(null);
    setShowForm(false);
  };

  // Start editing
  const startEdit = (category: Category) => {
    setFormData({
      nameEn: category.name.en || "",
      nameAr: category.name.ar || "",
      descriptionEn: category.description?.en || "",
      descriptionAr: category.description?.ar || "",
      slug: category.slug,
    });
    setEditingCategory(category);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center py-2 px-4 bg-gradient-to-r from-green-400 to-cyan-500 text-white rounded-lg hover:from-green-500 hover:to-cyan-600 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Category
        </button>
      </div>

      {/* Search and refresh */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={fetchCategories}
          className="inline-flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          disabled={isLoading}
        >
          <RefreshCw
            size={18}
            className={`mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Names */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="nameEn"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      English Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nameEn"
                      value={formData.nameEn}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          nameEn: e.target.value,
                        }));
                        // Auto-generate slug if not editing
                        if (!editingCategory && !formData.slug) {
                          setFormData((prev) => ({
                            ...prev,
                            slug: createSlug(e.target.value),
                          }));
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Web Development"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="nameAr"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Arabic Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nameAr"
                      value={formData.nameAr}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          nameAr: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                      placeholder="تطوير الويب"
                      dir="rtl"
                      required
                    />
                  </div>
                </div>

                {/* Slug */}
                <div>
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="web-development"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    This will be used in URLs: /projects?category=
                    {formData.slug || "example-slug"}
                  </p>
                </div>

                {/* Descriptions */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="descriptionEn"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      English Description
                    </label>
                    <textarea
                      id="descriptionEn"
                      value={formData.descriptionEn}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          descriptionEn: e.target.value,
                        }))
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Description of the category..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="descriptionAr"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Arabic Description
                    </label>
                    <textarea
                      id="descriptionAr"
                      value={formData.descriptionAr}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          descriptionAr: e.target.value,
                        }))
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                      placeholder="وصف الفئة..."
                      dir="rtl"
                    />
                  </div>
                </div>

                {/* Form actions */}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-400 to-cyan-500 hover:from-green-500 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting
                      ? "Saving..."
                      : editingCategory
                        ? "Update Category"
                        : "Create Category"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      {/* Categories list */}
      {!isLoading && filteredCategories.length === 0 && (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">
            {searchTerm
              ? "No matching categories found."
              : "No categories yet."}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-2 text-cyan-600 hover:text-cyan-500"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {!isLoading && filteredCategories.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Slug
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {category.name.en}
                        </div>
                        <div className="text-sm text-gray-500" dir="rtl">
                          {category.name.ar}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="text-sm text-gray-900 truncate">
                          {category.description?.en || "-"}
                        </div>
                        <div
                          className="text-sm text-gray-500 truncate"
                          dir="rtl"
                        >
                          {category.description?.ar || "-"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-mono">
                        {category.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => startEdit(category)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="Edit"
                      >
                        <Edit size={18} className="inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(category)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 size={18} className="inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

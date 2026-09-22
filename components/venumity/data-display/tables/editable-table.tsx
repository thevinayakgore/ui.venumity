"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Package,
  DollarSign,
  Hash,
  Tag,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
}

const categoryColors: Record<string, string> = {
  Electronics: "bg-purple-500/10 text-purple-600 border-purple-500/60",
  Accessories: "bg-blue-500/10 text-blue-600 border-blue-500/60",
  Office: "bg-green-500/10 text-green-600 border-green-500/60",
  Home: "bg-yellow-500/10 text-yellow-600 border-yellow-500/60",
  Uncategorized: "bg-gray-500/10 text-gray-600 border-gray-500/60",
};

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Mouse",
    category: "Electronics",
    price: 29.99,
    stock: 45,
    sku: "SKU-001",
  },
  {
    id: "2",
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 89.99,
    stock: 12,
    sku: "SKU-002",
  },
  {
    id: "3",
    name: "USB-C Hub",
    category: "Accessories",
    price: 39.99,
    stock: 67,
    sku: "SKU-003",
  },
  {
    id: "4",
    name: "Monitor Stand",
    category: "Office",
    price: 49.99,
    stock: 23,
    sku: "SKU-004",
  },
  {
    id: "5",
    name: "Desk Lamp",
    category: "Office",
    price: 34.99,
    stock: 89,
    sku: "SKU-005",
  },
];

const categories = [
  "Electronics",
  "Accessories",
  "Office",
  "Home",
  "Uncategorized",
];

export default function EditableDataGrid() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProductId, setNewProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditingProduct({ ...product });
  };

  const cancelEditing = () => {
    if (newProductId) {
      setProducts((previousProducts) =>
        previousProducts.filter((product) => product.id !== newProductId),
      );
    }

    setNewProductId(null);
    setEditingId(null);
    setEditingProduct(null);
  };

  const saveEditing = () => {
    if (!editingProduct) return;

    const normalizedProduct: Product = {
      ...editingProduct,
      name: editingProduct.name.trim() || "Untitled Product",
      sku:
        editingProduct.sku.trim() || `SKU-${Date.now().toString().slice(-4)}`,
      price: Number.isFinite(editingProduct.price)
        ? Math.max(0, editingProduct.price)
        : 0,
      stock: Number.isFinite(editingProduct.stock)
        ? Math.max(0, editingProduct.stock)
        : 0,
    };

    setProducts((previousProducts) => {
      const updatedProducts = previousProducts.map((product) =>
        product.id === normalizedProduct.id ? normalizedProduct : product,
      );

      return updatedProducts.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, {
          sensitivity: "base",
        }),
      );
    });

    setNewProductId(null);
    setEditingId(null);
    setEditingProduct(null);
  };

  const updateField = (field: keyof Product, value: string | number) => {
    setEditingProduct((previousProduct) =>
      previousProduct
        ? { ...previousProduct, [field]: value }
        : previousProduct,
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((previousProducts) =>
      previousProducts.filter((product) => product.id !== id),
    );
  };

  const addNewProduct = () => {
    if (editingId) return;

    const id = `new-${Date.now()}`;
    const newProduct: Product = {
      id,
      name: "",
      category: "Uncategorized",
      price: 0,
      stock: 0,
      sku: "",
    };

    setProducts((previousProducts) => [newProduct, ...previousProducts]);
    setNewProductId(id);
    setEditingId(id);
    setEditingProduct(newProduct);
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return [...products]
      .sort((a, b) => {
        // Keep a new, unfinished product at the top while it is being edited.
        if (a.id === newProductId) return -1;
        if (b.id === newProductId) return 1;

        return a.name.localeCompare(b.name, undefined, {
          sensitivity: "base",
        });
      })
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query);

        const matchesCategory =
          categoryFilter === "all" || product.category === categoryFilter;

        return matchesSearch && matchesCategory;
      });
  }, [products, searchQuery, categoryFilter, newProductId]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );

  const getStockColor = (stock: number) => {
    if (stock <= 10) return "bg-red-500";
    if (stock <= 30) return "bg-yellow-500";
    return "bg-green-500";
  };

  const firstShownProduct =
    filteredProducts.length === 0
      ? 0
      : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1;

  const lastShownProduct = Math.min(
    safeCurrentPage * ITEMS_PER_PAGE,
    filteredProducts.length,
  );

  return (
    <div className="flex h-full w-full flex-col space-y-5 p-5">
      {/* Filters */}
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 opacity-50" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={categoryFilter}
            onValueChange={(value) => {
              setCategoryFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={addNewProduct}
            disabled={Boolean(editingId)}
            className="gap-2 bg-foreground! font-semibold text-secondary!"
          >
            <Plus className="size-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-72">
                <div className="flex items-center gap-2">
                  <Package className="size-4" />
                  Product Name
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Tag className="size-4" />
                  Category
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <DollarSign className="size-4" />
                  Price
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Package className="size-4" />
                  Stock
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Hash className="size-4" />
                  SKU
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <AnimatePresence initial={false} mode="popLayout">
              {paginatedProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  layout="position"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group border-b transition-colors hover:bg-muted/50 last:border-0"
                >
                  <TableCell className="p-3">
                    {editingId === product.id ? (
                      <Input
                        type="text"
                        value={editingProduct?.name || ""}
                        onChange={(event) =>
                          updateField("name", event.target.value)
                        }
                        placeholder="Product name"
                        className="w-full"
                        autoFocus
                      />
                    ) : (
                      <div className="font-medium">{product.name}</div>
                    )}
                  </TableCell>

                  <TableCell>
                    {editingId === product.id ? (
                      <Select
                        value={editingProduct?.category || "Uncategorized"}
                        onValueChange={(value) =>
                          updateField("category", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge
                        variant="outline"
                        className={`p-3.5 text-sm ${categoryColors[product.category] || categoryColors.Uncategorized}`}
                      >
                        {product.category}
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    {editingId === product.id ? (
                      <div className="flex items-center">
                        <span className="mr-2 text-2xl text-foreground/50">
                          $
                        </span>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={editingProduct?.price ?? 0}
                          onChange={(event) =>
                            updateField(
                              "price",
                              Number.parseFloat(event.target.value) || 0,
                            )
                          }
                          className="w-full"
                        />
                      </div>
                    ) : (
                      <div className="font-semibold">
                        ${product.price.toFixed(2)}
                      </div>
                    )}
                  </TableCell>

                  <TableCell>
                    {editingId === product.id ? (
                      <Input
                        type="number"
                        min="0"
                        value={editingProduct?.stock ?? 0}
                        onChange={(event) =>
                          updateField(
                            "stock",
                            Number.parseInt(event.target.value, 10) || 0,
                          )
                        }
                        className="w-full"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-20 overflow-hidden rounded-full bg-muted">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${Math.min(100, product.stock)}%`,
                            }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            className={`h-full rounded-full ${getStockColor(product.stock)}`}
                          />
                        </div>
                        <span className="min-w-10 text-sm font-semibold">
                          {product.stock}
                        </span>
                      </div>
                    )}
                  </TableCell>

                  <TableCell>
                    {editingId === product.id ? (
                      <Input
                        type="text"
                        value={editingProduct?.sku || ""}
                        onChange={(event) =>
                          updateField("sku", event.target.value)
                        }
                        placeholder="SKU-000"
                        className="w-full"
                      />
                    ) : (
                      <div className="font-mono text-sm text-foreground/50">
                        {product.sku}
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="text-right w-fit">
                    {editingId === product.id ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={saveEditing}
                          aria-label="Save product"
                          className="h-8 bg-green-500/15! text-green-500! border-green-500/40!"
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          onClick={cancelEditing}
                          aria-label="Cancel editing"
                          className="h-8 bg-red-500/15! text-red-500! border-red-500/40!"
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="space-y-1">
                          <DropdownMenuItem
                            className="gap-2 cursor-pointer"
                            onClick={() => startEditing(product)}
                          >
                            <Edit className="size-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2 cursor-pointer bg-red-500! text-white!"
                            onClick={() => deleteProduct(product.id)}
                          >
                            <Trash2 className="size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>

            {paginatedProducts.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-sm text-foreground/50"
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <footer className="flex flex-col gap-3 text-sm text-foreground/50 sm:flex-row sm:items-center sm:justify-between">
        <div>
          Showing {firstShownProduct}–{lastShownProduct} of {products.length}{" "}
          products
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={safeCurrentPage === 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={safeCurrentPage >= totalPages}
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
          >
            Next
          </Button>
        </div>
      </footer>
    </div>
  );
}

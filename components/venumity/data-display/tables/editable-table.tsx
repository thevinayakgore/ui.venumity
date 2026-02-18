"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Save,
  X,
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
  Office: "bg-emerald-500/10 text-emerald-600 border-emerald-500/60",
  Home: "bg-amber-500/10 text-amber-600 border-amber-500/60",
  Uncategorized: "bg-gray-500/10 text-gray-600 border-gray-500/60",
};

export default function EditableDataGrid() {
  const [products, setProducts] = useState<Product[]>([
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
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditingProduct({ ...product });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingProduct(null);
  };

  const saveEditing = () => {
    if (editingProduct) {
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? editingProduct : p)),
      );
      cancelEditing();
    }
  };

  const updateField = (field: keyof Product, value: string | number) => {
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [field]: value });
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const addNewProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: "New Product",
      category: "Uncategorized",
      price: 0,
      stock: 0,
      sku: `SKU-${Date.now().toString().slice(-4)}`,
    };
    setProducts([...products, newProduct]);
    startEditing(newProduct);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const getStockColor = (stock: number) => {
    if (stock <= 10) return "bg-rose-500";
    if (stock <= 30) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <main className="p-6 md:p-10">
      <Card className="w-full pt-0 shadow-none hover:shadow-xl/10 overflow-hidden transition-all duration-500">
        <CardHeader className="pt-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-4xl font-semibold">
                Products Management
              </CardTitle>
              <p className="text-sm md:text-base text-foreground/60 mt-1">
                Click on cells to edit values
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={addNewProduct}
                className="gap-2 bg-emerald-500 hover:bg-emerald-400 cursor-pointer rounded-sm"
              >
                <Plus className="size-4" />
                Add Product
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="cursor-pointer w-full md:w-45">
                <Filter className="size-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="cursor-pointer">
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border overflow-hidden">
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
                <AnimatePresence mode="wait">
                  {paginatedProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group hover:bg-muted/50 transition-colors border-b last:border-0"
                    >
                      <TableCell className="p-3">
                        {editingId === product.id ? (
                          <Input
                            type="text"
                            value={editingProduct?.name || ""}
                            onChange={(e) =>
                              updateField("name", e.target.value)
                            }
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
                            value={editingProduct?.category}
                            onValueChange={(value) =>
                              updateField("category", value)
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Electronics">
                                Electronics
                              </SelectItem>
                              <SelectItem value="Accessories">
                                Accessories
                              </SelectItem>
                              <SelectItem value="Office">Office</SelectItem>
                              <SelectItem value="Home">Home</SelectItem>
                              <SelectItem value="Uncategorized">
                                Uncategorized
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge
                            variant="outline"
                            className={`${categoryColors[product.category]} font-medium`}
                          >
                            {product.category}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === product.id ? (
                          <div className="flex items-center">
                            <span className="mr-1 text-muted-foreground">
                              $
                            </span>
                            <Input
                              type="number"
                              step="0.01"
                              value={editingProduct?.price || 0}
                              onChange={(e) =>
                                updateField("price", parseFloat(e.target.value))
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
                            value={editingProduct?.stock || 0}
                            onChange={(e) =>
                              updateField("stock", parseInt(e.target.value))
                            }
                            className="w-full"
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${Math.min(100, (product.stock / 100) * 100)}%`,
                                }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className={`h-full rounded-full ${getStockColor(product.stock)}`}
                              />
                            </div>
                            <span className="text-sm font-semibold min-w-10">
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
                            onChange={(e) => updateField("sku", e.target.value)}
                            className="w-full"
                          />
                        ) : (
                          <div className="text-sm text-muted-foreground font-mono">
                            {product.sku}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {editingId === product.id ? (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={saveEditing}
                              className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10"
                            >
                              <Save className="size-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={cancelEditing}
                              className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-500/10"
                            >
                              <X className="size-4" />
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
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="gap-2"
                                onClick={() => startEditing(product)}
                              >
                                <Edit className="size-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="gap-2 text-rose-600"
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
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 text-sm text-muted-foreground">
            <div>
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}{" "}
              of {products.length} products
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="cursor-pointer"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="cursor-pointer"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

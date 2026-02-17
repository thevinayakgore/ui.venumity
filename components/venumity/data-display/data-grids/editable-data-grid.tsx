import { useState } from "react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
}

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
        products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
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

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Products Management</h2>
            <p className="text-gray-500">Click on cells to edit values</p>
          </div>
          <button
            onClick={addNewProduct}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Product</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Product Name
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Stock
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                SKU
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6">
                  {editingId === product.id ? (
                    <input
                      type="text"
                      value={editingProduct?.name || ""}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="font-medium">{product.name}</div>
                  )}
                </td>
                <td className="py-4 px-6">
                  {editingId === product.id ? (
                    <select
                      value={editingProduct?.category || ""}
                      onChange={(e) => updateField("category", e.target.value)}
                      className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Office">Office</option>
                      <option value="Home">Home</option>
                      <option value="Uncategorized">Uncategorized</option>
                    </select>
                  ) : (
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {product.category}
                    </span>
                  )}
                </td>
                <td className="py-4 px-6">
                  {editingId === product.id ? (
                    <div className="flex items-center">
                      <span className="mr-1">$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={editingProduct?.price || 0}
                        onChange={(e) =>
                          updateField("price", parseFloat(e.target.value))
                        }
                        className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  ) : (
                    <div className="font-bold">${product.price.toFixed(2)}</div>
                  )}
                </td>
                <td className="py-4 px-6">
                  {editingId === product.id ? (
                    <input
                      type="number"
                      value={editingProduct?.stock || 0}
                      onChange={(e) =>
                        updateField("stock", parseInt(e.target.value))
                      }
                      className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              (product.stock / 100) * 100
                            )}%`,
                          }}
                        />
                      </div>
                      <span>{product.stock}</span>
                    </div>
                  )}
                </td>
                <td className="py-4 px-6">
                  {editingId === product.id ? (
                    <input
                      type="text"
                      value={editingProduct?.sku || ""}
                      onChange={(e) => updateField("sku", e.target.value)}
                      className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="text-sm text-gray-600">{product.sku}</div>
                  )}
                </td>
                <td className="py-4 px-6">
                  {editingId === product.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={saveEditing}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="px-3 py-1 border rounded hover:bg-gray-100 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(product)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

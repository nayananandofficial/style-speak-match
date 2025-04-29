
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Package, ShoppingBag, Users } from "lucide-react";
import { toast } from "sonner";

const SellerDashboard = () => {
  const [productFormData, setProductFormData] = useState({
    name: "",
    brand: "",
    category: "",
    gender: "",
    price: "",
    description: "",
    fabric: "",
    fit: "",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setProductFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product data:", productFormData);
    toast.success("Product submitted successfully!");
    // Reset form
    setProductFormData({
      name: "",
      brand: "",
      category: "",
      gender: "",
      price: "",
      description: "",
      fabric: "",
      fit: "",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>
        
        {/* Dashboard summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { title: "Total Products", value: "24", icon: Package, color: "bg-blue-100 text-blue-600" },
            { title: "Total Orders", value: "18", icon: ShoppingBag, color: "bg-green-100 text-green-600" },
            { title: "Total Customers", value: "156", icon: Users, color: "bg-purple-100 text-purple-600" },
            { title: "Total Revenue", value: "$2,450", icon: BarChart3, color: "bg-amber-100 text-amber-600" }
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>
                  Complete the form below to add a new product to your inventory.
                  Include detailed information for better AI matching.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={productFormData.name}
                        onChange={handleInputChange}
                        placeholder="Classic Fit Cotton Shirt"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Input
                        id="brand"
                        name="brand"
                        value={productFormData.brand}
                        onChange={handleInputChange}
                        placeholder="Your Brand Name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={productFormData.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="T-Shirts">T-Shirts</SelectItem>
                          <SelectItem value="Shirts">Shirts</SelectItem>
                          <SelectItem value="Jeans">Jeans</SelectItem>
                          <SelectItem value="Pants">Pants</SelectItem>
                          <SelectItem value="Dresses">Dresses</SelectItem>
                          <SelectItem value="Jackets">Jackets</SelectItem>
                          <SelectItem value="Sweaters">Sweaters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gender">Target Gender</Label>
                      <Select
                        value={productFormData.gender}
                        onValueChange={(value) => handleSelectChange("gender", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Men">Men</SelectItem>
                          <SelectItem value="Women">Women</SelectItem>
                          <SelectItem value="Unisex">Unisex</SelectItem>
                          <SelectItem value="Kids">Kids</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={productFormData.price}
                        onChange={handleInputChange}
                        placeholder="49.99"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fit">Fit Type</Label>
                      <Select
                        value={productFormData.fit}
                        onValueChange={(value) => handleSelectChange("fit", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Fit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Slim">Slim</SelectItem>
                          <SelectItem value="Regular">Regular</SelectItem>
                          <SelectItem value="Loose">Loose</SelectItem>
                          <SelectItem value="Oversized">Oversized</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fabric">Fabric Composition</Label>
                    <Input
                      id="fabric"
                      name="fabric"
                      value={productFormData.fabric}
                      onChange={handleInputChange}
                      placeholder="100% Cotton, Polyester Blend, etc."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Product Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={productFormData.description}
                      onChange={handleInputChange}
                      placeholder="Detailed description of the product including features and benefits"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="images">Product Images</Label>
                    <Input id="images" type="file" multiple accept="image/*" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload at least 3 images. Front, back, and detail shots are recommended.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit">Add Product</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Manage and track your recent orders.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12 text-muted-foreground">
                  No orders to display.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Track your product performance and customer insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12 text-muted-foreground">
                  Analytics will be available once you have sales data.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Seller Settings</CardTitle>
                <CardDescription>
                  Manage your seller profile and account preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input id="store-name" placeholder="Your Store Name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="store-description">Store Description</Label>
                    <Textarea 
                      id="store-description"
                      placeholder="Tell customers about your brand and products"
                      rows={3}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button type="button">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SellerDashboard;

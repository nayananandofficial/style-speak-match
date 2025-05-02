
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Package, Truck, CheckCircle, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

// Define types for our order data
interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
  size: string;
  color: string;
}

interface Order {
  id: string;
  date: Date;
  status: "Processing" | "Shipped" | "Delivered";
  items: OrderItem[];
  shipping_address: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  payment_method: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    // In a real application, this would fetch the order from your database
    // For now, we'll simulate fetching order details
    const fetchOrder = async () => {
      setLoading(true);
      try {
        // This is where you'd make a real API call
        // const { data, error } = await supabase
        //   .from('orders')
        //   .select('*')
        //   .eq('id', id)
        //   .single();

        // For demo purposes, we'll use mock data
        // This would be replaced with real data in production
        const mockOrder: Order = {
          id: id || "ORD-001",
          date: new Date(2025, 4, 1),
          status: "Delivered",
          items: [
            {
              id: "item-1",
              product_name: "Classic White T-Shirt",
              quantity: 2,
              price: 24.99,
              size: "M",
              color: "White"
            },
            {
              id: "item-2",
              product_name: "Slim Fit Jeans",
              quantity: 1,
              price: 39.99,
              size: "32",
              color: "Blue"
            }
          ],
          shipping_address: {
            name: "John Doe",
            street: "123 Main Street",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "United States"
          },
          payment_method: "Credit Card (ending in 4242)",
          subtotal: 89.97,
          shipping: 5.99,
          tax: 6.30,
          total: 102.26
        };
        
        setTimeout(() => {
          setOrder(mockOrder);
          setLoading(false);
        }, 800);
        
      } catch (error) {
        console.error("Error fetching order:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Package className="h-4 w-4 text-blue-500" />;
      case "Shipped":
        return <Truck className="h-4 w-4 text-orange-500" />;
      case "Delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-orange-100 text-orange-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Skeleton className="h-8 w-8 mr-2" />
            <Skeleton className="h-8 w-40" />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex justify-between mb-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-24" />
            </div>
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-8" />
            
            <Skeleton className="h-40 w-full mb-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Skeleton className="h-6 w-32 mb-4" />
                <Skeleton className="h-20 w-full" />
              </div>
              <div>
                <Skeleton className="h-6 w-32 mb-4" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't find the order you're looking for.
          </p>
          <Button asChild>
            <Link to="/orders">Back to Orders</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="sm" className="mr-2" asChild>
            <Link to="/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Order {order.id}</h1>
              <p className="text-muted-foreground">
                Placed on {format(order.date, 'MMMM d, yyyy')}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge className={getStatusColor(order.status)}>
                <span className="flex items-center">
                  {getStatusIcon(order.status)}
                  <span className="ml-1">{order.status}</span>
                </span>
              </Badge>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Items</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.product_name}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.color}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-medium mb-2">Shipping Address</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium">{order.shipping_address.name}</p>
                <p>{order.shipping_address.street}</p>
                <p>
                  {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}
                </p>
                <p>{order.shipping_address.country}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-2">Payment Information</h2>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="font-medium">Payment Method</p>
                <p>{order.payment_method}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetailPage;

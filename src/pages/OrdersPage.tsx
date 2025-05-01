
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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Package, Truck, CheckCircle } from "lucide-react";
import { format } from "date-fns";

const OrdersPage = () => {
  // This would come from a database in a real application
  const orders = [
    {
      id: "ORD-001",
      date: new Date(2025, 4, 1),
      status: "Delivered",
      total: 89.97,
      items: 3
    },
    {
      id: "ORD-002",
      date: new Date(2025, 4, 15),
      status: "Processing",
      total: 59.99,
      items: 1
    }
  ];
  
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="bg-white rounded-lg shadow-sm border">
            {orders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{format(order.date, 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          <span>{order.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/orders/${order.id}`}>Details</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-lg font-medium mb-2">No orders found</h2>
                <p className="text-muted-foreground mb-6">
                  You haven't placed any orders yet.
                </p>
                <Button asChild>
                  <Link to="/">Start Shopping</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="processing">
            <div className="text-center py-12">
              <h2 className="text-lg font-medium mb-2">No processing orders</h2>
              <p className="text-muted-foreground">
                You don't have any orders being processed at the moment.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="shipped">
            <div className="text-center py-12">
              <h2 className="text-lg font-medium mb-2">No shipped orders</h2>
              <p className="text-muted-foreground">
                You don't have any orders being shipped at the moment.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="delivered">
            <div className="text-center py-12">
              <h2 className="text-lg font-medium mb-2">No delivered orders</h2>
              <p className="text-muted-foreground">
                You don't have any delivered orders yet.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default OrdersPage;

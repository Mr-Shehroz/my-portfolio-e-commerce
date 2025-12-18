// app/account/orders/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { client } from "@/sanity/lib/client";

interface ProductInOrder {
  product: {
    _id: string;
    name: string;
    "slug": string;
    "images": string[];
    price: number;
  };
  quantity: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  totalPrice: number;
  currency: string;
  status: string;
  orderDate: string;
  products: ProductInOrder[];
  address?: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
}

const OrdersPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    const fetchOrders = async () => {
      try {
        const query = `*[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
          _id,
          orderNumber,
          customerName,
          email,
          totalPrice,
          currency,
          status,
          orderDate,
          address,
          "products": products[] {
            quantity,
            "product": product->{
              _id,
              name,
              "slug": slug.current,
              "images": images[].asset->url,
              price
            }
          }
        }`;
        const data = await client.fetch(query, { userId: user.id });
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-4">
        <ShoppingCart className="w-16 h-16 text-gray-600 mb-6" />
        <h1 className="text-2xl font-bold mb-4">Sign in to view your orders</h1>
        <p className="text-gray-400 mb-8">Log in to see your purchase history.</p>
        <Link
          href="/sign-in"
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-500";
      case "processing":
        return "text-yellow-500";
      case "shipped":
      case "out_for_delivery":
        return "text-blue-500";
      case "delivered":
        return "text-green-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="bg-black text-white relative min-h-screen">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1)_0%,transparent_20%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.1)_0%,transparent_20%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="mb-8">
          <Link
            href="/account"
            className="text-gray-400 hover:text-red-500 flex items-center gap-1"
          >
            <ArrowLeft size={16} />
            Back to Account
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-12">
          My <span className="text-red-600">Orders</span>
        </h1>

        {loading ? (
          <p className="text-gray-400">Loading your orders...</p>
        ) : error ? (
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
            <p className="text-gray-400">{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold mb-3">No orders yet</h2>
            <p className="text-gray-400 mb-8">
              You haven't placed any orders. Start shopping to see your order history here!
            </p>
            <Link
              href="/shop"
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold inline-block"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold">Order #{order.orderNumber}</h2>
                    <p className="text-gray-400">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`font-semibold ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>

                {/* Products */}
                <div className="mb-6">
                  <h3 className="font-bold mb-4">Items</h3>
                  <div className="space-y-4">
                    {order.products.map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-16 h-16 shrink-0">
                          {item.product.images?.[0] ? (
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="bg-gray-800 w-full h-full rounded-lg flex items-center justify-center text-gray-500">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                          <p className="text-red-500 font-bold mt-1">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-t border-gray-800 pt-4">
                  <div>
                    {order.address && (
                      <p className="text-gray-400 text-sm">
                        Shipping to: {order.address.name}, {order.address.address}, {order.address.city}, {order.address.state} {order.address.zip}
                      </p>
                    )}
                  </div>
                  <p className="text-xl font-black text-red-500 mt-2 sm:mt-0">
                    {order.currency.toUpperCase()} {order.totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
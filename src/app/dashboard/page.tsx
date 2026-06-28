import React from "react";
import { SparkAnimation } from "@/components/ui/SparkAnimation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Package, Users, DollarSign } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen bg-[#0F0040] text-white overflow-hidden selection:bg-lime-500 selection:text-black">
      {/* Interactive Sparkle Canvas */}
      <SparkAnimation />

      {/* Dashboard Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-300 mt-2 text-lg">
            Welcome back to the Great Parfum admin portal.
          </p>
        </header>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Revenue */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-md text-white shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-lime-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp 12.450.000</div>
              <p className="text-xs text-lime-300 mt-1">+14.5% from last month</p>
            </CardContent>
          </Card>

          {/* Orders */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-md text-white shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                New Orders
              </CardTitle>
              <Package className="h-4 w-4 text-lime-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+234</div>
              <p className="text-xs text-lime-300 mt-1">+5% from last month</p>
            </CardContent>
          </Card>

          {/* Customers */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-md text-white shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                Active Customers
              </CardTitle>
              <Users className="h-4 w-4 text-lime-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,204</div>
              <p className="text-xs text-gray-400 mt-1">Stable</p>
            </CardContent>
          </Card>

          {/* Activity */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-md text-white shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                Custom Blends Created
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-lime-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">542</div>
              <p className="text-xs text-lime-300 mt-1">+22% this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
          <h2 className="text-xl font-semibold mb-6">Recent Custom Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 text-sm font-medium text-gray-400">Order ID</th>
                  <th className="pb-3 text-sm font-medium text-gray-400">Customer</th>
                  <th className="pb-3 text-sm font-medium text-gray-400">Blend Name</th>
                  <th className="pb-3 text-sm font-medium text-gray-400">Status</th>
                  <th className="pb-3 text-sm font-medium text-gray-400">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { id: "#GP-1092", name: "Sarah J.", blend: "Midnight Bloom", status: "Processing", price: "Rp 114.000" },
                  { id: "#GP-1091", name: "Budi T.", blend: "Ocean Breeze", status: "Shipped", price: "Rp 85.000" },
                  { id: "#GP-1090", name: "Amanda W.", blend: "Sweet Vanilla", status: "Delivered", price: "Rp 100.000" },
                  { id: "#GP-1089", name: "Kevin M.", blend: "Citrus Rush", status: "Delivered", price: "Rp 50.000" },
                ].map((order, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 text-gray-300">{order.id}</td>
                    <td className="py-4">{order.name}</td>
                    <td className="py-4 text-lime-300">{order.blend}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Processing' ? 'bg-blue-500/20 text-blue-300' :
                        order.status === 'Shipped' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-lime-500/20 text-lime-300'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 font-medium">{order.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

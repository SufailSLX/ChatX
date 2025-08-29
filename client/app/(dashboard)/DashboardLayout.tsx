import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar will go here later */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}

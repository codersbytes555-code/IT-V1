import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1 overflow-auto bg-slate-50">
            <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-white px-6">
              <SidebarTrigger className="-ml-1" />
              <div className="ml-4 h-4 w-px bg-slate-200" />
              <div className="ml-4 flex items-center gap-2">
                <span className="text-sm font-medium text-slate-500">Dashboard</span>
              </div>
            </header>
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}

import SideBar from "@/components/SideBar";
import TopNavbar from "@/components/TopNavbar";
import BottomNav from "@/components/BottomNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full p-2 md:p-4 overflow-hidden">
      <div className="flex h-full gap-3 md:gap-4">
        {/* Sidebar — desktop only */}
        <SideBar />

        {/* Right Section */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopNavbar />

          {/* Page Content */}
          <div className="flex-1 mt-3 md:mt-4 bg-[#ECECEC] rounded-[20px] md:rounded-[28px] overflow-y-auto pb-20 md:pb-0 overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
}
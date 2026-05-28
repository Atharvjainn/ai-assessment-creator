import SideBar from "@/components/SideBar";
import TopNavbar from "@/components/TopNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full p-4 overflow-hidden">
      <div className="flex h-full gap-4">
        {/* Sidebar */}
        <SideBar />

        {/* Right Section */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <TopNavbar />

          {/* Page Content */}
          <div className="flex-1 mt-4 bg-[#ECECEC] rounded-[28px] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
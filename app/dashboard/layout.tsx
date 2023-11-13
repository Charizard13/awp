import SideBar from "@/components/layout/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-full">
      <SideBar />
      {children}
    </div>
  );
}

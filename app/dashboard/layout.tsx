import SideBar from "@/app/dashboard/_components/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-full">
      <SideBar />
      {children}
    </div>
  );
}

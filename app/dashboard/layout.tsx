import SideBar from "@/app/dashboard/_components/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-full flex-grow">
      <SideBar />
      <div className="p-2 flex-grow"> {children}</div>
    </div>
  );
}

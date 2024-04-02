import SideBar from "./_components/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-grow flex-col sm:flex-row">
      <SideBar />
      {children}
    </div>
  );
}

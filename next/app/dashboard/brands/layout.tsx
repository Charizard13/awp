import SideBar from "./_components/SideBar";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { message: string };
}) {
  return (
    <div className="flex h-full w-full flex-col sm:flex-row">
      <SideBar />
      <div className="flex-grow p-2" style={{ flex: "1" }}>
        {children}
      </div>
    </div>
  );
}

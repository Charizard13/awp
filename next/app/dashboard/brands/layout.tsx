import SideBar from "./_components/SideBar";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { message: string };
}) {
  return (
    <div className="flex h-full w-full">
      <SideBar />
      <div className="flex-grow p-2">{children}</div>
    </div>
  );
}

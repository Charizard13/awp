import Info from "./_components/Info";

export default function DashBoardPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <Info />
    </div>
  );
}

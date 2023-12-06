import AppsList from "./apps/page";

export default function DashBoardPage() {
  return (
    <div className="flex flex-col justify-center w-full h-full space-y-4">
      <AppsList />
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-grow flex-row">
      <div className="flex-grow p-2"> {children}</div>
    </div>
  );
}

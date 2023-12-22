export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-grow flex-row">
      <div className="flex-grow"> {children}</div>
    </div>
  );
}

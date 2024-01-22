export default function IphoneWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col">
      <FrontCamera />
      {children}
    </div>
  );
}

export const FrontCamera = () => (
  <div className="h-8 w-32  rounded-xl bg-black" />
);

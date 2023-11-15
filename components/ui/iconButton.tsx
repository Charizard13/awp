"use client";
type IconButtonProps = {
  icon: string;
  label: string;
  //   onClick: () => void;
};

export default function IconButton({ icon, label, onClick }: IconButtonProps) {
  return (
    <button
      //   onClick={onClick}
      className="flex items-center justify-center w-10 h-10 text-gray-400 rounded-md hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="sr-only">{label}</span>
    </button>
  );
}

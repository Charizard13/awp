"use client";

export default function Footer() {
  console.log(navigator.userAgent);

  return (
    <footer className="flex items-center justify-center h-16 bg-gray-100 dark:bg-gray-900">
      <p className="text-sm text-gray-600 dark:text-gray-400">© 2023 Awp. All rights reserved.</p>
    </footer>
  );
}

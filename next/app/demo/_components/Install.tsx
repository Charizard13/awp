"use client";
import AppInstallButton from "@/components/AppInstallButton";

// import useInstall from "@/hooks/useInstall";

export default function Install() {
  // const { status } = useInstall();

  return <AppInstallButton />;

  // switch (status) {
  //   case "idle":
  //   case "unSupported":
  //     return ;

  //   case "installing":
  //     return (
  //       <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-md">
  //         <p className="text-sm text-gray-600 dark:text-gray-400">Your app is installing...</p>
  //       </div>
  //     );

  //   case "installed":
  //     return (
  //       <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-md">
  //         <p className="text-sm text-gray-600 dark:text-gray-400">Your app is installed!</p>
  //       </div>
  //     );
  // }
}

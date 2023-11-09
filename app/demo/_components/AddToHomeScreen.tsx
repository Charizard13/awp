export default function AddToHomeScreenDialog() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center p-4 space-y-8">
      <h2 className="text-2xl font-bold text-center">Add to Home Screen</h2>
      <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-8">
        <li className="text-left">
          Click on the safari share button on the bottom of the browser <span className="material-symbols-outlined">ios_share</span>
        </li>
        <li className="text-left">
          Click on
          <div className="inline-block px-2 mr-2 ml-2 py-1 text-sm font-medium text-white rounded-md bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700">Add to Home Screen</div>
        </li>
      </ol>
    </div>
  );
}

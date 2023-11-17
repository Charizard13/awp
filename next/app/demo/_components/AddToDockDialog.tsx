export default function AddToDockDialog() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center p-4 space-y-8">
      <h2 className="text-2xl font-bold text-center">Add to Dock</h2>
      <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-8">
        <li>
          Click
          <div className="inline-block px-2 mr-2 ml-2 py-1 text-sm font-medium text-white rounded-md bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700">
            File
          </div>
          on the top left corner of the browser
        </li>
        <li>
          Click on
          <div className="inline-block px-2 mr-2 ml-2 py-1 text-sm font-medium text-white rounded-md bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700">
            Add to Dock..
          </div>
        </li>
      </ol>
    </div>
  );
}

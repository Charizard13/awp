declare global {
  interface Window {
    showOpenFilePicker(): Promise<any>;
  }
}

async function selectFile() {
  const [handle] = await window.showOpenFilePicker();
  const file = await handle.getFile();
  return file;
}

export default function useFiles() {
  return { selectFile };
}

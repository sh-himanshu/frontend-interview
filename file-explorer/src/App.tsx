import { useState } from 'react';
import FileExplorer from './components/file-explorer/FileExplorer';

export const rootDirectory = {
  name: 'root',
  isFolder: true,
  children: [
    { name: 'public', isFolder: true, children: [] },
    {
      name: 'src',
      isFolder: true,
      children: [
        { name: 'assets', isFolder: true, children: [] },
        { name: 'App.css', isFolder: false },
        { name: 'index.css', isFolder: false },
        { name: 'main.tsx', isFolder: false },
      ],
    },
    { name: 'index.html', isFolder: false },
    { name: 'yarn.lock', isFolder: false },
  ],
};

const App = () => {
  const [root, setRoot] = useState(rootDirectory);
  return (
    <div className="p-4 bg-gray-100">
      <FileExplorer root={root} />
    </div>
  );
};

export default App;

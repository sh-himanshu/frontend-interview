import { useState } from 'react';

import { FcCollapse, FcFile, FcFolder, FcOpenedFolder, FcPlus } from 'react-icons/fc';

interface FileObject {
  name: string;
  isFolder: false;
}

interface FolderObject {
  name: string;
  isFolder: true;
  children?: Array<FileObject | FolderObject>;
}

type FileExplorerProps = {
  root: FolderObject | FileObject;
};

type FileProps = {
  root: FileObject;
};

type FolderProps = {
  root: FolderObject;
};

const isFolder = (root: FileExplorerProps['root']): root is FolderObject => {
  return (root as FileObject).isFolder;
};

const File = ({ root }: FileProps) => {
  return (
    <div className="flex items-center space-x-2">
      <FcFile />
      <span>{root.name}</span>
    </div>
  );
};

const Folder = ({ root }: FolderProps) => {
  const [open, setOpen] = useState(false);
  const [createMode, setCreateMode] = useState({
    open: false,
    type: 'file',
    name: '',
  });

  const toggleFolder = () => setOpen(!open);

  return (
    <div>
      <div className="flex items-center space-x-2">
        <button onClick={toggleFolder}>{open ? <FcOpenedFolder /> : <FcFolder />}</button>
        <span className="select-none">{root.name}</span>
        {createMode.open ? (
          <button
            onClick={() =>
              setCreateMode(prev => {
                return {
                  ...prev,
                  open: false,
                };
              })
            }
          >
            <FcCollapse />
          </button>
        ) : (
          <button
            onClick={() =>
              setCreateMode(prev => {
                return {
                  ...prev,
                  open: true,
                };
              })
            }
          >
            <FcPlus />
          </button>
        )}
      </div>

      <div className="pl-6">
        {createMode.open && (
          <form className="flex items-center">
            {createMode.type === 'file' ? <FcFile /> : <FcFolder />}
            <input
              className="px-2 text-sm ml-2 rounded-lg"
              type="text"
              name=""
              placeholder={createMode.type === 'file' ? 'File name' : 'Folder name'}
              id=""
              onChange={event => {
                setCreateMode(prev => {
                  return {
                    ...prev,
                    name: event.target.value,
                  };
                });
              }}
            />

            <div className="mx-2 flex items-center space-x-2 mr-3">
              <input
                onChange={() =>
                  setCreateMode({
                    open: true,
                    type: 'file',
                    name: '',
                  })
                }
                checked={createMode.type === 'file'}
                value="file"
                type="radio"
                name="createType"
                id="aaa"
              />
              <label htmlFor="create-file">File</label>

              <input
                onChange={() =>
                  setCreateMode({
                    open: true,
                    type: 'folder',
                    name: '',
                  })
                }
                checked={createMode.type === 'folder'}
                value="folder"
                type="radio"
                name="createType"
                id="aaaw"
              />
              <label htmlFor="create-folder">Folder</label>
            </div>

            <button
              type="submit"
              className="mr-2 text-white flex items-center space-x-2 active:ring-2 bg-green-500 px-2 rounded-lg"
              onClick={e => {
                e.preventDefault();
                if (!createMode.name) return;

                setCreateMode({
                  name: '',
                  open: false,
                  type: 'file',
                });
              }}
            >
              <span>Create</span>
            </button>
          </form>
        )}

        {open && root.children?.map((item, index) => <FileExplorer key={index} root={item} />)}
      </div>
    </div>
  );
};

const FileExplorer = ({ root }: FileExplorerProps) => {
  if (root) return isFolder(root) ? <Folder root={root} /> : <File root={root} />;
  return <></>;
};

export default FileExplorer;

// UploadButton.js
import React from 'react';

function UploadButton() {
  const handleFolderSelection = async () => {
    try {
      const folderHandle = await window.showDirectoryPicker();
      // Do something with the selected folder handle
      console.log('Selected folder:', folderHandle);
    } catch (error) {
      console.error('Error selecting folder:', error);
    }
  };

  return (
    <div>
      <button onClick={handleFolderSelection}>Open Folder</button>
    </div>
  );
}

export default UploadButton;

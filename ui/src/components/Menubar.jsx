import React from "react";
import Upload from "./Upload";
import { useState } from 'react';
// const Menubar = () => {
function Menubar() {
  const [selectedLanguage, setSelectedLanguage] = useState('Language Select');
  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   // Do something with the selected file
  //   console.log('Selected file:', file);
  // };
  async function handleFileChosen(file) {
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      const content = String(fileReader.result)
      const book = content?.split(/\r?\n/)[0]?.split(/\s+/)[1].toLowerCase()
      if (books.includes(book)) {
        const message = `Bible book, ${book}, already present in DB`
        updateMessage(file.name, message)
        return
      }
      const postData = [{ USFM: content }]
      API.post(`bibles/${sourceName}/books`, postData)
        .then((response) => {
          const message = response.data.message
          updateMessage(file.name, message)
          if (message == successMessage) {
            setSuccessCount((a) => a + 1)
          }
        })
        .catch(function (error) {
          const message = error?.response?.data?.details || 'Error adding Book!'
          updateMessage(file.name, message)
        })
    }
    fileReader.readAsText(file)
  }


  const loadText = async (event) => {
    const _files = event.currentTarget.files
    if (!_files) return
    console.log(_files)
    // setOpen(true)
    // setFiles(_files)

    //   if (!file.name.endsWith('.usfm') && !file.name.endsWith('.sfm')) {
    //     updateMessage(file.name, 'You can upload usfm/sfm files only')
    //     return false
    //   }
    //   await handleFileChosen(file)

  }


  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    // Do something with the selected language
    console.log('Selected language:', language);
  };

  return (


    <div className="menu">

      <input
        type="file"
        id="file-input"
        style={{ display: 'none' }}
        onChange={loadText}
      />
      {/* Button to trigger file selection */}
      <button
        className="upload-btn"
        onClick={() => document.getElementById('file-input').click()}
      >
        Upload
      </button>
      <div className="language-dropdown">
        <button className="dropdown-btn">{selectedLanguage}</button>
        <div className="dropdown-content">
          <a href="#" onClick={() => handleLanguageSelect('English')}>English</a>
          <a href="#" onClick={() => handleLanguageSelect('Spanish')}>Spanish</a>
          <a href="#" onClick={() => handleLanguageSelect('French')}>French</a>
        </div>
        <button className="Translate-btn">Translate</button>
      </div>
      <button className="validate-btn">Validate</button>
    </div>
  )
}




export default Menubar;
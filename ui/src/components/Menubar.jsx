import React from "react";
import { useState } from "react";
import { API } from "./store/API";

// const Menubar = () => {
function Menubar({ storyId, translated, setStoryId, setStory, setTranslated }) {
  const [selectedLanguage, setSelectedLanguage] = useState("Language Select");
  async function handleFileChosen(file) {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const content = String(fileReader.result);
      const title = content?.split(/\r?\n/)[0];
      const _storyId = title.split(" ")[1].replace(".", "");
      if (!_storyId || _storyId.length == 0) {
        const message = `Unable to find story from obs md file`;
        console.log(message);
        return;
      } else {
        setStoryId(_storyId);
      }
      const postData = { md: content };
      API.post(`split`, postData)
        .then((response) => {
          console.log("Success", response.data);
          setStory(response.data);
        })
        .catch(function (error) {
          console.log(error);
          const message =
            error?.response?.data?.details || "Error splitting md file!";
          console.log(file.name, message);
        });
    };
    fileReader.readAsText(file);
  }

  const loadText = async (event) => {
    const files = event.currentTarget.files;
    const file = files ? files[0] : null;
    if (!file) return;
    if (!file.name.endsWith(".md")) {
      console.log(file.name, "You can upload md files only");
      return false;
    }

    console.log(file);
    await handleFileChosen(file);
  };
  const translate = () => {
    console.log("translating");
    if (storyId) {
      console.log(storyId);
      API.get(`translate/${storyId}/hin_Deva`)
        .then((response) => {
          console.log("Success", response.data);
          setTranslated(true);
        })
        .catch(function (error) {
          console.log(error);
          const message =
            error?.response?.data?.details || "Error translating story!";
          console.log(message);
        });
    } else {
      alert("No Story uploaded");
    }
  };
  const validate = () => {
    console.log("validating", translated);
    if (!storyId) {
      alert("Please upload a obs story");
      return;
    }
    if (translated) {
      alert("Validating");
      // call compare API function
    } else {
      alert("Story not translated");
    }
  };
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    // Do something with the selected language
    console.log("Selected language:", language);
  };

  return (
    <div className="menu">
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        onChange={loadText}
      />
      {/* Button to trigger file selection */}
      <button
        className="upload-btn"
        onClick={() => document.getElementById("file-input").click()}
      >
        Upload
      </button>
      <div className="language-dropdown">
        <button className="dropdown-btn">{selectedLanguage}</button>
        <div className="dropdown-content">
          <a href="#" onClick={() => handleLanguageSelect("English")}>
            English
          </a>
          <a href="#" onClick={() => handleLanguageSelect("Spanish")}>
            Spanish
          </a>
          <a href="#" onClick={() => handleLanguageSelect("French")}>
            French
          </a>
        </div>
      </div>
      <button className="Translate-btn" onClick={translate}>
        Translate
      </button>
      <button className="validate-btn" onClick={validate}>
        Validate
      </button>
    </div>
  );
}

export default Menubar;

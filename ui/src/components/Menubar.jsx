import React from "react";
import { useState } from "react";
import { API } from "./store/API";
import Select from "react-select";
import { language_list } from "./store/languages";

function Menubar({
  story,
  storyId,
  translated,
  setStoryId,
  setStory,
  setTranslated,
  setTranslation,
  setResult,
  setValidated
}) {
  const [selectedLanguage, setSelectedLanguage] = useState("Language Select");
  const resetData = () => {
    setStory([]);
    setTranslated(false);
    setTranslation([]);
    setResult([]);
  };
  const [translating, setTranslating] = useState(false);

  // const options = language_list.map((item) => {
  //   return { value: item, label: item };
  // });
  async function handleFileChosen(file) {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const content = String(fileReader.result);
      const title = content?.split(/\r?\n/)[0];
      const _storyId = title.split(" ")[1].split(".")[0];
      if (!_storyId || _storyId.length == 0) {
        const message = `Unable to find story from obs md file`;
        console.log(message);
        return;
      } else {
        setStoryId(_storyId);
      }
      const postData = { md: content };
      resetData();
      API.post(`split`, postData)
        .then((response) => {
          console.log("Split Success", response.data);
          setStory(response.data);
        })
        .catch(function (error) {
          console.log("Error splitting md file!", error);
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
    await handleFileChosen(file);
  };
  const translate = () => {
    console.log("translating");
    setTranslating(true);
    if (storyId) {
      console.log(storyId);
      API.get(`translate/${storyId}/${selectedLanguage.value}`)
        .then((response) => {
          console.log("Translate Success", response.data);
          setTranslated(true);
          setTranslating(false);
          setTranslation(response.data);
        })
        .catch(function (error) {
          console.log("Error translating story!", error);
        });
    } else {
      alert("No Story uploaded");
    }
  };
  const validate = () => {
    console.log("validating");
    if (!storyId) {
      alert("Please upload a obs story");
      return;
    }
    if (translated && story) {
      console.log(storyId);
      const postData = story?.story;
      API.post(`compare/${storyId}/${selectedLanguage.value}`, postData)
        .then((response) => {
          console.log("Validate Success", response.data);
          setResult(response.data.result);
          setValidated(true)
        })
        .catch(function (error) {
          console.log("Error comparing file!", error);
        });
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
        <Select
          styles={{
            // ...styles,
            control: (base, state) => ({
              ...base,
              "&:hover": { borderColor: "gray" }, // border style on hover
              border: "1px solid lightgray", // default border color
              fontFamily: "Arial",
            }),
          }}
          options={language_list}
          onChange={(data) => setSelectedLanguage(data)}
        />
      </div>

      {translating ? (
        <button className="translate-dis" disabled>
          {" "}
          Translating
        </button>
      ) : (
        <button onClick={translate}> Translate </button>
      )}

      <button className="validate-btn" onClick={validate}>
        Validate
      </button>
    </div>
  );
}

export default Menubar;

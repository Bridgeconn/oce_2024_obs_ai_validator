import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Menubar from "./components/Menubar";
import Table from "./components/Table";

function App() {
  const [storyId, setStoryId] = useState("");
  const [translated, setTranslated] = useState(false);
  const [story, setStory] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [result, setResult] = useState(null);
  return (
    <>
      <Navbar />
      <Menubar
        story={story}
        storyId={storyId}
        translated={translated}
        setStoryId={setStoryId}
        setStory={setStory}
        setTranslated={setTranslated}
        setTranslation={setTranslation}
        setResult={setResult}
      />
      <div>
        <Table
          storyId={storyId}
          story={story}
          translated={translated}
          translation={translation}
          result={result}
        />
      </div>
    </>
  );
}

export default App;

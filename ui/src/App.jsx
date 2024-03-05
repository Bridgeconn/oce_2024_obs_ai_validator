import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Menubar from "./components/Menubar";
import Table from "./components/Table";

function App() {
  const [storyId, setStoryId] = useState("");
  const [translated, setTranslated] = useState(false);
  const [story, setStory] = useState(null);
  return (
    <>
      <Navbar />
      <Menubar
        storyId={storyId}
        translated={translated}
        setStoryId={setStoryId}
        setStory={setStory}
        setTranslated={setTranslated}
      />
      <div>
        <Table storyId={storyId} story={story} translated={translated} />
      </div>
    </>
  );
}

export default App;

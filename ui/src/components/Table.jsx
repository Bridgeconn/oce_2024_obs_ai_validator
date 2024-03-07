import React, { useState, useEffect } from "react";
import { stories } from "../assets/OBSTextData";

function Table({ storyId, story, translated, translation, result }) {
  const [text, setText] = useState([]);

  useEffect(() => {
    if (storyId) {
      const _text = stories[storyId - 1]?.story?.map((item) => {
        return {
          id: item.id,
          url: item.url,
          text: item.text,
        };
      });
      setText(_text);
    }
  }, [stories, storyId, setText]);

  useEffect(() => {
    if (storyId && text?.length > 0 && story?.story?.length > 0) {
      const _text = [...text];
      _text.forEach((para, i) => {
        para.trText = story?.story[i]?.text;
      });
      setText(_text);
    }
  }, [storyId, story]);

  useEffect(() => {
    if (
      storyId &&
      text.length > 0 &&
      translated &&
      translation?.translation?.length > 0
    ) {
      const _text = [...text];
      _text.forEach((para, i) => {
        para.translation = translation.translation[i]?.translated_string;
      });
      setText(_text);
    }
  }, [storyId, translated, translation]);

  if (storyId && text && translated && result?.length > 0) {
    text.forEach((para, i) => {
      para.score = result[i]?.score;
    });
  }
  return (
    <div className="container">
      {!story && <h2>Please upload a valid obs story</h2>}
      <h2>{translated ? "Translated Story" : "Not Translated"}</h2>
      <h1>{story?.header}</h1>
      <h2>{story?.footer}</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>SNo.</th>
              <th>Image</th>
              <th>English</th>
              <th>Uploaded</th>
              <th>Machine Translated</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {text?.map((story) => {
              return (
                <tr key={story.id}>
                  <td>
                    <span className="dot">{story.id}</span>
                  </td>
                  <td>
                    {" "}
                    <img className="image-radius" src={story.url}></img>
                  </td>
                  <td>
                    <div className="text-bg">
                      <span className="text-inner">{story.text}</span>
                    </div>
                  </td>
                  <td>
                    <div className="text-bg">
                      <span className="text-inner">{story.trText}</span>
                    </div>
                  </td>
                  <td>
                    <div className="text-bg">
                      <span className="text-inner">{story.translation}</span>
                    </div>
                  </td>
                  <td>
                    <div>{story?.score}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;

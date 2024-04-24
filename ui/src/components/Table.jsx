import React, { useState, useEffect } from "react";
import { stories } from "../assets/OBSTextData";
function Table({ storyId, story, translated, translation, validated, result }) {
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
      para.best_text_score = result[i]?.compare_score;
      para.best_text_id = result[i]?.compare_para_id;
    });
  }
  return (
    <div className="container">
      {!story && <h2 className="message">Please upload an OBS story</h2>}
      <h2 className="message">
        {!story
          ? ""
          : translated
          ? validated
            ? ""
            : "Ready to validate"
          : " Translate the story"}
      </h2>
      <h1>{story?.header?.replace("#", "")}</h1>
      {/* <h2>{story?.footer}</h2> */}
      <div>
        <table>
          <thead>
            <tr>
              <th>Para</th>
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
                    {validated ? (
                      <div>
                        {story?.score > 0.5 ? (
                          <img
                            src="Pass.png"
                            width="50px"
                            height="50px"
                            className="image-container"
                            title={"PASS score = " + story?.score}
                          />
                        ) : (
                          <img
                            src="Warning.png"
                            width="60px"
                            height="60px"
                            className="image-container"
                            title={
                              story?.best_text_score === undefined ||
                              story?.score === story?.best_text_score
                                ? "FAIL score = " + story?.score
                                : "Check the translation as the best score can be found be in para " +
                                  story?.best_text_id +
                                  " with score = " +
                                  story?.best_text_score +
                                  " and FAIL score = " +
                                  story?.score
                            }
                          />
                        )}
                      </div>
                    ) : (
                      ""
                    )}
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

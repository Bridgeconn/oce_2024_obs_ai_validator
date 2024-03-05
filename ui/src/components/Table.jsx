import React from "react";

function FullWidthTable({ storyId, story, translated }) {
  console.log(storyId);
  return (
    <div>
      {!story && <h2>Please upload a valid obs story</h2>}
      <h2>{translated ? "Translated Story" : "Not Translated"}</h2>
      <h1>{story?.header}</h1>
      <h2>{story?.footer}</h2>
      <div>
        {story?.story.map((item) => (
          <p key={item.text}>{item.text}</p>
        ))}
      </div>
      {/* <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Image</th>
            <th>Source</th>
            <th>Translated Story</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <img
                class="image-radius"
                src="https://cdn.door43.org/obs/jpg/360px/obs-en-01-01.jpg"
                width="250px"
                alt="OBS Image"
              />
            </td>
            <td>
              <p>
                This is how God made everything in the beginning. He created the
                universe and everything in it in six days. After God created the
                earth it was dark and empty because he had not yet formed
                anything in it. But God’s Spirit was there over the water.
              </p>
            </td>
            <td>
              <p>
                Then God said, “Let there be light!” And there was light. God
                saw that the light was good and called it “day.” He separated it
                from the darkness, which he called “night.” God created the
                light on the first day of creation.
              </p>
            </td>
            <td>
              <img src="./src/assets/Pass.png" width="30px"></img>
              <img src="./src/assets/Fail.png" width="35px"></img>
            </td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}

export default FullWidthTable;

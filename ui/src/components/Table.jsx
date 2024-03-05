import React from 'react';

function FullWidthTable() {
  return (
    <div>
     
      {/* <h2>Full-width Table</h2> */}
      {/* <p>Use width: 100% to create a full-width table:</p> */}
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          {/* <tr>
            <th>Sl.No</th>
            <th>Image</th>
            <th>Source</th>
            <th>Translated Story</th>
            <th>Result</th>
          </tr> */}
        </thead>
        <tbody>
        
          <tr>
           <td>1</td>
            <td><img class="image-radius" src="https://cdn.door43.org/obs/jpg/360px/obs-en-01-01.jpg"  width="250px" alt="OBS Image" /></td>
            <td><p>This is how God made everything in the beginning. He created the universe and everything in it in six days. After God created the earth it was dark and empty because he had not yet formed anything in it. But God’s Spirit was there over the water.</p></td>
            <td><p>Then God said, “Let there be light!” And there was light. God saw that the light was good and called it “day.” He separated it from the darkness, which he called “night.” God created the light on the first day of creation.</p></td>
            <td><img src='./src/assets/Pass.png' width="30px"></img></td>
          </tr>
          <tr>
            <td>2</td>
            <td><img class="image-radius"src="https://cdn.door43.org/obs/jpg/360px/obs-en-02-01.jpg" alt="OBS Image" width="250px" /></td>
            <td><p>Adam and his wife were very happy living in the beautiful garden God had made for them. Neither of them wore clothes, but this did not cause them to feel any shame because there was no sin in the world. They often walked in the garden and talked with God.</p></td>
            <td><p>Adam and his wife were very happy living in the beautiful garden God had made for them. Neither of them wore clothes, but this did not cause them to feel any shame because there was no sin in the world. They often walked in the garden and talked with God.</p></td>
            <td><img src='./src/assets/Fail.png' width="35px"></img></td>
          </tr>
          <tr>
          <td>3</td>
            <td><img class="image-radius" src="https://cdn.door43.org/obs/jpg/360px/obs-en-03-01.jpg" alt="OBS Image"  width="250px" /></td>
            <td><p>After a long time, many people were living in the world. They had become very wicked and violent. It became so bad that God decided to destroy the whole world with a huge flood.</p></td>
            <td><p>After a long time, many people were living in the world. They had become very wicked and violent. It became so bad that God decided to destroy the whole world with a huge flood.</p></td>
            <td><img src='./src/assets/Pass.png' width="30px" className='image-container'></img></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default FullWidthTable;
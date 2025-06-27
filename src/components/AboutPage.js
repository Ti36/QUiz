import React from 'react';

function AboutPage() {
  return (
    <div className="card">
      <h2>About This App</h2>
      <p>
        This interactive quiz app was built using ReactJS, JavaScript, and CSS. 
        It uses React Router for navigation and localStorage for persistence. 
        I learned a lot about component state, hooks, routing, and responsive design.
      </p>
      <img 
        src="https://ichef.bbci.co.uk/images/ic/1920xn/p072ms1x.jpg" 
        alt="Confused cat at a table meme" 
        className="about-meme" 
      />
    </div>
  );
}

export default AboutPage;
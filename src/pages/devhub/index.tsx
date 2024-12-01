import './Devhub.css';

export default function DevHub() {
  return (
    <div className="devhub-container">
    <div>
    <div className="image-container">
        <img src="./devhub.jpeg" alt="DevHub Logo" className="circle-image" />
      </div>
      <a href="https://www.youtube.com/@DevHub168" className="subscribe-link">
        <img 
          src="https://cdn.pixabay.com/photo/2020/07/15/21/04/subscribe-5408999_1280.png" 
          alt="Subscribe Button" 
          className="subscribe-image"
        />
      </a>
    </div>
    </div>
  );
}
import Navbar from "../components/navbar";
import Video from "../components/videoPlayers/video";

const videoJsOptions = {
    autoplay: true,
    // controls: true,
    preload: 'auto',
    sources: [{
      src: 'https://streamr-destination-bucket.s3.amazonaws.com/test.m3u8',
      type: "application/x-mpegURL"
    }]
  }
  

export default function Home() {
    return (
        <div>
            <Navbar />
            <Video {...videoJsOptions}/>
        </div>
    );
}

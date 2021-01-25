import Navbar from '../components/navbar';
import Video from '../components/videoPlayers/video';
import VideoPreview from '../components/videoPlayers/preview';
import UploadForm from '../components/forms/uploadForm/uploadForm';

export default function Home(){
    return(
        <div>
            <Navbar/>
            <VideoPreview/>
            <VideoPreview/>
        </div>
    )
}
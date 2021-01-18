import Navbar from '../components/navbar';
import Video from '../components/video';
import VideoPreview from '../components/preview';
import UploadForm from '../components/uploadForm';

export default function Home(){
    return(
        <div>
            <Navbar/>
            <VideoPreview/>
            <VideoPreview/>
            <UploadForm/>
        </div>
    )
}
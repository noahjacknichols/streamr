import Navbar from '../components/navbar';
import Video from '../components/video';
import VideoPreview from '../components/preview';

export default function Home(){
    return(
        <div>
            <Navbar/>
            <VideoPreview/>
            <VideoPreview/>
        </div>
    )
}
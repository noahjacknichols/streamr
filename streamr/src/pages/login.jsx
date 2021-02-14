import Navbar from "../components/navbar";
import LoginForm from "../components/forms/loginForm";

export default function Home() {
    return (
        <div>
            <Navbar />
            {/* <VideoPreview/>
            <VideoPreview/> */}
            {/* <UploadForm/> */}
            <LoginForm />
        </div>
    );
}

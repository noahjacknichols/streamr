import { withRouter } from "react-router";
import React from "react";
import Navbar from "../components/navbar";
import Video from "../components/videoPlayers/video";

// export default function Home() {
//   console.log('state:', this.props.location.state)
//     return (
//         <div>
//             <Navbar />
//             <Video {...videoJsOptions}/>
//         </div>
//     );
// }

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoJsOptions: {
                autoplay: true,
                // controls: true,
                preload: "auto",
                sources: [
                    {
                        src: `https://streamr-destination-bucket.s3.amazonaws.com
                            /${this.props?.location?.pathname?.split("/").pop()}.m3u8`,
                        type: "application/x-mpegURL",
                    },
                ],
                allowfullscreen: "true",
            },
        };
    }
    render() {
        console.log("prop:", this.props?.location?.pathname?.split("/").pop());
        return (
            <div>
                <Navbar />
                <Video {...this.state.videoJsOptions} />
            </div>
        );
    }
}

export default withRouter(Home);

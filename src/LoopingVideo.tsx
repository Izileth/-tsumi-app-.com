const LoopingVideo = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
                autoPlay
                muted
                loop
                className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2"
                style={{
                    minWidth: '100%',
                    minHeight: '100%',
                    opacity: 0.1
                }}
            >
                <source src="https://videos.pexels.com/video-files/853877/853877-hd_1920_1080_25fps.mp4" type="video/mp4" />
            </video>
        </div>
    );
};

export default LoopingVideo;

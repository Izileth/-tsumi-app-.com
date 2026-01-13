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
                <source src="https://v1.pinimg.com/videos/iht/expMp4/73/10/0a/73100ac3ba00396f3c30bd44e558dce6_720w.mp4" type="video/mp4" />
            </video>
        </div>
    );
};

export default LoopingVideo;

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video bg-gradient-to-r from-black pt-[20%] px-28 md:px-16 absolute flex gap-2 flex-col">
      <div>
        <h1 className="text-xl md:text-3xl font-bold text-white">{title}</h1>
        <p className="hidden md:inline-block py-3 text-sm md:text-md w-3/4  md:w-1/3 md: font-normal text-white">
          {overview}
        </p>
      </div>
      <div className="">
        <button className="p-3 px-8 md:px-12 bg-white rounded-md text-md md:text-xl hover:bg-gray-400 font-medium transition-colors">
          ⯈ Play
        </button>
        <button className="mx-2 p-3 px-4 md:px-8 bg-gray-500 rounded-md text-md md:text-xl font-medium text-white bg-opacity-50 hover:bg-opacity-20 transition-colors">
          🛈 More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
const WatchMovie = ({ videoKey, onClose, title, overview }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4">
      <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl z-10 cursor-pointer"
        >
          ✕
        </button>
        <div className="aspect-video w-full">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-6 max-h-60 overflow-y-auto">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-300 text-sm">{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default WatchMovie;
import { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);

  const searchText = useRef(null);

  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    const userQuery = searchText.current?.value;

    if (!userQuery) {
      alert("Please enter a search query.");
      return;
    }

    const gptQuery =
      "Act as a Movie Recommendation system, please suggest some movies for the query: " +
      userQuery +
      ". Only give me names of five movies, comma separated like the example result. Example: Kalki, Animal, Gadar, Housefull 5, Hera Pheri";

    try {
      const gptResults = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // safer for Free Tier
        messages: [{ role: "user", content: gptQuery }],
      });

      console.log("GPT response:", gptResults.choices);
      console.log(gptResults.choices[0]?.message?.content);
      const gptMovies = gptResults.choices[0]?.message?.content.split(",");
      const promiseArray = gptMovies.map((movie) =>
        searchMovieTMDB(movie.trim())
      );

      const tmdbResults = await Promise.all(promiseArray);

      console.log(tmdbResults);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("API call failed:", error);

      if (error.response?.status === 429) {
        alert("Too many requests. Please wait a minute and try again.");
      } else if (error.response?.status === 401) {
        alert("Unauthorized. Check your API key and access level.");
      } else {
        alert("Something went wrong. Check console for details.");
      }
    }
  };

  return (
    <div className="pt-[18%] flex justify-center">
      <form
        className="w-full md:w-2/3 bg-black/70 rounded-md grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 bg-white rounded-md"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 text-lg bg-red-700 text-white rounded-md"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
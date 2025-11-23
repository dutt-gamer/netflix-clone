export const NETFLIX_LOGO =
  "https://www.freepnglogos.com/uploads/netflix-logo-drawing-png-19.png";

export const DEFAULT_LOGO =
  "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg";

export const USER_LOGO =
  "https://lh3.googleusercontent.com/a/ACg8ocJnERgDBhguQCuu06rE4vAxO8L3z9OCpsM8Dg13K-5yrNrcoZFh=s288-c-no";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer " + import.meta.env.VITE_TMDB_KEY,
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/6863f6e8-d419-414d-b5b9-7ef657e67ce4/web/IN-en-20250602-TRIFECTA-perspective_27a3fdfa-126f-4148-b153-55d60b51be6a_large.jpg";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
];

export const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;

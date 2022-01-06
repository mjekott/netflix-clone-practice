import React from "react";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  console.log(location);
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  return <div>search</div>;
};

export default Search;

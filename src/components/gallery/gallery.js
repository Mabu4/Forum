import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

const Gallery = () => {
  const [url, setUrl] = useState(
    "https://api.unsplash.com/photos?client_id=RF5GMFuwL8xSnJ949gI5G-IDw6gj2h4RzKcqXAqn-mA"
  );
  const { data: images } = useFetch(url);
  console.log(images);

  return <div></div>;
};

export default Gallery;

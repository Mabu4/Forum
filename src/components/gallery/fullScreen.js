import React, { useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

const FullScreen = ({ id, setFullscreenVisibility }) => {
  const [url, setUrl] = useState(
    `https://api.unsplash.com/photos/${id}?client_id=RF5GMFuwL8xSnJ949gI5G-IDw6gj2h4RzKcqXAqn-mA`
  );
  const { data: image, isPending, error } = useFetch(url);

  const wrapperRef = useRef(null);

  const toggleScreen = () => {
    setFullscreenVisibility((prev) => !prev);
  };

  useOutsideAlerter(wrapperRef, setFullscreenVisibility);

  return (
    <div>
      {error && <div>{error}</div>}
      {isPending && <div>Lädt.....</div>}
      {image && (
        <div className="fullscreen-outer">
          <img src={image.urls.regular} alt="" ref={wrapperRef} />
        </div>
      )}
    </div>
  );
};

export default FullScreen;

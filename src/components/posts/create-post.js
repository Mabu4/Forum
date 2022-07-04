import React, { useState } from "react";
import { profiles } from "../../assets/img/images";
import { useFetch } from "../../hooks/useFetch";

const CreatePost = ({ addPost }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [choosenProfile, setChoosenProfile] = useState(null);
  const [choosenImage, setChoosenImage] = useState(null);
  const [id, setId] = useState(null);
  const [url, setUrl] = useState(
    "https://api.unsplash.com/photos?client_id=RF5GMFuwL8xSnJ949gI5G-IDw6gj2h4RzKcqXAqn-mA"
  );
  const { data: images, isPending, error } = useFetch(url);

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      name: name,
      text: text,
      choosenProfile: choosenProfile,
      choosenImage: choosenImage,
      id: id,
      date: new Date().getTime(),
    };
    addPost(post);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setText("");
    setChoosenProfile(null);
    setChoosenImage(null);
    setId(null);
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <label className="name">
        <h4>Name</h4>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
        />
      </label>
      <label className="text">
        <h4>Text</h4>
        <textarea onChange={(e) => setText(e.target.value)} value={text} />
      </label>
      <label className="profil">
        <h4>Profilbild</h4>
        <div className="image-list">
          {profiles.map((profil, index) => {
            return (
              <img
                key={index}
                src={profil}
                id={index}
                onClick={() => setChoosenProfile(profil)}
                className={
                  choosenProfile !== null
                    ? choosenProfile === profil
                      ? "active-image"
                      : "inactive-image"
                    : ""
                }
              />
            );
          })}
        </div>
      </label>
      <label>
        <h4>Hauptbild</h4>
        {isPending && <div>Loading.....</div>}
        {error && <div>{error}</div>}
        {images && (
          <div className="image-list">
            {images.map((image) => {
              return (
                <img
                  key={image.id}
                  src={image.urls.regular}
                  onClick={() => {
                    setChoosenImage(image.urls.regular);
                    setId(image.id);
                  }}
                  className={
                    choosenImage !== null
                      ? choosenImage === image.urls.regular
                        ? "active-image"
                        : "inactive-image"
                      : ""
                  }
                />
              );
            })}
          </div>
        )}
      </label>
      <button type="submit">Posten</button>
    </form>
  );
};

export default CreatePost;

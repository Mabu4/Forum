import React, { useEffect, useState } from "react";

// Images / Icons
import menu from "../../assets/img/menu.png";
import like from "../../assets/img/favorite.svg";
import bubble from "../../assets/img/comment.svg";
import send from "../../assets/img/send.svg";
import bookmark from "../../assets/img/bookmark.svg";
import avatar from "../../assets/img/avatar.png";

const PostModel = ({ post }) => {
  const { name, text, choosenProfile, choosenImage, id, date: postDate } = post;
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [minutes, setMinutes] = useState(null);

  useEffect(() => {
    let intervalID = setInterval(() => {
      const actualDate = new Date().getTime();
      const difference = actualDate - postDate;
      setMinutes(Math.floor((difference / 1000 / 60) << 0));
    }, 100);
    return () => clearInterval(intervalID);
  }, []);

  const handleEnter = () => {
    const newComment = {
      text: comment,
      date: new Date().getTime(),
    };
    setComments((prevComments) => {
      return [...prevComments, newComment];
    });
    setComment("");
  };

  const handleOpen = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <div key={id} className="post">
      <section className="header">
        <div className="profile">
          <img src={choosenProfile} />
          <h3>{name}</h3>
        </div>
        <div>
          <img className="menu" src={menu} onClick={handleOpen} />
          {openMenu && (
            <div className="menu-outer">
              <div className="menu-inner">
                <a>Einstellungen</a>
                <a>Zum Profil</a>
                <a>Melden</a>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="image">
        <img src={choosenImage} alt="" />
      </section>
      <section className="actionbar">
        <div>
          <img
            src={like}
            onClick={() => setLikes((prevLikes) => prevLikes + 1)}
          />
          <img
            src={bubble}
            onClick={() => document.getElementById("input").focus()}
          />
          <img src={send} onClick={handleEnter} />
        </div>
        <img src={bookmark} />
      </section>
      <section className="likes">
        <span>{likes}</span> Likes
      </section>
      <section className="description">
        <span className="name">{name}</span>
        <span className="text">{text}</span>
      </section>
      {comments && (
        <section className="comments">
          {comments.map((comment) => {
            return (
              <div className="element" key={comment.date}>
                <div className="avatar-outer">
                  <img className="avatar-img" src={avatar} />
                </div>
                <span>{comment.text}</span>
              </div>
            );
          })}
        </section>
      )}
      <section className="comment-field">
        <div className="avatar-outer">
          <img className="avatar-img" src={avatar} />
        </div>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleEnter()}
          type="text"
          placeholder="Add comment..."
          id="input"
        />
      </section>
      <section className="publication">{minutes} minutes ago</section>
    </div>
  );
};

export default PostModel;

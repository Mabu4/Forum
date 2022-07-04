import React, { useEffect, useRef, useState } from "react";
import FullScreen from "../gallery/fullScreen.js";

// Images / Icons
import menu from "../../assets/img/menu.png";
import like from "../../assets/img/favorite.svg";
import bubble from "../../assets/img/comment.svg";
import send from "../../assets/img/send.svg";
import bookmark from "../../assets/img/bookmark.svg";
import avatar from "../../assets/img/avatar.png";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

const PostModel = ({ post }) => {
  const { name, text, choosenProfile, choosenImage, id, date: postDate } = post;
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [fullscreenVisibility, setFullscreenVisibility] = useState(false);
  const [minutes, setMinutes] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    let intervalID = setInterval(() => {
      const actualDate = new Date().getTime();
      const difference = actualDate - postDate;
      setMinutes(Math.floor((difference / 1000 / 60) << 0));
    }, 100);
    return () => clearInterval(intervalID);
  }, [postDate]);

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

  useOutsideAlerter(wrapperRef, setMenuVisibility);

  return (
    <div key={id} id="post" className="post">
      <section className="header">
        <div className="profile">
          <img alt="" src={choosenProfile} />
          <h3>{name}</h3>
        </div>
        <div>
          <img
            className="menu"
            alt=""
            src={menu}
            onClick={() => setMenuVisibility((prev) => !prev)}
          />
          {menuVisibility && (
            <div ref={wrapperRef} className="menu-outer">
              <div className="menu-inner">
                <button>Einstellungen</button>
                <button>Zum Profil</button>
                <button>Melden</button>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="image">
        <img
          src={choosenImage}
          alt=""
          onClick={() => setFullscreenVisibility(true)}
        />
        {fullscreenVisibility && (
          <FullScreen
            setFullscreenVisibility={setFullscreenVisibility}
            id={id}
          />
        )}
      </section>
      <section className="actionbar">
        <div>
          <img
            src={like}
            alt="like"
            onClick={() => setLikes((prevLikes) => prevLikes + 1)}
          />
          <img
            src={bubble}
            alt="bubble"
            onClick={() => document.getElementById("input").focus()}
          />
          <img src={send} onClick={handleEnter} alt="send" />
        </div>
        <img src={bookmark} alt="bookmark" />
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
                  <img className="avatar-img" alt="avatar" src={avatar} />
                </div>
                <span>{comment.text}</span>
              </div>
            );
          })}
        </section>
      )}
      <section className="comment-field">
        <div className="avatar-outer">
          <img className="avatar-img" alt="avatar" src={avatar} />
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

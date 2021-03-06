import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Gallery from "./components/gallery/gallery";
import Navbar from "./components/navbar";
import Notes from "./components/notes/notes";
import Posts from "./components/posts/posts";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Posts />}></Route>
        <Route path="notes" element={<Notes />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;

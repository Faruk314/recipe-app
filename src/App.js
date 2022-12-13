import "./App.css";
import Meals from "./components/Meals";
import Search from "./components/Search";
import Modal from "./components/Modal";
import { useGlobalContext } from "./context";
import Favorites from "./components/Favorites";

export default function App() {
  const { showModal, favorites } = useGlobalContext();

  return (
    <main className="main">
      <Search />
      {favorites.length > 0 ? <Favorites /> : ""}
      {showModal && <Modal />}
      <Meals />
    </main>
  );
}

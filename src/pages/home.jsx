import { useContext, useEffect, useState } from "react";
import { Game } from "../components/game";
import { Contextapp } from "../api/context";
const Home = () => {
  const context = useContext(Contextapp);
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    if (!context.data.loading) {
      setJuegos(context.data.juegos);
    }
  }, [context.data.juegos, context.data.loading]);
  return (
    <main className="container-carrusel">
      <div className="container-list">
      <section className="games-container">
        {juegos.map((juego) => (
          <Game key={juego.id_juego} juego={juego} />
        ))}
      </section>
      </div>
    </main>
  );
};

export default Home;

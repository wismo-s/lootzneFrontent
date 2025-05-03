import { Contextapp } from "../api/context";
import { useContext } from "react";
import { Game } from "../components/game";
import { Link } from "react-router-dom";

export function Games() {
  const context = useContext(Contextapp);
  console.log(context.data.juegos);
  return context.data.loading ? (
    <main className="text-center text-white">Cargando...</main>
  ) : (
    <main>
      <section className="games-container">
        {context.data.juegos.map((juego) => (
          <Game key={juego.id_juego} juego={juego} />
        ))}
        <Link className="add-game" to="/games/form">
          +
        </Link>
      </section>
    </main>
  );
}

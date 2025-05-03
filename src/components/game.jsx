import { useContext } from "react"
import { Contextapp } from "../api/context";
import { Link } from "react-router-dom";

export function Game({juego}) {

  const context = useContext(Contextapp);
  

  return (
    <article className="game-item">
        <Link to={`/games/${juego.id_juego}`}>
        <div className="game-img">
         <img src={juego.portada} alt="" />
        </div>
        <div className="game-data">
          <h2>{juego.titulo}</h2>
          <p className="game-title">{juego.desarrollador.nom_desarrollador}</p>
          <p className="game-date">{juego.fecha_lanzamiento}</p>
          <span><p className="game-price">${juego.precio}</p></span>
        </div>
        </Link>
    </article>
  )
}

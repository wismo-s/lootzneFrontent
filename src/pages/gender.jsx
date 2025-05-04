import { useContext, useEffect, useState } from "react";
import { Contextapp } from "../api/context";
import { useParams } from "react-router-dom";
import { listAllObj } from "../api/list.api";
import { Game } from "../components/game";

export function Gender() {
  const context = useContext(Contextapp);
  const { id } = useParams();
  const [data, setData] = useState(null);
    useEffect(() => {
      async function getData() {
        const response = await listAllObj(`generos/${id}`);
        setData(response.data);
        console.log(response.data);
      }
      getData();
      console.log(data);
    }, []);

  if (!data) return <p>Cargando...</p>;

  return (
    <main style={{ paddingTop: 0 }}>
      <section className="gender-banner">
        <img src={data.imagen} />
        <h1>{data.nom_genero}</h1>
      </section>
      <section className="games-container">
        {data.juegos.map((juego) => (
          <Game key={juego.id_juego} juego={juego} />
        ))}
      </section>
    </main>
  );
}

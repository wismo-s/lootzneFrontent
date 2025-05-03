import { useContext, useEffect, useState } from "react";
import { listAllObj } from "../api/list.api";
import { Contextapp } from "../api/context";
import { useParams } from "react-router-dom";
import { Game } from "../components/game";

export function Developer() {
  const context = useContext(Contextapp);
  const { id } = useParams();

 const [data, setData] = useState(null);
     useEffect(() => {
       async function getData() {
         const response = await listAllObj(`desarrollador/${id}`);
         setData(response.data);
         console.log(response.data);
       }
       getData();
       console.log(data);
     }, []);
 
   if (!data) return <p>Cargando...</p>;

  return (
    <main style={{ paddingTop: 0 }}>
      <section className="developer-banner">
        <img src={data.imagen} alt="" />
        <div className="developer-info">
          <img src={data.imagen} alt="" />
          <div className="developer-details">
            <h1>{data.nom_desarrollador}</h1>
            <p>{data.descripcion}</p>
          </div>
        </div>
      </section>
      <section className="games-container">
        {data.juegos.map((juego) => (
          <Game key={juego.id_juego} juego={juego} />
        ))}
      </section>
    </main>
  );
}

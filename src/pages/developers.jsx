import { useContext } from "react"
import { Contextapp } from "../api/context";
import { Link } from "react-router-dom"

export function Developers() {
  const context = useContext(Contextapp);

    return (
      <main>
        <section className="developers-container">
        {context.data.desarrolladores.map(dev=>(
          <article key={dev.id_desarrollador} className="developer-item" >
            <Link to={`/developers/${dev.id_desarrollador}`}>
            <div className="developer-img">
             <img src={dev.imagen} alt="" />
            </div>
            <h2 className="">{dev.nom_desarrollador}</h2>
            </Link>
          </article>
        ))}
        <Link className='add-developer' to='/developers/form'>+</Link>
        </section>
      </main>
    )
  }
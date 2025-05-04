import { useContext } from "react"
import { Contextapp } from "../api/context";
import { Link } from "react-router-dom"

export function Genders() {
  const context = useContext(Contextapp);

  return (
    <main>
      <section className="genders-container">
      {context.data.generos.map(genero =>(
        <article className="gender-item" key={genero.id_genero}>
          <Link to={`/gender/${genero.id_genero}`}>
          <div className="gender-img">
            <img src={genero.imagen} className="" />
          </div>
          <h2>{genero.nom_genero}</h2>
          </Link>
        </article>
      ))}
      <Link className="add-gender" to='/gender/form'>+</Link>
      </section>
    </main>
  )
}
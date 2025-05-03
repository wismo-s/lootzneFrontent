import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { ContextCart, Contextapp } from '../api/context';
import { cartEdit } from '../api/list.api'
import { Link } from "react-router-dom";


export function Gamesdatail() {

    const context = useContext(Contextapp);
    const cartContext = useContext(ContextCart)
    const { id } = useParams();

    const [juego] = context.data.juegos.filter(juego => juego.id_juego == id)

    useEffect(()=> {window.scrollTo(0,0)},[])
    
    async function handleClick() {
        const yaExiste = cartContext.carritto.some(j => j.id_juego === juego.id_juego);
        if (yaExiste) return;

        const updatedCart = [...cartContext.carritto, juego];
        cartContext.setCart(updatedCart);
      
        await cartEdit({
          juegosAgregar: [juego.id_juego],
          juegosEliminar: []
        });
      }
      

  return (
    <main>
    <section className='game-header'>
        <img src={juego.imagen} alt="" />
        <div className="game-details">
            <div className="game-title">
                <h1>{juego.titulo}</h1>
                <p>${juego.precio}</p>
            </div>
            <Link className='game-studio' to={`/developers/${juego.desarrollador.id_desarrollador}/`}>{juego.desarrollador.nom_desarrollador}</Link>
            <p className='game-description'>{juego.descripcion}</p>
            <div className="game-info">
                <p className="game-release"><span>Fecha de lanzamiento: </span>{juego.fecha_lanzamiento}</p>
                <p className="game-units"><span>Unidades Vendidas:</span> {juego.num_ventas}</p>
            </div>
            <div className="game-category"><span>Generos:</span>
                {juego.generos.map(gen => (
                <Link className=" bg-violet-900 hover:bg-purple-800" key={gen.id_genero} to={`/gender/${gen.id_genero}/`}><p>{gen.nom_genero}</p></Link>
                ))}
            </div>
            <div className="game-footer">
                <span>Metacritic: </span> 
                <p>{juego.calificaion}</p>
                <button value={juego.id_juego} onClick={handleClick} >Agregar al Carrito</button>
            </div>
        </div>
    </section>
    <section className='game-info'>
        <iframe title="YouTube Video" src={`https://www.youtube.com/embed/${juego.trailer}`} className="w-full mb-5 mt-5 h-[700px]" allowFullScreen></iframe>
        <img src={juego.portada} alt="" className="w-full mb-5 mt-5" />
    </section>
    </main>
  )
}


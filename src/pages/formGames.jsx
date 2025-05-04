import { useState, useEffect, useContext } from "react"
import { listAllObj } from "../api/list.api";
import Multiselect from 'multiselect-react-dropdown'
import { postform } from "../api/list.api";
import { Contextapp } from "../api/context";
import { useNavigate } from 'react-router-dom';


export function FormGames() {
  const context = useContext(Contextapp);
  const navigate = useNavigate()

  const [formdata, setformdata] = useState({
    titulo: '',
    descripcion: '',
    imagen: '',
    portada: '',
    trailer: '',
    fecha_lanzamiento: '',
    num_ventas: 0,
    calificaion: 0,
    desarrollador: 1,
    precio: 0,
    generos: [],
  })
  const [gendata, setgendata] = useState([])
  const [devs, setdevs] = useState([]);
  const [gender, setGender] = useState([])

  useEffect(() => {
      setdevs(context.data.desarrolladores);
      setGender(context.data.generos);
      console.log(context.data);
      
  }, []);

  const options = devs.map(dev => ({ id: dev.id_desarrollador, name: dev.nom_desarrollador }));
  const gends = gender.reduce((acc, gen)=>{
    acc[gen.id_genero] = { 'name': gen.nom_genero, 'id': gen.id_genero };
    return acc
  }, [])

  const handleinputchange = (e) => {
    const { name, value } = e.target;
    setformdata({...formdata, [name] : value})
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    formdata.generos = gendata;
    console.log(formdata);
    await postform('juego',formdata)
    navigate('/')
    window.location.reload(true);
  }

  const handlesubmitMultiselect = (e) =>{
    const gendfilter = e.reduce((acc, e)=>{
      acc.push(e.id)
      return acc
    },[])
    setgendata(gendfilter)
  }
  const handledeleteMultiselect = (e) =>{
    const gendfilter = e.reduce((acc, e)=>{
      acc.push(e.id)
      return acc
    },[])
    setgendata(gendfilter)
  }
  const splitdata = (e) =>{
    const { name, value } = e.target;
    const [youtube, codigo] = value.split('=')
    setformdata({...formdata, [name] : codigo})
    console.log(formdata.trailer);
  }
    return (
      <div className="w-4/5 m-auto mt-3 mb-3 relative  h-full">
        <div style={{ backgroundImage: `url(${formdata.portada})` }} className="video inline-block bg-top bg-cover h-96 w-72 bg-no-repeat relative mb-1"></div>
        <form onSubmit={handlesubmit} className='absolute right-1 top-1 bg-violet-900 p-7 rounded-3xl'>
          <div className='box_form'>
          <input 
            required placeholder=" " 
            className="bg-violet-900 rounded-lg text-3xl font-bold placeholder-slate-300 text-gray-300 mb-4 w-full block input_form_tit" 
            type="text" 
            id="titulo" 
            name="titulo" 
            value={formdata.titulo} 
            onChange={handleinputchange} 
          />
          <label className='label_form text-3xl'>Titulo</label>
          </div>

          <div className='box_form'>
          <input 
            required placeholder=" "  
            className="bg-violet-900 placeholder-slate-300 rounded-lg mb-4 text-gray-300 block w-full input_form" 
            type="text" 
            id="portada" 
            name="portada" 
            value={formdata.portada} 
            onChange={handleinputchange} 
          />
          <label className='label_form'>Imagen portada URL</label>
          </div>

          <div className='box_form'>
          <textarea 
            required className="bg-violet-900 placeholder-slate-300 rounded-lg mb-4 text-gray-300 block w-full input_form" 
            maxLength={250}
            placeholder=" " 
            id="descripcion" 
            name="descripcion" 
            value={formdata.descripcion} 
            onChange={handleinputchange} 
          />
          <label className='label_form'>Descripción</label>
          </div>

          <label htmlFor="fecha_lanzamiento" className="mb-3 text-slate-100">Fecha de Lanzamiento</label>
          <input 
            required className="bg-violet-900 placeholder-slate-300 rounded-lg mb-5 text-gray-300 mr-4 ml-1 input_form" 
            type="date" 
            id="fecha_lanzamiento" 
            name="fecha_lanzamiento" 
            value={formdata.fecha_lanzamiento} 
            onChange={handleinputchange} 
          />

          <label  htmlFor="desarrollador" className="mb-3 text-slate-100">Desarrollador: </label>
          <select 
            required className="bg-violet-900 placeholder-slate-300 rounded-lg mb-5 text-gray-300 ml-1 input_form"  
            name="desarrollador" 
            id="desarrollador" 
            value={formdata.desarrollador} 
            onChange={handleinputchange}
          >
          {options.map(op => (
            <option key={op.id} value={op.id}>{op.name}</option>
          ))}
          </select>

          <Multiselect 
            required className="bg-violet-900 mb-3 placeholder-slate-300 multiselect" 
            isObject={true} 
            options={gends} 
            displayValue="name" 
            selectedValues={formdata.generos} 
            onSelect={handlesubmitMultiselect} 
            onRemove={handledeleteMultiselect}
          />

          <label htmlFor="calificaion" className="mb-3 text-slate-100">Calificacion: </label>
          <input 
            required className="placeholder-slate-300 bg-violet-900 rounded-lg mb-5 text-gray-300 mr-4 ml-1 input_form" 
            type="number" 
            min="0" 
            max="100" 
            id="calificaion" 
            name="calificaion" 
            value={formdata.calificaion} 
            onChange={handleinputchange} 
          />

          <label htmlFor="num_ventas" className="mb-2 text-slate-100">Numero de ventas: </label>
          <input 
            required className="placeholder-slate-300 bg-violet-900 rounded-lg mb-5 text-gray-300 mr-2 ml-1 input_form" 
            type="number" 
            min="0"  
            name="num_ventas" 
            value={formdata.num_ventas} 
            onChange={handleinputchange} 
          />

          <label htmlFor="precio" className="mb-2 text-slate-100 ml-2">Precio: </label>
          <input 
            required className="placeholder-slate-300 bg-violet-900 rounded-lg mb-5 text-gray-300 mr-2 ml-1 input_form" 
            type="number" 
            id="precio" 
            min="0" 
            max="100"
            name="precio" 
            value={formdata.precio} 
            onChange={handleinputchange} 
          />

          <div className='box_form'>
          <input 
            placeholder=" " 
            className="placeholder-slate-300 bg-violet-900 rounded-lg mb-4 text-gray-300 block w-full input_form" 
            type="text" 
            id="imagen" 
            name="imagen" 
            value={formdata.imagen} 
            onChange={handleinputchange} 
          />
          <label className='label_form'>Baner imagen URL</label>
          </div>

          <div className='box_form'>
          <input 
            required placeholder=" "  
            className=" placeholder-slate-300 bg-violet-900 rounded-lg mb-4 text-gray-300 block w-full input_form" 
            type="text" 
            id="trailer" 
            name="trailer" 
            value={formdata.trailer} 
            onChange={splitdata} 
          />
          <label className='label_form'>Trailer url</label>
          </div>

          <button className="bg-violet-950 rounded-lg text-xl m-auto text-gray-300 block p-2 pl-5 pr-5 hover:bg-purple-800">Submit</button>
        </form>
        <div>
          <div className="mb-5 mt-10">
            <iframe  title="YouTube Video" src={`https://www.youtube.com/embed/${formdata.trailer}`} className="w-full" style={{ height: "700px" }} allowFullScreen></iframe>
          </div>
          <div className="mb-5">
            <img src={formdata.imagen} alt="" className="w-full" />
          </div>
        </div>
      </div>
    )
  }
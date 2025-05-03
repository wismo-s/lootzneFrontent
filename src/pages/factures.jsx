import React, { useContext, useState, useEffect } from 'react'
import { Contextapp } from '../api/context'
import { listFacturas } from "../api/list.api";
import { Cartitem } from '../components/cartitem';

export function Factures() {

    const context = useContext(Contextapp)
    const [facturas, setFacturas] = useState([]);  
    const [loading, setLoading] = useState(true);  
  
  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const data = await listFacturas();  
        setFacturas(data);  
        console.log(data);
      } catch (err) {
        setError('Error al cargar las facturas');
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchFacturas();  
  }, []);  


  if (loading) {
    return <div className='text-gray-300 text-2xl'>Cargando facturas...</div>;
  }

  if (!facturas.length) {
    return <div className='text-gray-300 text-2xl'>No hay facturas</div>;
  }

  return (
    <div className='bg-violet-900 m-5 mb-5 p-7 rounded-2xl flex flex-col items-center'>
      {facturas.map(factu => {
        return (
          <div key={factu.id_factura} className='bg-violet-800 mb-2 p-7 rounded-2xl'>
            <h2 className='text-gray-300 text-2xl'>
              {`Factura: ${factu.fecha}`}
            </h2>
            <div className="cart-items">
                          {factu.carrito.juegos.map((item) => (
                            <Cartitem key={item.id_juego} item={item} facturable={true} />
                          ))}
                        </div>
            <p className='text-gray-200 text-2xl font-bold'>TOTAL: ${factu.total}</p>
          </div>
        );
      })}
    </div>
  );
}

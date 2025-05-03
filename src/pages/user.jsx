import React, { useContext  } from 'react'
import { Contextapp } from '../api/context';
import { Link } from 'react-router-dom';

export function User() {
    const context = useContext(Contextapp)
    
    if (!context.session) {
        return(
            <div className='text-gray-300 text-2xl'>Logeate por favor</div>
        )
    }
    return (
        <div className="flex space-x-4 h-screen">
        <div className="w-80 h-80 mt-4 ml-4 mb-2">
          <div
            style={{ backgroundImage: `url(${context.data.usuario.imagePerfil})` }}
            className="h-full w-full bg-top bg-cover bg-no-repeat relative rounded-full"
          ></div>
        </div>
        <div className="flex flex-col bg-violet-900 p-8 rounded-3xl h-fit mt-4">
          <h1 className='text-gray-300 text-2xl mb-2'>usuario: {context.data.usuario.username}</h1>
          <p className='text-gray-300 text-xl mb-1'>email: {context.data.usuario.email}</p>
          <p className='text-gray-300 text-xl mb-1'>nombre: {context.data.usuario.firstName}</p>
          <p className='text-gray-300 text-xl mb-1'>apellido: {context.data.usuario.lastName}</p>
          <Link className='text-xl m-auto bg-violet-950 rounded-lg block p-2 pl-5 pr-5 text-gray-300 hover:bg-purple-800' to="/factures">facturas</Link>
        </div>
      </div>
        )
}
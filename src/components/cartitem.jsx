import React, { useContext } from "react";
import { Contextapp } from "../api/context";
import { FaRegTrashAlt } from "react-icons/fa";

export function Cartitem({ item, handleCLick, facturable = false}) {
  const context = useContext(Contextapp);
  return (
    <div className="cart-item">
      <div className="item-info">
        <img className="item-img" src={item.portada} alt="" />
        <div className="item-name">
          <p className="game-name">{item.titulo}</p>
          <p className="dev-name">{item.desarrollador.nom_desarrollador}</p>
        </div>
      </div>
      <p className="item-price">${item.precio}</p>
      {!facturable && (
        <p className="item-delete">
          <button onClick={() => handleCLick(item)}>
            <FaRegTrashAlt />
          </button>
        </p>
      )}
    </div>
  );
}

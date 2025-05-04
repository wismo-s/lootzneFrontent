import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Contextapp, ContextCart } from "../api/context";
import {
  PiShoppingCartFill as CartFill,
  PiShoppingCart as Cart,
} from "react-icons/pi";

function Header() {
  const context = useContext(Contextapp);
  const { usuario } = context.data;
  const [cartIcon, setCartIcon] = useState(false);
  return (
    <header>
      <Link to="/">Lootzone</Link>
      <Link to="/games">Juegos</Link>
      <Link to="/gender">Generos</Link>
      <Link to="/developers">Desarrolladores</Link>
      
      {!usuario.username ? (
        <div className="account">
          <Link to="/login">Login</Link>
          <Link to="/singin">Registrarse</Link>
        </div>
      ) : (
        <div className="account">
          <Link className="user-profile" to="/user">
            <p>{usuario.username}</p>
            <img src={usuario.imagePerfil} />
          </Link>
          <Link
            className="cart"
            to="/cart"
            onMouseOver={() => setCartIcon(true)}
            onMouseOut={() => setCartIcon(false)}
          >
            {cartIcon ? <CartFill /> : <Cart />}
          </Link>
          <Link to="/logout">Cerrar Session</Link>
        </div>
      ) }
    </header>
  );
}
export default Header;

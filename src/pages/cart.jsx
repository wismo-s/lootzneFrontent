import React, { useContext, useState, useEffect } from "react";
import { Contextapp } from "../api/context";
import { Cartitem } from "../components/cartitem";
import { cartEdit } from "../api/list.api";
import { ContextCart } from "../api/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const context = useContext(Contextapp);
  const [cartitems, setCartitems] = useState([]);
  const cartcontext = useContext(ContextCart);
  const navigate = useNavigate();
  useEffect(() => {
    setCartitems(cartcontext.carritto || []);
    console.log(cartcontext.carritto);
    
  }, [cartcontext.carritto]);

  const pricetotal = cartitems
  .reduce((acc, item) => acc + parseFloat(item.precio), 0)
  .toFixed(2);

  const handleCLick = async (item) => {
    const updatedCartItems = cartitems.filter((product) => product.id_juego !== item.id_juego);
  setCartitems(updatedCartItems);

  const updatedGameIds = updatedCartItems.map((game) => game.id_juego);

  await cartEdit( {
    juegosAgregar: [],
    juegosEliminar: [item.id_juego],
  })
  };
  async function handlePay () {
    if (cartitems.length === 0) {
      alert("El carrito está vacío. Añade productos antes de proceder al pago.");
    }
    const gameIds = cartitems.map((item) => item.id_juego);

  await axios
    .post("http://localhost:8080/api/factura", {
      fecha: new Date(),
      total: (pricetotal * 1.06).toFixed(2),
    })
    .then((res) => {
      setCartitems([]);
      navigate("/");
      window.location.reload(true);
    });
  };

  return (
    <main>
    <section className="cart-content">
      {cartitems.length === 0 ? (
        <div className="empty-cart">
          <h3>El carrito está vacío</h3>
        </div>
      ) : (
        <>
          <article>
            <h3>Carrito de Compras</h3>
            <hr />
            <div className="cart-header">
              <p className="cart-item">Item</p>
              <p className="cart-price">Precio</p>
              <p className="cart-delete">Eliminar</p>
            </div>
            <div className="cart-items">
              {cartitems.map((item) => (
                <Cartitem key={item.id_juego} item={item} handleCLick={handleCLick} />
              ))}
            </div>
          </article>
          <article>
            <h3>Orden de Compra</h3>
            <div className="orden-summary">
              <div className="summary-detail">
                <p>SUBTOTAL</p>
                <span>${pricetotal}</span>
              </div>
              <div className="summary-detail">
                <p>Compra</p>
                <span>$0.00</span>
              </div>
              <div className="summary-detail">
                <p>Impuestos aproximados</p>
                <span>${(pricetotal * 0.06).toFixed(2)}</span>
              </div>
              <hr />
              <div className="summary-detail">
                <span>TOTAL</span>
                <span>${(pricetotal * 1.06).toFixed(2)}</span>
              </div>
              <button className="summary-checkout" onClick={handlePay}>
                CHECKOUT
              </button>
            </div>
          </article>
        </>
      )}
    </section>
  </main>
  );
}

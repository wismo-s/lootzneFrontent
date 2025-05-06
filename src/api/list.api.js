import axios from 'axios'

export const listAllObj = (direcion) => {
     return axios.get(`http://localhost:8080/api/${direcion}`)
}
export const postform = (direcion, info) => {
     return axios.post(`http://localhost:8080/api/${direcion}`, info).catch(err => console.log(err))
}
export const userCarrito= () => {
     return axios.get('http://localhost:8080/api/carrito').then(res => {return [res.data.juegos]}).catch(err => [])
}
export const userAuth = () => {
     return axios.get('http://localhost:8080/api/auth/me').then(res => {return [res.data, true]}).catch(err => [{}, false])
}
export const cartEdit = (list) =>{
     return axios.put(`http://localhost:8080/api/carrito/juegos`, list)
}
export const listFacturas = () =>{
     return axios.get(`http://localhost:8080/api/factura`).then(res => {return res.data}).catch(err => [])
}
export const mandarCorreo = (correo, carritoId) =>{
     return axios.get(`http://localhost:8080/api/factura/enviarPdf/${correo}/${carritoId}`).then(x => console.log(x)).catch(err => console.log(err))
}

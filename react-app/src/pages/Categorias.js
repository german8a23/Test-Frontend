import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import { FaRegPenToSquare } from "react-icons/fa6";
import '../componentes/categorias.scss';

const TablaCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombreFiltro, setNombreFiltro] = useState('');
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [editarCategoriaData, setEditarCategoriaData] = useState({  id: null, nombre: '' });
  const [showCrearModal, setShowCrearModal] = useState(false);
  const [nuevoNombreCategoria, setNuevoNombreCategoria] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al obtener las categorías', error);
    }
  }

  const editarCategoria = (id, nombre) => {
    setEditarCategoriaData({ id, nombre });
    setShowEditarModal(true);
  }

  const guardarCambiosCategoria = async () => {
    try {
      if (editarCategoriaData.id && typeof editarCategoriaData.id === 'string') {
        // Verificar si el ID está definido y es una cadena de texto válida
        await axios.put(`http://localhost:3000/categorias/${editarCategoriaData.id}`, {
          nombre: editarCategoriaData.nombre,
        });
        setShowEditarModal(false);
        fetchData();
      } else {
        console.error('El ID de la categoría no está definido o no es válido');
      }
    } catch (error) {
      console.error('Error al editar la categoría', error);
    }
  }

    const eliminarCategoria = (id) => {
    axios.delete(`http://localhost:3000/categorias/${id}`)
      .then(response => {
        console.log(response);
        fetchData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  const crearCategoria = async (nombre) => {
    try {
      await axios.post('http://localhost:3000/categorias', {
        nombre,
      });
      setShowCrearModal(false);
      setNuevoNombreCategoria('');
      fetchData();
    } catch (error) {
      console.error('Error al crear la categoría', error);
    }
  }

  const filtrarCategorias = useCallback(async () => {
    if (nombreFiltro.trim() === '') {
      fetchData();
    } else {
      const response = await axios.get(`http://localhost:3000/categorias/buscar/${nombreFiltro}`);
      setCategorias(response.data);
    }
  }, [nombreFiltro]);

  useEffect(() => {
    filtrarCategorias();
  }, [filtrarCategorias]);


  // const filtrarPorNombre = () => {
  //   if (!nombreFiltro) {
  //     fetchData();
  //   } else {
  //     const categoriasFiltradas = categorias.filter(categoria =>
  //       categoria.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())
  //     );
  //     setCategorias(categoriasFiltradas);
  //   }
  // }

  return (
    <div className='input-filtro-categorias'>
          <input
          type="text"
          placeholder="Filtrar por nombre"
          value={nombreFiltro}
          onChange={(event) => setNombreFiltro(event.target.value)}
        />
        
      {/* <input 
        type="text" 
        placeholder="Filtrar por nombre" 
        onChange={(e) => {
          setNombreFiltro(e.target.value);
          filtrarPorNombre();
        }} 
      /> */}

        {/* Modal de Creación */}
        <Modal show={showCrearModal} onHide={() => setShowCrearModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNuevaCategoriaNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese el nombre de la nueva categoría" 
                value={nuevoNombreCategoria}
                onChange={(e) => setNuevoNombreCategoria(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCrearModal(false)}>
            Cancelar
          </Button>
          <Button variant='primary' onClick={() => crearCategoria(nuevoNombreCategoria)}>
            Crear Categoría
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='boton-crear-categoria'>
      <Button onClick={() => setShowCrearModal(true)}>
        Crear Categoría
      </Button>
      </div>

      <Table className='tabla-contenedor-categorias'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nombre}</td>
              <td>
                <Button variant='primary' onClick={() => editarCategoria(categoria._id, categoria.nombre)}>
                <FaRegPenToSquare />
                  {/* <FaIcons.FaPen/> */}
                </Button>{' '}
                <Button variant='primary' onClick={() => eliminarCategoria(categoria._id)}>
                  <FaIcons.FaTrashAlt/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de Edición */}
      <Modal show={showEditarModal} onHide={() => setShowEditarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCategoriaNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese el nuevo nombre" 
                value={editarCategoriaData.nombre}
                onChange={(e) => setEditarCategoriaData({ ...editarCategoriaData, nombre: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditarModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarCambiosCategoria}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TablaCategorias;































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Modal, Form } from 'react-bootstrap';
// import * as FaIcons from 'react-icons/fa';
// import '../componentes/categorias.scss';

// const TablaCategorias = () => {
//   const [categorias, setCategorias] = useState([]);
//   const [nombreFiltro, setNombreFiltro] = useState('');
//   const [showEditarModal, setShowEditarModal] = useState(false);
//   const [editarCategoriaData, setEditarCategoriaData] = useState({ id: null, nombre: '' });
//   const [showCrearModal, setShowCrearModal] = useState(false);
//   const [nuevoNombreCategoria, setNuevoNombreCategoria] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/categorias');
//       setCategorias(response.data);
//     } catch (error) {
//       console.error('Error al obtener las categorías', error);
//     }
//   }

//   const editarCategoria = (id, nombre) => {
//     setEditarCategoriaData({ id, nombre });
//     setShowEditarModal(true);
//   }

//   const guardarCambiosCategoria = async () => {
//     try {
//       await axios.put(`http://localhost:3000/categorias/${editarCategoriaData.id}`, {
//         nombre: editarCategoriaData.nombre,
//       });
//       setShowEditarModal(false);
//       fetchData();
//     } catch (error) {
//       console.error('Error al editar la categoría', error);
//     }
//   }

//   const eliminarCategoria = (id) => {
//     axios.delete(`http://localhost:3000/categorias/${id}`)
//       .then(response => {
//         console.log(response);
//         fetchData();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   const crearCategoria = async (nombre) => {
//     try {
//       await axios.post('http://localhost:3000/categorias', {
//         nombre,
//       });
//       setShowCrearModal(false);
//       setNuevoNombreCategoria('');
//       fetchData();
//     } catch (error) {
//       console.error('Error al crear la categoría', error);
//     }
//   }

//   const filtrarPorNombre = () => {
//     if (!nombreFiltro) {
//       fetchData();
//     } else {
//       const categoriasFiltradas = categorias.filter(categoria =>
//         categoria.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())
//       );
//       setCategorias(categoriasFiltradas);
//     }
//   }

//   return (
//     <div>
//       <input 
//         type="text" 
//         placeholder="Filtrar por nombre" 
//         onChange={(e) => {
//           setNombreFiltro(e.target.value);
//           filtrarPorNombre();
//         }} 
//       />

//       <Table className='tabla-contenedor-categorias' striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nombre</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categorias.map((categoria) => (
//             <tr key={categoria.id}>
//               <td>{categoria.id}</td>
//               <td>{categoria.nombre}</td>
//               <td>
//                 <Button variant="primary" size="sm" onClick={() => editarCategoria(categoria.id, categoria.nombre)}>
//                   <FaIcons.FaPen/>
//                 </Button>{' '}
//                 <Button variant="danger" size="sm" onClick={() => eliminarCategoria(categoria.id)}>
//                   <FaIcons.FaTrashAlt/>
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Modal de Edición */}
//       <Modal show={showEditarModal} onHide={() => setShowEditarModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Editar Categoría</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formCategoriaNombre">
//               <Form.Label>Nombre</Form.Label>
//               <Form.Control 
//                 type="text" 
//                 placeholder="Ingrese el nuevo nombre" 
//                 value={editarCategoriaData.nombre}
//                 onChange={(e) => setEditarCategoriaData({ ...editarCategoriaData, nombre: e.target.value })}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowEditarModal(false)}>
//             Cancelar
//           </Button>
//           <Button variant="primary" onClick={guardarCambiosCategoria}>
//             Guardar Cambios
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Modal de Creación */}
//       <Modal show={showCrearModal} onHide={() => setShowCrearModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Crear Categoría</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formNuevaCategoriaNombre">
//               <Form.Label>Nombre</Form.Label>
//               <Form.Control 
//                 type="text" 
//                 placeholder="Ingrese el nombre de la nueva categoría" 
//                 value={nuevoNombreCategoria}
//                 onChange={(e) => setNuevoNombreCategoria(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowCrearModal(false)}>
//             Cancelar
//           </Button>
//           <Button variant="primary" onClick={() => crearCategoria(nuevoNombreCategoria)}>
//             Crear Categoría
//           </Button>
//         </Modal.Footer>
//       </Modal>
      
//       <Button variant="success" onClick={() => setShowCrearModal(true)}>
//         Crear Categoría
//       </Button>
//     </div>
//   );
// };

// export default TablaCategorias;















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Modal, Form } from 'react-bootstrap';
// import * as FaIcons from 'react-icons/fa';
// import '../componentes/categorias.scss';

// const TablaCategorias = () => {
//   const [categorias, setCategorias] = useState([]);
//   const [nombreFiltro, setNombreFiltro] = useState('');
//   const [showEditarModal, setShowEditarModal] = useState(false);
//   const [editarCategoriaData, setEditarCategoriaData] = useState({ id: null, nombre: '' });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const response = await axios.get('http://localhost:3000/categorias');
//     setCategorias(response.data);
//   }

//   const editarCategoria = (id, nombre) => {
//     setEditarCategoriaData({ id, nombre });
//     setShowEditarModal(true);
//   }

//   const guardarCambiosCategoria = async () => {
//     try {
//       await axios.put(`http://localhost:3000/categorias/${editarCategoriaData.id}`, {
//         nombre: editarCategoriaData.nombre,
//       });
//       setShowEditarModal(false);
//       fetchData();
//     } catch (error) {
//       console.error('Error al editar la categoría', error);
//     }
//   }

//   const eliminarCategoria = (id) => {
//     axios.delete(`http://localhost:3000/categorias/${id}`)
//       .then(response => {
//         console.log(response);
//         fetchData();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   const crearCategoria = async (nombre) => {
//     try {
//       await axios.post('http://localhost:3000/categorias', {
//         nombre,
//       });
//       fetchData();
//     } catch (error) {
//       console.error('Error al crear la categoría', error);
//     }
//   }

//     const filtrarPorNombre = () => {
//     if (!nombreFiltro) {
//       fetchData();
//     } else {
//       const categoriasFiltradas = categorias.filter(categoria =>
//         categoria.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())
//       );
//       setCategorias(categoriasFiltradas);
//     }
//   }

//     return (
//     <div>
//       <input 
//         type="text" 
//         placeholder="Filtrar por nombre" 
//         onChange={(e) => {
//           setNombreFiltro(e.target.value);
//           filtrarPorNombre();
//         }} 
//       />

//       <Table className='tabla-contenedor-categorias' striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nombre</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categorias.map((categoria) => (
//             <tr key={categoria.id}>
//               <td>{categoria.id}</td>
//               <td>{categoria.nombre}</td>
//               <td>
//                 <Button variant="primary" size="sm" onClick={() => editarCategoria(categoria.id, categoria.nombre)}>
//                   <FaIcons.FaPen/>
//                 </Button>{' '}
//                 <Button variant="danger" size="sm" onClick={() => eliminarCategoria(categoria.id)}>
//                   <FaIcons.FaTrashAlt/>
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Modal de Edición */}
//       <Modal show={showEditarModal} onHide={() => setShowEditarModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Editar Categoría</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formCategoriaNombre">
//               <Form.Label>Nombre</Form.Label>
//               <Form.Control 
//                 type="text" 
//                 placeholder="Ingrese el nuevo nombre" 
//                 value={editarCategoriaData.nombre}
//                 onChange={(e) => setEditarCategoriaData({ ...editarCategoriaData, nombre: e.target.value })}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowEditarModal(false)}>
//             Cancelar
//           </Button>
//           <Button variant="primary" onClick={guardarCambiosCategoria}>
//             Guardar Cambios
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default TablaCategorias;



















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button } from 'react-bootstrap';
// import * as FaIcons from 'react-icons/fa';
// import '../componentes/categorias.scss';

// const TablaCategorias = () => {
//   const [categorias, setCategorias] = useState([]);
//   const [nombreFiltro, setNombreFiltro] = useState('');
  
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const response = await axios.get('http://localhost:3000/categorias');
//     setCategorias(response.data);
//   }

//     const editarCategoria = async () => {
//     // Agrega lógica de axios para editar la categoria
//   }

//     const eliminarCategoria = (id) => {
//     axios.delete(`http://localhost:3000/categorias/${id}`)
//       .then(response => {
//         console.log(response);
//         fetchData();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   const crearCategoria = async () => {
//     // Agrega lógica de axios para crear la categoria
//   }

//   const filtrarPorNombre = () => {
//     if (!nombreFiltro) {
//       fetchData();
//     } else {
//       const categoriasFiltradas = categorias.filter(categoria =>
//         categoria.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())
//       );
//       setCategorias(categoriasFiltradas);
//     }
//   }

//   return (
//     <div>
//       <input 
//         type="text" 
//         placeholder="Filtrar por nombre" 
//         onChange={(e) => {
//           setNombreFiltro(e.target.value);
//           filtrarPorNombre();
//         }} 
//       />
//       <Table className='tabla-contenedor-categorias' striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nombre</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categorias.map((categoria) => (
//             <tr key={categoria.id}>
//               <td>{categoria.id}</td>
//               <td>{categoria.nombre}</td>
//               <td>
//                 <Button variant="primary" size="sm" onClick={() => editarCategoria(categoria.id)}>
//                   <FaIcons.FaPen/>
//                 </Button>{' '}
//                 <button variant="danger" size="sm" onClick={() => eliminarCategoria(categoria._id)}>Eliminar</button>
//                 {/* <Button variant="danger" size="sm" onClick={() => eliminarCategoria(categoria.id)}> */}
//                   <FaIcons.FaTrashAlt/>
//                 {/* </Button> */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default TablaCategorias; 














// import React from 'react';
// import { Table, Button } from 'react-bootstrap';
// import * as FaIcons from 'react-icons/fa6';
// import '../componentes/categorias.scss';

// const TablaCategorias = () => {
//   const data = [
//     { id: 1, nombre: 'Vegetales'},
//     { id: 2, nombre: 'Carniceria'},
//     { id: 3, nombre: 'Pescaderia'},
//     { id: 4, nombre: 'Harinas'},
//     { id: 5, nombre: 'Azucar'},
//   ];

//   return (
    
//       <Table className='tabla-contenedor-categorias' striped bordered hover>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Nombre</th>
//           <th>Acciones</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item) => (
//           <tr key={item.id}>
//             <td>{item.id}</td>
//             <td>{item.nombre}</td>
//             <td>
//               <Button variant="primary" size="sm" onClick={() => console.log('Editar', item.id)}>
//                 <FaIcons.FaPen/>
//               </Button>{' '}
//               <Button variant="danger" size="sm" onClick={() => console.log('Eliminar', item.id)}>
//               <FaIcons.FaTrashCan/>
//               </Button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>

//   );
// };

// export default TablaCategorias;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import MarketCategory from '../images/MarketCategory.jpg';
// import marketPicasso from '../images/marketPicasso.jpg';
// import './welcome.css';

// function Categorias() {
//   const [categorias, setCategorias] = useState([]);
//   const [categoriasIniciales, setCategoriasIniciales] = useState([]);
//   const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
//   const [nombreFiltro, setNombreFiltro] = useState('');
//   const [nuevaCategoria, setNuevaCategoria] = useState({
//     nombre: '',
//     descripcion: ''
//   });
//   const [mostrarFormulario, setMostrarFormulario] = useState(false); // Nuevo estado para controlar la visualización del formulario

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const response = await axios.get('http://localhost:3000/categorias');
//     setCategorias(response.data);
//     setCategoriasIniciales(response.data);
//   };

//   const verDetalle = (id) => {
//     axios.get(`http://localhost:3000/categorias/${id}`)
//       .then(response => {
//         setCategoriaSeleccionada(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   const eliminarCategoria = (id) => {
//     axios.delete(`http://localhost:3000/categorias/${id}`)
//       .then(response => {
//         console.log(response);
//         fetchData();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   const filtrarPorNombre = () => {
//     if (nombreFiltro === '') {
//       setCategorias(categoriasIniciales);
//     } else {
//       const categoriasFiltradas = categoriasIniciales.filter(categoria =>
//         categoria.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())
//       );
//       setCategorias(categoriasFiltradas);
//     }
//   };

//   const crearCategoria = async () => {
//     await axios.post('http://localhost:3000/categorias', nuevaCategoria);
//     setNuevaCategoria({
//       nombre: '',
//       descripcion: ''
//     });
//     fetchData();
//   }

//   return (
//     <div>
//       <div class='pictures-container-main'>
//         <img class='pictures-main' src={marketPicasso} height={350} width={450} style={{ 'borderRadius': '10px' }} alt='menu' />
//       </div>

//       <h1>MENU DEL MINI MERCADO //----------------------------------------------------------------------------------------//</h1>
//       <img src={MarketCategory} height={250} width={250} style={{ 'borderRadius': '10px' }} alt='menu' />
//       <h2>Menu de Categorías</h2>

//       <div>
//         <input
//           type="text"
//           placeholder="Nombre de la categoria"
//           value={nombreFiltro}
//           onChange={(event) => {
//             setNombreFiltro(event.target.value);
//             filtrarPorNombre();
//           }}
//         />
//       </div>


//       <div class='backend-menu'>
//         <h2>Editar categoría</h2>
//         {/* Mostrar el formulario solo cuando mostrarFormulario sea true */}
//         {mostrarFormulario ? (
//           <form onSubmit={crearCategoria}>
//             <label>
//               Nombre:
//               <input type="text" value={nuevaCategoria.nombre} onChange={(event) => setNuevaCategoria({...nuevaCategoria, nombre: event.target.value})} />
//             </label>
//             <label>
//               Descripción:
//               <input type="text" value={nuevaCategoria.descripcion} onChange={(event) => setNuevaCategoria({...nuevaCategoria, descripcion: event.target.value})} />
//             </label>
//             <button class="button-space" type="submit">Crear categoría</button>
//           </form>
//         ) : (
//           <button class="button-space" onClick={() => setMostrarFormulario(true)}>Editar</button>
//         )}
//       </div>
      
//       <table>
//         <thead>
//           <tr>
//           </tr>
//         </thead>
//         <tbody>
//           {categorias.map(categoria => (
//             <tr key={categoria._id}>
//               <td>{categoria.nombre}</td>
//               <td>
//                 <button className='button-space' onClick={() => verDetalle(categoria._id)}>Ver detalle</button>
//                 {/* <button className='button-space' onClick={() => actualizarCategoria(categoria._id, { nombre: 'pollo', descripcion: 'Producto importado de suiza!!!' })}>Actualizar</button> */}
//                 <button className='button-space' onClick={() => eliminarCategoria(categoria._id)}>Eliminar</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {categoriaSeleccionada && (
//         <div class='backend-menu'>
//           <h2>{categoriaSeleccionada.nombre}</h2>
//           <p>{categoriaSeleccionada.descripcion}</p>
//         </div>
//       )}

//     </div>
//   );
// }

// export default Categorias;














// import React, { useState } from 'react';

// const Categorias = () => {
//  const [name, setName] = useState('');
//  const [country, setCountry] = useState('');
//  const [phoneNumber, setPhoneNumber] = useState('');
//  const [email, setEmail] = useState('');

//  const handleSubmit = (e) => {
//     e.preventDefault();
//     // Aquí puedes agregar el código para enviar la información a la API
//     console.log('Nombre:', name);
//     console.log('País:', country);
//     console.log('Número de teléfono:', phoneNumber);
//     console.log('Correo electrónico:', email);
//  };

//  return (
//     <div>
//       <h1>Filtrar</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Nombre:</label>
//           <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="country">País:</label>
//           <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="phoneNumber">Número de teléfono:</label>
//           <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="email">Correo electrónico:</label>
//           <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <button type="submit">Filtrar</button>
//       </form>
//     </div>
//  );
// };

// export default Categorias;














// const Categorias = () => {
//     return (
//         <div>
//             <p>Categorias</p>
//         </div>
//     )
// }

// export default Categorias;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import MarketCategory from '../images/MarketCategory.jpg';
// import marketPicasso from '../images/marketPicasso.jpg';
// import './welcome.css';

// function Categorias() {
//   const [categorias, setCategorias] = useState([]);
//   const [categoriasIniciales, setCategoriasIniciales] = useState([]);
//   const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
//   const [nombreFiltro, setNombreFiltro] = useState('');
//   const [nuevaCategoria, setNuevaCategoria] = useState({
//     nombre: '',
//     descripcion: ''
//   });
//   const [mostrarFormulario, setMostrarFormulario] = useState(false); // Nuevo estado para controlar la visualización del formulario

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const response = await axios.get('http://localhost:3000/categorias');
//     setCategorias(response.data);
//     setCategoriasIniciales(response.data);
//   };

//   const verDetalle = (id) => {
//     axios.get(`http://localhost:3000/categorias/${id}`)
//       .then(response => {
//         setCategoriaSeleccionada(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   const eliminarCategoria = (id) => {
//     axios.delete(`http://localhost:3000/categorias/${id}`)
//       .then(response => {
//         console.log(response);
//         fetchData();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   const filtrarPorNombre = () => {
//     if (nombreFiltro === '') {
//       setCategorias(categoriasIniciales);
//     } else {
//       const categoriasFiltradas = categoriasIniciales.filter(categoria =>
//         categoria.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())
//       );
//       setCategorias(categoriasFiltradas);
//     }
//   };

//   const crearCategoria = async () => {
//     await axios.post('http://localhost:3000/categorias', nuevaCategoria);
//     setNuevaCategoria({
//       nombre: '',
//       descripcion: ''
//     });
//     fetchData();
//   }

//   return (
//     <div>
//       <div class='pictures-container-main'>
//         <img class='pictures-main' src={marketPicasso} height={350} width={450} style={{ 'borderRadius': '10px' }} alt='menu' />
//       </div>

//       <h1>MENU DEL MINI MERCADO //----------------------------------------------------------------------------------------//</h1>
//       <img src={MarketCategory} height={250} width={250} style={{ 'borderRadius': '10px' }} alt='menu' />
//       <h2>Menu de Categorías</h2>

//       <div>
//         <input
//           type="text"
//           placeholder="Nombre de la categoria"
//           value={nombreFiltro}
//           onChange={(event) => {
//             setNombreFiltro(event.target.value);
//             filtrarPorNombre();
//           }}
//         />
//       </div>


//       <div class='backend-menu'>
//         <h2>Editar categoría</h2>
//         {/* Mostrar el formulario solo cuando mostrarFormulario sea true */}
//         {mostrarFormulario ? (
//           <form onSubmit={crearCategoria}>
//             <label>
//               Nombre:
//               <input type="text" value={nuevaCategoria.nombre} onChange={(event) => setNuevaCategoria({...nuevaCategoria, nombre: event.target.value})} />
//             </label>
//             <label>
//               Descripción:
//               <input type="text" value={nuevaCategoria.descripcion} onChange={(event) => setNuevaCategoria({...nuevaCategoria, descripcion: event.target.value})} />
//             </label>
//             <button class="button-space" type="submit">Crear categoría</button>
//           </form>
//         ) : (
//           <button class="button-space" onClick={() => setMostrarFormulario(true)}>Editar</button>
//         )}
//       </div>
      
//       <table>
//         <thead>
//           <tr>
//           </tr>
//         </thead>
//         <tbody>
//           {categorias.map(categoria => (
//             <tr key={categoria._id}>
//               <td>{categoria.nombre}</td>
//               <td>
//                 <button className='button-space' onClick={() => verDetalle(categoria._id)}>Ver detalle</button>
//                 {/* <button className='button-space' onClick={() => actualizarCategoria(categoria._id, { nombre: 'pollo', descripcion: 'Producto importado de suiza!!!' })}>Actualizar</button> */}
//                 <button className='button-space' onClick={() => eliminarCategoria(categoria._id)}>Eliminar</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {categoriaSeleccionada && (
//         <div class='backend-menu'>
//           <h2>{categoriaSeleccionada.nombre}</h2>
//           <p>{categoriaSeleccionada.descripcion}</p>
//         </div>
//       )}

//     </div>
//   );
// }

// export default Categorias;










// import React from 'react';
// import './categorias.css';

// function Categorias() {
//     return (
//         <div className='categorias-container'>
//             <h1>Hola Mundo</h1>
//         </div>
//     );
// }

// export default Categorias;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import MarketCategory from '../images/MarketCategory.jpg';
// import marketPicasso from '../images/marketPicasso.jpg';
// import './welcome.css';

// function Categorias() {
//   const [categorias, setCategorias] = useState([]);
//   const [categoriasIniciales, setCategoriasIniciales] = useState([]);
//   const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
//   const [nombreFiltro, setNombreFiltro] = useState('');
//   const [nuevaCategoria, setNuevaCategoria] = useState({
//     nombre: '',
//     descripcion: ''
//   });
//   const [mostrarFormulario, setMostrarFormulario] = useState(false); // Nuevo estado para controlar la visualización del formulario

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const response = await axios.get('http://localhost:3000/categorias');
//     setCategorias(response.data);
//     setCategoriasIniciales(response.data);
//   };

//   const verDetalle = (id) => {
//     axios.get(`http://localhost:3000/categorias/${id}`)
//       .then(response => {
//         setCategoriaSeleccionada(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   const eliminarCategoria = (id) => {
//     axios.delete(`http://localhost:3000/categorias/${id}`)
//       .then(response => {
//         console.log(response);
//         fetchData();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   const filtrarPorNombre = () => {
//     if (nombreFiltro === '') {
//       setCategorias(categoriasIniciales);
//     } else {
//       const categoriasFiltradas = categoriasIniciales.filter(categoria =>
//         categoria.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())
//       );
//       setCategorias(categoriasFiltradas);
//     }
//   };

//   const crearCategoria = async () => {
//     await axios.post('http://localhost:3000/categorias', nuevaCategoria);
//     setNuevaCategoria({
//       nombre: '',
//       descripcion: ''
//     });
//     fetchData();
//   }

//   return (
//     <div>
//       <div class='pictures-container-main'>
//         <img class='pictures-main' src={marketPicasso} height={350} width={450} style={{ 'borderRadius': '10px' }} alt='menu' />
//       </div>

//       <h1>MENU DEL MINI MERCADO //----------------------------------------------------------------------------------------//</h1>
//       <img src={MarketCategory} height={250} width={250} style={{ 'borderRadius': '10px' }} alt='menu' />
//       <h2>Menu de Categorías</h2>

//       <div>
//         <input
//           type="text"
//           placeholder="Nombre de la categoria"
//           value={nombreFiltro}
//           onChange={(event) => {
//             setNombreFiltro(event.target.value);
//             filtrarPorNombre();
//           }}
//         />
//       </div>


//       <div class='backend-menu'>
//         <h2>Editar categoría</h2>
//         {/* Mostrar el formulario solo cuando mostrarFormulario sea true */}
//         {mostrarFormulario ? (
//           <form onSubmit={crearCategoria}>
//             <label>
//               Nombre:
//               <input type="text" value={nuevaCategoria.nombre} onChange={(event) => setNuevaCategoria({...nuevaCategoria, nombre: event.target.value})} />
//             </label>
//             <label>
//               Descripción:
//               <input type="text" value={nuevaCategoria.descripcion} onChange={(event) => setNuevaCategoria({...nuevaCategoria, descripcion: event.target.value})} />
//             </label>
//             <button class="button-space" type="submit">Crear categoría</button>
//           </form>
//         ) : (
//           <button class="button-space" onClick={() => setMostrarFormulario(true)}>Editar</button>
//         )}
//       </div>
      
//       <table>
//         <thead>
//           <tr>
//           </tr>
//         </thead>
//         <tbody>
//           {categorias.map(categoria => (
//             <tr key={categoria._id}>
//               <td>{categoria.nombre}</td>
//               <td>
//                 <button className='button-space' onClick={() => verDetalle(categoria._id)}>Ver detalle</button>
//                 {/* <button className='button-space' onClick={() => actualizarCategoria(categoria._id, { nombre: 'pollo', descripcion: 'Producto importado de suiza!!!' })}>Actualizar</button> */}
//                 <button className='button-space' onClick={() => eliminarCategoria(categoria._id)}>Eliminar</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {categoriaSeleccionada && (
//         <div class='backend-menu'>
//           <h2>{categoriaSeleccionada.nombre}</h2>
//           <p>{categoriaSeleccionada.descripcion}</p>
//         </div>
//       )}

//     </div>
//   );
// }

// export default Categorias;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import marketPicasso from '../images/marketPicasso.jpg';
// import './welcome.css';

// function Categorias() {
//   return (
//     <div>
//       <div className='sidebar'>
//        <div class='pictures-container-main'>
//          <img class='pictures-main' src={marketPicasso} height={250} width={250} style={{ 'borderRadius': '10px' }} alt='menu' />
//       </div>
//       <ul>
//       <li>
//         <Link to="/categorias">Categorías</Link>
//       </li>
//       <li>
//         <Link to="/productos">Productos</Link>
//       </li>
//     </ul>
//     </div>
//     </div>
//   );
// }

// export default Categorias;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import MarketCategory from '../images/MarketCategory.jpg';
// import marketPicasso from '../images/marketPicasso.jpg';
// import './welcome.css';

// function Categorias() {
//   const [categorias, setCategorias] = useState([]);
//   const [categoriasIniciales, setCategoriasIniciales] = useState([]);
//   const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
//   const [nombreFiltro, setNombreFiltro] = useState('');
//   const [nuevaCategoria, setNuevaCategoria] = useState({
//     nombre: '',
//     descripcion: ''
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const response = await axios.get('http://localhost:3000/categorias');
//     setCategorias(response.data);
//     setCategoriasIniciales(response.data);
//   };

//   const verDetalle = (id) => {
//     axios.get(`http://localhost:3000/categorias/${id}`)
//       .then(response => {
//         setCategoriaSeleccionada(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   // const actualizarCategoria = (id, categoria) => {
//   //   axios.put(`http://localhost:3000/categorias/${id}`, categoria)
//   //     .then(response => {
//   //       console.log(response);
//   //       fetchData();
//   //     })
//   //     .catch(error => {
//   //       console.log(error);
//   //     });
//   // }

//   const eliminarCategoria = (id) => {
//     axios.delete(`http://localhost:3000/categorias/${id}`)
//       .then(response => {
//         console.log(response);
//         fetchData();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   const filtrarPorNombre = () => {
//     if (nombreFiltro === '') {
//       setCategorias(categoriasIniciales);
//     } else {
//       const categoriasFiltradas = categoriasIniciales.filter(categoria =>
//         categoria.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())
//       );
//       setCategorias(categoriasFiltradas);
//     }
//   };

//   const crearCategoria = async () => {
//     await axios.post('http://localhost:3000/categorias', nuevaCategoria);
//     setNuevaCategoria({
//       nombre: '',
//       descripcion: ''
//     });
//     fetchData();
//   }

//   return (
//     <div>
//       <div class='pictures-container-main'>
//         <img class='pictures-main' src={marketPicasso} height={350} width={450} style={{ 'borderRadius': '10px' }} alt='menu' />
//       </div>

//       <h1>MENU DEL MINI MERCADO //----------------------------------------------------------------------------------------//</h1>
//       <img src={MarketCategory} height={250} width={250} style={{ 'borderRadius': '10px' }} alt='menu' />
//       <h2>Menu de Categorías</h2>

//       <div>
//         <input
//           type="text"
//           placeholder="Nombre de la categoria"
//           value={nombreFiltro}
//           onChange={(event) => {
//             setNombreFiltro(event.target.value);
//             filtrarPorNombre();
//           }}
//         />
//       </div>


//       <div class='backend-menu'>
//         <h2>Editar categoría</h2>
//         <form onSubmit={crearCategoria}>
//           <label>
//             Nombre:
//             <input type="text" value={nuevaCategoria.nombre} onChange={(event) => setNuevaCategoria({...nuevaCategoria, nombre: event.target.value})} />
//           </label>
//           <label>
//             Descripción:
//             <input type="text" value={nuevaCategoria.descripcion} onChange={(event) => setNuevaCategoria({...nuevaCategoria, descripcion: event.target.value})} />
//           </label>
//           <button class="button-space" type="submit">Crear categoría</button>
//         </form>
//       </div>
      
//       <table>
//         <thead>
//           <tr>
//           </tr>
//         </thead>
//         <tbody>
//           {categorias.map(categoria => (
//             <tr key={categoria._id}>
//               <td>{categoria.nombre}</td>
//               <td>
//                 <button className='button-space' onClick={() => verDetalle(categoria._id)}>Ver detalle</button>
//                 {/* <button className='button-space' onClick={() => actualizarCategoria(categoria._id, { nombre: 'pollo', descripcion: 'Producto importado de suiza!!!' })}>Actualizar</button> */}
//                 <button className='button-space' onClick={() => eliminarCategoria(categoria._id)}>Eliminar</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {categoriaSeleccionada && (
//         <div class='backend-menu'>
//           <h2>{categoriaSeleccionada.nombre}</h2>
//           <p>{categoriaSeleccionada.descripcion}</p>
//         </div>
//       )}

//     </div>
//   );
// }

// export default Categorias;




























// <!-- .dashboard {
//     background-color: #000;
//     color: #fff;
//     font-family: 'Press Start 2P', cursive;
//     text-align: center;
//     padding: 20px;
//    }
   
//    .dashboard h1 {
//     font-size: 32px;
//     margin-bottom: 20px;
//    }
   
//    .dashboard .actions button {
//     background-color: #4caf50;
//     border: none;
//     color: white;
//     padding: 10px 20px;
//     text-align: center;
//     text-decoration: none;
//     display: inline-block;
//     font-size: 16px;
//     margin: 4px 2px;
//     cursor: pointer;
//     border-radius: 8px;
//    }
   
//    .dashboard table {
//     width: 100%;
//     border-collapse: collapse;
//    }
   
//    .dashboard th,
//    .dashboard td {
//     border: 1px solid #fff;
//     padding: 8px;
//     text-align: left;
//    }
   
//    .dashboard th {
//     background-color: #f2f2f2;
//    }
   
//    .dashboard tr:nth-child(even) {
//     background-color: #f2f2f2;
//    } -->

//    <!-- import React from 'react';
//    import Dashboard from './components/Dashboard';
   
//    function App() {
//     return (
//        <div className="App">
//          <Dashboard />
//        </div>
//     );
//    }
   
//    export default App; -->











































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import MarketCategory from '../images/MarketCategory.jpg';
// import marketPicasso from '../images/marketPicasso.jpg';
// import './welcome.css';

// function Categorias() {
//   const [categorias, setCategorias] = useState([]);
//   const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
//   const [nombreFiltro, setNombreFiltro] = useState('');
//   const [nuevaCategoria, setNuevaCategoria] = useState({
//     nombre: '',
//     descripcion: ''
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const response = await axios.get('http://localhost:3000/categorias');
//     setCategorias(response.data);
//   }

//   const verDetalle = (id) => {
//     axios.get(`http://localhost:3000/categorias/${id}`)
//       .then(response => {
//         setCategoriaSeleccionada(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   const actualizarCategoria = (id, categoria) => {
//     axios.put(`http://localhost:3000/categorias/${id}`, categoria)
//       .then(response => {
//         console.log(response);
//         fetchData();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   const eliminarCategoria = (id) => {
//     axios.delete(`http://localhost:3000/categorias/${id}`)
//       .then(response => {
//         console.log(response);
//         fetchData();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   const filtrarPorNombre = async () => {
//     const response = await axios.get(`http://localhost:3000/categorias?nombre=${nombreFiltro}`);
//     setCategorias(response.data);
//   }

//   const crearCategoria = async () => {
//     await axios.post('http://localhost:3000/categorias', nuevaCategoria);
//     setNuevaCategoria({
//       nombre: '',
//       descripcion: ''
//     });
//     fetchData();
//   }

//   return (
//     <div>
//       <div class='pictures-container-main'>
//         <img class='pictures-main' src={marketPicasso} height={350} width={450} style={{ 'borderRadius': '10px' }} alt='menu' />
//       </div>

//       <h1>MENU DEL MINI MERCADO //----------------------------------------------------------------------------------------//</h1>
//       <img src={MarketCategory} height={250} width={250} style={{ 'borderRadius': '10px' }} alt='menu' />
//       <h2>Menu de Categorías</h2>
//       <div>
//         <input type="text" placeholder="Nombre" value={nombreFiltro} onChange={(event) => setNombreFiltro(event.target.value)} />
//         <button className='button-space' onClick={filtrarPorNombre}>Filtrar por nombre</button>
//       </div>

//       <div class='backend-menu'>
//         <h2>Crear nueva categoría</h2>
//         <form onSubmit={crearCategoria}>
//           <label>
//             Nombre:
//             <input type="text" value={nuevaCategoria.nombre} onChange={(event) => setNuevaCategoria({...nuevaCategoria, nombre: event.target.value})} />
//           </label>
//           <label>
//             Descripción:
//             <input type="text" value={nuevaCategoria.descripcion} onChange={(event) => setNuevaCategoria({...nuevaCategoria, descripcion: event.target.value})} />
//           </label>
//           <button class="button-space" type="submit">Crear categoría</button>
//         </form>
//       </div>
      
//       <table>
//         <thead>
//           <tr>
//           </tr>
//         </thead>
//         <tbody>
//           {categorias.map(categoria => (
//             <tr key={categoria._id}>
//               <td>{categoria.nombre}</td>
//               <td>
//                 <button className='button-space' onClick={() => verDetalle(categoria._id)}>Ver detalle</button>
//                 <button className='button-space' onClick={() => actualizarCategoria(categoria._id, { nombre: 'pollo', descripcion: 'Producto importado de suiza!!!' })}>Actualizar</button>
//                 <button className='button-space' onClick={() => eliminarCategoria(categoria._id)}>Eliminar</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {categoriaSeleccionada && (
//         <div class='backend-menu'>
//           <h2>{categoriaSeleccionada.nombre}</h2>
//           <p>{categoriaSeleccionada.descripcion}</p>
//         </div>
//       )}

//     </div>
//   );
// }

// export default Categorias;


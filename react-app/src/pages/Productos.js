import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useDropzone } from "react-dropzone";
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { FaRegPenToSquare } from "react-icons/fa6";
import '../componentes/productos.scss';

const TablaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nombreFiltro, setNombreFiltro] = useState('');
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [editarProductoData, setEditarProductoData] = useState({ id: null, nombre: '', stock: 0, precio: '',  foto: null, categoria: '' });
  const [showCrearModal, setShowCrearModal] = useState(false);
  const [nuevoProductoData, setNuevoProductoData] = useState({ nombre: '', stock: 0, precio: '', foto: null, categoria: ''});
  const [foto, setFoto] = useState(null);


  useEffect(() => {
    fetchData();
  }, []);

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedImage = acceptedFiles[0];
      setFoto(URL.createObjectURL(selectedImage));
    }
  }

  const handleClick = () => {
    document.getElementById('file-input').click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFoto(URL.createObjectURL(selectedFile));
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: '*/*',
    onDrop: handleDrop,
    noClick: true,
    noKeyboard: true,
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener los productos', error);
    }
  }

  const editarProducto = (id, nombre, stock, precio, foto, categoria) => {
    setEditarProductoData({ id, nombre, stock, precio, foto: null , categoria });
    setShowEditarModal(true);
  }


  const formIsValid = () => {
    return (
      editarProductoData.nombre !== '' &&
      editarProductoData.stock !== '' &&
      editarProductoData.precio !== ''
    );
  };

  const formIsValidCreate = () => {
    return (
      nuevoProductoData.nombre !== '' &&
      nuevoProductoData.stock !== '' &&
      nuevoProductoData.precio !== ''
    );
  };

  const guardarCambiosProducto = async () => {
    try {
      if (editarProductoData.id && typeof editarProductoData.id === 'string') {
        const formData = new FormData();
        formData.append('nombre', editarProductoData.nombre);
        formData.append('stock', editarProductoData.stock);
        formData.append('precio', editarProductoData.precio);
        formData.append('foto', foto);
        formData.append('categoria', editarProductoData.categoria);
  
        await axios.put(`http://localhost:3000/productos/${editarProductoData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        setShowEditarModal(false);
        fetchData();
      } else {
        console.error('El ID del producto no está definido o no es válido');
      }
    } catch (error) {
      console.error('Error al editar el producto', error);
    }
  }

  const eliminarProducto = (id) => {
    axios.delete(`http://localhost:3000/productos/${id}`)
      .then(response => {
        console.log(response);
        fetchData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  const crearProducto = async () => {
    try {
      const formData = new FormData();
      formData.append('nombre', nuevoProductoData.nombre);
      formData.append('stock', nuevoProductoData.stock);
      formData.append('precio', nuevoProductoData.precio);
      formData.append('foto', foto);
      formData.append('categoria', nuevoProductoData.categoria);
  
      await axios.post('http://localhost:3000/productos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      setShowCrearModal(false);
      setNuevoProductoData({ nombre: '', stock: 0, precio: '', foto: null , categoria: '' });
      fetchData();
    } catch (error) {
      console.error('Error al crear el producto', error);
    }
  };

    const filtrarProductos = useCallback(async () => {
    if (nombreFiltro.trim() === '') {
      fetchData();
    } else {
      const response = await axios.get(`http://localhost:3000/productos/buscar/${nombreFiltro}`);
      setProductos(response.data);
    }
  }, [nombreFiltro]);

  useEffect(() => {
    filtrarProductos();
  }, [filtrarProductos]);

  return (

        <div className='input-filtro-productos'>
        <input
          type="text"
          placeholder="Filtrar por nombre o categoria"
          value={nombreFiltro}
          onChange={(event) => setNombreFiltro(event.target.value)}
        />

  <div className='boton-crear-producto'>
  <Button onClick={() => setShowCrearModal(true)} >Crear Producto</Button>
  </div>

  <Table className='tabla-contenedor-productos'>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Stock</th>
        <th>Precio</th>
        <th>Foto</th>
        <th>Categoría</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {productos.map(producto => (
        <tr key={producto.id}>
          <td>{producto.id}</td>
          <td>{producto.nombre}</td>
          <td>{producto.stock}</td>
          <td>{producto.precio}</td>
          <td>
  {producto.foto && (
    <img src={producto.foto} alt="Producto" className="product-images" />
  )}
</td>
          <td>{producto.categoria}</td>
          <td>
        
            <Button className='separacion' onClick={() => editarProducto(producto._id, producto.nombre, producto.stock, producto.precio, producto.foto, producto.categoria)}>
            <FaRegPenToSquare />
            </Button>
            <Button className='separacion' onClick={() => eliminarProducto(producto._id)}>
            <FaIcons.FaTrashAlt/>
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>


  <Modal show={showEditarModal} onHide={() => setShowEditarModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Editar Producto</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="formNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" value={editarProductoData.nombre} onChange={(e) => setEditarProductoData({ ...editarProductoData, nombre: e.target.value })} />
        {editarProductoData.nombre === '' && <span className="error-message">El nombre es obligatorio</span>}
      </Form.Group>
      <Form.Group controlId="formStock">
        <Form.Label>Stock</Form.Label>
        <Form.Control type="number" value={editarProductoData.stock} onChange={(e) => setEditarProductoData({ ...editarProductoData, stock: e.target.value })} />
        {editarProductoData.stock === '' && <span className="error-message">El stock es obligatorio</span>}
      </Form.Group>
      <Form.Group controlId="formPrecio">
        <Form.Label>Precio</Form.Label>
        <Form.Control type="text" value={editarProductoData.precio} onChange={(e) => setEditarProductoData({ ...editarProductoData, precio: e.target.value })} />
        {editarProductoData.precio === '' && <span className="error-message">El precio es obligatorio</span>}
      </Form.Group>

      
      <Form.Group controlId="formFoto">
      <Form.Label>Foto</Form.Label>
      <div
        {...getRootProps()}
        onClick={handleClick}
        className={`dropzone ${foto ? 'has-image' : ''}`}
      >
        <input {...getInputProps()} id="file-input" onChange={handleFileChange} />
        {foto ? (
          <img src={foto} alt="Imagen seleccionada" className="selected-image" />
        ) : (
          <p>Arrastra y suelta una imagen aquí o haz clic para seleccionar una imagen</p>
        )}
      </div>
      <Button className='seleccionar-imagen-boton' onClick={open}>
        Seleccionar desde la computadora
      </Button>
    </Form.Group>

      <Form.Group controlId="formCategoria">
        <Form.Label>Categoría</Form.Label>
        <Form.Control as="select" className='hacker-select' value={editarProductoData.categoria} onChange={(e) => setEditarProductoData({ ...editarProductoData, categoria: e.target.value })}>
          <option value="Vegetales">Vegetales</option>
          <option value="Carniceria">Carniceria</option>
          <option value="Pescaderia">Pescaderia</option>
          <option value="Harinas">Harinas</option>
          <option value="Azucar">Azucar</option>
        </Form.Control>
      </Form.Group>

    </Form>
  </Modal.Body>
  <Modal.Footer className='modal-footer'>
    <Button variant="secondary" onClick={() => setShowEditarModal(false)}>
      Cancelar
    </Button>
    <Link className='boton-ver-detalle' to={`/detalle/${editarProductoData.id}`}>Ver Detalle</Link>
    <Button variant="primary" onClick={guardarCambiosProducto} disabled={!formIsValid()}>
      Guardar Cambios
    </Button>
  </Modal.Footer>
</Modal>

  <Modal show={showCrearModal} onHide={() => setShowCrearModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Crear Producto</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
      <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" value={nuevoProductoData.nombre} onChange={(e) => setNuevoProductoData({ ...nuevoProductoData, nombre: e.target.value })} />
          {nuevoProductoData.nombre === '' && <span className="error-message">El nombre es obligatorio</span>}
        </Form.Group>
        <Form.Group controlId="formStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="number" value={nuevoProductoData.stock} onChange={(e) => setNuevoProductoData({ ...nuevoProductoData, stock: e.target.value })} />
          {nuevoProductoData.stock === '' && <span className="error-message">El stock es obligatorio</span>}
        </Form.Group>
        <Form.Group controlId="formPrecio">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="text" value={nuevoProductoData.precio} onChange={(e) => setNuevoProductoData({ ...nuevoProductoData, precio: e.target.value })} />
          {nuevoProductoData.precio === '' && <span className="error-message">El precio es obligatorio</span>}
        </Form.Group>

        <Form.Group controlId="formFoto">
      <Form.Label>Foto</Form.Label>
      <div
        {...getRootProps()}
        onClick={handleClick}
        className={`dropzone ${foto ? 'has-image' : ''}`}
      >
        <input {...getInputProps()} id="file-input" onChange={handleFileChange} />
        {foto ? (
          <img src={foto} alt="Imagen seleccionada" className="selected-image" />
        ) : (
          <p>Arrastra y suelta una imagen aquí o haz clic para seleccionar una imagen</p>
        )}
      </div>
      <Button variant='primary' className='seleccionar-imagen-boton' onClick={open}>
        Seleccionar desde la computadora
      </Button>
    </Form.Group>

<Form.Group controlId="formCategoria">
        <Form.Label>Categoría</Form.Label>
        <Form.Control as="select" className='hacker-select' value={nuevoProductoData.categoria} onChange={(e) => setNuevoProductoData({ ...nuevoProductoData, categoria: e.target.value })}>
          <option value="Vegetales">Vegetales</option>
          <option value="Carniceria">Carniceria</option>
          <option value="Pescaderia">Pescaderia</option>
          <option value="Harinas">Harinas</option>
          <option value="Azucar">Azucar</option>
        </Form.Control>
      </Form.Group>

      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowCrearModal(false)}>
        Cancelar
      </Button>
      <Button variant="primary" onClick={crearProducto} disabled={!formIsValidCreate()} >
        Crear Producto
      </Button>
    </Modal.Footer>
  </Modal>
</div>
);
}


export default TablaProductos;












































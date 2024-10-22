import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import { FaRegPenToSquare } from "react-icons/fa6";
import '../styles/categorias.scss';
import Swal from 'sweetalert2';

const TablaCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombreFiltro, setNombreFiltro] = useState('');
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [editarCategoriaData, setEditarCategoriaData] = useState({ id: null, nombre: '' });
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
    if (!editarCategoriaData.nombre || editarCategoriaData.nombre.trim() === '') {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingresa una categoría!",
      });
      return;
    }

    try {
      if (editarCategoriaData.id) {
        await axios.put(`http://localhost:3000/categorias/${editarCategoriaData.id}`, {
          nombre: editarCategoriaData.nombre,
        });
        setShowEditarModal(false);
        fetchData();
      } else {
        console.error('El ID de la categoría no está definido o no es válido');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al editar la categoría!",
        });
      }
    }
  }

  const eliminarCategoria = (id) => {
    console.log("ID a eliminar:", id); 
    if (!id) {
      console.error("El ID no está definido");
      return;
    }
    axios.delete(`http://localhost:3000/categorias/${id}`)
      .then(response => {
        console.log("Categoría eliminada:", response.data);
        fetchData(); 
      })
      .catch(error => {
        console.error("Error al eliminar la categoría:", error);
      });
  };


  const crearCategoria = async (nombre) => {
    if (!nombre || nombre.trim() === '') {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingresa una categoría!",
      });
      return;
    }

    try {
      await axios.post('http://localhost:3000/categorias', {
        nombre,
      });
      setShowCrearModal(false);
      setNuevoNombreCategoria('');
      fetchData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La categoria ya existe!",
      });
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


  return (
    <div className='contenedor-categorias-principal'>
      <div className='contenedor-posicion-categorias'>
        <div className='input-filtro-categorias'>
          <div className='search-container-filtro-categorias'>
            <input
              type="text"
              placeholder="Filtrar por nombre"
              value={nombreFiltro}
              onChange={(event) => setNombreFiltro(event.target.value)}
            />
          </div>
        </div>
        <div className='boton-crear-categoria'>
          <Button onClick={() => setShowCrearModal(true)}>Crear Categoría</Button>
        </div>
      </div>

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
                </Button>{' '}
                <Button variant='primary' onClick={() => eliminarCategoria(categoria._id)}>
                  <FaIcons.FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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

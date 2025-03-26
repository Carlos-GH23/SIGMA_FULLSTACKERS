import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ModalForm from "../components/ModalForm";

const capturistas = [
  {
    id: 1,
    nombre: "Sebastián Quintero Martínez",
    username: "sebastian.quinteromtz@gmail.com",
    password: "***********",
  },
  {
    id: 2,
    nombre: "Leticia Martínez Peralta",
    username: "leticiamape@gmail.com",
    password: "***********",
  },
  {
    id: 3,
    nombre: "Ana Jael Santos Carbajal",
    username: "anaJael@gmail.com",
    password: "***********",
  },
  {
    id: 4,
    nombre: "Erenchan Sama",
    username: "erenchansama@gmail.com",
    password: "***********",
  },
  {
    id: 5,
    nombre: "Carlos Emmanuel Quintero Martinez",
    username: "carlosquinteromtz@gmail.com",
    password: "***********",
  },
  {
    id: 6,
    nombre: "Carlos Quintero Juan",
    username: "carlosJuan@gmail.com",
    password: "***********",
  }
];

const ListCapturistas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="pt-4 w-full">
      <h2 className="text-2xl font-bold text-center mb-4">Capturistas</h2>
      <table className="min-w-full table-auto">
          <thead>
              <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2 text-left">Username</th>
                  <th className="px-4 py-2 text-left">Contraseña</th>
                  <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
          </thead>
          <tbody>
              {capturistas.map((row) => (
                  <tr key={row.id} className="border-b">
                      <td className="px-4 py-2">{row.id}</td>
                      <td className="px-4 py-2">{row.nombre}</td>
                      <td className="px-4 py-2">{row.username}</td>
                      <td className="px-4 py-2">{row.password}</td>
                      <td className="px-4 py-2 flex space-x-2">
                          {/* Botón Editar */}
                          <button
                              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                              Editar
                          </button>
                          {/* Botón Editar */}
                          <button
                              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                              Eliminar
                          </button>
                      </td>
                  </tr>
              ))}
          </tbody>
      </table>

      <button
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition"
        onClick={toggleModal}
      >
        <FaPlus size={24} />
      </button>

      {/* ModalForm */}
      <ModalForm isOpen={isModalOpen} onClose={toggleModal}>
        <h2 className="text-xl font-bold mb-4">Agregar Capturista</h2>
        <form>
          <input type="text" placeholder="Nombre" className="w-full mb-2 p-2 border rounded" />
          <input type="email" placeholder="Correo" className="w-full mb-2 p-2 border rounded" />
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Guardar
          </button>
        </form>
      </ModalForm>

    </div>
  );
};

export default ListCapturistas;

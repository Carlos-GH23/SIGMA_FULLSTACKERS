import { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import ModalForm from "../components/ModalForm";
import AlertMessage from "../components/AlertMessage";

interface Capturista {
  id: number;
  nombre: string;
  username: string;
  password: string;
}

const capturistasData: Capturista[] = [
  {
    id: 1,
    nombre: "Sebastián Quintero Martínez",
    username: "sebastian.quinteromtz@gmail.com",
    password: "***********",
  },
  {
    id: 1,
    nombre: "Sebastián Quintero Martínez",
    username: "sebastian.quinteromtz@gmail.com",
    password: "***********",
  },
  {
    id: 1,
    nombre: "Sebastián Quintero Martínez",
    username: "sebastian.quinteromtz@gmail.com",
    password: "***********",
  },
  {
    id: 1,
    nombre: "Sebastián Quintero Martínez",
    username: "sebastian.quinteromtz@gmail.com",
    password: "***********",
  },
  {
    id: 1,
    nombre: "Sebastián Quintero Martínez",
    username: "sebastian.quinteromtz@gmail.com",
    password: "***********",
  },
  {
    id: 1,
    nombre: "Sebastián Quintero Martínez",
    username: "sebastian.quinteromtz@gmail.com",
    password: "***********",
  },
  {
    id: 1,
    nombre: "Sebastián Quintero Martínez",
    username: "sebastian.quinteromtz@gmail.com",
    password: "***********",
  },
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
  //Variables
  const [viewModalForm, setViewModalForm] = useState(false);
  const [formData, setFormData] = useState<Capturista>({ id: 0, nombre: "", username: "", password: "" });
  const [alertMessage, setAlertMessage] = useState(false);
  const [selectedCapturista, setSelectedCapturista] = useState<Capturista | null>(null);

  //Funciones
  const toggleModalForm = () => setViewModalForm(!viewModalForm);
  const handleChange = (key: keyof Capturista, value: string | number | Date) => {
    setFormData({ ...formData, [key]: value });
  };
  const handleSubmit = () => {
    console.log("Datos guardados:", formData);
    toggleModalForm();
  };
  const handleDelete = (capturista: Capturista) => {
    setSelectedCapturista(capturista);
    setAlertMessage(true);
  };
  const confirmDelete = () => {
    console.log("Eliminando capturista:", selectedCapturista);
    setAlertMessage(false);
  };

  return (
    <div className="pt-4 w-full ">
      <div className="w-full h-15 rounded-lg bg-purple-500 text-white mb-2 flex justify-center items-center">
        <h2 className="text-2xl font-bold text-center">Capturistas</h2>
      </div>
      <div className="my-2 flex flex-row items-center">
        <input type="text" id="person" className="w-full mr-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400" placeholder="Busca a una persona"/>
        <button className="w-[60px] p-4 bg-purple-500 text-white p-3 rounded-full shadow-lg hover:bg-purple-600 transition flex justify-center items-center">
          <FaSearch className="text-lg" />
        </button>
      </div>
      <div className="max-h-[calc(88vh-80px)] overflow-y-auto min-h-[200px] bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full table-auto ">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {capturistasData.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4 flex items-center space-x-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold">
                    {user.nombre.charAt(0)}
                  </span>
                  <span>{user.nombre}</span>
                </td>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    onClick={() => { setFormData(user); toggleModalForm(); }}>
                    Editar
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
                    onClick={() => handleDelete(user)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="fixed bottom-6 right-6 bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-600 transition"
        onClick={() => { setFormData({ id: 0, nombre: "", username: "", password: "" }); toggleModalForm(); }}>
        <FaPlus size={24} />
      </button>

      {/* ModalForm */}
      <ModalForm isOpen={viewModalForm} onClose={toggleModalForm} formData={formData} onChange={handleChange} onSubmit={handleSubmit} />

      {/* AlertMessage */}
      {alertMessage && selectedCapturista && (
        <AlertMessage
          title="Confirmar Eliminación"
          body={`¿Estás seguro de que deseas eliminar a ${selectedCapturista.nombre}?`}
          onCancel={() => setAlertMessage(false)}
          onConfirm={confirmDelete}
        />
      )}

    </div>
  );
};

export default ListCapturistas;

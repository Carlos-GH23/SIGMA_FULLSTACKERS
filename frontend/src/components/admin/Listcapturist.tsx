import { useState } from "react";
import { FaPlus } from "react-icons/fa";
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
    <div className="pt-4 w-full">
      <h2 className="text-2xl font-bold text-center mb-4">Capturistas</h2>
      <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {capturistasData.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.nombre}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => { setFormData(user); toggleModalForm(); }}>
                    Editar
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(user)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
      </table>

      <button
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition"
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

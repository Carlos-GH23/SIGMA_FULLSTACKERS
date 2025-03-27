import { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import ModalForm from "../components/ModalForm";
import AlertMessage from "../components/AlertMessage";
import { UserModel } from "../../models/UserModel";

// Datos iniciales de usuarios
const initialUsers: UserModel[] = [
  {
    id: 1,
    nombre: "Sebastián Quintero Martínez",
    username: "sebastian.quinteromtz@gmail.com",
    password: "***********",
    token: "12345",
    tipo: "Admin"
  },
  {
    id: 2,
    nombre: "Leticia Martínez Peralta",
    username: "leticiamape@gmail.com",
    password: "***********",
    token: "67890",
    tipo: "Usuario"
  }
];


const ListCapturistas = () => {
    // Estado para la lista de usuarios
  const [users, setUsers] = useState<UserModel[]>(initialUsers);
    // Estado para mostrar/ocultar el modal de formulario
  const [viewModalForm, setViewModalForm] = useState(false);
    // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState<UserModel>({ id: 0, nombre: "", username: "", password: "", token: "", tipo: "" });
    // Estado para mostrar/ocultar la alerta de confirmación
  const [alertMessage, setAlertMessage] = useState(false);
    // Estado para el usuario seleccionado para eliminar
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);

  //Funciones
    // Alternar la visibilidad del modal de formulario
  const toggleModalForm = () => setViewModalForm(!viewModalForm);
    // Manejar cambios en los campos del formulario
  const handleChange = (key: keyof UserModel, value: string | number | Date) => {
    setFormData({ ...formData, [key]: value });
  };
  
    // Manejar el envio del formulario para registrar o editar un usuario
  const handleSubmit = () => {
    console.log("Datos guardados:", formData);
    if (formData.id === 0) {
      setUsers([...users, { ...formData, id: users.length + 1 }]);
    } else {
      setUsers(users.map(user => (user.id === formData.id ? formData : user)));
    }
    toggleModalForm();
  };

    // Mostrar alerta antes de eliminar un usuario
  const handleDelete = (user: UserModel) => {
    setSelectedUser(user);
    setAlertMessage(true);
  };

    // Confirmar y eliminar el usuario
  const confirmDelete = () => {
    console.log("Eliminando capturista:", selectedUser);
    setUsers(users.filter(user => user.id !== selectedUser?.id));
    setAlertMessage(false);
  };

    // Determinar si el formulario está en modo edición
  const isEdit = formData.id !== 0;

  return (
    <div className="pt-4 w-full ">
      {/* Encabezado */}
      <div className="w-full h-15 rounded-lg bg-purple-500 text-white mb-2 flex justify-center items-center">
        <h2 className="text-2xl font-bold text-center">Capturistas</h2>
      </div>

      {/* Barra de búsqueda */}
      <div className="my-2 flex flex-row items-center">
        <input type="text" id="person" className="w-full mr-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400" placeholder="Busca a una persona"/>
        <button className="w-[60px] p-4 bg-purple-500 text-white p-3 rounded-full shadow-lg hover:bg-purple-600 transition flex justify-center items-center">
          <FaSearch className="text-lg" />
        </button>
      </div>

      {/* Tabla de usuarios */}
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
            {users.map((user) => (
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
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition cursor-pointer"
                    onClick={() => { setFormData(user); toggleModalForm(); }}>
                    Editar
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition cursor-pointer"
                    onClick={() => handleDelete(user)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón para registrar capturista */}
      <button
        className="fixed bottom-6 right-6 bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-600 transition"
        onClick={() => { setFormData({ id: 0, nombre: "", username: "", password: "", token: "", tipo: "" }); toggleModalForm(); }}>
        <FaPlus size={24} />
      </button>

      {/* ModalForm */}
      <ModalForm 
        isOpen={viewModalForm} 
        onClose={toggleModalForm} 
        onSubmit={handleSubmit}
        title={isEdit ? "Editar Capturista" : "Registrar Capturista"}
        textActionOk={isEdit ? "Actualizar" : "Guardar"}
        body={
          <>
            <div>
              <label className="block text-sm font-medium">Nombre</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Usuario</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Contraseña</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </>
        }
        textConfirm={isEdit ? "Confirmación actualización" : "Confirmación registro"}
        textBodyConfirm={`¿Estás seguro de que deseas ${isEdit ? "actualizar la información del" : "registrar al nuevo"} capturista?`}
      />

      {/* AlertMessage para eliminar capturista */}
      {alertMessage && selectedUser && (
        <AlertMessage
          title="Confirmar Eliminación"
          body={`¿Estás seguro de que deseas eliminar a ${selectedUser.nombre}?`}
          onCancel={() => setAlertMessage(false)}
          onConfirm={confirmDelete}
        />
      )}

    </div>
  );
};

export default ListCapturistas;

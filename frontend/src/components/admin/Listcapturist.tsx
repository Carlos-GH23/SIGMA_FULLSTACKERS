import { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import ModalForm from "../General/ModalForm";
import AlertMessage from "../General/AlertMessage";
import { UserModel } from "../../models/UserModel";
import { CrudService } from "../../services/crudService";
import ErrorMessage from "../General/ErrorMessage";



const ListCapturistas = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [formData, setFormData] = useState<UserModel>({ id: 0, email: "", token: "", password: "", name: "", role: []});
  
  const [viewModalForm, setViewModalForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const [alertMessage, setAlertMessage] = useState(false);
  const [erroMessage, setErrorMessage] = useState("");

  const userService = new CrudService<UserModel>("http://127.0.0.1:8000/users/api/");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersData = await userService.getAll();
      const mappedUsers = usersData.map((user: any) => ({
        id: user.id,
        email: user.email,
        token: user.token,
        password: "",
        name: user.name,
        role: user.role ? [user.role.name] : [],
      }));
      setUsers(mappedUsers);
    } catch (error) {
      console.error("Error al cargar usuarios: ", error);
      setErrorMessage("Hubo un problema al cargar los usuarios. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //Funciones
  const toggleModalForm = () => setViewModalForm(!viewModalForm);
  
  const handleChange = (key: keyof UserModel, value: string | number | Date) => {
    setFormData({ ...formData, [key]: value });
  };
  
  const handleSubmit = async () => {
    console.log("Datos guardados:", formData);

    try {
      if (formData.id === 0) {
        const newUser = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role_id: 2
        };
        await userService.create(newUser as UserModel);
      } else {
        const updatedUser = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role_id: 2
      };
        await userService.update(formData.id, updatedUser as UserModel);
      }
      fetchUsers();
    } catch (error) {
      setErrorMessage(`${error}`);
    } finally {
      setAlertMessage(false);
      toggleModalForm();
    }
  };

  
  const handleDelete = (user: UserModel) => {
    setSelectedUser(user);
    setAlertMessage(true);
  };

  const confirmDelete = async () => {
    try {
      if (selectedUser) {
          await userService.delete(selectedUser.id);
          fetchUsers();
      }
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
      setErrorMessage(`${error}`);
    } finally {
      setAlertMessage(false);
    }
  };

    // Determinar si el formulario está en modo edición
  const isEdit = formData.id !== 0;

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

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
              <th className="px-6 py-3">Correo</th>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4 flex items-center space-x-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold">
                    {user.email.charAt(0)}
                  </span>
                  <span>{user.email}</span>
                </td>
                <td className="px-6 py-4">{user.name}</td>
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
        onClick={() => { setFormData({ id: 0, email: "", token: "", password: "", name: "", role: [] }); toggleModalForm(); }}>
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
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Usuario</label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
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
          body={`¿Estás seguro de que deseas eliminar a ${selectedUser.name}?`}
          onCancel={() => setAlertMessage(false)}
          onConfirm={confirmDelete}
        />
      )}

      {/* ErrorMessage */}
      {erroMessage && <ErrorMessage message={erroMessage}/>}
    </div>
  );
};

export default ListCapturistas;

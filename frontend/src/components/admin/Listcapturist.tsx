import { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import ModalForm from "../General/ModalForm";
import AlertMessage from "../General/AlertMessage";
import { UserModel } from "../../models/UserModel";
import { CrudService } from "../../services/crudService";
import ErrorMessage from "../General/ErrorMessage";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SuccessMessage from "../General/SuccessMessage";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

DataTable.use(DT);
const ListCapturistas = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [formData, setFormData] = useState<UserModel>({ id: 0, email: "", token: "", password: "", name: "", role: ""});
  const [showPassword, setShowPassword] = useState(false);
  
  const [viewModalForm, setViewModalForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const [alertMessage, setAlertMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const userService = new CrudService<UserModel>("http://127.0.0.1:8000/users/api/");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});


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
        role: user.role,
      }));
      setUsers(mappedUsers);
    } catch (error) {
      setErrorMessage("Hubo un problema al cargar los usuarios. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //Funciones
  const toggleModalForm = () => {
    setViewModalForm(!viewModalForm);
    setErrors({});
  };
  
  const handleChange = (key: keyof UserModel, value: string | number | Date) => {
    setFormData({ ...formData, [key]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [key]: undefined }));
  };

  const validateForm = () => {
    let newErrors: { name?: string; email?: string; password?: string } = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!formData.email.trim()) newErrors.email = "El correo es obligatorio";
    if (!formData.password.trim()) newErrors.password = "La contraseña es obligatoria";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (!validateForm()) return; 
    
    try {
      const editNewUser = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role_id: 2
      };
      if (formData.id === 0) {
        await userService.create(editNewUser as UserModel);
        setSuccessMessage("Capturista creado exitosamente");
      } else {
        await userService.update(formData.id, editNewUser as UserModel);
        setSuccessMessage("Capturista editado exitosamente");
      }
      fetchUsers();
    } catch (error) {
      console.error("ERROR XD: " + error);

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
          setSuccessMessage("Eliminación exitosamente");
          fetchUsers();
      }
    } catch (error) {
      setErrorMessage(`${error}`);
    } finally {
      setAlertMessage(false);
    }
  };
  
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

      {/* Tabla de usuarios */}
      <div className="max-h-[calc(88vh-80px)] overflow-y-auto min-h-[200px] bg-white shadow-md rounded-lg p-4">
        <DataTable className="min-w-full table-auto display ">
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
                <td className="px-6 py-4 flex space-x-3">
                  <button
                    className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition cursor-pointer"
                    onClick={() => { setFormData(user); toggleModalForm(); }}>
                      <FaPen size={18} />
                  </button>
                  <button
                    className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-700 transition cursor-pointer"
                    onClick={() => handleDelete(user)}>
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </div>

      {/* Botón para registrar capturista */}
      <button
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition"
        onClick={() => {
          setFormData({ id: 0, email: "", token: "", password: "", name: "", role: "" });
          toggleModalForm();
        }}
      >
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
              <label className="block text-sm font-medium">Nombre Completo</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium">Usuario (Correo)</label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium">Contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 pr-10"
              />
              <button
                type="button"
                className="absolute top-9 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
      {errorMessage && <ErrorMessage message={errorMessage}/>}

      {/* SuccessMessage */}
      {successMessage && <SuccessMessage message={successMessage}/>}
    </div>
  );
};

export default ListCapturistas;

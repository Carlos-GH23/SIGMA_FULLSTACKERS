import { useEffect, useState } from "react";
import { ClientModel } from "../../models/ClientModel";
import { CrudService } from "../../services/crudService";
import { FaPen, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import ModalForm from "../General/ModalForm";
import AlertMessage from "../General/AlertMessage";
import ErrorMessage from "../General/ErrorMessage";
import SuccessMessage from "../General/SuccessMessage";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

DataTable.use(DT);
const ListClients = () => {
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState<ClientModel[]>([]);
    const [formData, setFormData] = useState<ClientModel>({ id: 0, name: "", surname: "", telephone: "", email: "", gender: "" });

    const [viewModalForm, setViewModalForm] = useState(false);
    const [selectedClient, setSelectedClient] = useState<ClientModel | null>(null);
    const [alertMessage, setAlertMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const crudService = new CrudService<ClientModel>("http://127.0.0.1:8000/cliente/api/");
    const [errors, setErrors] = useState<{ name?: string; surname?: string; telephone?: string; email?: string; gender?: string }>({});

    const fetchClients = async () => {
        try {
            setLoading(true);
            const clientsData = await crudService.getAll();
            const mappedClients = clientsData.map((client: any) => ({
                id: client.id,
                name: client.name,
                surname: client.surname,
                telephone: client.telephone,
                email: client.email,
                gender: client.gender,
            }));
            setClients(mappedClients);
        } catch (error) {
            setErrorMessage("Hubo un problema al cargar los clientes. Por favor, inténtalo de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    //Funciones
    const toggleModalForm = () => {
        setViewModalForm(!viewModalForm);
        setErrors({});
    };

    const handleChange = (key: keyof ClientModel, value: string | number | Date) => {
        setFormData({ ...formData, [key]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [key]: undefined }));
    };

    const validateForm = () => {
        let newErrors: { name?: string; surname?: string; telephone?: string; email?: string; gender?: string } = {};

        if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
        if (!formData.surname.trim()) newErrors.surname = "El apellido es obligatorio";
        if (!formData.telephone.trim()) newErrors.telephone = "El telefono es obligatorio";
        if (!formData.email.trim()) newErrors.email = "El correo es obligatorio";
        if (!formData.gender.trim()) newErrors.gender = "El genero es obligatoria";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            const editNewClient = {
                name: formData.name,
                surname: formData.surname,
                telephone: formData.telephone,
                email: formData.email,
                gender: formData.gender,
            };
            if (formData.id === 0) {
                await crudService.create(editNewClient as ClientModel);
                setSuccessMessage("Cliente creado exitosamente");
            } else {
                await crudService.update(formData.id, editNewClient as ClientModel);
                setSuccessMessage("Cliente editado exitosamente");
            }
            fetchClients();
        } catch (error) {
            setErrorMessage(`${error}`);
        } finally {
            setAlertMessage(false);
            toggleModalForm();
        }
    };

    const handleDelete = (client: ClientModel) => {
        setSelectedClient(client);
        setAlertMessage(true);
    };

    const confirmDelete = async () => {
        try {
            if (selectedClient) {
                await crudService.delete(selectedClient.id);
                setSuccessMessage("Eliminación exitosamente");
                fetchClients();
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
                <h2 className="text-2xl font-bold text-center">Clientes</h2>
            </div>


            {/* Tabla de usuarios */}
            <div className="max-h-[calc(88vh-80px)] overflow-y-auto min-h-[200px] bg-white shadow-md rounded-lg p-4">
                <DataTable className="min-w-full table-auto ">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 text-left">
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Telefono</th>
                            <th className="px-6 py-3">Correo</th>
                            <th className="px-6 py-3">Genero</th>
                            <th className="px-6 py-3">Fecha Registro</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <tr key={client.id} className="border-b hover:bg-gray-50 transition">
                                <td className="px-6 py-4">{client.id}</td>
                                <td className="px-6 py-4">{client.name} {client.surname}</td>
                                <td className="px-6 py-4">{client.telephone}</td>
                                <td className="px-6 py-4 flex items-center space-x-3">
                                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold">
                                        {client.email.charAt(0)}
                                    </span>
                                    <span>{client.email}</span>
                                </td>
                                <td className="px-6 py-4">{client.gender}</td>
                                <td className="px-6 py-4">{client.register_date ? new Date(client.register_date).toLocaleDateString() : new Date().toLocaleDateString()}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button
                                        className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition cursor-pointer"
                                        onClick={() => { setFormData(client); toggleModalForm(); }}>
                                        <FaPen size={18} />
                                    </button>
                                    <button
                                        className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-700 transition cursor-pointer"
                                        onClick={() => handleDelete(client)}>
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </DataTable>
            </div>

            {/* Botón para registrar */}
            <button
                className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition"
                onClick={() => {
                    setFormData({ id: 0, name: "", surname: "", telephone: "", email: "", gender: "" });
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
                title={isEdit ? "Editar Cliente" : "Registrar Cliente"}
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
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Apellidos</label>
                            <input
                                type="text"
                                value={formData.surname}
                                onChange={(e) => handleChange("surname", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                            />
                            {errors.surname && <p className="text-red-500 text-sm">{errors.surname}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Telefono</label>
                            <input
                                type="text"
                                value={formData.telephone}
                                onChange={(e) => handleChange("telephone", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                            />
                            {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Correo</label>
                            <input
                                type="text"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Genero</label>
                            <select
                                value={formData.gender}
                                onChange={(e) => handleChange("gender", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400">
                                <option value="" disabled hidden>Seleccionar</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Sin definir">Sin definir</option>
                            </select>
                            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                        </div>
                    </>
                }
                textConfirm={isEdit ? "Confirmación actualización" : "Confirmación registro"}
                textBodyConfirm={`¿Estás seguro de que deseas ${isEdit ? "actualizar la información del" : "registrar al nuevo"} cliente?`}
            />

            {/* AlertMessage para eliminar clientes */}
            {alertMessage && selectedClient && (
                <AlertMessage
                    title="Confirmar Eliminación"
                    body={`¿Estás seguro de que deseas eliminar a ${selectedClient.name} ${selectedClient.surname}?`}
                    onCancel={() => setAlertMessage(false)}
                    onConfirm={confirmDelete}
                />
            )}

            {/* ErrorMessage */}
            {errorMessage && <ErrorMessage message={errorMessage} />}

            {/* SuccessMessage */}
            {successMessage && <SuccessMessage message={successMessage} />}
        </div>
    );

}

export default ListClients;
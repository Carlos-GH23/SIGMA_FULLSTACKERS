import { useEffect, useState } from "react";
import { CrudService } from "../../services/crudService";
import ErrorMessage from "../General/ErrorMessage";
import SuccessMessage from "../General/SuccessMessage";
import AlertMessage from "../General/AlertMessage";
import ModalForm from "../General/ModalForm";
import { FaPlus } from "react-icons/fa";
import { ServiceModel } from "../../models/ServiceModel";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

DataTable.use(DT);
const ListServices = () => {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState<ServiceModel[]>([]);
    const [formData, setFormData] = useState<ServiceModel>({ id: 0, name: "", description: "", date: new Date(), cost: 0, vehicle: 0, image_url: "",});

    const [viewModalForm, setViewModalForm] = useState(false);
    const [selectedService, setSelectedService] = useState<ServiceModel | null>(null);
    const [alertMessage, setAlertMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const crudService = new CrudService<ServiceModel>("http://127.0.0.1:8000/servicio/api/");
    const [errors, setErrors] = useState<{ name?: string; description?: string; date?: string; cost?: string; vehicle?: string, image_url?: string }>({});

    const fetchServices = async () => {
        try {
            setLoading(true);
            const servicesData = await crudService.getAll();
            setServices(servicesData);
        } catch (error) {
            setErrorMessage("Hubo un problema al cargar los servicios. Por favor, inténtalo de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    //Funciones
    const toggleModalForm = () => {
        setViewModalForm(!viewModalForm);
        setErrors({});
    };

    const handleChange = (key: keyof ServiceModel, value: string | number | Date) => {
        if (key === "date") {
            value = value ? new Date(value).toISOString().split("T")[0] : "";
        }
        setFormData({ ...formData, [key]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [key]: undefined }));
    };

    const validateForm = () => {
        let newErrors: { name?: string; description?: string; date?: string; cost?: string; vehicle?: string, image_url?: string } = {};
    
        if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
        if (!formData.description.trim()) newErrors.description = "La descripción es obligatorio";
        if (!formData.date) newErrors.date = "La fecha es obligatoria";
        if (formData.cost === undefined || formData.cost === null || formData.cost === 0) newErrors.cost = "El costo es obligatorio";
        if (formData.vehicle === undefined || formData.vehicle === null || formData.vehicle === 0) newErrors.vehicle = "El vehiculo es obligatorio";
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        try {
            const editNewService = {
                name: formData.name,
                description: formData.description,
                date: formData.date,
                cost: formData.cost,
                vehicle: formData.vehicle,
                image_url: formData.image_url,
            };
            if (formData.id === 0) {
                await crudService.create(editNewService as ServiceModel);
                setSuccessMessage("Servicio creado exitosamente");
            } else {
                await crudService.update(formData.id, editNewService as ServiceModel);
                setSuccessMessage("Servicio editado exitosamente");
            }
            fetchServices();
        } catch (error) {
            setErrorMessage(`${error}`);
        } finally {
            setAlertMessage(false);
            toggleModalForm();
        }
    };

    const handleDelete = (vehicle: ServiceModel) => {
        setSelectedService(vehicle);
        setAlertMessage(true);
    };

    const confirmDelete = async () => {
        try {
            if (selectedService) {
                await crudService.delete(selectedService.id);
                setSuccessMessage("Eliminación exitosamente");
                fetchServices();
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
        <div className="h-[20vh]">
            {/* Encabezado */}
            <div className="w-full h-15 rounded-lg bg-purple-500 text-white mb-2 flex justify-center items-center">
                <h2 className="text-2xl font-bold text-center">Servicios</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {services.map((service) => (
                    <div key={service.id} className="rounded-xl shadow-lg bg-white overflow-hidden min-h-[320px] transition-transform transform hover:scale-105">
                    {/* Imagen del vehículo */}
                    <div
                        className="h-[180px] w-full bg-gray-200 rounded-t-xl"
                        style={{
                        backgroundImage: `url('${service.image_url || 'https://i.pinimg.com/736x/a5/bd/bb/a5bdbb181de3af001453c620c8b8dae6.jpg'}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                        }}
                    ></div>

                    {/* Contenido */}
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-purple-700 text-center mb-2">{service.name}</h3>
                        {/* Botones con diseño 1/3 - 2/3 */}
                        <div className="mt-4 flex gap-2">
                        <button 
                            className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-lg w-1/3 text-sm transition"
                            onClick={() => handleDelete(service)}
                        >
                            Eliminar
                        </button>
                        <button 
                            className="bg-purple-500 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded-lg w-2/3 text-sm transition"
                            onClick={() => { setFormData(service); toggleModalForm(); }}
                        >
                            Detalles
                        </button>
                        </div>
                    </div>
                    </div>
                ))}
            </div>


            {/* Botón para registrar */}
            <button
                className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition"
                onClick={() => {
                    setFormData({ id: 0, name: "", description: "", date: new Date(), cost: 0, vehicle: 0 });
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
                validateForm={validateForm}
                title={isEdit ? "Editar Servicio" : "Registrar Servicio"}
                textActionOk={isEdit ? "Actualizar" : "Guardar"}
                body={
                <>
                    <div>
                        <label className="block text-sm font-medium">Imagen</label>
                        <div className="w-full h-40 bg-gray-100 flex items-center justify-center border rounded-lg">
                            {formData.image_url ? (
                                <img src={formData.image_url} alt="Previsualización" className="h-full object-cover rounded-lg" />
                            ) : (
                                <span className="text-gray-500">No hay imagen seleccionada</span>
                            )}
                        </div>
                        <input
                            type="text"
                            value={formData.image_url}
                            onChange={(e) => handleChange("image_url", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 mt-2"
                            placeholder="Ingrese la URL de la imagen"
                        />
                    </div>
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
                        <label className="block text-sm font-medium">Descripción</label>
                        <input
                            type="text"
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Fecha de registro</label>
                        <input
                            type="date"
                            value={formData.date ? formData.date.toString() : ""} 
                            onChange={(e) => handleChange("date", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium">Costo</label>
                        <input
                            type="number"
                            value={formData.cost}
                            onChange={(e) => handleChange("cost", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.cost && <p className="text-red-500 text-sm">{errors.cost}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Vehiculo</label>
                        <input
                            type="number"
                            value={formData.vehicle}
                            onChange={(e) => handleChange("vehicle", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.vehicle && <p className="text-red-500 text-sm">{errors.vehicle}</p>}
                    </div>
                </>
                }
                textConfirm={isEdit ? "Confirmación actualización" : "Confirmación registro"}
                textBodyConfirm={`¿Estás seguro de que deseas ${isEdit ? "actualizar la información del" : "registrar al nuevo"} vehiculo?`}
            />

            {/* AlertMessage para eliminar Vehiculos */}
            {alertMessage && selectedService && (
                <AlertMessage
                title="Confirmar Eliminación"
                body={`¿Estás seguro de que deseas eliminar ${selectedService.name}?`}
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

export default ListServices;
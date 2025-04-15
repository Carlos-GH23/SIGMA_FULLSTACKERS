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
import { isAdmin } from "../../services/AuthService";
import { VehicleModel } from "../../models/VehicleModel";

DataTable.use(DT);
const ListServices = () => {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState<ServiceModel[]>([]);
    const [formData, setFormData] = useState<ServiceModel>({ id: 0, name: "", description: "", date: new Date(), cost: 0, vehicle: 0, image_url: "", next_service: undefined });

    const [viewModalForm, setViewModalForm] = useState(false);
    const [selectedService, setSelectedService] = useState<ServiceModel | null>(null);
    const [alertMessage, setAlertMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const crudService = new CrudService<ServiceModel>("http://127.0.0.1:8000/vehiculo/servicio/api/");
    const vehicleService = new CrudService<VehicleModel>("http://127.0.0.1:8000/vehiculo/api/");
    const [errors, setErrors] = useState<{ name?: string; description?: string; date?: string; cost?: string; vehicle?: string, image_url?: string, next_service?: string }>({});

    const [vehicles, setVehicles] = useState<VehicleModel[]>([]);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const servicesData = await crudService.getAll();
            setServices(servicesData);
            fetchVehicles();
        } catch (error) {
            setErrorMessage("Hubo un problema al cargar los servicios. Por favor, inténtalo de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    const fetchVehicles = async () => {
        try {
            const vehiclesData = await vehicleService.getAll();
            setVehicles(vehiclesData);
        } catch (error) {
            console.error("Hubo un problema al cargar los vehiculos. Por favor, inténtalo de nuevo más tarde.");
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
        if (key === "next_service") {
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
        setErrorMessage("");
        try {
            if (formData.id === 0) {
                await crudService.create(formData);
                setSuccessMessage("Servicio creado exitosamente");
            } else {
                await crudService.update(formData.id, formData);
                setSuccessMessage("Servicio editado exitosamente");
            }
            setAlertMessage(false);
            toggleModalForm();
            fetchServices();
        } catch (error) {
            setErrorMessage(`${error}`);
        }
    };

    const handleDelete = (vehicle: ServiceModel) => {
        setSelectedService(vehicle);
        setAlertMessage(true);
    };

    const confirmDelete = async () => {
        setErrorMessage("");
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

    const parseLocalDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day); // Date en zona local, no UTC
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
            <div className="text-center my-4">
                <h2 className="text-3xl font-extrabold text-gray-800 font-serif">Servicios</h2>
                <div className="w-full mx-auto mt-2 border-b-4 border-gray-800"></div>
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
                        <h3 className="text-lg font-bold text-gray-900 text-center mb-2">{service.name}</h3>
                        
                        {/* Contenedor de detalles en dos columnas */}
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            <p>
                                <span className="font-semibold text-gray-800">Fecha:</span>{" "}
                                {service.date? new Date(service.date).toLocaleDateString("es-ES", {day: "2-digit", month: "long", year: "numeric"}): "Sin fecha disponible"}
                            </p>
                            <p><span className="font-semibold text-gray-800">Costo:</span> {service.cost}</p>
                            {service.next_service && (
                                <p>
                                    <span className="font-semibold text-gray-800">Fecha siguiente servicio:</span>{" "}
                                    {parseLocalDate(`${service.next_service}`).toLocaleDateString("es-ES", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}

                                </p>
                            )}

                        </div>

                        <div className="mt-4 flex gap-2">
                        
                        {isAdmin() && (
                            <button 
                                className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-lg w-1/3 text-sm transition"
                                onClick={() => handleDelete(service)}
                            >
                                Eliminar
                            </button>
                        )}
                        <button 
                            className={`bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg ${isAdmin() ? 'w-2/3' : 'w-full'} text-sm transition`}
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
                        <div className="mb-4">
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium">Nombre</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                    
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium">Costo</label>
                                <input
                                    type="number"
                                    value={formData.cost}
                                    onChange={(e) => handleChange("cost", e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                                />
                                {errors.cost && <p className="text-red-500 text-sm">{errors.cost}</p>}
                            </div>
                    
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium">Fecha de registro</label>
                                <input
                                    type="date"
                                    value={formData.date ? formData.date.toString() : ""}
                                    onChange={(e) => handleChange("date", e.target.value)}
                                    max={new Date().toISOString().split("T")[0]}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                                />
                                {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium">Vehiculo</label>
                                <select
                                    value={formData.vehicle}
                                    onChange={(e) => handleChange("vehicle", parseInt(e.target.value))}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                                >
                                    <option value="0" disabled hidden>Seleccionar vehiculo</option>
                                    {vehicles.map(vehicle => (
                                        <option key={vehicle.id} value={vehicle.id}>
                                            {vehicle.brand} {vehicle.model} 
                                        </option>
                                    ))}
                                </select>
                                {errors.vehicle && <p className="text-red-500 text-sm">{errors.vehicle}</p>}
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium">Fecha siguiente servicio</label>
                                <input
                                    type="date"
                                    value={formData.next_service ? formData.next_service.toString() : ""}
                                    onChange={(e) => handleChange("next_service", e.target.value)}
                                    min={new Date().toISOString().split("T")[0]}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                                />
                                {errors.next_service && (
                                    <p className="text-red-500 text-sm">{errors.next_service}</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium">Descripción</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                rows={5}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                                placeholder="Ingrese una descripción detallada"
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
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
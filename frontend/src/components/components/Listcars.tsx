import { useEffect, useState } from "react";
import { VehicleModel } from "../../models/VehicleModel";
import { CrudService } from "../../services/crudService";
import ErrorMessage from "../General/ErrorMessage";
import SuccessMessage from "../General/SuccessMessage";
import AlertMessage from "../General/AlertMessage";
import ModalForm from "../General/ModalForm";
import { FaPlus } from "react-icons/fa";

const ListCars = () => {
    const [loading, setLoading] = useState(true);
    const [vehicles, setVehicles] = useState<VehicleModel[]>([]);
    const [formData, setFormData] = useState<VehicleModel>({ id: 0, brand: "", model: "", service_number: 0, year: 0, plate: "", color: "", fuel_type: "", client: 0});

    const [viewModalForm, setViewModalForm] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleModel | null>(null);
    const [alertMessage, setAlertMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const crudService = new CrudService<VehicleModel>("http://127.0.0.1:8000/vehiculo/api/");
    const [errors, setErrors] = useState<{ brand?: string; model?: string; service_number?: string; year?: string; plate?: string, color?: string, fuel_type?: string, client?: string }>({});

    const fetchVehicles = async () => {
        try {
            setLoading(true);
            const vehiclesData = await crudService.getAll();
            setVehicles(vehiclesData);
        } catch (error) {
            setErrorMessage("Hubo un problema al cargar los vehiculos. Por favor, inténtalo de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    //Funciones
    const toggleModalForm = () => {
        setViewModalForm(!viewModalForm);
        setErrors({});
    };

    const handleChange = (key: keyof VehicleModel, value: string | number | Date) => {
        

        setFormData({ ...formData, [key]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [key]: undefined }));
    };

    const validateForm = () => {
        let newErrors: { brand?: string; model?: string; service_number?: string; year?: string; plate?: string, color?: string, fuel_type?: string, client?: string } = {};
    
        if (!formData.brand.trim()) newErrors.brand = "La marca es obligatorio";
        if (!formData.model.trim()) newErrors.model = "El modelo es obligatorio";
        if (formData.service_number === undefined || formData.service_number === null || formData.service_number === 0) newErrors.service_number = "El num. de servicio es obligatorio";
        if (formData.year === undefined || formData.year === null || formData.year === 0) newErrors.year = "El año es obligatorio";
        if (!formData.year) newErrors.year = "El año es obligatorio";
        if (!formData.plate.trim()) newErrors.plate = "La placa es obligatoria";
        if (!formData.color.trim()) newErrors.color = "El color es obligatoria";
        if (!formData.fuel_type.trim()) newErrors.fuel_type = "El tipó de combustible es obligatoria";
        if (formData.client === undefined || formData.client === null || formData.client === 0) newErrors.client = "El cliente es obligatorio";
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return; 
        
        try {
            const editNewVehicle = {
                brand: formData.brand,
                model: formData.model,
                service_number: formData.service_number,
                year: formData.year,
                plate: formData.plate,
                color: formData.color,
                fuel_type: formData.fuel_type,
                client: formData.client,
            };
            if (formData.id === 0) {
                await crudService.create(editNewVehicle as VehicleModel);
                setSuccessMessage("Vehiculo creado exitosamente");
            } else {
                await crudService.update(formData.id, editNewVehicle as VehicleModel);
                setSuccessMessage("Vehiculo editado exitosamente");
            }
            fetchVehicles();
        } catch (error) {
            setErrorMessage(`${error}`);
        } finally {
            setAlertMessage(false);
            toggleModalForm();
        }
    };

    const handleDelete = (vehicle: VehicleModel) => {
        setSelectedVehicle(vehicle);
        setAlertMessage(true);
    };

    const confirmDelete = async () => {
        try {
            if (selectedVehicle) {
                await crudService.delete(selectedVehicle.id);
                setSuccessMessage("Eliminación exitosamente");
                fetchVehicles();
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
                <h2 className="text-2xl font-bold text-center">Clientes</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                {vehicles.map((vehicle) => (
                    <div className="rounded-lg shadow-lg  h-[250px]">
                        <div className="h-[100px] md:h-[150px] rounded-lg shadow-lg"
                            style={{
                                backgroundImage: `url('https://i.pinimg.com/736x/a5/bd/bb/a5bdbb181de3af001453c620c8b8dae6.jpg')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}>
                        </div>
                        <div className="h-[50px] justify-start items-center">
                            <ul className="text-purple-500  flex inline-flex justify-start items-center p-2">
                            <li className="text-md ml-2 w-1/2 ">Modelo:{vehicle.model}</li>
                            <li className="text-md ml-2 w-1/2">Marca:{vehicle.brand}</li>
                            <li className="text-md ml-2 w-1/2">Modelo:{vehicle.model}</li>
                            </ul>

                            <div className="h-[50px] flex p-2 gap-2">
                                <button 
                                    className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-lg w-1/3 text-sm"
                                    onClick={() => handleDelete(vehicle)}
                                >
                                    Eliminar
                                </button>
                                <button 
                                    className="bg-purple-500 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded-lg w-2/3 text-sm"
                                    onClick={() => { setFormData(vehicle); toggleModalForm(); }}>
                                    Detalles
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {/* Botón para registrar */}
            <button
                className="fixed bottom-6 right-6 bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-600 transition"
                onClick={() => {
                    setFormData({ id: 0, brand: "", model: "", service_number: 0, year: 0, plate: "", color: "", fuel_type: "", client: 0 });
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
                title={isEdit ? "Editar Vehiculo" : "Registrar Vehiculo"}
                textActionOk={isEdit ? "Actualizar" : "Guardar"}
                body={
                <>
                    <div>
                        <label className="block text-sm font-medium">Marca</label>
                        <input
                            type="text"
                            value={formData.brand}
                            onChange={(e) => handleChange("brand", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.brand && <p className="text-red-500 text-sm">{errors.brand}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Modelo</label>
                        <input
                            type="text"
                            value={formData.model}
                            onChange={(e) => handleChange("model", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Número de servicio</label>
                        <input
                            type="number"
                            value={formData.service_number}
                            onChange={(e) => handleChange("service_number", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.service_number && <p className="text-red-500 text-sm">{errors.service_number}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium">Año</label>
                        <input
                            type="number"
                            value={formData.year}
                            onChange={(e) => handleChange("year", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Placas</label>
                        <input
                            type="text"
                            value={formData.plate}
                            onChange={(e) => handleChange("plate", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.plate && <p className="text-red-500 text-sm">{errors.plate}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium">Color</label>
                        <input
                            type="text"
                            value={formData.color}
                            onChange={(e) => handleChange("color", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Tipo de combustible</label>
                        <input
                            type="text"
                            value={formData.fuel_type}
                            onChange={(e) => handleChange("fuel_type", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.fuel_type && <p className="text-red-500 text-sm">{errors.fuel_type}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium">Cliente</label>
                        <input
                            type="number"
                            value={formData.client}
                            onChange={(e) => handleChange("client", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.client && <p className="text-red-500 text-sm">{errors.client}</p>}
                    </div>
                </>
                }
                textConfirm={isEdit ? "Confirmación actualización" : "Confirmación registro"}
                textBodyConfirm={`¿Estás seguro de que deseas ${isEdit ? "actualizar la información del" : "registrar al nuevo"} vehiculo?`}
            />

            {/* AlertMessage para eliminar capturista */}
            {alertMessage && selectedVehicle && (
                <AlertMessage
                title="Confirmar Eliminación"
                body={`¿Estás seguro de que deseas eliminar el ${selectedVehicle.model} ${selectedVehicle.brand}?`}
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

export default ListCars;
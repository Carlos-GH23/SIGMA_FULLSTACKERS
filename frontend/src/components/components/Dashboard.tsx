import { useEffect, useState } from "react";
import { ClientModel } from "../../models/ClientModel";
import { VehicleModel } from "../../models/VehicleModel";
import { ServiceModel } from "../../models/ServiceModel";
import { CrudService } from "../../services/crudService";

const Dashboard = () => {
    // Clientes
    const [clients, setClients] = useState<ClientModel[]>([]);
    const [loadingClients, setLoadingClients] = useState(false);
    const clientApi = new CrudService<ClientModel>("http://127.0.0.1:8000/cliente/api/");
    const fetchClients = async () => {
        try {
            setLoadingClients(true);
            const clientsData = await clientApi.getAll();
            setClients(clientsData);
        } catch (error) {
            console.log("Hubo un problema al cargar los clientes. Por favor, inténtalo de nuevo más tarde.");
        } finally {
            setLoadingClients(false);
        }
    };

    //Vehiculos
    const [vehicles, setVehicles] = useState<VehicleModel[]>([]);
    const [loadingVehicles, setLoadingVehicles] = useState(false);
    const vehicleApi = new CrudService<VehicleModel>("http://127.0.0.1:8000/vehiculo/api/");
    const fetchVehicles = async () => {
        try {
            setLoadingVehicles(true);
            const vehiclesData = await vehicleApi.getAll();
            setVehicles(vehiclesData);
        } catch (error) {
            console.log("Hubo un problema al cargar los vehiculos. Por favor, inténtalo de nuevo más tarde.");
        } finally {
            setLoadingVehicles(false);
        }
    };

    //Servicios
    const [services, setServices] = useState<ServiceModel[]>([]);
    const [loadingServices, setLoadingServices] = useState(false);
    const serviceApi = new CrudService<ServiceModel>("http://127.0.0.1:8000/vehiculo/servicio/api/");
    const fetchServices = async () => {
        try {
            setLoadingServices(true);
            const servicesData = await serviceApi.getAll();
            setServices(servicesData);
        } catch (error) {
            console.log("Hubo un problema al cargar los servicios. Por favor, inténtalo de nuevo más tarde.");
        } finally {
            setLoadingServices(false);
        }
    };

    useEffect(() => {
        fetchClients();
        fetchVehicles();
        fetchServices();
    }, []);

    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    const upcomingServices = services.filter(
        (s) =>
            s.next_service &&
            new Date(s.next_service) >= today &&
            new Date(s.next_service) <= sevenDaysFromNow
    );

    const getClientById = (id: number) => clients.find(c => c.id === id);
    const getVehicleById = (id: number) => vehicles.find(v => v.id === id);

    const parseLocalDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day); // Date en zona local, no UTC
    };

    return (
        <div className="p-6">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card title="Clientes" loading={loadingClients} count={clients.length} />
                <Card title="Vehículos" loading={loadingVehicles} count={vehicles.length} />
                <Card title="Servicios" loading={loadingServices} count={services.length} />
            </div>

            {/* Citas próximas */}
            <h2 className="text-xl font-bold mb-4">Citas Próximas</h2>
            <div className="flex flex-wrap gap-4">
                {upcomingServices.length > 0 ? (
                    upcomingServices.map(service => {
                        const vehicle = getVehicleById(service.vehicle);
                        const client = vehicle ? getClientById(vehicle.client) : undefined;

                        return (
                            <div
                                key={service.id}
                                className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.5rem)] lg:w-[calc(25%-0.75rem)] bg-white rounded-xl shadow-sm border"
                            >
                                {/* Vehículo */}
                                <div
                                    className="h-[180px] w-full bg-gray-200 rounded-t-xl"
                                    style={{
                                        backgroundImage: `url('${vehicle?.image_url || 'https://i.pinimg.com/736x/a5/bd/bb/a5bdbb181de3af001453c620c8b8dae6.jpg'}')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                ></div>
                                {/* Contenido del card */}
                                <div className="p-3">
                                    <h3 className="text-lg font-bold text-gray-900 text-center mb-2">{vehicle?.brand} {vehicle?.model}</h3>
                                    <div className="mb-1">
                                        <p className="font-semibold text-gray-800 text-base">🚗 {vehicle?.plate}</p>
                                    </div>
                                    {/* Cliente */}
                                    <div className="mb-1">
                                        <p className="text-blue-700 font-bold text-base">👤 {client?.name} {client?.surname}</p>
                                        <p className="font-semibold text-gray-800 text-sm">📞 {client?.telephone}</p>
                                        <p className="font-semibold text-gray-800 text-sm">📧 {client?.email}</p>
                                    </div>

                                    {/* Servicio */}
                                    <div>
                                        <p className="font-bold text-green-700 text-base">🛠️ {service.name}</p>
                                        <p className="font-semibold text-gray-800 text-sm">
                                            📅 {parseLocalDate(`${service.next_service}`).toLocaleDateString("es-ES", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })} | 💰 ${service.cost}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500">No hay citas próximas.</p>
                )}
            </div>
        </div>
    );
};

// Card Component
const Card = ({ title, loading, count }: { title: string; loading: boolean; count: number }) => (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        {loading ? (
            <div className="h-6 w-6 mx-auto animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></div>
        ) : (
            <p className="text-3xl font-semibold text-blue-600">{count}</p>
        )}
    </div>
);

export default Dashboard;
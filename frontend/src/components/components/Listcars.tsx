const carros = [
    {
        id: 1,
        marca: "Toyota",
        modelo: "Corolla",
        año: 2022,
        color: "Azul",
        precio: 25000,
    },
    {
        id: 2,
        marca: "Honda",
        modelo: "Civic",
        año: 2021,
        color: "Rojo",
        precio: 23000,
    },
    {
        id: 3,
        marca: "Ford",
        modelo: "Mustang",
        año: 2023,
        color: "Negro",
        precio: 50000,
    },
    {
        id: 4,
        marca: "Chevrolet",
        modelo: "Camaro",
        año: 2022,
        color: "Amarillo",
        precio: 45000,
    },
    {
        id: 5,
        marca: "Tesla",
        modelo: "Model 3",
        año: 2023,
        color: "Blanco",
        precio: 55000,
    },
    {
        id: 6,
        marca: "Nissan",
        modelo: "Altima",
        año: 2020,
        color: "Gris",
        precio: 22000,
    }
];
const ListCars = () => {
    return (
        <div className="h-[20vh]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                {carros.map((carro) => (
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
                            <li className="text-md ml-2 w-1/2 ">Modelo:{carro.modelo}</li>
                            <li className="text-md ml-2 w-1/2">Modelo:{carro.modelo}</li>
                            <li className="text-md ml-2 w-1/2">Modelo:{carro.modelo}</li>
                            </ul>
                            <button className="bg-purple-500 hover:bg-purple-300 text-white font-bold ml-2 py-3 px-4 rounded-lg w-[16vw] md:w-[22vw] text-lg">Detalles</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListCars;
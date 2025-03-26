import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="grid grid-cols-2 w-[30vw] h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col col-span-2 h-[40vh] justify-center items-center p-8" style={{
          backgroundImage: `url('https://i.pinimg.com/736x/76/3d/f4/763df4e5a0209225821d1dc13721346c.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}>
        </div>
        <div className="flex flex-col col-span-2 items-center items-center p-8">
          <h1 className="text-[50px] text-center font-bold">404</h1>
          <span className="text-[25px] text-center font-semibold ">Lo sentimos al parecer la pagina que buscas ha sido
            modificada o eliminada.
          </span>
          <button className="bg-purple-500 hover:bg-purple-600 text-white mt-2 font-bold py-3 px-4 rounded-lg w-[20vw] text-lg" onClick={() => navigate(-1)}>Volver</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
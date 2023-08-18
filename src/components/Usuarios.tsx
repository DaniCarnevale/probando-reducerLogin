import { useEffect, useRef, useState } from "react";
import { reqResApi } from "../api/reqRes";
import { ReqResListado, Usuario } from "../interfaces/reqRes";

const Usuarios = () => {

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  let paginaRef = useRef(1);

  useEffect(() => {
    //llamado a la api
    cargarUsuarios();
  }, [])
  

const cargarUsuarios = async() => {
  const resp = await reqResApi.get<ReqResListado>('/users', {
    params: {
      page: paginaRef.current
    }
  })
  if(resp.data.data.length > 0){
    setUsuarios(resp.data.data);
    paginaRef.current ++ ;
  }else{
    alert('No hay mas registros');
  }
}

const renderItem = ( usuario: Usuario) => {
  return(
    <tr key={usuario.id.toString()}>
      <td><img src={usuario.avatar} alt="usuario" style={{
        width: 50,
        borderRadius: 100
      }} /></td>
      <td>{usuario.first_name} {usuario.last_name} </td>
      <td>{usuario.email}</td>
    </tr>
  )
}

  return (
    <div>
      <h3>Usuarios</h3>
      <table className="table">
        <thead>
            <tr>
              <th>Avatar</th>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
        </thead>
        <tbody>
          {
            usuarios.map(renderItem)
          }
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={cargarUsuarios}>
        Siguientes
      </button>
    </div>
  )
}

export default Usuarios;

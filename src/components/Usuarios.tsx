import { Usuario } from "../interfaces/reqRes";
import { useUsuarios } from "../hooks/useUsuarios";

const Usuarios = () => {
  const { usuarios, cargarUsuarios } = useUsuarios();

  const renderItem = (usuario: Usuario) => {
    return (
      <tr key={usuario.id.toString()}>
        <td>
          <img
            src={usuario.avatar}
            alt="usuario"
            style={{
              width: 50,
              borderRadius: 100,
            }}
          />
        </td>
        <td>
          {usuario.first_name} {usuario.last_name}{" "}
        </td>
        <td>{usuario.email}</td>
      </tr>
    );
  };

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
        <tbody>{usuarios.map(renderItem)}</tbody>
      </table>
      <button className="btn btn-primary" onClick={cargarUsuarios}>
        Siguientes
      </button>
    </div>
  );
};

export default Usuarios;

import { useEffect, useRef, useState } from "react";
import { ReqResListado, Usuario } from "../interfaces/reqRes";
import { reqResApi } from "../api/reqRes";

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  let paginaRef = useRef(1);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const resp = await reqResApi.get<ReqResListado>("/users", {
      params: {
        page: paginaRef.current,
      },
    });
    if (resp.data.data.length > 0 && paginaRef.current < 3) {
      setUsuarios(resp.data.data);
    } else {
      paginaRef.current --;
      alert("No hay mas registros");
    }
  };

  const paginaSiguiente = () => {
    
      paginaRef.current ++;
      cargarUsuarios();
    
  };

  const paginaAnterior = () => {
    if (paginaRef.current > 1) {
    paginaRef.current --;
    cargarUsuarios();}
  };

  return {
    usuarios,
    paginaSiguiente,
    paginaAnterior,
  };
};

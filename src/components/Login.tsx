import { useReducer } from "react";

interface AuthState {
  validando: boolean;
  token: string | null;
  username: string;
  nombre: string;
}

const initialState = {
  validando: false,
  token: null,
  username: "",
  nombre: "",
};

type LoginPayload = {
  username: string;
  nombre: string;
};

type AuthAction =
  | { type: "logout" }
  | { type: "login"; payload: LoginPayload }
  | { type: "startValidation" }; // Nuevo tipo de acción

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "logout":
      return {
        validando: false,
        token: null,
        username: "",
        nombre: "",
      };

    case "login":
      const { nombre, username } = action.payload;
      return {
        validando: false,
        token: "xdxdxd",
        nombre,
        username,
      };

    case "startValidation": // Manejar la nueva acción
      return {
        ...state,
        validando: true,
      };

    default:
      return state;
  }
}

const Login = () => {
  const [{ validando, token, nombre }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  const login = () => {
    dispatch({ type: "startValidation" });
    setTimeout(() => {
      dispatch({
        type: "login",
        payload: {
          nombre: "Dani",
          username: "Drako",
        },
      });
    }, 1500);
  };

  const logout = () => {
    dispatch({ type: "startValidation" });
    setTimeout(() => {
      dispatch({ type: "logout" });
    }, 1500);
  };

  if (validando) {
    return (
      <>
        <div className="alert alert-info">Validando...</div>
      </>
    );
  }

  return (
    <>
      <h3>Login</h3>

      {token ? (
        <>
          <div className="alert alert-success">Autenticado como {nombre} </div>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <div className="alert alert-danger">No autenticado</div>
          <button className="btn btn-primary" onClick={login}>
            Login
          </button>
        </>
      )}
    </>
  );
};

export default Login;

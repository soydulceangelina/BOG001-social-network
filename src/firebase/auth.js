import { auth, provider } from './init';


// valida si hay una sesion
export const validateSession = () => {
  if (['#/', '#/login', '#/sign-up'].includes(window.location.hash)) {
    return;
  }
  const session = localStorage.getItem('session');
  if (!session || !JSON.parse(session).user) {
    window.location.href = 'http://localhost:8080/#/login';
  }
};

// Registro con correo y contraseña
export const createUserByEmailAndPass = (email, password) => auth
  .createUserWithEmailAndPassword(email, password);

// Inicio de sesion
export const loginUser = (email, password) => auth
  .signInWithEmailAndPassword(email, password);


// Inicio de Sesion Google
export const loginUserGoogle = () => auth.signInWithPopup(provider);

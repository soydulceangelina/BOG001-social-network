import {
  credentials, successUid, passwordError, userError, registrationError,
} from './__mocks__/auth.mock';

import { loginUser, createUserByEmailAndPass } from '../src/firebase/auth';

/* funcion que se va a llamar antes de cada prueba.
* necesitamos que no exista navegacion en el test, jest no lo soporta
*/

beforeEach(() => {
  delete window.location;
  window.location = {};
});

test('Debería iniciar sesión con las credenciales correctas',
  async () => {
    await loginUser(credentials.email, credentials.password);
    expect(JSON.parse(localStorage.getItem('session')).user.uid).toBe(successUid);
  });

test('Debería fallar con la contraseña errónea',
  () => loginUser(credentials.email, 'holanda')
    .catch((error) => {
      expect(error.code).toStrictEqual(passwordError.code);
      expect(error.message).toStrictEqual(passwordError.message);
    }));

test('Debería fallar con el correo erróneo',
  () => loginUser('holanda@holanda.com', credentials.password)
    .catch((error) => {
      expect(error.code).toStrictEqual(userError.code);
      expect(error.message).toStrictEqual(userError.message);
    }));

describe('Funcion createUserByEmailAndPass', () => {
  test('Debería fallar si el correo no es valido', () => {
    createUserByEmailAndPass('holanda@holanda.com', credentials.password, 'Bogota', '').catch((error) => {
      expect(error.code).toStrictEqual(registrationError.code);
      expect(error.message).toStrictEqual(registrationError.message);
    });
  });
});

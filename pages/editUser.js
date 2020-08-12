import { getUserProfile, userUpdate } from '../firebase/database';
import { fileRegister } from '../firebase/storage';

const editUser = async () => {
  let user;
  await getUserProfile().then((snapshot) => {
    if (snapshot.empty) {
      return;
    }
    snapshot.forEach((element) => {
      user = element.data();
    });
  }).catch((err) => {
    console.log('Error getting documents', err);
  });
  const view = `
  <a href="#/profile" title="Descartar los cambios"><span class="flaticon-remove postIcon"></span></a>
    <div class="form__box">
      <h1 class="login__title container__form--title">
          Edita tu usuario
      </h1>
      <form id="formUpdate" class="form">
        <div class="form-group">
          <input id="username" type="text" placeholder="Nombre de Usuario" required value="${user.usuario}">
          <label for="username">Nombre de Usuario</label>
        </div>
        <div class="form-group">
          <input id="email" type="email" placeholder="Correo" required value="${user.correo}">
          <label for="email">Correo</label>
        </div>
        <div class="form-group">
          <input id="city" type="text" placeholder="Ciudad" required value="${user.ciudad}">
          <label for="city">Ciudad</label>
        </div>
        <div class="form-group">
        <input type="file" id="image" placeholder="Imagen">
        <label for="image">Imagen</label>
      </div>
        <button id="button" type="submit">Actualizar</button>
      </form>
    </div>
`;

  const container = document.createElement('div');
  container.setAttribute('class', 'form');
  container.innerHTML = view;

  const saveImg = () => {
    const file = document.getElementById('image').files;
    if (file.length > 0) {
      const fileType = file[0].type.split('/')[1];
      const fileName = user.id.concat('.', fileType);
      return fileRegister(file, fileName);
    }
  };

  const updateUser = () => {
    const email = document.getElementById('email').value;
    const city = document.getElementById('city').value;
    const username = document.getElementById('username').value;
    if (saveImg()) {
      const photo = saveImg();
    }
    const user = {
      correo: email,
      ciudad: city,
      usuario: username,
      
    }
  };

  container.querySelector('#formUpdate').addEventListener('submit', (e) => {
    e.preventDefault();
    updateUser();
  });

  return container;
};

export default editUser;

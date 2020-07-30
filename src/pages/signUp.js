import { createUserByEmailAndPass } from '../firebase/auth';

const signUp = () => {
  const createUser = () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    createUserByEmailAndPass(email, pass);
  };

  const view = `
    <section class='signUp container__form'>
      <h1 class='container__form--title'>
          Registrate
      </h1>
      <form class='signUp__form form'>
        <div class="form-group">
          <input id='' type='text' placeholder='username'>
          <label for="name">Username</label>
        </div>
        <div class="form-group">
          <input id='email' type='email' placeholder='email'>
          <label for="name">Email</label>
        </div>
        <div class="form-group">
          <input id='' type='text' placeholder='ciudad'>
          <label for="name">Email</label>
        </div>
        <div class="form-group">
          <input id='pass' type='password' placeholder='contraseña'>
          <label for="name">Email</label>
        </div>
        <a id="button" href="#/..." type='button'>Registrar</a>
      </form>
      <div class='signUp__google'>
          <h3>o registrate con</h3>
          <h3>
          <a href='#/...'><img class="google-icon" src="../assets/seo-and-web.png" alt=""></a>
          </h3>
      </div>
    </section>`;

  const container = document.createElement('div');
  container.innerHTML = view;
  const botonRegistro = container.querySelector('#button');
  botonRegistro.addEventListener('click', () => { createUser(); });
  return container;
};

export default signUp;
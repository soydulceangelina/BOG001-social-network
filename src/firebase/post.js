import { database, timeStamp } from './init';

export const saveEvent = (hour, date, sport, place, description) => {
  const infLocalStorage = localStorage.getItem('session');
  const convetInfoJson = JSON.parse(infLocalStorage);
  const IdUser = convetInfoJson.user.uid;
  const nameUser = convetInfoJson.user.displayName;
  console.log(IdUser);
  database.collection('events').add({
    id: IdUser,
    nombre: nameUser,
    hora: hour,
    fechaEvento: date,
    deporte: sport,
    lugar: place,
    descripcion: description,
    fechaPublicacion: timeStamp,
  }).then((respuesta) => {
    console.log(respuesta);
  });
};

export const getEvents = () => database.collection('events').get();

export const deletePost = (id) => {
  database.collection('events').doc(id).delete();
};

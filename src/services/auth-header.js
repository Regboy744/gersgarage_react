export default function authHeader() {
     const user = JSON.parse(localStorage.getItem("user"));
     console.log(user);

     if (user && user.accessToken) {
          console.log(" algo acontece aqui segundo");
          return console.log("teste");
     } else {
          console.log(" algo acontece aqui teceriro");
          return console.log(" u erro algo acontece aqui");
     }
}

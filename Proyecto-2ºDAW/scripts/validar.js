
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ENTENDER, configuracion ayudada por IA
const firebaseConfig = {
    apiKey: "AIzaSyBY5jLH3Q2_OFaUJGYWE9g387JULqJvNXg",
    authDomain: "proyecto-2odaw.firebaseapp.com",
    projectId: "proyecto-2odaw",
    storageBucket: "proyecto-2odaw.firebasestorage.app",
    messagingSenderId: "311352499522",
    appId: "1:311352499522:web:fbc1d897fcc675b5ee7cdb",
    measurementId: "G-T01CX329WL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

(function(){

    const validacionC = document.querySelector('#input-contrasenia');
    const validacionU = document.querySelector('#input-usuario');
    const botonEnviar = document.getElementById('boton-enviar');
    const resultado = document.querySelector('#span-resultado');
    
    // Se añade async aqui para poder usar await mas adelante
    //REVISAR QUE ES UNA FUNCION ASYNC
    botonEnviar.onclick = async function(){
        const contraseniaEscrita = validacionC.value;
        const usuarioEscrito = validacionU.value;

        // limpiamos los estilos añadidos, para que se resetee en caso de otro intento
        validacionU.classList.remove("input-wrong");
        validacionC.classList.remove("input-wrong");

        if((contraseniaEscrita === "") && (usuarioEscrito === "")){
            resultado.textContent = 'Introduce los datos de sesion.';
            validacionU.classList.add("input-wrong");
            validacionC.classList.add("input-wrong");
        }

        else if((contraseniaEscrita === "") && (usuarioEscrito)){
            resultado.textContent = 'Introduce la contraseña.';
            validacionC.classList.add("input-wrong");
        }

        // ENTENDER linea, (corregida un poco por IA)

        else if((usuarioEscrito === "") && (contraseniaEscrita !== "")){
            resultado.textContent = 'Usuario no encontrado';
            validacionU.classList.add("input-wrong");
        }

        // validacion echa con FireBase, 
        // ENTENDER (configuracda por IA)
        else {
            try {
                await signInWithEmailAndPassword(auth, usuarioEscrito, contraseniaEscrita);
            resultado.textContent = '¡Correcto!';

            setTimeout(() => {

                 window.location.href = "pagina.html";
                
            }, 1000);
        } catch (error) {
                // Si Firebase rechaza las credenciales, mostramos el error
                resultado.textContent = 'Usuario o contraseña incorrectos';
                validacionU.classList.add("input-wrong");
                validacionC.classList.add("input-wrong");
        }
    }
    };
})();
const elementosAnimados = document.querySelectorAll(
    ".sobre-mi, .tarjeta-proyecto, .habilidad, .evento, .tarjeta-pasion, .tarjeta-logro, .contacto, .contenedor-galeria img"
);

elementosAnimados.forEach((elemento) => {
    elemento.classList.add("oculto");
});

const observador = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observador.unobserve(entrada.target);
            }
        });
    },
    {
        threshold: 0.2
    }
);
setTimeout(() => {
    elementosAnimados.forEach((elemento) => {
        observador.observe(elemento);
    });
}, 300);
const botonArriba = document.querySelector(".boton-arriba");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        botonArriba.classList.add("mostrar");
    } else {
        botonArriba.classList.remove("mostrar");
    }
});
const menuHamburguesa = document.querySelector("#menuHamburguesa");
const menu = document.querySelector(".menu");
menuHamburguesa.addEventListener("click", () => {
    menu.classList.toggle("activo");
});
document.querySelectorAll(".menu a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
        menu.classList.remove("activo");
    });
});
const imagenesGaleria = document.querySelectorAll(
    ".contenedor-galeria img, .galeria-brazo img"
);
const visorImagen = document.querySelector("#visorImagen");
const imagenAmpliada = document.querySelector("#imagenAmpliada");
const cerrarVisor = document.querySelector("#cerrarVisor");

imagenesGaleria.forEach((imagen) => {
    imagen.addEventListener("click", () => {
        imagenAmpliada.src = imagen.src;
        imagenAmpliada.alt = imagen.alt || "Imagen de galería";
        visorImagen.classList.add("activo");
    });
});

cerrarVisor.addEventListener("click", () => {
    visorImagen.classList.remove("activo");
});

visorImagen.addEventListener("click", (evento) => {
    if (evento.target === visorImagen) {
        visorImagen.classList.remove("activo");
    }
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
        visorImagen.classList.remove("activo");
    }
});
const fondoParticulas = document.querySelector("#fondoParticulas");

if (fondoParticulas) {
    for (let i = 0; i < 45; i++) {
        const particula = document.createElement("span");

        particula.classList.add("particula");
        particula.style.left = `${Math.random() * 100}%`;
        particula.style.animationDuration = `${6 + Math.random() * 10}s`;
        particula.style.animationDelay = `${Math.random() * 8}s`;
        particula.style.opacity = `${0.3 + Math.random() * 0.7}`;

        fondoParticulas.appendChild(particula);
    }
}
const contadores = document.querySelectorAll(".contador");

const observadorContadores = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;

            const contador = entrada.target;
            const objetivo = Number(contador.dataset.numero);
            let actual = 0;

            const incremento = Math.max(1, Math.ceil(objetivo / 60));

            const animacion = setInterval(() => {
                actual += incremento;

                if (actual >= objetivo) {
                    contador.textContent =
                        objetivo === 100 ? "100%" : `+${objetivo}`;

                    clearInterval(animacion);
                    observadorContadores.unobserve(contador);
                    return;
                }

                contador.textContent =
                    objetivo === 100 ? `${actual}%` : `+${actual}`;
            }, 25);
        });
    },
    {
        threshold: 0.6
    }
);

contadores.forEach((contador) => {
    observadorContadores.observe(contador);
});
const botonTema = document.querySelector("#botonTema");
const iconoTema = botonTema.querySelector("i");

botonTema.addEventListener("click", () => {
    document.body.classList.toggle("tema-claro");

    const temaClaro = document.body.classList.contains("tema-claro");

    iconoTema.className = temaClaro
        ? "fa-solid fa-moon"
        : "fa-solid fa-sun";

    localStorage.setItem("tema", temaClaro ? "claro" : "oscuro");
});

const temaGuardado = localStorage.getItem("tema");

if (temaGuardado === "claro") {
    document.body.classList.add("tema-claro");
    iconoTema.className = "fa-solid fa-moon";
}
const estrellas = document.querySelectorAll(".estrellas span");
const campoCalificacion = document.getElementById("calificacion");

estrellas.forEach((estrella) => {
    estrella.addEventListener("click", () => {
        const valor = estrella.getAttribute("data-valor");

        campoCalificacion.value = valor;

        estrellas.forEach((item) => {
            const valorItem = item.getAttribute("data-valor");

            if (valorItem <= valor) {
                item.classList.add("activa");
            } else {
                item.classList.remove("activa");
            }
        });
    });
});
// ==========================================
// REGISTRO DE VISITANTES
// ==========================================

const registroVisitante = document.getElementById("registroVisitante");
const cerrarRegistro = document.getElementById("cerrarRegistro");
const omitirRegistro = document.getElementById("omitirRegistro");
const formRegistroVisitante = document.getElementById("formRegistroVisitante");

function ocultarRegistro() {
    registroVisitante.style.display = "none";
    localStorage.setItem("registroVisitanteVisto", "true");
}

cerrarRegistro.addEventListener("click", ocultarRegistro);
omitirRegistro.addEventListener("click", ocultarRegistro);

if (localStorage.getItem("registroVisitanteVisto") === "true") {
    registroVisitante.style.display = "none";
}

formRegistroVisitante.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const datos = new FormData(formRegistroVisitante);

    try {
        const respuesta = await fetch(formRegistroVisitante.action, {
            method: "POST",
            body: datos,
            headers: {
                Accept: "application/json"
            }
        });

        if (respuesta.ok) {
            localStorage.setItem("registroVisitanteVisto", "true");
const notificacionVisita = document.getElementById("notificacionVisita");

notificacionVisita.classList.add("mostrar");

setTimeout(() => {
    notificacionVisita.classList.remove("mostrar");
}, 3500);
          

            registroVisitante.style.display = "none";
            formRegistroVisitante.reset();
        } else {
            alert("No se pudo registrar la visita. Inténtalo nuevamente.");
        }
    } catch (error) {
        alert("Hubo un problema al enviar los datos.");
    }
});
// ==========================================
// MODAL - CONOCER MÁS
// ==========================================

const abrirHistoria = document.getElementById("abrirHistoria");
const modalHistoria = document.getElementById("modalHistoria");
const cerrarHistoria = document.getElementById("cerrarHistoria");

function abrirModalHistoria() {
    modalHistoria.classList.add("activo");
    document.body.style.overflow = "hidden";
}

function cerrarModalHistoria() {
    modalHistoria.classList.remove("activo");
    document.body.style.overflow = "";
}

abrirHistoria.addEventListener("click", abrirModalHistoria);

cerrarHistoria.addEventListener("click", cerrarModalHistoria);

modalHistoria.addEventListener("click", (evento) => {
    if (evento.target === modalHistoria) {
        cerrarModalHistoria();
    }
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && modalHistoria.classList.contains("activo")) {
        cerrarModalHistoria();
    }
});
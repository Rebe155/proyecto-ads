const TEAM_MEMBERS = [
  {
    id: "rebeca-orozco",
    nombres: "Rebeca Marcela",
    apellidos: "Orozco Arévalo",
    carnet: "OA241153",
    rol: "Desarrollo Frontend & UI",
    categoriaRol: "frontend",
    carrera: "Ingeniería en Ciencias de la Computación (Modalidad Virtual)",
    formacion: "Técnica en Ingeniería en Computación",
    bio: "Estudiante de la carrera virtual de Ingeniería en Ciencias de la Computación y Técnica en Ingeniería en Computación. Cuenta con experiencia en desarrollo frontend y proyectos de software, enfocándose en la creación de interfaces limpias, accesibles y adaptadas a las necesidades del usuario.",
    foto: "assets/Rebeca.jpeg",
    pendiente: false,
    actividades: [
      "Diseño de la estructura visual e interfaces del proyecto.",
      "Maquetación y estilos responsivos con HTML y CSS.",
      "Desarrollo de componentes interactivos y navegación en JavaScript.",
      "Organización y coordinación del repositorio del proyecto."
    ]
  },
  {
    id: "blanca-maravilla",
    nombres: "Blanca Esmeralda",
    apellidos: "Maravilla Cruz",
    carnet: "MC240030",
    rol: "Desarrolladora Frontend",
    categoriaRol: "frontend",
    carrera: "Ingeniería en Ciencias de la Computación (Modalidad Virtual)",
    formacion: "Técnica en Ingeniería y Ciencias de la Computación, Diplomada en Inglés Intermedio e Informática",
    bio: "Estudiante de Ingeniería en Ciencias de la Computación con enfoque en desarrollo web frontend. Apasionada por construir interfaces intuitivas, optimización de rendimiento y experiencias de usuario modernas y dinámicas.",
    foto: "assets/Blanca.jpeg",
    pendiente: false,
    actividades: [
      "Implementación de interfaces web responsivas y accesibles.",
      "Integración de componentes interactivos con JavaScript moderno.",
      "Optimización de rendimiento frontend y compatibilidad entre navegadores.",
      "Consumo e integración de APIs REST en el cliente."
    ]
  },
  {
    id: "alexis-hernandez",
    nombres: "Alexis Ernesto",
    apellidos: "Hernández Monge",
    carnet: "HM253055",
    rol: "Pendiente",
    categoriaRol: "pendiente",
    carrera: "",
    formacion: "",
    bio: "",
    foto: "",
    pendiente: true,
    actividades: []
  },
  {
    id: "joel-granados",
    nombres: "Joel Ernesto",
    apellidos: "Granados Mejia",
    carnet: "GM251189",
    rol: "Pendiente",
    categoriaRol: "pendiente",
    carrera: "",
    formacion: "",
    bio: "",
    foto: "",
    pendiente: true,
    actividades: []
  },
  {
    id: "orlando-avalos",
    nombres: "Orlando Alfredo",
    apellidos: "Avalos",
    carnet: "AA202252",
    rol: "Ingeniero NOC",
    categoriaRol: "NOC",
    carrera: "Ingeniería en Ciencias de la Computación (Modalidad Virtual)",
    formacion: "Tecnico en redes computacionales",
    bio: "Estudiante de la carrera virtual de Ingeniería en Ciencias de la Computación y Técnica en redes computacionales.",
    foto: "assets/Orlando.jpg",
    pendiente: false,
    actividades: [
      "Soporte N2 para la infraestructura de clientes de la red B2B de la empresa.",
      "Monitoreo de la red y resolución de incidencias.",
      "Mantenimiento de la infraestructura de red y servidores.",
      "Documentación de procesos y procedimientos técnicos."
    ]
  }
];

const teamGrid = document.getElementById("teamGrid");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalPhoto = document.getElementById("modalPhoto");
const modalPhotoFallback = document.getElementById("modalPhotoFallback");
const modalName = document.getElementById("modalName");
const modalCarnet = document.getElementById("modalCarnet");
const modalRole = document.getElementById("modalRole");
const modalCareer = document.getElementById("modalCareer");
const modalBio = document.getElementById("modalBio");
const modalBioSection = document.getElementById("modalBioSection");
const modalActivities = document.getElementById("modalActivities");
const modalActivitiesSection = document.getElementById("modalActivitiesSection");
const modalPendingBox = document.getElementById("modalPendingBox");

function getInitials(nombres, apellidos) {
  const n = nombres ? nombres.trim().charAt(0) : "";
  const a = apellidos ? apellidos.trim().charAt(0) : "";
  return (n + a).toUpperCase() || "ADS";
}

function renderCards(members) {
  teamGrid.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("article");
    card.className = `member-card ${member.pendiente ? "is-pending" : ""}`;
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Ver información de ${member.nombres} ${member.apellidos}`);

    const initials = getInitials(member.nombres, member.apellidos);
    const photoMarkup = member.foto
      ? `
        <img 
          src="${member.foto}" 
          alt="Foto de ${member.nombres} ${member.apellidos}" 
          class="card-photo"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        <div class="photo-fallback" style="display: none;">${initials}</div>
      `
      : `<div class="photo-fallback">${initials}</div>`;

    const roleMarkup = member.pendiente
      ? `<div class="member-role role-pending">Información pendiente</div>`
      : `<div class="member-role">${member.rol}</div>`;

    const bioMarkup = member.pendiente
      ? `<p class="member-bio member-bio-pending">Información de perfil pendiente de completar.</p>`
      : `<p class="member-bio">${member.bio}</p>`;
    const statusMarkup = member.pendiente
      ? `<span class="card-status-pill pending"><span class="status-dot"></span> Pendiente</span>`
      : `<span class="card-status-pill complete"><span class="status-dot"></span> Completo</span>`;

    card.innerHTML = `
      <div class="card-top">
        <div class="photo-wrapper">
          ${photoMarkup}
        </div>

        <div class="card-meta">
          <h3 class="member-name">${member.nombres} ${member.apellidos}</h3>
          ${roleMarkup}
          <span class="carnet-pill">${member.carnet}</span>
        </div>
      </div>

      ${bioMarkup}

      <div class="card-bottom">
        ${statusMarkup}
        <button class="card-open-btn" type="button">
          <span>Ver perfil</span>
          <span>→</span>
        </button>
      </div>
    `;

    card.addEventListener("click", () => openModal(member.id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(member.id);
      }
    });

    teamGrid.appendChild(card);
  });
}

function openModal(memberId) {
  const member = TEAM_MEMBERS.find(m => m.id === memberId);
  if (!member) return;

  const initials = getInitials(member.nombres, member.apellidos);
  if (member.foto) {
    modalPhoto.style.display = "block";
    modalPhotoFallback.style.display = "none";
    modalPhotoFallback.textContent = initials;
    modalPhoto.src = member.foto;
    modalPhoto.alt = `Fotografía de ${member.nombres} ${member.apellidos}`;
    modalPhoto.onerror = function () {
      this.style.display = "none";
      modalPhotoFallback.style.display = "flex";
    };
  } else {
    modalPhoto.style.display = "none";
    modalPhotoFallback.style.display = "flex";
    modalPhotoFallback.textContent = initials;
  }

  modalName.textContent = `${member.nombres} ${member.apellidos}`;
  modalCarnet.textContent = member.carnet;

  if (member.pendiente) {
    modalRole.textContent = "Pendiente";
    modalRole.className = "role-pill role-pill-pending";
    modalCareer.textContent = "Facultad de Ingeniería • ADS";

    modalBioSection.style.display = "none";
    modalActivitiesSection.style.display = "none";
    modalPendingBox.style.display = "flex";
  } else {
    modalRole.textContent = member.rol;
    modalRole.className = "role-pill";

    const careerDetail = member.formacion
      ? `${member.carrera} • ${member.formacion}`
      : member.carrera;
    modalCareer.textContent = careerDetail;

    modalBio.textContent = member.bio;

    modalActivities.innerHTML = "";
    member.actividades.forEach(act => {
      const li = document.createElement("li");
      li.textContent = act;
      modalActivities.appendChild(li);
    });

    modalBioSection.style.display = "flex";
    modalActivitiesSection.style.display = "flex";
    modalPendingBox.style.display = "none";
  }

  modalBackdrop.classList.add("active");
  modalBackdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modalCloseBtn.focus();
}

function closeModal() {
  modalBackdrop.classList.remove("active");
  modalBackdrop.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function setupListeners() {
  modalCloseBtn.addEventListener("click", closeModal);

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("active")) {
      closeModal();
    }
  });
}

const savedTheme = localStorage.getItem("udb_theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("udb_theme", nextTheme);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderCards(TEAM_MEMBERS);
  setupListeners();
});

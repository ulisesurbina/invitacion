import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { EVENT, DESIGN } from "./config";
import { Slipper, Clock, Balloons, Carriage, Castle } from "./art";

function App() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    asistentes: "0",
    mensaje: "",
  });

  const [status, setStatus] = useState("");

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  function submitRSVP(e) {
    e.preventDefault();
    if (!form.nombre.trim()) {
      setStatus("Escribe tu nombre para confirmar.");
      return;
    }
    const whatsappNumber = String(EVENT.whatsappNumber || "").replace(
      /\D/g,
      "",
    );
    if (whatsappNumber.length < 10) {
      setStatus("El número de WhatsApp no está configurado correctamente.");
      return;
    }
    const nombre = form.nombre.trim();
    const asistentes = Number(form.asistentes);
    const mensajeOpcional = form.mensaje.trim()
      ? `\nMensaje: ${form.mensaje.trim()}\n`
      : "";
    const whatsappMessage = `Hola, confirmo mi asistencia al ${EVENT.title} de ${EVENT.name}.
      Nombre: ${nombre}
      Acompañantes: ${asistentes}
      ${mensajeOpcional}
      ¡Nos vemos pronto!`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;
    setStatus("Abriendo WhatsApp...");
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      setForm({
        nombre: "",
        telefono: "",
        asistentes: "0",
        mensaje: "",
      });
      setStatus("¡Listo! Tu confirmación está realizada por WhatsApp ✅");
    }, 500);
  }

  return (
    <main className="page">
      <section
        className="invitation"
        style={{
          "--paper": DESIGN.paper,
          "--blue-dark": DESIGN.blueDark,
          "--blue-deep": DESIGN.blueDeep,
          "--ink": DESIGN.ink,
          "--silver": DESIGN.silver,
          "--gold": DESIGN.gold,
          "--gold-light": DESIGN.goldLight
        }}
      >
        <Castle className="castle" />
        <div className="sparkle-field" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className={`sparkle s${i % 6}`}>
              ✦
            </span>
          ))}
        </div>
        <img className="girl" src={EVENT.photo} alt={EVENT.name} />
        <div className="top-ribbon">¡¡MI CUMPLE!!</div>
        <div className="content">
          <div className="crown">♕</div>
          <div className="age">{EVENT.age}</div>
          <p className="script-title">{EVENT.title}</p>
          <h1>{EVENT.name}</h1>
          <div className="date-block">
            <span>{EVENT.dayName}</span>
            <strong>{EVENT.day}</strong>
            <span>{EVENT.time}</span>
            <small>{EVENT.month}</small>
          </div>
          <a
            className="location"
            href={EVENT.locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir ubicación en Google Maps"
          >
            <div>
              <strong>{EVENT.locationName}</strong>
              <span>{EVENT.locationAddress}</span>
              <b className="maps-link">📍 Ver ubicación</b>
            </div>
          </a>
          <div className="decor-orb orb-left">♡</div>
          <div className="decor-orb orb-right">✧</div>
          <div className="divider" aria-hidden="true">
            <Balloons className="deco deco-balloons" />
            <Slipper className="deco deco-slipper" />
            <Carriage className="deco deco-carriage" />
            <Clock className="deco deco-clock" />
          </div>
          <div className="ticket-notice">
            <span className="ticket-icon">🎟</span>
            <div>
              <strong>ENTRADA SOLO CON BOLETO</strong>
              <span>Presenta tu boleto al ingresar al evento.</span>
            </div>
          </div>
          <div className="rsvp-card">
            <h2>Confirma tu asistencia</h2>
            <p>Ayúdame a preparar todo para ti.</p>
            <form onSubmit={submitRSVP}>
              <label>
                Nombre
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={update}
                  placeholder="Tu nombre"
                  required
                />
              </label>
              <label>
                Número de acompañantes
                <select
                  name="asistentes"
                  value={form.asistentes}
                  onChange={update}
                >
                  {Array.from({ length: 6 }, (_, i) => i).map((n) => (
                    <option value={n} key={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Mensaje (opcional)
                <textarea
                  name="mensaje"
                  value={form.mensaje}
                  onChange={update}
                  placeholder="Déjanos un mensaje..."
                  rows="3"
                />
              </label>
              <button type="submit">Confirmar asistencia</button>
              <div
                className={`status ${status.includes("¡Listo") ? "ok" : ""}`}
              >
                {status}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);

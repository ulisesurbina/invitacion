import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { EVENT, DESIGN } from "./config";
import { Slipper, Clock, Balloons, Carriage, Castle } from "./art";

const EMPTY_FORM = { nombre: "", asistentes: "0", mensaje: "" };

function buildWhatsAppMessage({ nombre, asistentes, mensaje }) {
  const acomp = Number(asistentes);
  const linea = "\u2501".repeat(12); // ━━━━━━━━━━━━

  const lineas = [
    "\u{1F389} *CONFIRMACIÓN DE ASISTENCIA* \u{1F389}",
    linea,
    `\u{1F451} *Cumpleaños de ${EVENT.name}* (${EVENT.age} años)`,
    `\u{1F4C5} ${EVENT.dayName} ${EVENT.day} ${EVENT.month} · ${EVENT.time}`,
    linea,
    `\u{1F464} *Nombre:* ${nombre}`,
    `\u{1F465} *Acompañantes:* ${acomp === 0 ? "Sin acompañantes" : acomp}`,
    `\u{1F3AB} *Total de personas:* ${acomp + 1}`,
  ];

  if (mensaje) {
    lineas.push(`\u{1F4AC} *Mensaje:* _${mensaje}_`);
  }

  lineas.push(linea, "\u2705 ¡Confirmado! Nos vemos pronto \u2728");
  return lineas.join("\n");
}

function App() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("");

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Quita el aviso de éxito al regresar de WhatsApp (o a los 12 s como respaldo)
  useEffect(() => {
    if (!status.startsWith("¡Listo")) return;

    const clear = () => setStatus("");
    let wasHidden = document.visibilityState === "hidden";
    let returnTimer;

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        wasHidden = true;
      } else if (wasHidden) {
        returnTimer = setTimeout(clear, 600);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    const fallbackTimer = setTimeout(clear, 12000);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(returnTimer);
      clearTimeout(fallbackTimer);
    };
  }, [status]);

  function submitRSVP(e) {
    e.preventDefault();

    const nombre = form.nombre.trim();
    if (!nombre) {
      setStatus("Escribe tu nombre para confirmar.");
      return;
    }

    const whatsappNumber = String(EVENT.whatsappNumber || "").replace(/\D/g, "");
    if (whatsappNumber.length < 10) {
      setStatus("El número de WhatsApp no está configurado correctamente.");
      return;
    }

    const message = buildWhatsAppMessage({
      nombre,
      asistentes: form.asistentes,
      mensaje: form.mensaje.trim(),
    });

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Se abre directo en el clic para que el navegador no lo bloquee
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setForm(EMPTY_FORM);
    setStatus("¡Listo! Tu confirmación está realizada por WhatsApp ✅");
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
          "--gold-light": DESIGN.goldLight,
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
                className={`status ${status.startsWith("¡Listo") ? "ok" : ""}`}
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
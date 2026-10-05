import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { EVENT, DESIGN } from "./config";
import { Crown, Heart, Star, Spark, Bow, Balloons, DiscoBall } from "./art";

const EMPTY_FORM = { nombre: "", asistentes: "0", mensaje: "" };

function buildWhatsAppMessage({ nombre, asistentes, mensaje }) {
  const acomp = Number(asistentes);
  const linea = "\u2501".repeat(12);
  const lineas = [
    "\u{1F389} *CONFIRMACIÓN DE ASISTENCIA* \u{1F389}",
    linea,
    `\u{1F451} *Cumpleaños de ${EVENT.name}*`,
    linea,
    `\u{1F464} *Nombre:* ${nombre}`,
    `\u{1F465} *Acompañantes:* ${acomp === 0 ? "Sin acompañantes" : acomp}`,
    `\u{1F3AB} *Total de personas:* ${acomp + 1}`,
  ];
  if (mensaje) lineas.push(`\u{1F4AC} *Mensaje:* _${mensaje}_`);
  lineas.push(linea, "\u2705 ¡Confirmado! Nos vemos pronto \u2728");
  return lineas.join("\n");
}

function App() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("");

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    if (!status.startsWith("¡Listo")) return;
    const clear = () => setStatus("");
    let wasHidden = document.visibilityState === "hidden";
    let returnTimer;
    const onVisibility = () => {
      if (document.visibilityState === "hidden") wasHidden = true;
      else if (wasHidden) returnTimer = setTimeout(clear, 600);
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
        }}
      >
        {/* Destellos flotando por toda la invitación */}
        <div className="sparkle-field" aria-hidden="true">
          {Array.from({ length: 26 }).map((_, i) => (
            <span
              key={i}
              className="sparkle"
              style={{
                left: `${(i * 37 + 11) % 97}%`,
                top: `${(i * 53 + 7) % 96}%`,
                fontSize: 10 + (i % 4) * 7,
                animationDelay: `${(i % 7) * 0.45}s`,
                animationDuration: `${2.4 + (i % 5) * 0.5}s`,
              }}
            >
              ✦
            </span>
          ))}
        </div>

        <div className="hero">
          <div className="sequin sequin-top" aria-hidden="true" />
          <div className="sequin sequin-bottom" aria-hidden="true" />

          <img className="girl" src={EVENT.photo} alt={EVENT.name} />
          <div className="sash"><span>MI CUMPLE</span></div>

          <Star className="a star-blue" />
          <Star className="a star-silver" />
          <Star className="a star-small" />
          <Spark className="a spark-burst" />
          <Spark className="a spark-burst b2" />
          <Spark className="a spark-bottom" />
          <Spark className="a spark-bottom b2" />

          <Crown className="a crown" />
          <Heart className="a heart" />
          <div className="age" aria-label={`${EVENT.age} años`}>{EVENT.age}</div>

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
            <span className="pin">📍</span>
            <div>
              <strong>{EVENT.locationName}</strong>
              <span>{EVENT.locationAddress}</span>
              <b className="maps-link">Ver ubicación</b>
            </div>
          </a>

          <div className="ticket-notice">
            <strong>ACCESO SOLO CON BOLETO</strong>
          </div>

          <div className="a mini-ball"><DiscoBall /></div>
          <Bow className="a bow" />
          <DiscoBall className="a big-ball" />
          <Balloons className="a balloons" />
        </div>

        <div className="rsvp-wrap">
          <div className="rsvp-card">
            <h2>Confirma tu asistencia</h2>
            <p>Ayúdame a preparar todo para ti.</p>
            <form onSubmit={submitRSVP}>
              <label>
                Nombre
                <input name="nombre" value={form.nombre} onChange={update} placeholder="Tu nombre" required />
              </label>
              <label>
                Número de acompañantes
                <select name="asistentes" value={form.asistentes} onChange={update}>
                  {Array.from({ length: 6 }, (_, i) => i).map((n) => (
                    <option value={n} key={n}>{n}</option>
                  ))}
                </select>
              </label>
              <label>
                Mensaje (opcional)
                <textarea name="mensaje" value={form.mensaje} onChange={update} placeholder="Déjame un mensaje..." rows="3" />
              </label>
              <button type="submit">Confirmar asistencia</button>
              <div className={`status ${status.startsWith("¡Listo") ? "ok" : ""}`}>{status}</div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
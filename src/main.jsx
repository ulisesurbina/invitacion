import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { EVENT, DESIGN } from "./config";

function App() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "5610917960",
    asistentes: "0",
    mensaje: ""
  });
  const [status, setStatus] = useState("");
  const [waLink, setWaLink] = useState("");

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  function buildWhatsAppUrl(data) {
  const acomp = Number(data.asistentes);
  const text =
    `¡Hola! Confirmo mi asistencia al cumpleaños de ${EVENT.name} 🎉\n\n` +
    `👤 Nombre: ${data.nombre.trim()}\n` +
    `📱 Teléfono: ${data.telefono.trim()}\n` +
    `👥 Acompañantes: ${acomp}` +
    (data.mensaje.trim() ? `\n💬 Mensaje: ${data.mensaje.trim()}` : "");

  return `https://wa.me/${EVENT.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

async function submitRSVP(e) {
  e.preventDefault();

  if (!form.nombre.trim()) {
    setStatus("Escribe tu nombre para confirmar.");
    return;
  }
  if (!form.telefono.trim()) {
    setStatus("Escribe tu número de teléfono.");
    return;
  }

  setStatus("Enviando confirmación…");
  const url = buildWhatsAppUrl(form);

  try {
    // Google Sheets es opcional: solo se usa si pegaste la URL en config.js
    if (DESIGN.googleSheetsUrl) {
      await fetch(DESIGN.googleSheetsUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          nombre: form.nombre,
          telefono: form.telefono,
          asistentes: Number(form.asistentes),
          mensaje: form.mensaje,
          evento: EVENT.name,
          fechaEvento: `${EVENT.dayName} ${EVENT.day} ${EVENT.month}`,
          enviado: new Date().toISOString()
        })
      });
    }

    setStatus("¡Listo! Tu asistencia fue enviada.");
    setWaLink(url);
    window.open(url, "_blank", "noopener,noreferrer"); // abre WhatsApp
    setForm({ nombre: "", telefono: "", asistentes: "0", mensaje: "" });
  } catch (error) {
    console.error(error);
    setStatus("No se pudo enviar. Inténtalo de nuevo.");
  }
}

  // async function submitRSVP(e) {
  //   e.preventDefault();
  //   if (!form.nombre.trim()) {
  //     setStatus("Escribe tu nombre para confirmar.");
  //     return;
  //   }

  //   setStatus("Enviando confirmación…");

  //   try {
  //     if (!DESIGN.googleSheetsUrl) {
  //       throw new Error("Falta configurar la URL de Google Apps Script.");
  //     }

  //     await fetch(DESIGN.googleSheetsUrl, {
  //       method: "POST",
  //       mode: "no-cors",
  //       headers: { "Content-Type": "text/plain;charset=utf-8" },
  //       body: JSON.stringify({
  //         nombre: form.nombre,
  //         telefono: form.telefono,
  //         asistentes: Number(form.asistentes),
  //         mensaje: form.mensaje,
  //         evento: EVENT.name,
  //         fechaEvento: `${EVENT.dayName} ${EVENT.day} ${EVENT.month}`,
  //         enviado: new Date().toISOString()
  //       })
  //     });

  //     setStatus("¡Listo! Tu asistencia fue enviada.");
  //     setForm({ nombre: "", telefono: "", asistentes: "1", mensaje: "" });
  //   } catch (error) {
  //     console.error(error);
  //     setStatus("No se pudo enviar. Revisa la configuración de Google Sheets.");
  //   }
  // }

  return (
    <main className="page">
      <section className="invitation" style={{
        "--pink": DESIGN.pink,
        "--pink-dark": DESIGN.pinkDark,
        "--paper": DESIGN.paper,
        "--ink": DESIGN.ink,
        "--silver": DESIGN.silver
      }}>
        <div className="sparkle-field" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className={`sparkle s${i % 6}`}>✦</span>
          ))}
        </div>

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

          <a className="location"
            href={EVENT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir ${EVENT.locationName} en Google Maps`}>
            <span className="pin">⌖</span>
            <div>
              <strong>{EVENT.locationName}</strong>
              <span>{EVENT.locationAddress}</span>
              <em className="map-link">Ver en Google Maps →</em>
            </div>
          </a>

          <div className="ticket-note">
            <span>✦</span> {EVENT.ticketNote} <span>✦</span>
          </div>

          <div className="decor-orb orb-left">♡</div>
          <div className="decor-orb orb-right">✧</div>

          <div className="divider">✦</div>

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
                WhatsApp
                <input
                  name="telefono"
                  value={form.telefono}
                  onChange={update}
                  placeholder="55 1234 5678"
                  inputMode="tel"
                />
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
                <textarea
                  name="mensaje"
                  value={form.mensaje}
                  onChange={update}
                  placeholder="Déjanos un mensaje..."
                  rows="3"
                />
              </label>

              <button type="submit">Confirmar asistencia</button>
              <div className={`status ${status.includes("¡Listo") ? "ok" : ""}`}>
                {waLink && (
                  <a className="wa-btn" href={waLink} target="_blank" rel="noopener noreferrer">
                    Enviar confirmación por WhatsApp
                  </a>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);

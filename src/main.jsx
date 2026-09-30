import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { EVENT, DESIGN } from "./config";

function App() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    asistentes: "0",
    mensaje: ""
  });
  const [status, setStatus] = useState("");

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function submitRSVP(e) {
    e.preventDefault();
    if (!form.nombre.trim()) {
      setStatus("Escribe tu nombre para confirmar.");
      return;
    }

    setStatus("Enviando confirmación…");

    try {
      if (!DESIGN.googleSheetsUrl) {
        throw new Error("Falta configurar la URL de Google Apps Script.");
      }

      // Apps Script se publica como Web App y recibe los datos en doPost().
      // no-cors permite enviar desde Netlify aunque Google no exponga CORS.
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

      setStatus("¡Listo! Tu asistencia fue enviada.");
      setForm({ nombre: "", telefono: "", asistentes: "1", mensaje: "" });
    } catch (error) {
      console.error(error);
      setStatus("No se pudo enviar. Revisa la configuración de Google Sheets.");
    }
  }

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

          <div className="location">
            <span className="pin">⌖</span>
            <div>
              <strong>{EVENT.locationName}</strong>
              <span>{EVENT.locationAddress}</span>
            </div>
          </div>

          <div className="decor-orb orb-left">♡</div>
          <div className="decor-orb orb-right">✧</div>

          <div className="divider">✦</div>

          <div className="rsvp-card">
            <h2>Confirma tu asistencia</h2>
            <p>Ayúdanos a preparar todo para ti.</p>

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

              {/* <label>
                Teléfono / WhatsApp
                <input
                  name="telefono"
                  value={form.telefono}
                  onChange={update}
                  placeholder="55 0000 0000"
                  inputMode="tel"
                />
              </label> */}

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

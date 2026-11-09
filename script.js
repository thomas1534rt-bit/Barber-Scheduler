// Validador de conflictos de ejemplo (reglas RN01, RN03 y RN04 del SRS)
const JORNADA = ["08:00", "18:00"];
const DESCANSO = ["12:00", "13:00"];
const CITAS = [["10:00", "10:45"]]; // citas ya agendadas del barbero

const aMin = (h) => { const [a, b] = h.split(":").map(Number); return a * 60 + b; };
const aHora = (m) => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
const cruza = (i1, f1, i2, f2) => i1 < f2 && i2 < f1;

document.getElementById("demo").addEventListener("submit", (e) => {
  e.preventDefault();
  const res = document.getElementById("res");
  const inicio = aMin(document.getElementById("ini").value);
  const fin = inicio + Number(document.getElementById("srv").value);
  let msg = "", ok = false;

  if (isNaN(inicio)) msg = "Elige una hora de inicio.";
  else if (inicio < aMin(JORNADA[0]) || fin > aMin(JORNADA[1])) msg = "Fuera del horario laboral (08:00 a 18:00).";
  else if (cruza(inicio, fin, aMin(DESCANSO[0]), aMin(DESCANSO[1]))) msg = "Coincide con el descanso del barbero (12:00 a 13:00).";
  else if (CITAS.some(([i, f]) => cruza(inicio, fin, aMin(i), aMin(f)))) msg = "El barbero ya tiene una cita en ese horario.";
  else { ok = true; msg = "Cita disponible de " + aHora(inicio) + " a " + aHora(fin) + "."; }

  res.textContent = msg;
  res.className = ok ? "good" : "bad";
});

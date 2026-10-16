// Arriola 360 · funciones compartidas por la portada y la página de cada propiedad (usa datos.js)
const $ = s => document.querySelector(s);
const wa = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const money = (n,m) => m + Math.round(n).toLocaleString("en-US");
const usd = p => p.mon === "Q" ? p.precio / TC : p.precio;
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const label = p => p.zona ? `${p.titulo} en ${p.zona}` : p.titulo;
const enlace = p => `propiedad.html?c=${encodeURIComponent(p.cod)}`;
const msgInteres = p => `Hola, me interesa la propiedad ${p.cod}: ${label(p)} (${money(p.precio,p.mon)} ${p.nota}).`;
const bindWa = (root=document) => root.querySelectorAll("[data-wa]").forEach(a => a.href = wa(a.dataset.wa));

// ficha en cuadrícula: lleva a la página de la propiedad
function tarjeta(p){
  const ph = p.fotos.length
    ? `<img src="${p.fotos[0]}" alt="${esc(p.titulo)}" loading="lazy"><span class="n">${p.fotos.length} fotos</span>`
    : `<div class="noph"><b>${esc(p.clave[0][0])}</b><span>Fotos en TikTok</span></div>`;
  return `<a class="card rv" href="${enlace(p)}">
    <div class="ph">${ph}${p.cond ? `<span class="cond">${esc(p.cond)}</span>` : ""}</div>
    <div class="bd">
      <div class="price">${money(p.precio,p.mon)} <small>${esc(p.nota)}</small></div>
      <h3>${esc(p.titulo)}</h3>
      <p class="where"><b class="kind">${esc(p.tipo)} en ${p.op}</b> · ${[p.zona, p.lugar].filter(Boolean).map(esc).join(" · ")}</p>
      <p class="facts">${p.clave.slice(0,3).map(([b,s]) => `${esc(b)} ${esc(s)}`).join(" · ")}</p>
      <p class="cod">Código ${esc(p.cod)}</p>
      <span class="ver">Ver la propiedad</span>
    </div>
  </a>`;
}

// agendar visita (filtro básico: forma de pago y presupuesto)
let cur;
document.addEventListener("click", e => {
  const b = e.target.closest("[data-cita]"); if(!b) return;
  cur = PROPS.find(p => p.cod === b.dataset.cita);
  $("#f-prop").textContent = `${label(cur)} · Código ${cur.cod}`;
  $("#f-dia").min = new Date().toISOString().slice(0,10);
  $("#cita").showModal();
});
function iniciarCita(){
  $("#f-x").onclick = () => $("#cita").close();
  $("#f").onsubmit = () => window.open(wa(`Hola, soy ${$("#f-nom").value}. Quiero visitar la propiedad ${cur.cod}: ${label(cur)}.\nDía: ${$("#f-dia").value}\nPago: ${$("#f-pago").value}\nPresupuesto: ${$("#f-pres").value || "—"}`), "_blank");
}

// carrusel deslizable con contador
function carrusel(track, contador){
  const n = track.children.length, idx = () => Math.round(track.scrollLeft / track.clientWidth);
  track.addEventListener("scroll", () => contador && (contador.textContent = `${idx()+1} / ${n}`), {passive:true});
  return dir => track.scrollTo({left: ((idx() + dir + n) % n) * track.clientWidth, behavior:"smooth"});
}

// entradas: títulos palabra por palabra, el resto sube suave; nada queda oculto si el navegador no avisa
const io = new IntersectionObserver(es => es.forEach(x => { if(x.isIntersecting){ x.target.classList.add("in"); io.unobserve(x.target); } }), {rootMargin:"0px 0px 15% 0px"});
function revelar(root=document){
  root.querySelectorAll(".split:not([data-split])").forEach(h => {
    h.dataset.split = 1;
    h.innerHTML = h.textContent.trim().split(/\s+/).map((w,i) => `<span class="w"><span style="--i:${i}">${esc(w)}</span></span>`).join(" ");
  });
  root.querySelectorAll(".rv:not(.in)").forEach((el,i) => { el.style.transitionDelay = (i%4)*70 + "ms"; io.observe(el); });
}
const barrer = () => document.querySelectorAll(".rv:not(.in)").forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in"); });
let tick; addEventListener("scroll", () => { clearTimeout(tick); tick = setTimeout(barrer, 400); }, {passive:true});
addEventListener("load", () => setTimeout(barrer, 1200));

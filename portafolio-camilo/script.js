/* ============ Portafolio Jurásico — Camilo Oliveros ============ */
(() => {
"use strict";

/* ---------- Config del mundo ---------- */
const WORLD = 14000;               // longitud del recorrido (px)
const GROUND_VH = 16;              // alto del suelo (vh)
let vw = innerWidth, vh = innerHeight;

/* ---------- Sprites pixel (mapas) ----------
   Clave de colores por letra; "." = transparente */
const PAL = {
  W:"#f4f4f4", w:"#d9d9d9",       // pelo mono blanco
  K:"#1b1b1b",                    // gafas / negro
  T:"#f0c7a0", t:"#d9a97e",       // cara
  B:"#7c5225", b:"#5e3d19",       // sombrero
  J:"#8d5a2b", j:"#6e441d",       // chaqueta
  P:"#c9b280",                    // pantalón
  S:"#4a3018",                    // botas
  G:"#3f9e4d", g:"#2e7d3a", d:"#1f5c2a", // dinos verdes
  Y:"#e8c95a", O:"#e2572b",
  R:"#b04a3a", r:"#8d3a2e"        // ptero
};
function drawMap(ctx, map, px, ox=0, oy=0){
  map.forEach((row,y)=>{ for(let x=0;x<row.length;x++){ const c=row[x];
    if(c!=="."&&PAL[c]){ ctx.fillStyle=PAL[c]; ctx.fillRect(ox+x*px, oy+y*px, px, px); } } });
}
/* Avatar explorador humano 16x24 — cabeza+torso compartidos, piernas animadas (4 frames) */
const HEAD_A = [
"....BBBBBBBB....",
"...BBBBBBBBBB...",
".BBBBBBBBBBBBBB.",
"..bbbbbbbbbbbb..",
"....TTTTTTTT....",
"...KKKKTTKKKK...",
"...KwwKTTKwwK...",
"....TTTTTTTT....",
"....TTtttTTT....",
".....TTTTTT.....",
"......TTTT......",
"....JJJJJJJJ....",
"..JJJJJJJJJJJJ..",
".JJJJJJjjJJJJJJ.",
".TJJJJJJJJJJJJT.",
"..JJJJJJJJJJJJ.."];
/* brazo adelantado (balanceo) */
const HEAD_B = HEAD_A.slice(0,12).concat([
"..JJJJJJJJJJJJT.",
".TJJJJJjjJJJJJ..",
"..JJJJJJJJJJJJ..",
"..JJJJJJJJJJJJ.."]);
/* frames de piernas */
const L_STRIDE = [
"....PPPPPPPP....",
"....PPP..PPP....",
"...PPP....PPP...",
"...PP......PP...",
"..SS........SS..",
".SSS........SSS.",
"................",
"................"];
const L_PASS = [
"....PPPPPPPP....",
".....PPPPPP.....",
".....PP..PP.....",
".....PP..PP.....",
"....SS....SS....",
"....SSS...SSS...",
"................",
"................"];
const L_CROSS = [
"....PPPPPPPP....",
"....PPP.PPP.....",
"...PPP...PPP....",
"..PPP.....PP....",
"..SS.......SS...",
".SSS......SSS...",
"................",
"................"];
const L_JUMP = [
"....PPPPPPPP....",
"...PPP....PPP...",
"...PP......PP...",
"..SSS......SSS..",
"................",
"................",
"................",
"................"];
const RUN_FRAMES = [HEAD_A.concat(L_STRIDE), HEAD_B.concat(L_PASS), HEAD_A.concat(L_CROSS), HEAD_B.concat(L_PASS)];
const CH_IDLE = HEAD_A.concat(L_PASS);
const CH_JUMP = HEAD_B.concat(L_JUMP);
/* T-rex 22x16 */
const TREX = [
"..............GGGGG...",
".............GGGGGGG..",
".............GKGGGGG..",
".............GGGGGGG..",
".............GGGGgg...",
".............GGG......",
"....GGGGGGGGGGGG......",
"..GGGGGGGGGGGGGG......",
".GGGGGGGGGGGGGGg......",
"GGgGGGGGGGGGGGg.......",
"Gg.GGGGGGGGGGg........",
"...GGGGGGGGGg.........",
"....GGG..GGG..........",
"....GG....GG..........",
"....gg....gg..........",
"...ggg...ggg.........."];
/* Braquiosaurio 20x20 (fondo) */
const BRACHIO = [
"..........dd........",
".........ddd........",
".........dd.........",
".........dd.........",
".........dd.........",
".........dd.........",
".........dd.........",
"........ddd.........",
".......dddd.........",
"..ddddddddd.........",
".ddddddddddd........",
"dddddddddddd........",
"dddddddddddd........",
".dddddddddd.........",
"..dd.dd..dd.........",
"..dd.dd..dd.........",
"..dd.dd..dd.........",
"..dd.dd..dd.........",
".ddd.dd..ddd........",
".....dd............."];
/* Pterodáctilo 18x8 */
const PTERO = [
"RR................",
".RRR....RRR.......",
"..RRRRRRRRRR......",
"....RRRRRRRRRRR...",
"......RRrrRRRR....",
".....RR..rr.......",
"..........r.......",
"..................",];

function spriteCanvas(map, px){
  const c=document.createElement("canvas");
  c.width=map[0].length*px; c.height=map.length*px;
  c.className="dino"; c.style.imageRendering="pixelated";
  drawMap(c.getContext("2d"), map, px); return c;
}

/* ---------- Datos del perfil ---------- */
const ZONES=[
  [0,"INICIO"],[1500,"EXPERIENCIA"],[5100,"HABILIDADES"],[7200,"CERTIFICACIONES"],
  [9000,"EDUCACIÓN"],[10800,"PROYECTOS"],[12600,"CONTACTO"]];

const EXP=[
 ["Webmaster — Capítulo AESS","IEEE Aerospace & Electronic Systems · Unicauca","mar 2024 – actualidad · Colombia","Gestión y desarrollo del sitio web del capítulo estudiantil."],
 ["Desarrollador de software","Xkape Group S.A.S.","oct 2025 – dic 2025","Proyecto SIT de la Agencia Nacional de Tierras (ANT)."],
 ["Profesor de programación","Fundación Colegio Madre Laura","sep 2025 – oct 2025 · Colombia","Enseñanza de programación de software."],
 ["Desarrollador de software","LUCHO IA","nov 2024 – may 2025","App web que negocia glosas y facturas médicas entre EPS e IPS con un modelo NLP: procesa PDF y recalcula valores inconsistentes."],
 ["Docente / Instructor de Linux","IIN — International Innovation Network","ene 2024 – feb 2024","Curso «Fundamentos de Linux», Cursos de Verano 2024, Universidad Nacional de Asunción."],
 ["Coordinador logístico","AESS Unicauca","abr 2022 – may 2022 · Cauca","Coordinación logística de eventos del capítulo."]];

const SKILLS=[
 ["BACKEND","Java · PHP · ASP .NET · Node.js · C# · Python · APIs REST · Microservicios · SOA · MVC · Serverless"],
 ["FRONTEND","Angular · React · Astro · Deno · Razor (C#) · HTML · CSS · JavaScript"],
 ["CLOUD & DEVOPS","AWS · Azure · Docker · Linux · SIP trunks · Bases de datos SQL y NoSQL"]];

const CERTS=["Programación con JavaScript","Introducción al Desarrollo Web: HTML y CSS (2/2)",
 "NASA International Space Apps Challenge","Ciberseguridad en el Teletrabajo","Simulink Onramp (MathWorks)"];

const EDU=[
 ["Universidad del Cauca","Ing. Electrónica y Telecomunicaciones","2017 – actualidad · décimo semestre"],
 ["SENA","Técnico Prof. en Programación de Software — Desarrollo de aplicaciones web","2013 – 2014"],
 ["SENA","Técnico Prof. en Programación de Software — Aplicaciones específicas","2013 – 2014"]];

/* ---------- Construcción del mundo ---------- */
const $=(id)=>document.getElementById(id);
const layerClouds=$("layerClouds"), layerFar=$("layerFar"), layerMid=$("layerMid"), layerWorld=$("layerWorld");
function el(cls,x,html){ const d=document.createElement("div"); d.className=cls;
  d.style.left=x+"px"; if(html!==undefined)d.innerHTML=html; return d; }

/* nubes */
for(let i=0;i<14;i++){ const c=el("cloud", i*420+Math.random()*200);
  c.style.top=(5+Math.random()*22)+"vh"; c.style.width=(70+Math.random()*70)+"px"; layerClouds.appendChild(c); }
/* colinas lejanas + volcán */
for(let i=0;i<10;i++){ const h=el("hill far", i*760);
  h.style.width=(400+Math.random()*260)+"px"; h.style.height=(90+Math.random()*80)+"px"; layerFar.appendChild(h); }
const vol=el("volcano",2600); vol.style.borderWidth="0 90px 150px 90px"; layerFar.appendChild(vol);
/* colinas medias, palmas, helechos, braquiosaurios */
for(let i=0;i<12;i++){ const h=el("hill", i*640+120);
  h.style.width=(300+Math.random()*220)+"px"; h.style.height=(60+Math.random()*60)+"px"; layerMid.appendChild(h); }
for(let i=0;i<16;i++){ const p=el("palm", i*560+Math.random()*220);
  p.innerHTML='<div class="fronds"><span></span><span></span><span></span><span></span><span></span></div><div class="trunk"></div>';
  layerMid.appendChild(p); }
[1900,6400,11400].forEach(x=>{ const b=spriteCanvas(BRACHIO,9); b.style.left=x+"px"; b.style.bottom="14vh"; layerMid.appendChild(b); });

/* mundo (capa 1:1): helechos, dinos, letreros, paneles, monedas, obstáculos */
for(let i=0;i<40;i++){ layerWorld.appendChild(el("fern", i*380+Math.random()*160)); }
[3300,8200,12100].forEach(x=>{ const t=spriteCanvas(TREX,6); t.style.left=x+"px"; t.style.bottom="15vh"; layerWorld.appendChild(t); });
[2400,7000,10500,13200].forEach(x=>{ const p=spriteCanvas(PTERO,5); p.className="dino fly";
  p.style.left=x+"px"; p.style.bottom="62vh"; layerWorld.appendChild(p); });

function sign(x,title,body,cls=""){ const s=el("sign "+cls,x,
  `<div class="board"><h2>${title}</h2><p>${body}</p></div><div class="post"></div>`); layerWorld.appendChild(s); }
function panel(x,inner,cls=""){ const p=el("panel "+cls,x,inner); layerWorld.appendChild(p); return p; }

/* Intro */
sign(vw*0.45,"CAMILO ANDRÉS OLIVEROS CHACÓN",
 "Webmaster IEEE-AESS Unicauca · Fullstack Developer · Data Analyst · Estudiante de Ing. Electrónica y Telecomunicaciones — Popayán, Cauca 🇨🇴","title-sign");
panel(vw*0.45+650,`<span class="tag">NIVEL 0 · EXTRACTO</span>
 <p>+4 años como desarrollador web especializado en <b>backend</b>: diseño, construcción y despliegue de arquitecturas de servicios (microservicios, SOA, cliente-servidor, MVC, serverless), APIs REST y despliegues en la nube.</p>`);

/* Experiencia */
sign(1560,"NIVEL 1 · EXPERIENCIA","6 misiones completadas. ¡Avanza y descúbrelas!");
EXP.forEach((e,i)=>panel(2100+i*520,
 `<span class="tag">MISIÓN ${i+1}</span><h3>${e[0]}</h3><p class="meta">${e[1]}<br>${e[2]}</p><p>${e[3]}</p>`));

/* Habilidades */
sign(5160,"NIVEL 2 · HABILIDADES","Inventario de herramientas del explorador.");
SKILLS.forEach((s,i)=>panel(5650+i*520,
 `<span class="tag">${s[0]}</span><div class="chips">${s[1].split(" · ").map(c=>`<span class="chip">${c}</span>`).join("")}</div>`));

/* Certificaciones */
sign(7260,"NIVEL 3 · CERTIFICACIONES","Logros desbloqueados.");
panel(7800,`<span class="tag">LOGROS</span><ul>${CERTS.map(c=>`<li class="badge-cert">${c}</li>`).join("")}</ul>`);

/* Educación */
sign(9060,"NIVEL 4 · EDUCACIÓN","Campamentos de entrenamiento.");
EDU.forEach((e,i)=>panel(9550+i*440,
 `<span class="tag">FORMACIÓN</span><h3>${e[0]}</h3><p class="meta">${e[2]}</p><p>${e[1]}</p>`));

/* Proyectos */
sign(10860,"NIVEL 5 · PROYECTOS","Reliquias encontradas en la expedición.");
panel(11350,`<span class="tag">PROYECTO</span><h3>LUCHO IA</h3>
 <p>Negociación automática de glosas médicas EPS–IPS con NLP: procesa facturas PDF y recalcula valores.</p>
 <p style="margin-top:8px"><a href="https://www.youtube.com/watch?v=Q2mMN727ROs" target="_blank" rel="noopener">▶ Ver demo en YouTube</a></p>`);
panel(11870,`<span class="tag">PROYECTO</span><h3>SIT — ANT</h3>
 <p>Desarrollo de software para el Sistema de Información de Tierras de la Agencia Nacional de Tierras (Xkape Group).</p>`);

/* Contacto */
sign(12660,"NIVEL FINAL · CONTACTO","¡Encontraste al explorador! Hablemos.");
panel(13150,`<img src="assets/foto.jpg" alt="Foto de Camilo Oliveros">
 <div class="lines"><span>Camilo A. Oliveros Chacón</span>
 <a href="mailto:ocamilo@unicauca.edu.co">ocamilo@unicauca.edu.co</a>
 <a href="tel:+573225848154">3225848154</a>
 <a href="https://www.linkedin.com/in/camilo-andr%C3%A9s-oliveros-chac%C3%B3n-527575167/" target="_blank" rel="noopener">LinkedIn</a>
 <span>📍 Popayán, Cauca</span></div>`,"contact");
const flag=el("finish-flag",13850); layerWorld.appendChild(flag);







/* monedas y obstáculos */
const coins=[], obstacles=[];
const coinXs=[];
for(let x=900;x<13600;x+=Math.floor(300+Math.random()*260)) coinXs.push(x);
coinXs.forEach(x=>{ const c=el("coin",x); const arc=Math.random()<0.35;
  c.style.bottom=arc?"34vh":"19vh"; layerWorld.appendChild(c);
  coins.push({x,el:c,got:false,arc}); });
[1350,3050,4600,6100,7650,8700,10200,11700,12900].forEach((x,i)=>{
  const o=el("obstacle",x); o.innerHTML=i%2?'<div class="rock"></div>':'<div class="egg"></div>';
  layerWorld.appendChild(o); obstacles.push({x,hit:false}); });
$("coinTotal").textContent=coins.length;

/* ---------- Sonido (WebAudio) ---------- */
let actx=null, muted=false;
function beep(freqs,dur=0.09,type="square",vol=0.12){
  if(muted) return; if(!actx) actx=new (window.AudioContext||window.webkitAudioContext)();
  const t0=actx.currentTime;
  freqs.forEach((f,i)=>{ const o=actx.createOscillator(), g=actx.createGain();
    o.type=type; o.frequency.value=f; g.gain.setValueAtTime(vol,t0+i*dur);
    g.gain.exponentialRampToValueAtTime(0.001,t0+(i+1)*dur);
    o.connect(g).connect(actx.destination); o.start(t0+i*dur); o.stop(t0+(i+1)*dur); });
}
const sfx={ coin:()=>beep([988,1319],0.08), jump:()=>beep([330,523],0.07),
  hit:()=>beep([180,120],0.12,"sawtooth",0.15), start:()=>beep([523,659,784,1047],0.1) };
$("muteBtn").addEventListener("click",e=>{ muted=!muted; e.target.textContent=muted?"🔇":"🔊"; });

/* ---------- Personaje / física ---------- */
const charCanvas=$("charCanvas"), cctx=charCanvas.getContext("2d");
let jumpY=0, vy=0, jumping=false, stumble=0, frame=0, lastX=0, facing=1, moving=false, blink=0;
function drawChar(){
  cctx.clearRect(0,0,charCanvas.width,charCanvas.height);
  let map=jumping?CH_JUMP:(moving?RUN_FRAMES[frame%4]:CH_IDLE);
  if(blink>0&&!jumping){ map=map.map((r,i)=>i===6?r.replace(/w/g,"K"):r); }
  if(stumble>0 && Math.floor(stumble/4)%2){ cctx.globalAlpha=0.35; }
  drawMap(cctx,map,6,8,0); cctx.globalAlpha=1;
}
function jump(){ if(jumping) return; jumping=true; vy=15; sfx.jump(); }

/* sprite de la pantalla de inicio */
drawMap($("startSprite").getContext("2d"),CH_IDLE,5,8,0);

/* ---------- Entradas ---------- */
let started=false, dir=0;
const keys={left:false,right:false};
const startScreen=$("startScreen");
function start(){ if(started) return; started=true; sfx.start();
  startScreen.classList.add("hidden"); $("hud").hidden=false; }
$("pressStart").addEventListener("click",start);
addEventListener("keydown",e=>{
  if(e.code==="Space"){ e.preventDefault(); if(!started){start();return;} jump(); }
  if(e.code==="ArrowRight"||e.code==="KeyD"){ e.preventDefault(); if(!started){start();return;} keys.right=true; }
  if(e.code==="ArrowLeft"||e.code==="KeyA"){ e.preventDefault(); keys.left=true; }
  if(e.code==="ArrowUp"||e.code==="KeyW"){ e.preventDefault(); if(started) jump(); }
});
addEventListener("keyup",e=>{
  if(e.code==="ArrowRight"||e.code==="KeyD") keys.right=false;
  if(e.code==="ArrowLeft"||e.code==="KeyA") keys.left=false;
});
addEventListener("touchstart",()=>{ if(!started) return; jump(); },{passive:true});

/* ---------- Bucle principal ---------- */
$("scrollSpace").style.height=(WORLD+vh)+"px";
addEventListener("resize",()=>{ vw=innerWidth; vh=innerHeight; $("scrollSpace").style.height=(WORLD+vh)+"px"; });

const zoneLabel=$("zoneLabel"), progressFill=$("progressFill"), coinCount=$("coinCount");
let coinsGot=0;
function loop(){
  dir=(keys.right?1:0)-(keys.left?1:0);
  if(dir!==0){ scrollBy(0,9*dir); if(dir!==0) facing=dir; }
  const x=Math.min(scrollY,WORLD);
  /* parallax */
  layerClouds.style.transform=`translateX(${-x*0.15}px)`;
  layerFar.style.transform=`translateX(${-x*0.35}px)`;
  layerMid.style.transform=`translateX(${-x*0.65}px)`;
  layerWorld.style.transform=`translateX(${-x}px)`;
  $("ground").style.backgroundPosition=`${-x}px 0,0 0`;
  /* animación correr / idle */
  moving=Math.abs(x-lastX)>2;
  if(moving) frame=Math.floor(x/32); lastX=x;
  if(Math.random()<0.008) blink=8; if(blink>0) blink--;
  const bob=moving||jumping?0:Math.sin(performance.now()/300)*3;
  /* salto */
  if(jumping){ jumpY+=vy; vy-=1.1; if(jumpY<=0){ jumpY=0; jumping=false; } }
  charCanvas.style.transform=`translateY(${-jumpY*2.2+bob}px) scaleX(${facing}) ${stumble>0?"rotate(-8deg)":""}`;
  if(stumble>0) stumble--;
  drawChar();
  /* posición del personaje en el mundo */
  const charX=x+vw*(vw>700?0.16:0.10)+56;
  /* monedas */
  coins.forEach(c=>{ if(c.got) return;
    const highOK=c.arc? jumpY>18 : jumpY<40;
    if(Math.abs(c.x+13-charX)<44 && highOK){ c.got=true; c.el.classList.add("got");
      coinsGot++; coinCount.textContent=coinsGot; sfx.coin(); } });
  /* obstáculos */
  obstacles.forEach(o=>{ if(o.hit) return;
    if(Math.abs(o.x+22-charX)<34 && jumpY<12){ o.hit=true; stumble=28; sfx.hit();
      if(coinsGot>0){ coinsGot--; coinCount.textContent=coinsGot; } } });
  /* zona + progreso */
  let z=ZONES[0][1]; for(const [zx,name] of ZONES) if(x>=zx) z=name;
  if(zoneLabel.textContent!==z) zoneLabel.textContent=z;
  progressFill.style.width=(x/WORLD*100)+"%";
  requestAnimationFrame(loop);
}
drawChar(); loop();
})();

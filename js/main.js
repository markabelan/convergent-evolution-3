import { createTreeScene } from "./scene.js?v=hero17";
import { DEMOS } from "./demos.js?v=hero17";

const stage = document.querySelector("#tree-root");
const stageEl = document.querySelector("#stage");
const floatEl = document.querySelector("#tree-float");
const slotEl = document.querySelector("#tree-slot");
const heroEl = document.querySelector(".editorial-hero");
const stageRight = document.querySelector(".stage-right");
const figure = document.querySelector("#case-figure");
const kicker = figure.querySelector(".case-kicker");
const ancestor = document.querySelector(".case-ancestor");
const ancestorKicker = ancestor.querySelector(".case-ancestor-kicker");
const ancestorBody = ancestor.querySelector(".case-ancestor-body");
const solutionKicker = figure.querySelector(".case-solution-kicker");
const solutionBody = figure.querySelector(".case-solution-body");
const cards = [...figure.querySelectorAll(".case-card")];
const buttons = [...document.querySelectorAll(".trait")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function renderCase(trait, extras = {}) {
  const examples = extras.examples?.length ? extras.examples : trait.examples;
  kicker.textContent = trait.label;
  const lead = figure.querySelector(".case-lead-body");
  if (lead) lead.textContent = trait.help ?? trait.note ?? "";

  ancestorKicker.innerHTML = `${trait.ancestor.kicker} <span class="case-lacked">${trait.ancestor.lacked}</span>`;
  ancestorBody.textContent = trait.ancestor.body;
  solutionKicker.textContent = trait.solution.kicker;
  solutionBody.textContent = trait.solution.body;

  cards.forEach((card, i) => {
    const ex = examples[i];
    if (!ex) return;
    card.setAttribute("aria-label", ex.name);
    card.querySelector(".case-demo").innerHTML = DEMOS[ex.demo] ?? "";
    const nameEl = card.querySelector(".case-name");
    nameEl.replaceChildren(ex.name);
    if (ex.latin) {
      const latin = document.createElement("em");
      latin.className = "case-latin";
      latin.textContent = ex.latin;
      nameEl.append(" ");
      nameEl.append(latin);
    }
    card.querySelector(".case-need").textContent = ex.need ?? ex.env ?? "";
    card.querySelector(".case-blurb").textContent = ex.blurb;
  });
}

function markButtons(traitId) {
  buttons.forEach((btn) => {
    const on = Boolean(traitId) && btn.dataset.trait === traitId;
    btn.classList.toggle("is-active", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  });
  document.querySelector(".trait-bank")?.classList.toggle("is-waiting", !traitId);
  stageRight.classList.toggle("is-playing", Boolean(traitId));
}

function sizeFloatToSlot() {
  const dest = slotEl.getBoundingClientRect();
  if (dest.width < 80 || dest.height < 80) return false;
  floatEl.style.width = `${dest.width}px`;
  floatEl.style.height = `${dest.height}px`;
  return true;
}

sizeFloatToSlot();

const scene = createTreeScene(stage, {
  onTraitChange(trait, extras = {}) {
    markButtons(trait?.id ?? null);
    if (!trait) return;
    if (extras.phase === "reveal") renderCase(trait, extras);
  },
});

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    scene.setTrait(btn.dataset.trait);
  });
});

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function ease(t) {
  t = clamp(t, 0, 1);
  return t * t * (3 - 2 * t);
}

function sceneProgress() {
  const top = stageEl.getBoundingClientRect().top;
  const h = window.innerHeight || 1;
  return clamp(1 - top / h, 0, 1);
}

let arrived = false;
let destW = 0;
let destH = 0;
const copyEl = document.querySelector(".editorial-inner");

if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (location.hash === "#stage") {
  window.scrollTo(0, stageEl.offsetTop);
} else {
  window.scrollTo(0, 0);
}

function placeTree(now) {
  const dest = slotEl.getBoundingClientRect();
  const hero = heroEl.getBoundingClientRect();
  const p = ease(sceneProgress());
  const tNow = now || performance.now();
  if (hero.width < 80 || dest.width < 80 || dest.height < 80) {
    floatEl.style.visibility = "hidden";
    return;
  }
  if (dest.width < window.innerWidth * 0.78) {
    destW = dest.width;
    destH = dest.height;
  }
  if (!destW || !destH) {
    floatEl.style.visibility = "hidden";
    return;
  }
  const w = destW;
  const h = destH;
  floatEl.style.visibility = "visible";

  const destCx = dest.left + dest.width / 2;
  const destCy = dest.top + dest.height / 2;
  const sFit = Math.min(hero.width / w, hero.height / h);
  const sHero = clamp(sFit * 1.08, 0.72, 1.18);
  const parked = p >= 0.97;
  const s = parked ? 1 : lerp(sHero, 1, p);
  const scaledW = w * sHero;
  const copyLeft = copyEl?.getBoundingClientRect().left ?? hero.right;
  const maxCx = copyLeft - 36 - scaledW / 2;
  const minCx = hero.left + scaledW / 2;
  const heroCx = clamp(hero.left + hero.width * 0.5, minCx, Math.max(minCx, maxCx));
  const heroCy = hero.top + hero.height * 0.52;
  const cx = parked ? destCx : lerp(heroCx, destCx, p);
  const cy = parked ? destCy : lerp(heroCy, destCy, p);

  floatEl.style.width = `${w}px`;
  floatEl.style.height = `${h}px`;
  floatEl.style.left = `${cx - w / 2}px`;
  floatEl.style.top = `${cy - h / 2}px`;

  const live = reduceMotion ? 0 : 1;
  const t = tNow / 1000;
  const spin = parked ? 0 : Math.pow(1 - p, 2) * live;
  const yaw = Math.sin(t * 0.28) * 12 * spin;
  const pitch = 7 * spin;
  const roll = -2 * spin;
  floatEl.style.transform = `perspective(1500px) rotateX(${pitch}deg) rotateY(${yaw}deg) rotateZ(${roll}deg) scale(${s})`;
  floatEl.classList.toggle("is-hero", p < 0.9);

  const ui = clamp((p - 0.78) / 0.16, 0, 1);
  stageRight.style.opacity = String(ui);
  stageRight.style.pointerEvents = ui > 0.85 ? "auto" : "none";

  if (p >= 0.99 && !arrived) {
    arrived = true;
    stageEl.classList.add("is-arrived");
    scene.enterStage();
  } else if (p < 0.32 && arrived) {
    arrived = false;
    stageEl.classList.remove("is-arrived");
    scene.toHero();
  }
}

function loop(now) {
  placeTree(now);
  requestAnimationFrame(loop);
}

function scrollToStage() {
  const start = window.scrollY;
  const end = stageEl.getBoundingClientRect().top + window.scrollY;
  const dur = reduceMotion ? 1 : 1400;
  const t0 = performance.now();
  function step(now) {
    const t = clamp((now - t0) / dur, 0, 1);
    window.scrollTo(0, start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

document.querySelector(".scroll-cue")?.addEventListener("click", (event) => {
  event.preventDefault();
  scrollToStage();
});

placeTree(0);
requestAnimationFrame(loop);
document.fonts?.ready?.then(() => {
  sizeFloatToSlot();
  placeTree();
});
window.addEventListener("load", () => {
  sizeFloatToSlot();
  placeTree();
});

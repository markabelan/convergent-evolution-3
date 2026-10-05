import * as d3 from "d3";
import { DOMAIN_COLORS, TRAITS, TREE } from "./data.js?v=hero12";

const DOMAIN_HEX = {
  eukaryotes: "#7fb389",
  archaea: "#d08458",
  bacteria: "#9aa8b8",
  root: "#e2b84a",
};

function hex(color) {
  if (typeof color === "string") return color;
  return `#${(color >>> 0).toString(16).padStart(6, "0")}`;
}

function flatten(node, parent = null, list = []) {
  node.parent = parent;
  list.push(node);
  (node.children ?? []).forEach((child) => flatten(child, node, list));
  return list;
}

function layoutCladogram(root, width, height) {
  const hier = d3.hierarchy(root);
  d3.cluster()
    .size([height, width])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.35))(hier);

  hier.each((d) => {
    d.data.x = d.y;
    d.data.y = d.x;
  });
}

function linkPath(node) {
  if (!node.parent) return null;
  return `M${node.parent.x},${node.parent.y}V${node.y}H${node.x}`;
}

function snakePoints(mrca, tip) {
  const chain = lineageFrom(mrca, tip).slice().reverse();
  const pts = [{ x: mrca.x, y: mrca.y }];
  let prev = mrca;
  chain.forEach((node) => {
    if (Math.abs(node.y - prev.y) > 0.4) pts.push({ x: prev.x, y: node.y });
    pts.push({ x: node.x, y: node.y });
    prev = node;
  });
  return pts;
}

function pointsToPath(pts) {
  if (!pts.length) return "";
  return `M${pts.map((p) => `${p.x},${p.y}`).join("L")}`;
}

function easePan(t) {
  return 0.5 - 0.5 * Math.cos(Math.PI * t);
}

function mrcaOf(a, b) {
  const seen = new Set();
  let n = a;
  while (n) {
    seen.add(n.id);
    n = n.parent;
  }
  n = b;
  while (n && !seen.has(n.id)) n = n.parent;
  return n;
}

function lineageFrom(ancestor, tip) {
  const nodes = [];
  let n = tip;
  while (n && n !== ancestor) {
    nodes.push(n);
    n = n.parent;
  }
  return nodes;
}

function traitFocus(trait, byId) {
  const examples = trait.examples
    .map((ex) => ({ ...ex, node: byId.get(ex.tip) }))
    .filter((ex) => ex.node);
  if (examples.length < 2) return null;
  const tips = examples.map((ex) => ex.node);
  const mrca = mrcaOf(tips[0], tips[1]);
  return { examples, tips, mrca };
}

function sortTopBottom(examples) {
  return [...examples].sort((a, b) => a.node.y - b.node.y);
}

export function createTreeScene(container, { onTraitChange } = {}) {
  const nodes = flatten(TREE);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const stageBody = document.querySelector(".stage-body") ?? container.parentElement;

  let focusedTrait = null;
  let mode = "hero";
  let highlightFocus = null;
  let overlayOn = false;
  let cardsOn = false;
  let laidOut = false;
  let seq = 0;
  let cam = { k: 1, cx: 200, cy: 400 };
  let layoutW = 320;
  let layoutH = 2400;
  let viewW = 400;
  let viewH = 700;
  const T_OUT = 140;
  const T_PAN = 720;
  const T_SNAKE = 480;

  const wrap = d3.select(container).attr("class", "chronogram-wrap");
  const svg = wrap.append("svg").attr("class", "chronogram standing").attr("aria-hidden", "true");
  const rootG = svg.append("g").attr("class", "chrono-zoom");
  const treeG = rootG.append("g").attr("class", "chrono-tree");
  const hotG = rootG.append("g").attr("class", "chrono-hot");
  const labelsG = svg.append("g").attr("class", "chrono-labels");
  const calloutSvg = d3.select(stageBody).select("svg.callouts");

  function applyCamera(next = cam) {
    cam = next;
    rootG.attr(
      "transform",
      `translate(${viewW / 2}, ${viewH / 2}) scale(${cam.k}) translate(${-cam.cx}, ${-cam.cy})`
    );
    placeLabels();
  }

  function targetCamera(focus) {
    const padX = 56;
    const padY = 70;
    if (!focus?.mrca) {
      const k = Math.min(viewH / layoutH, viewW / layoutW, 1) * 0.92;
      return { k, cx: layoutW / 2, cy: layoutH / 2 };
    }
    let context = focus.mrca;
    for (let i = 0; i < 2 && context.parent; i += 1) context = context.parent;
    const xs = [context.x, focus.mrca.x, ...focus.tips.map((t) => t.x)];
    const ys = [context.y, focus.mrca.y, ...focus.tips.map((t) => t.y)];
    if (context.children?.length) {
      context.children.forEach((kid) => {
        xs.push(kid.x);
        ys.push(kid.y);
      });
    }
    let minX = Math.min(...xs) - padX;
    let maxX = Math.max(...xs) + padX + 20;
    let minY = Math.min(...ys) - padY;
    let maxY = Math.max(...ys) + padY;
    const minSpan = Math.max(320, layoutH * 0.14);
    const spanY = maxY - minY;
    if (spanY < minSpan) {
      const extra = (minSpan - spanY) / 2;
      minY -= extra;
      maxY += extra;
    }
    const w = Math.max(120, maxX - minX);
    const h = Math.max(120, maxY - minY);
    const k = Math.min(viewW / w, viewH / h, 1.15);
    let cx = (minX + maxX) / 2;
    let cy = (minY + maxY) / 2;
    if (focus?.mrca) {
      const room = 292;
      const mrcaX = viewW / 2 + (focus.mrca.x - cx) * k;
      if (mrcaX < room) cx -= (room - mrcaX) / k;
    }
    return { k, cx, cy };
  }

  function layout() {
    viewW = container.clientWidth || 420;
    viewH = container.clientHeight || 700;
    layoutW = Math.max(220, viewW - 28);
    layoutH = Math.max(1600, viewH * 2.05);
    svg.attr("viewBox", `0 0 ${viewW} ${viewH}`).attr("width", viewW).attr("height", viewH);
    layoutCladogram(TREE, layoutW, layoutH);
    laidOut = true;
  }

  function treeToLocal(node) {
    return {
      x: viewW / 2 + (node.x - cam.cx) * cam.k,
      y: viewH / 2 + (node.y - cam.cy) * cam.k,
    };
  }

  function calloutBox() {
    return calloutSvg.node()?.getBoundingClientRect() ?? stageBody.getBoundingClientRect();
  }

  function localToCallout(pt) {
    const treeBox = container.getBoundingClientRect();
    const svgBox = calloutBox();
    return {
      x: treeBox.left - svgBox.left + pt.x,
      y: treeBox.top - svgBox.top + pt.y,
    };
  }

  function htmlToCallout(el, { x: ox = 0.5, y: oy = 0 } = {}) {
    const svgBox = calloutBox();
    const box = el.getBoundingClientRect();
    return {
      x: box.left + box.width * ox - svgBox.left,
      y: box.top + box.height * oy - svgBox.top,
    };
  }

  function inView(p, pad = 8) {
    return p.x > pad && p.x < viewW - pad && p.y > pad && p.y < viewH - pad;
  }

  function placeAncestor(focus) {
    const el = document.querySelector(".case-ancestor");
    if (!el) return;
    const show = mode === "stage" && overlayOn && cardsOn && Boolean(focus?.mrca);
    el.style.opacity = show ? "1" : "0";
    if (!show) return;

    const p = treeToLocal(focus.mrca);
    const cardW = el.offsetWidth || 220;
    const cardH = el.offsetHeight || 140;
    const gap = 16;
    const pad = 10;
    let side = "before";
    let left = p.x - gap - cardW;
    if (left < pad) {
      side = "after";
      left = p.x + gap;
    }
    left = Math.max(pad, Math.min(viewW - cardW - pad, left));
    let top = p.y - cardH / 2;
    top = Math.max(pad, Math.min(viewH - cardH - pad, top));
    el.style.left = `${Math.round(left)}px`;
    el.style.top = `${Math.round(top)}px`;
    el.classList.toggle("is-before", side === "before");
    el.classList.toggle("is-after", side === "after");
  }

  function placeLabels() {
    const cladeNames = new Set(["bacteria", "archaea", "eukaryotes", "animals", "plants"]);
    const cladeNodes = nodes.filter((n) => cladeNames.has(n.id) && n.x > 8);
    labelsG
      .selectAll("text.clade")
      .data(cladeNodes, (d) => d.id)
      .join("text")
      .attr("class", "clade")
      .attr("x", (d) => treeToLocal(d).x + 8)
      .attr("y", (d) => treeToLocal(d).y - 8)
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "middle")
      .text((d) => d.name)
      .attr("opacity", (d) => (inView(treeToLocal(d)) ? 0.55 : 0));

    const lucaPt = treeToLocal(TREE);
    labelsG
      .selectAll("text.luca-label")
      .data([TREE])
      .join("text")
      .attr("class", "luca-label")
      .attr("x", lucaPt.x)
      .attr("y", lucaPt.y - 14)
      .attr("text-anchor", "middle")
      .text("LUCA")
      .attr("opacity", inView({ x: lucaPt.x, y: lucaPt.y - 14 }, 4) ? 0.85 : 0);

    const cards = [...document.querySelectorAll(".case-card")];
    const ordered = overlayOn && highlightFocus ? sortTopBottom(highlightFocus.examples) : [];
    const svgNode = calloutSvg.node();
    const bw = svgNode?.clientWidth || stageBody.clientWidth || 800;
    const bh = svgNode?.clientHeight || stageBody.clientHeight || 700;
    const links = ordered
      .slice(0, 2)
      .map((ex, i) => {
        const card = cards[i];
        if (!card) return null;
        const to = htmlToCallout(card, { x: 0, y: 0.5 });
        const from = localToCallout(treeToLocal(ex.node));
        const midX = from.x + (to.x - from.x) * 0.42;
        return { id: ex.tip, from, to, midX };
      })
      .filter(Boolean);

    calloutSvg.attr("viewBox", `0 0 ${bw} ${bh}`).attr("width", bw).attr("height", bh);
    calloutSvg
      .selectAll("path.callout-line")
      .data(cardsOn && overlayOn ? links : [], (d) => d.id)
      .join("path")
      .attr("class", "callout-line")
      .attr("fill", "none")
      .attr("stroke", "#e2b84a")
      .attr("stroke-width", 1.2)
      .attr("stroke-dasharray", "3.5 4.5")
      .attr("d", (d) => `M${d.from.x},${d.from.y} L${d.midX},${d.from.y} L${d.midX},${d.to.y} L${d.to.x},${d.to.y}`)
      .attr("opacity", cardsOn && overlayOn ? 0.72 : 0);

    placeAncestor(highlightFocus);
  }

  function paint({ focus = null, duration = 0, snakeDuration = 0 } = {}) {
    if (!laidOut) layout();
    highlightFocus = focus;
    overlayOn = Boolean(focus);
    const snakes = focus?.mrca
      ? (focus.tips ?? [])
          .map((tip) => {
            const d = pointsToPath(snakePoints(focus.mrca, tip));
            return d ? { id: tip.id, d } : null;
          })
          .filter(Boolean)
      : [];
    const treeOp = 0.88;
    const tipDelay = snakeDuration > 0 ? Math.max(0, snakeDuration - 140) : 0;
    const tipDur = snakeDuration > 0 ? 140 : Math.max(duration, 1);
    const links = nodes.filter((n) => n.parent).map((n) => ({ id: `${n.parent.id}>${n.id}`, node: n }));

    treeG
      .selectAll("path.link")
      .data(links, (d) => d.id)
      .join("path")
      .attr("class", "link")
      .attr("d", (d) => linkPath(d.node))
      .attr("fill", "none")
      .attr("stroke", (d) => hex(DOMAIN_COLORS[d.node.domain] ?? DOMAIN_HEX.eukaryotes))
      .attr("stroke-width", mode === "hero" ? 1.45 : 1.15)
      .attr("stroke-linecap", "square")
      .attr("opacity", treeOp);

    treeG
      .selectAll("circle.luca")
      .data([TREE])
      .join("circle")
      .attr("class", "luca")
      .attr("r", mode === "hero" ? 6 : 4.5)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("fill", "#e2b84a")
      .attr("opacity", 0.75);

    const selectedTips = focus?.tips ?? [];
    treeG
      .selectAll("circle.tip")
      .data(selectedTips, (d) => d.id)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("class", "tip")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("fill", "#e2b84a")
            .attr("r", 0)
            .attr("opacity", 0)
            .call((s) =>
              s
                .transition()
                .delay(tipDelay)
                .duration(tipDur)
                .ease(d3.easeCubicOut)
                .attr("r", 5.2)
                .attr("opacity", 1)
            ),
        (update) =>
          update
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("fill", "#e2b84a")
            .attr("r", 5.2)
            .attr("opacity", 1),
        (exit) =>
          exit
            .interrupt()
            .transition()
            .duration(Math.min(duration || 120, 120))
            .attr("opacity", 0)
            .attr("r", 0)
            .remove()
      );

    hotG
      .selectAll("path.snake")
      .data(snakes, (d) => d.id)
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "snake")
            .attr("fill", "none")
            .attr("stroke", "#e2b84a")
            .attr("stroke-width", 2.5)
            .attr("stroke-linecap", "square")
            .attr("stroke-linejoin", "miter")
            .attr("d", (d) => d.d)
            .attr("opacity", 1)
            .each(function () {
              const len = this.getTotalLength();
              const start = snakeDuration > 0 ? len : 0;
              d3.select(this)
                .attr("stroke-dasharray", `${len} ${len}`)
                .attr("stroke-dashoffset", start);
              if (snakeDuration > 0) {
                d3.select(this)
                  .transition()
                  .duration(snakeDuration)
                  .ease(d3.easeCubicInOut)
                  .attr("stroke-dashoffset", 0);
              }
            }),
        (update) =>
          update.attr("d", (d) => d.d).each(function () {
            const len = this.getTotalLength();
            d3.select(this)
              .interrupt()
              .attr("stroke-dasharray", `${len} ${len}`)
              .attr("stroke-dashoffset", 0)
              .attr("opacity", 1);
          }),
        (exit) =>
          exit.interrupt().transition().duration(duration).attr("opacity", 0).remove()
      );

    hotG
      .selectAll("circle.mrca")
      .data(focus?.mrca ? [focus.mrca] : [], (d) => d.id)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("class", "mrca")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", 6.5)
            .attr("fill", "#111f16")
            .attr("stroke", "#e2b84a")
            .attr("stroke-width", 2.2)
            .attr("opacity", 0)
            .call((s) =>
              s.transition().duration(Math.min(duration || 120, 120)).attr("opacity", 1)
            ),
        (update) =>
          update.attr("cx", (d) => d.x).attr("cy", (d) => d.y).attr("opacity", 1),
        (exit) => exit.transition().duration(duration).attr("opacity", 0).remove()
      );

    placeLabels();
  }

  function overlayEl() {
    return document.querySelector("#case-figure");
  }

  function setOverlayVisible(on) {
    cardsOn = on;
    overlayEl()?.classList.toggle("is-revealed", on);
    placeLabels();
  }

  function emitSelect(trait) {
    onTraitChange?.(trait, { phase: "select" });
  }

  function emitReveal(trait) {
    const focus = trait ? traitFocus(trait, byId) : null;
    const examples = focus ? sortTopBottom(focus.examples) : [];
    onTraitChange?.(trait, { phase: "reveal", examples, mrca: focus?.mrca ?? null });
  }

  function panTo(focus, duration) {
    const target = targetCamera(focus);
    d3.select(container).interrupt();
    const dk = Math.abs(target.k - cam.k);
    const dcy = Math.abs(target.cy - cam.cy);
    const dcx = Math.abs(target.cx - cam.cx);
    if (dk < 0.02 && dcy < 8 && dcx < 8) {
      applyCamera(target);
      return Promise.resolve();
    }
    const from = { ...cam };
    return new Promise((resolve) => {
      d3.select(container)
        .transition()
        .duration(duration)
        .ease(easePan)
        .tween("pan", () => (t) => {
          applyCamera({
            k: from.k + (target.k - from.k) * t,
            cx: from.cx + (target.cx - from.cx) * t,
            cy: from.cy + (target.cy - from.cy) * t,
          });
        })
        .on("end", () => {
          applyCamera(target);
          resolve();
        })
        .on("interrupt", () => resolve());
    });
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function playSwitch(trait, { intro = false } = {}) {
    const id = ++seq;
    const focus = traitFocus(trait, byId);
    if (!laidOut) layout();

    if (!intro) {
      setOverlayVisible(false);
      paint({ focus: null, duration: T_OUT });
      await wait(T_OUT);
      if (id !== seq) return;
      emitReveal(trait);
    } else {
      setOverlayVisible(false);
      paint({ focus: null, duration: 0 });
      emitReveal(trait);
    }

    await panTo(focus, intro ? 1180 : T_PAN);
    if (id !== seq) return;

    paint({ focus, duration: 0, snakeDuration: T_SNAKE });
    await wait(T_SNAKE);
    if (id !== seq) return;
    setOverlayVisible(true);
  }

  function setTrait(traitId) {
    if (mode !== "stage") return null;
    const trait = TRAITS[traitId];
    if (!trait) return null;
    const intro = focusedTrait == null;
    const changed = focusedTrait !== traitId;
    focusedTrait = traitId;
    emitSelect(trait);
    if (!changed && !intro) {
      const focus = traitFocus(trait, byId);
      emitReveal(trait);
      setOverlayVisible(true);
      paint({ focus, duration: 0 });
      applyCamera(targetCamera(focus));
      return trait;
    }
    playSwitch(trait, { intro });
    return trait;
  }

  function enterStage() {
    if (mode === "stage") return;
    mode = "stage";
  }

  function toHero() {
    seq += 1;
    mode = "hero";
    focusedTrait = null;
    highlightFocus = null;
    setOverlayVisible(false);
    emitSelect(null);
    paint({ focus: null, duration: 160 });
    applyCamera(targetCamera(null));
  }

  const ro = new ResizeObserver(() => {
    layout();
    paint({ focus: highlightFocus, duration: 0 });
    applyCamera(targetCamera(highlightFocus));
  });
  ro.observe(container);
  layout();
  paint({ focus: null, duration: 0 });
  applyCamera(targetCamera(null));

  return {
    setTrait,
    enterStage,
    toHero,
    getLayout() {
      return { viewW, viewH, layoutW, layoutH, k: cam.k };
    },
    getActiveTrait: () => focusedTrait,
    getMode: () => mode,
    dispose() {
      ro.disconnect();
      wrap.selectAll("*").remove();
    },
  };
}

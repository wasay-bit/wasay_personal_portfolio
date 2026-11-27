// Drifting "network" of nodes behind the page. The lines react to the pointer. Purely decorative.

export function startBackground(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let nodes = [];
  let running = false;
  const mouse = { x: -9999, y: -9999 };
  const LINK = 130;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = Math.min(window.innerHeight, 1400);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.max(24, Math.min(90, Math.round((width * height) / 15000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.3 + 0.7,
      blue: Math.random() < 0.5,
    }));
  }

  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, width, height);
    // Light mode uses darker, stronger colours so the lines show on white.
    const light = document.documentElement.classList.contains("light");
    const BLUE = light ? "29,95,191" : "90,169,255";
    const GREEN = light ? "11,122,87" : "78,240,184";
    const ORANGE = light ? "196,86,11" : "255,180,84";
    const LINE_ALPHA = light ? 0.42 : 0.18;
    const POINTER_ALPHA = light ? 0.55 : 0.35;

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -20) n.x = width + 20;
      else if (n.x > width + 20) n.x = -20;
      if (n.y < -20) n.y = height + 20;
      else if (n.y > height + 20) n.y = -20;
    }

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK) {
          const rgb = a.blue || b.blue ? BLUE : GREEN;
          ctx.strokeStyle = `rgba(${rgb},${(1 - dist / LINK) * LINE_ALPHA})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (md < 170) {
        ctx.strokeStyle = `rgba(${ORANGE},${(1 - md / 170) * POINTER_ALPHA})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
      ctx.fillStyle = a.blue ? `rgba(${BLUE},${light ? 0.75 : 0.6})` : `rgba(${GREEN},${light ? 0.7 : 0.55})`;
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }

  function setRunning(next) {
    if (next === running) return;
    running = next;
    if (running) requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener("pointerleave", () => {
    mouse.x = mouse.y = -9999;
  });
  document.addEventListener("visibilitychange", () => setRunning(!document.hidden));
  setRunning(!document.hidden);
}

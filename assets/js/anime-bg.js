// anime-bg.js - Techy Network Animation

// anime-bg.js - Super Techy Neural Network Animation
document.addEventListener('DOMContentLoaded', function () {
  const bg = document.getElementById('anime-bg');
  bg.innerHTML = '';
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '-1';
  bg.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let width = window.innerWidth;
  let height = window.innerHeight;
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  resize();
  window.addEventListener('resize', resize);

  // Neural network parameters
  const NODE_COUNT = 48;
  const NODE_RADIUS = 4;
  const LINE_DIST = 160;
  const LINE_COLOR = '#00fff7';
  const NODE_COLOR = '#FFD700';
  const GLOW_COLOR = '#00fff7';
  const MOUSE_RADIUS = 180;

  // Node structure
  function createNode() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: NODE_RADIUS + Math.random() * 2,
    };
  }

  let nodes = [];
  function resetNodes() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push(createNode());
    }
  }
  resetNodes();

  // Mouse interaction
  let mouse = { x: width / 2, y: height / 2 };
  canvas.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', function () {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // Draw lines between close nodes
  function drawLines() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINE_DIST) {
          // Mouse interaction: highlight if near mouse
          let mouseDist = Math.sqrt(
            ((a.x + b.x) / 2 - mouse.x) ** 2 +
            ((a.y + b.y) / 2 - mouse.y) ** 2
          );
          let alpha = 0.18 + 0.5 * Math.max(0, (MOUSE_RADIUS - mouseDist) / MOUSE_RADIUS);
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = LINE_COLOR;
          ctx.globalAlpha = alpha;
          ctx.shadowColor = GLOW_COLOR;
          ctx.shadowBlur = 12;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  // Draw nodes
  function drawNodes() {
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      // Node glow if near mouse
      let distToMouse = Math.sqrt((n.x - mouse.x) ** 2 + (n.y - mouse.y) ** 2);
      let glow = distToMouse < MOUSE_RADIUS ? 24 : 10;
      let alpha = distToMouse < MOUSE_RADIUS ? 0.95 : 0.7;
      ctx.save();
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, 2 * Math.PI);
      ctx.fillStyle = NODE_COLOR;
      ctx.shadowColor = GLOW_COLOR;
      ctx.shadowBlur = glow;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.restore();
    }
  }

  // Animate nodes
  function animate() {
    ctx.clearRect(0, 0, width, height);
    // Move nodes
    for (let i = 0; i < nodes.length; i++) {
      let n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      // Bounce off walls
      if (n.x < n.radius) { n.x = n.radius; n.vx *= -1; }
      if (n.x > width - n.radius) { n.x = width - n.radius; n.vx *= -1; }
      if (n.y < n.radius) { n.y = n.radius; n.vy *= -1; }
      if (n.y > height - n.radius) { n.y = height - n.radius; n.vy *= -1; }
    }
    drawLines();
    drawNodes();
    requestAnimationFrame(animate);
  }
  animate();

  // On resize, reset nodes for new area
  window.addEventListener('resize', function () {
    resetNodes();
  });
});

/* Shared behaviour for every page. Reads data from data.js; each page marks itself with <body data-page="...">. */
(function () {
  const page = document.body.dataset.page;
  const home = page === "home" ? "" : "index.html";
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const initials = n => n.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const $ = id => document.getElementById(id);

  /* ---------- nav + footer ---------- */
  const NAV = [
    ["About", home + "#about", "about"], ["Research", home + "#research", "research"],
    ["Projects", home + "#projects", "projects"], ["Members", "members.html", "members"], ["Publications", "publications.html", "publications"],
    ["Patents", "patents.html", "patents"], ["News", "news.html", "news"]
  ];
  const nav = $("nav");
  if (nav) {
    nav.className = "nav"; nav.setAttribute("aria-label", "Main");
    nav.innerHTML = `<div class="wrap">
      <a class="brand" href="${home || "#top"}" aria-label="COOL home"><img src="assets/cool-mark.webp" alt="COOL"></a>
      <ul>${NAV.map(([t, h, k]) => `<li><a class="l${k === page ? " on" : ""}" data-k="${k}" href="${h}"${k === page ? ' aria-current="page"' : ""}>${t}</a></li>`).join("")}</ul>
      <a class="cta" href="${home}#join">JOIN US</a></div>`;
  }
  const foot = $("footer");
  if (foot) foot.innerHTML = `<div class="wrap"><img src="assets/cool-logo.webp" alt="COOL">
    <div>Control &amp; Observer Optimization Lab · Department of Electronic Engineering, Incheon National University</div>
    <div>Contact: yousesun@inu.ac.kr</div></div>`;

  /* ---------- people ---------- */
  const img = f => `assets/img/${f}`;
  const personCard = p => `<article class="person">
    <div class="photo"><img src="${img(p.photo)}" alt="${esc(p.en)}" loading="lazy"></div>
    <div class="top"><div><h4>${esc(p.en)}</h4><div class="kr">${esc(p.kr)}</div></div></div>
    <div><div class="k">Research areas</div><ul>${(p.areas || UG_AREAS).map(a => `<li>${esc(a)}</li>`).join("")}</ul></div>
    <div><div class="k">Experimental platforms</div><ul>${p.plats.map(a => `<li>${esc(a)}</li>`).join("")}</ul></div>
    <div class="mail">${esc(p.mail)}</div></article>`;
  const groupBlock = g => `<div class="group">
    <div class="group-title anchor-sec" id="${g.id}"><h3>${esc(g.group)}</h3>${g.note ? `<span>${g.note}</span>` : ""}</div>
    <div class="people">${g.list.map(personCard).join("")}</div></div>`;
  if ($("people")) {
    // one-person groups (Ph.D., M.S.) share a row instead of each leaving an empty row
    const solo = PEOPLE.filter(g => g.list.length === 1), rest = PEOPLE.filter(g => g.list.length > 1);
    $("people").innerHTML = (solo.length ? `<div class="solo-row">${solo.map(groupBlock).join("")}</div>` : "") + rest.map(groupBlock).join("");
  }
  if ($("alumni-list")) $("alumni-list").innerHTML = ALUMNI.map(a => `<div class="alum">
    <img class="alum-photo" src="${img(a[3])}" alt="${esc(a[0])}" loading="lazy">
    <div><b>${esc(a[0])} <span>(${esc(a[1])})</span></b><span>${esc(a[2])}</span>
      <img class="org" src="${img(a[4])}" alt="" loading="lazy"></div></div>`).join("");

  /* entry cards on home */
  const researcherCount = PEOPLE.reduce((n, g) => n + g.list.length, 0);
  if ($("entryResearchers")) {
    $("researcherCount").textContent = researcherCount;
    $("researcherMonos").innerHTML = PEOPLE.flatMap(g => g.list).map(p => `<img src="${img(p.photo)}" alt="" title="${esc(p.en)}">`).join("");
    $("alumniCount").textContent = ALUMNI.length;
  }
  if ($("latestNews")) {
    const n = NEWS[0];
    $("latestNews").innerHTML = `<time>${esc(n[1])}</time><p>${esc(n[2])}</p>`;
    $("newsCount").textContent = NEWS.length;
  }

  /* ---------- publications ---------- */
  const role = a => /Sole Author/i.test(a) ? "Sole author" : /Co-first Author/i.test(a) ? "Co-first" : /first Author/i.test(a) ? "First author"
    : /Co-Corresponding/i.test(a) ? "Co-corresponding" : /Corresponding Author/i.test(a) ? "Corresponding" : "";
  const isTop = p => p[7] !== null && p[7] <= 10;
  const pubItem = p => {
    const r = role(p[1]);
    const doi = p[4] ? ` · <a href="https://doi.org/${esc(p[4])}" target="_blank" rel="noopener">doi:${esc(p[4])}</a>` : "";
    return `<li class="pub" id="p${p[0]}"><span class="n">[${p[0]}]</span>
      <div><div class="t">${esc(p[2])}</div><div class="a">${esc(p[1])}</div><div class="v">${esc(p[3])}${doi}</div></div>
      <div class="m"><span class="y">${p[5]}</span><span class="metric">IF ${esc(p[6])}</span>
        ${p[7] !== null ? `<span class="metric ${isTop(p) ? "top" : ""}">JCR top ${p[7]}%</span>` : ""}
        ${r ? `<span class="metric role">${r}</span>` : ""}</div></li>`;
  };
  if ($("topCount")) $("topCount").textContent = PUBS.filter(isTop).length;
  if ($("pubCount")) $("pubCount").textContent = PUBS.length;
  if ($("patentCount")) $("patentCount").textContent = PATENTS.length;
  if ($("pubPreview")) $("pubPreview").innerHTML = PUBS.slice(0, 4).map(pubItem).join("");
  if ($("covers")) $("covers").innerHTML = COVERS.filter(([no]) => PUBS.some(x => x[0] === no)).map(([no, f], k) => {
    const p = PUBS.find(x => x[0] === no);  // covers whose paper number is not in PUBS are skipped above
    return `<a class="cover" style="--i:${k}" href="publications.html#p${no}" title="${esc(p[2])}">
      <img src="${img(f)}" alt="First page of: ${esc(p[2])}" loading="lazy">
      <span class="cap"><b>${esc(p[3].split(",")[0])}</b>${p[5]} · IF ${esc(p[6])}</span></a>`;
  }).join("");

  if ($("pubs")) {
    const YEARS = ["All", "2026", "2025", "2024", "2023", "2022 and earlier"];
    const state = { year: "All", top: false, lead: false, q: "" };
    const yearsEl = $("years");
    yearsEl.innerHTML = YEARS.map(y => `<button class="chip" type="button" data-y="${y}" aria-pressed="${y === "All"}">${y}</button>`).join("");
    const draw = () => {
      const list = PUBS.filter(p => {
        if (state.year !== "All" && (state.year === "2022 and earlier" ? p[5] > 2022 : p[5] !== +state.year)) return false;
        if (state.top && !isTop(p)) return false;
        if (state.lead && !role(p[1])) return false;
        if (state.q && !(p[1] + " " + p[2] + " " + p[3]).toLowerCase().includes(state.q)) return false;
        return true;
      });
      $("count").textContent = `${list.length} / ${PUBS.length} articles`;
      $("pubs").innerHTML = list.length ? list.map(pubItem).join("") : `<li class="empty">No articles match these filters.</li>`;
    };
    yearsEl.addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      state.year = b.dataset.y; yearsEl.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c === b)); draw();
    });
    $("topOnly").addEventListener("change", e => { state.top = e.target.checked; draw(); });
    $("leadOnly").addEventListener("change", e => { state.lead = e.target.checked; draw(); });
    $("q").addEventListener("input", e => { state.q = e.target.value.trim().toLowerCase(); draw(); });
    draw();
  }

  /* ---------- patents ---------- */
  const patentCard = (p, i) => `<article class="patent"><span class="no">${String(i + 1).padStart(2, "0")}</span>
    <div><h3>${esc(p[0])}</h3><dl><dt>등록번호</dt><dd class="reg">${esc(p[1])}</dd><dt>발명자</dt><dd>${esc(p[2])}</dd></dl></div></article>`;
  if ($("patentPreview")) $("patentPreview").innerHTML = PATENTS.slice(0, 4).map(patentCard).join("");
  if ($("patentList")) $("patentList").innerHTML = PATENTS.map(patentCard).join("");

  /* ---------- news: photo cards with the caption laid over the picture ---------- */
  if ($("newsList")) {
    const years = [...new Set(NEWS.map(n => n[0]))];
    $("newsList").innerHTML = years.map(y => `<div class="news-year anchor-sec" id="y${y}"><h3>${y}</h3></div>
      <div class="ncards">${NEWS.filter(n => n[0] === y).map((n, k, all) => {
        const photos = n[3] || [];
        // first card spans the row; an unpaired last card does too, so no row is left half empty
        const span = k === 0 ? " featured" : (k === all.length - 1 && (all.length - 1) % 2 === 1 ? " wide" : "");
        const focus = n[4] != null ? ` style="object-position:center ${n[4]}%"` : "";
        return `<button type="button" class="ncard${span}" data-idx="${NEWS.indexOf(n)}" aria-label="${esc(n[1])}: open photos">
          ${photos[0] ? `<img src="${img(span ? photos[0] : "card-" + photos[0])}" alt=""${focus} loading="lazy"${span ? "" : ` onerror="this.onerror=null;this.src='${img(photos[0])}'"`}>` : ""}
          <span class="shade" aria-hidden="true"></span>
          <span class="txt"><time>${esc(n[1])}</time><span class="t">${esc(n[2])}</span></span>
          ${photos.length > 1 ? `<span class="count-badge">${photos.length} photos</span>` : ""}
        </button>`;
      }).join("")}</div>`).join("");
    if ($("newsYears")) $("newsYears").innerHTML = years.map(y => `<a href="#y${y}">${y}</a>`).join("");

    /* gallery viewer for one news item */
    const box = document.createElement("div"); box.className = "lightbox"; box.hidden = true;
    box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true");
    box.innerHTML = `<button type="button" class="lb-close" aria-label="Close">×</button>
      <button type="button" class="lb-nav prev" aria-label="Previous photo">‹</button>
      <figure><img alt=""><figcaption><time></time><span class="t"></span><span class="n"></span></figcaption></figure>
      <button type="button" class="lb-nav next" aria-label="Next photo">›</button>`;
    document.body.appendChild(box);
    let cur = null, at = 0;
    const show = () => {
      const photos = cur[3];
      box.querySelector("img").src = img(photos[at]);
      box.querySelector("time").textContent = cur[1];
      box.querySelector(".t").textContent = cur[2];
      box.querySelector(".n").textContent = photos.length > 1 ? `${at + 1} / ${photos.length}` : "";
      box.querySelectorAll(".lb-nav").forEach(b => (b.hidden = photos.length < 2));
    };
    const step = d => { at = (at + d + cur[3].length) % cur[3].length; show(); };
    const close = () => { box.hidden = true; };
    $("newsList").addEventListener("click", e => {
      const c = e.target.closest(".ncard"); if (!c) return;
      cur = NEWS[+c.dataset.idx]; if (!cur[3] || !cur[3].length) return;
      at = 0; show(); box.hidden = false; box.querySelector(".lb-close").focus();
    });
    box.addEventListener("click", e => {
      if (e.target.closest(".prev")) step(-1);
      else if (e.target.closest(".next")) step(1);
      else if (e.target === box || e.target.closest(".lb-close")) close();
    });
    document.addEventListener("keydown", e => {
      if (box.hidden) return;
      if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") step(-1); else if (e.key === "ArrowRight") step(1);
    });
  }

  /* ---------- undergraduate projects: each card shows a white 3D model of the set-up that runs while the pointer is on it ---------- */
  if ($("projectList") && typeof PROJECTS !== "undefined") {
    const list = $("projectList");
    const hover = matchMedia("(hover: hover)").matches, still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.innerHTML = PROJECTS.map(p => `<a class="project" href="${esc(p.url)}" aria-label="${esc(p.title)}">
      <div class="stage" data-model="${esc(p.model || "")}"><img src="${img(p.img)}" alt="" loading="lazy">
        <span class="lang" title="Page language">${esc(p.lang)}</span>${hover && !still ? `<span class="hint" aria-hidden="true">Hover to run</span>` : ""}</div>
      <div class="body"><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p>
        <div class="tags">${(p.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        <span class="go">Open project page <span class="arrow">→</span></span></div></a>`).join("");

    // three.js r147 is what the isp-dob page uses; the models come from the project pages themselves (same site)
    const CDN = "https://cdn.jsdelivr.net/npm/three@0.147.0/", SITE = "https://coolab-inu.github.io/";
    const addScript = src => new Promise((ok, no) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
    const whiteMat = T => new T.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, metalness: 0, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
    const edgeMat = T => new T.LineBasicMaterial({ color: 0x12395c, transparent: true, opacity: 0.45 });

    /* self-balancing cube (cube_dob): same geometry and corner pose as that page; spins, gets a knock every 4 s, wheels catch it */
    const cubeModel = (T, J) => {
      const S = 0.01, HALF = 76, PLATE = 72.5, mat = whiteMat(T), Z = new T.Vector3(0, 0, 1);
      const geo = b64 => {
        const bin = atob(b64), u8 = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
        const i16 = new Int16Array(u8.buffer), f = new Float32Array(i16.length);
        for (let i = 0; i < i16.length; i++) f[i] = i16[i] / 20;
        const g = new T.BufferGeometry(); g.setAttribute("position", new T.BufferAttribute(f, 3)); g.computeVertexNormals(); return g;
      };
      const G = { side: geo(J.side), rw: geo(J.rwside), wheel: geo(J.wheel), mh: geo(J.motorholder) };
      const place = (m, dir, pos) => { m.quaternion.setFromUnitVectors(Z, dir); m.position.copy(pos).multiplyScalar(S); m.scale.setScalar(S); return m; };
      const body = new T.Group(), wheels = [];
      [new T.Vector3(1, 0, 0), new T.Vector3(0, 1, 0), new T.Vector3(0, 0, 1)].forEach(a => {
        body.add(place(new T.Mesh(G.rw, mat), a, a.clone().multiplyScalar(-PLATE)));
        body.add(place(new T.Mesh(G.side, mat), a, a.clone().multiplyScalar(PLATE)));
        body.add(place(new T.Mesh(G.mh, mat), a, a.clone().multiplyScalar(-55)));
        const holder = new T.Group(), w = new T.Mesh(G.wheel, mat);
        holder.quaternion.setFromUnitVectors(Z, a); holder.position.copy(a).multiplyScalar(-50 * S);
        w.scale.setScalar(S); holder.add(w); body.add(holder); wheels.push(w);
      });
      body.position.setScalar(HALF * S);
      const q = [0.88807, 0.32506, -0.32506, 0], n = Math.hypot(...q);       // standing on one corner, z-up model turned to y-up
      const QU = new T.Quaternion(q[1] / n, q[2] / n, q[3] / n, q[0] / n).premultiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1, 0, 0), -Math.PI / 2));
      const pivot = new T.Group(), turn = new T.Group(), tip = new T.Quaternion(), ax = new T.Vector3(1, 0, 0.35).normalize(), HW = [9, -6, 4];
      pivot.add(body); pivot.quaternion.copy(QU); turn.add(pivot); turn.rotation.y = 0.5;
      return { obj: turn, view: [0, 0.22, 1], fill: 1.1, step(dt, a, t) {
        turn.rotation.y += dt * 0.5 * a;
        const ph = t % 4, ang = a * 0.08 * Math.exp(-ph / 0.55) * Math.sin(2 * Math.PI * ph / 0.8);
        tip.setFromAxisAngle(ax, ang); pivot.quaternion.copy(tip).multiply(QU);
        const kick = 1 + 6 * Math.exp(-ph / 0.4);
        wheels.forEach((w, i) => (w.rotation.z += HW[i] * dt * a * kick));
      } };
    };

    /* launch platform (isp-dob): the wave cam rocks the deck, the payload holds its elevation as it does with the observer on */
    const ispModel = (T, gltf) => {
      const root = gltf.scene, mat = whiteMat(T), edge = edgeMat(T), R = Math.PI / 180, EL = 20 * R;
      const deck = root.getObjectByName("ISP_Deck"), cam = root.getObjectByName("ISP_Cam"), pay = root.getObjectByName("ISP_Payload");
      if (!deck || !cam || !pay) throw new Error("model nodes missing");
      root.traverse(o => { if (o.isMesh) { o.material = mat; o.add(new T.LineSegments(new T.EdgesGeometry(o.geometry, 28), edge)); } });
      let ph = 0;
      const pose = a => { const d = a * 7 * R * Math.sin(ph); deck.rotation.x = d; cam.rotation.x = ph; pay.rotation.x = -EL - d; };
      pose(0);
      const g = new T.Group(); g.add(root);
      return { obj: g, view: [1, 0.52, 0.72], fill: 0.85, step(dt, a) { ph += dt * 2.4 * a; pose(a); } };
    };

    /* four-wheel-drive car (torque vectoring): weaves through an S-curve, body rolls, outer wheels turn faster */
    const carModel = T => {
      const mat = whiteMat(T), edge = edgeMat(T), car = new T.Group(), body = new T.Group(), wheels = [];
      const box = (w, h, d, x, y, z, parent) => {
        const g = new T.BoxGeometry(w, h, d), m = new T.Mesh(g, mat);
        m.position.set(x, y, z); m.add(new T.LineSegments(new T.EdgesGeometry(g), edge)); parent.add(m); return m;
      };
      box(2.0, 0.3, 1.0, 0, 0.43, 0, body);          // chassis
      box(0.95, 0.3, 0.82, -0.12, 0.73, 0, body);    // cabin
      box(0.22, 0.05, 1.02, -0.92, 0.68, 0, body);   // rear wing
      car.add(body);
      const wg = new T.CylinderGeometry(0.22, 0.22, 0.18, 28); wg.rotateX(Math.PI / 2);
      [[0.68, 0.56], [0.68, -0.56], [-0.68, 0.56], [-0.68, -0.56]].forEach(([x, z]) => {
        const w = new T.Mesh(wg, mat); w.position.set(x, 0.22, z); w.userData.side = Math.sign(z);
        w.add(new T.LineSegments(new T.EdgesGeometry(wg, 30), edge));
        box(0.06, 0.4, 0.2, 0, 0, 0, w);              // spoke, so the spin shows
        car.add(w); wheels.push(w);
      });
      const BASE = -0.55; car.rotation.y = BASE;
      let ph = 0;
      return { obj: car, view: [0.35, 0.5, 1], fill: 0.8, step(dt, a) {
        ph += dt * 1.6 * a;
        car.rotation.y = BASE + a * 0.5 * Math.sin(ph);
        body.rotation.x = -a * 0.07 * Math.cos(ph);
        wheels.forEach(w => (w.rotation.z -= dt * a * 9 * (1 + 0.35 * w.userData.side * Math.cos(ph))));
      } };
    };

    const BUILD = {
      cube: T => fetch(SITE + "cube_dob/models.json").then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(J => cubeModel(T, J)),
      isp: T => new Promise((ok, no) => new T.GLTFLoader().load(SITE + "isp-dob/media/isp.glb", g => { try { ok(ispModel(T, g)); } catch (e) { no(e); } }, undefined, no)),
      car: T => carModel(T)
    };

    const mount = (stage, T, model) => {
      let r;
      try { r = new T.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return; }   // no WebGL: the photo stays
      r.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); r.outputEncoding = T.sRGBEncoding;
      const sc = new T.Scene(), cam = new T.PerspectiveCamera(28, 16 / 9, 0.01, 100);
      sc.add(new T.HemisphereLight(0xffffff, 0x1b3a58, 0.95));
      const key = new T.DirectionalLight(0xffffff, 0.9); key.position.set(3, 6, 4); sc.add(key);
      const fill = new T.DirectionalLight(0xffffff, 0.35); fill.position.set(-4, 2, -3); sc.add(fill);
      sc.add(model.obj);
      const bb = new T.Box3().setFromObject(model.obj), sph = bb.getBoundingSphere(new T.Sphere());
      const grid = new T.GridHelper(sph.radius * 6, 24, 0x8fb3d3, 0x4d7598);
      grid.material.transparent = true; grid.material.opacity = 0.3; grid.position.set(sph.center.x, bb.min.y, sph.center.z); sc.add(grid);
      const dir = new T.Vector3().fromArray(model.view).normalize(), mid = bb.getCenter(new T.Vector3()), v = new T.Vector3();
      const corners = [0, 1, 2, 3, 4, 5, 6, 7].map(i => new T.Vector3(i & 1 ? bb.max.x : bb.min.x, i & 2 ? bb.max.y : bb.min.y, i & 4 ? bb.max.z : bb.min.z));
      const fit = () => {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (!w || !h) return false;
        r.setSize(w, h, false); cam.aspect = w / h;
        // move the camera along the view direction until the model's box fills about `fill` of the frame
        let dist = sph.radius / Math.sin(cam.fov * Math.PI / 360);
        for (let k = 0; k < 4; k++) {
          cam.position.copy(mid).addScaledVector(dir, dist); cam.lookAt(mid);
          cam.near = dist / 50; cam.far = dist * 20; cam.updateProjectionMatrix(); cam.updateMatrixWorld();
          let m = 0; corners.forEach(p => { v.copy(p).project(cam); m = Math.max(m, Math.abs(v.x), Math.abs(v.y)); });
          dist *= m / (model.fill || 0.8);
        }
        cam.position.copy(mid).addScaledVector(dir, dist); cam.lookAt(mid);
        cam.near = dist / 50; cam.far = dist * 20; cam.updateProjectionMatrix();
        return true;
      };
      const draw = () => r.render(sc, cam);
      let a = 0, want = 0, t = 0, last = 0, raf = 0;
      const frame = now => {
        const dt = last ? Math.min(0.05, (now - last) / 1000) : 0; last = now;
        a += (want - a) * Math.min(1, dt * 3);
        if (!want && a < 0.003) a = 0;
        t += dt; model.step(dt, a, t); draw();
        raf = a || want ? requestAnimationFrame(frame) : 0;
      };
      const run = v => {
        if (still) return;
        if (v && !raf && !a) t = 0;            // start each run from rest, so the cube's first knock comes right away
        want = v;
        if (!raf) { last = 0; raf = requestAnimationFrame(frame); }
      };
      let lost = false;
      const show = () => { if (!lost && fit()) { draw(); stage.classList.add("live"); } };
      r.domElement.setAttribute("aria-hidden", "true");
      r.domElement.addEventListener("webglcontextlost", () => { lost = true; stage.classList.remove("live"); });   // the photo shows again
      r.domElement.addEventListener("webglcontextrestored", () => { lost = false; show(); });
      stage.appendChild(r.domElement);
      model.step(0, 0, 0); show();
      if (window.ResizeObserver) new ResizeObserver(show).observe(stage);
      const card = stage.closest(".project");
      if (hover) {
        // runs while the pointer is on the card or it has keyboard focus; read the current state too,
        // since the pointer may already be on the card when the model finishes loading
        let over = card.matches(":hover"), foc = card.matches(":focus");
        const sync = () => run(over || foc ? 1 : 0);
        card.addEventListener("mouseenter", () => { over = true; sync(); });
        card.addEventListener("mouseleave", () => { over = false; sync(); });
        card.addEventListener("focus", () => { foc = true; sync(); });
        card.addEventListener("blur", () => { foc = false; sync(); });
        addEventListener("pageshow", e => { if (e.persisted) { over = card.matches(":hover"); foc = card.matches(":focus"); sync(); } });   // back button
        if (over || foc) sync();
      } else if ("IntersectionObserver" in window) {
        new IntersectionObserver(es => run(es[es.length - 1].isIntersecting ? 1 : 0), { threshold: 0.6 }).observe(stage);   // touch screens: runs while in view
      }
    };

    // GLTFLoader is only needed for the isp model, so its failure must not stop the others
    const start = () => addScript(CDN + "build/three.min.js")
      .then(() => addScript(CDN + "examples/js/loaders/GLTFLoader.js").catch(() => {}))
      .then(() => list.querySelectorAll(".stage").forEach(st => {
        const b = BUILD[st.dataset.model];
        if (b) Promise.resolve().then(() => b(window.THREE)).then(m => mount(st, window.THREE, m))
          .catch(e => console.warn("project model", st.dataset.model, e));   // the photo stays
      }))
      .catch(e => console.warn("three.js", e));
    const wanted = PROJECTS.some(p => BUILD[p.model]) && "WebGLRenderingContext" in window;
    if (!wanted) { /* nothing to draw: keep the photos, skip the download */ }
    else if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); start(); } }, { rootMargin: "600px 0px" });
      io.observe(list);
    } else start();
  }

  /* ---------- director photo: tilts toward the cursor ---------- */
  const portrait = document.querySelector(".director .portrait");
  if (portrait && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    portrait.addEventListener("mousemove", e => {
      const r = portrait.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      portrait.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-6px) scale(1.03)`;
    });
    portrait.addEventListener("mouseleave", () => { portrait.style.transform = ""; });
  }

  /* ---------- research tabs ---------- */
  const tabs = [...document.querySelectorAll(".tab")];
  tabs.forEach(t => t.addEventListener("click", () => tabs.forEach(o => {
    o.setAttribute("aria-selected", o === t); $(o.getAttribute("aria-controls")).hidden = o !== t;
  })));

  /* ---------- copy e-mail ---------- */
  if ($("copyBtn")) $("copyBtn").addEventListener("click", async e => {
    const el = $("mail");
    try { await navigator.clipboard.writeText(el.textContent); e.target.textContent = "Copied"; }
    catch { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); e.target.textContent = "Selected"; }
    setTimeout(() => (e.target.textContent = "Copy"), 1800);
  });

  /* ---------- nav highlight while scrolling the home page ---------- */
  if (page === "home" && "IntersectionObserver" in window) {
    const links = [...document.querySelectorAll(".nav a.l")];
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) links.forEach(l => l.classList.toggle("on", l.dataset.k === en.target.dataset.nav));
    }), { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[data-nav]").forEach(s => io.observe(s));
  }

  /* ---------- hero trace: reference step r(t) and a second-order response y(t) settling onto it ---------- */
  const c = $("trace");
  if (c) {
    const ctx = c.getContext("2d");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const zeta = 0.45, wn = 1.6, wd = wn * Math.sqrt(1 - zeta * zeta), T = 12;
    const y = t => 1 - Math.exp(-zeta * wn * t) * (Math.cos(wd * t) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(wd * t));
    let start = null, W = 0, H = 0;
    const size = () => { const d = devicePixelRatio || 1; W = c.clientWidth; H = c.clientHeight; c.width = W * d; c.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
    const draw = frac => {
      ctx.clearRect(0, 0, W, H);
      const x0 = W * 0.04, x1 = W * 0.98, top = H * 0.18, base = H * 0.92;
      const X = t => x0 + (t / T) * (x1 - x0), Y = v => base - v * (base - top) / 1.35;
      ctx.setLineDash([6, 6]); ctx.strokeStyle = "rgba(47,111,158,0.35)"; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(x0, Y(0)); ctx.lineTo(X(0.6), Y(0)); ctx.lineTo(X(0.6), Y(1)); ctx.lineTo(x1, Y(1)); ctx.stroke();
      ctx.setLineDash([]);
      const g = ctx.createLinearGradient(x0, 0, x1, 0); g.addColorStop(0, "rgba(22,63,99,0.55)"); g.addColorStop(1, "rgba(108,192,230,0.75)");
      ctx.strokeStyle = g; ctx.lineWidth = 2.4; ctx.beginPath();
      const tEnd = T * frac;
      for (let t = 0; t <= tEnd; t += 0.02) { const v = t < 0.6 ? 0 : y(t - 0.6); t === 0 ? ctx.moveTo(X(t), Y(v)) : ctx.lineTo(X(t), Y(v)); }
      ctx.stroke();
      ctx.font = '600 12px "Chakra Petch", sans-serif'; ctx.fillStyle = "rgba(47,111,158,0.6)";
      ctx.fillText("r(t)", x1 - 34, Y(1) - 10);
      if (tEnd > 2.4) ctx.fillText("y(t)", X(2.4), Y(y(1.8)) - 12);
    };
    const loop = ts => { if (!start) start = ts; const f = Math.min(1, (ts - start) / 4200); draw(f); if (f < 1) requestAnimationFrame(loop); };
    size(); addEventListener("resize", () => { size(); draw(1); });
    reduce ? draw(1) : requestAnimationFrame(loop);
  }
})();

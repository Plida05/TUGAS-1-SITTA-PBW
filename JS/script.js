/*LOGIN PAGE SCRIPT*/
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalContent = document.getElementById("modalContent");

  const DUMMY_USERS = [
    { email: "050170901@ut.ac.id", password: "password123" },
    { email: "050170902@ut.ac.id", password: "qwerty456" },
  ];

  // Submit Login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const pwd = document.getElementById("password").value.trim();

    const found = DUMMY_USERS.find(
      (u) => u.email === email && u.password === pwd
    );

    if (!found) {
      alert("Email atau password yang Anda masukkan salah!");
      return;
    }

    alert("Login berhasil! Mengarahkan ke dashboard...");
    window.location.href = "dashboard.html";
  });

  // ===== Modal Logic =====
  const forgotBtn = document.getElementById("forgotBtn");
  const registerBtn = document.getElementById("registerBtn");

  forgotBtn.addEventListener("click", () => {
    showModal(`
      <h3>Lupa Password</h3>
      <p>Masukkan email terdaftar untuk reset password (simulasi).</p>
      <input type='email' placeholder='nama@ut.ac.id'>
      <button onclick='closeModal()' class='btn btn-primary' style='margin-top:10px;'>Kirim</button>
    `);
  });

  registerBtn.addEventListener("click", () => {
    showModal(`
      <h3>Daftar Akun Baru</h3>
      <input type='email' placeholder='Email'>
      <input type='password' placeholder='Password'>
      <button onclick='closeModal()' class='btn btn-primary' style='margin-top:10px;'>Daftar</button>
    `);
  });

  // ===== Fungsi Modal =====
  function showModal(html) {
    modalContent.innerHTML = html;
    modalBackdrop.style.display = "flex";
  }

  window.closeModal = function () {
    modalBackdrop.style.display = "none";
    modalContent.innerHTML = "";
  };

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
});

// === Dashboard sidebar interactions ===
document.addEventListener('DOMContentLoaded', () => {
  // greeting (pakai fungsi jika sudah ada)
  if (typeof showGreeting === 'function') {
    showGreeting(); // jika kamu sudah punya, ini akan mengisi elemen greetingMain dan greetingSidebar
  } else {
    // fallback simple
    const now = new Date();
    const h = now.getHours();
    let g = 'Selamat datang';
    if (h < 11) g = 'Selamat pagi 🌤️';
    else if (h < 15) g = 'Selamat siang ☀️';
    else if (h < 19) g = 'Selamat sore 🌇';
    else g = 'Selamat malam 🌙';
    const gm = document.getElementById('greetingMain');
    const gs = document.getElementById('greetingSidebar');
    if (gm) gm.textContent = g;
    if (gs) gs.textContent = g;
  }

  // Sidebar toggle (mobile)
  const sidebar = document.getElementById('appSidebar');
  const toggle = document.getElementById('sidebarToggle');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  // Nav buttons -> navigate (data-target from buttons)
  document.querySelectorAll('.nav-item[data-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tgt = btn.getAttribute('data-target');
      if (tgt && tgt !== '#') {
        // if target is a relative file in same folder 'halaman', navigate there
        // dashboard.html is in halaman/, so we navigate to that filename directly
        window.location.href = tgt;
      }
    });
  });

  // laporan submenu toggle
  const laporanToggle = document.getElementById('laporanToggle');
  const laporanSub = document.getElementById('laporanSub');
  if (laporanToggle && laporanSub) {
    laporanToggle.addEventListener('click', () => laporanSub.classList.toggle('hidden'));
  }

  // logout (simple simulation)
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // clear session storage if used
      try { sessionStorage.removeItem('sitta_logged_in'); } catch(e){}
      window.location.href = 'index.html';
    });
  }
});

// ===== TRACKING PENGIRIMAN =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("trackingForm");
  const result = document.getElementById("trackingResult");

  // kalau bukan halaman tracking, hentikan
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const noDO = document.getElementById("noDO").value.trim();
    const data = dataTracking[noDO];

    if (!data) {
      result.innerHTML = `
        <h2>Nomor DO Tidak Ditemukan</h2>
        <p>Pastikan kode DO <b>${noDO}</b> sudah benar.</p>
      `;
      result.classList.remove("hidden");
      return;
    }

    // tampilkan hasilnya
    let perjalananHTML = "";
    data.perjalanan.forEach(p => {
      perjalananHTML += `
        <div style="border-left: 3px solid #2196f3; margin:10px 0; padding-left:10px;">
          <small>${p.waktu}</small><br>
          ${p.keterangan}
        </div>
      `;
    });

    result.innerHTML = `
      <h2>Detail Pengiriman</h2>
      <p><b>Nomor DO:</b> ${data.nomorDO}</p>
      <p><b>Nama:</b> ${data.nama}</p>
      <p><b>Status:</b> ${data.status}</p>
      <p><b>Ekspedisi:</b> ${data.ekspedisi}</p>
      <p><b>Tanggal Kirim:</b> ${data.tanggalKirim}</p>
      <p><b>Total:</b> ${data.total}</p>
      <h3>Riwayat Perjalanan:</h3>
      ${perjalananHTML}
    `;

    result.classList.remove("hidden");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#stokTable tbody");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");

  let bahanAjar = [...dataBahanAjar];

  function renderTable(data) {
    tableBody.innerHTML = "";
    if (data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Tidak ada data ditemukan.</td></tr>`;
      return;
    }
    data.forEach(item => {
      const row = `
        <tr>
          <td>${item.kodeLokasi}</td>
          <td>${item.kodeBarang}</td>
          <td>${item.namaBarang}</td>
          <td>${item.jenisBarang}</td>
          <td>${item.edisi}</td>
          <td>${item.stok}</td>
        </tr>
      `;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
  }

  renderTable(bahanAjar);

  // 🔍 Pencarian
  searchInput.addEventListener("keyup", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = bahanAjar.filter(item =>
      item.namaBarang.toLowerCase().includes(keyword) ||
      item.kodeBarang.toLowerCase().includes(keyword)
    );
    renderTable(filtered);
  });

  // 🔽 Pengurutan stok
  sortSelect.addEventListener("change", () => {
    let sorted = [...bahanAjar];
    if (sortSelect.value === "stokDesc") {
      sorted.sort((a, b) => b.stok - a.stok);
    } else if (sortSelect.value === "stokAsc") {
      sorted.sort((a, b) => a.stok - b.stok);
    }
    renderTable(sorted);
  });
});
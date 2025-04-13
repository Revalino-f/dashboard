  // Inisialisasi Supabase
  const supabase = window.supabase.createClient(
    'https://zkkdgqkbdxgnantxccko.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpra2RncWtiZHhnbmFudHhjY2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1MjQyMzcsImV4cCI6MjA2MDEwMDIzN30.y0zeMT8CJNXI96BuxL7TmOCSbzEq3WNbJyaEgjCDBkU'
  );

  document.addEventListener("DOMContentLoaded", async function () {
    const { data, error } = await supabase
      .from('link')
      .select('judul, link');

    if (error) {
      console.error('Error fetching links:', error);
      return;
    }

    const container = document.getElementById("buttons-container");

    data.forEach(item => {
      const div = document.createElement("div");
      
      const button = document.createElement("a");
      button.href = item.link;
      button.textContent = item.judul;
      button.classList.add("btn-get-started");

      div.appendChild(button);
      container.appendChild(div);
    });
  });

  // Blokir trik curang
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      document.body.innerHTML = '<div style="background:black;width:100vw;height:100vh;"></div>';
    } else {
      location.reload();
    }
  });

  Object.defineProperty(window, 'html2canvas', {
    get() {
      alert("Niat curang ya?");
      return undefined;
    }
  });

  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && ['s', 'u', 'p'].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
  });
document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("buttons-container");
            data.links.forEach(link => {
                const div = document.createElement("div");
                div.classList.add("text-center");
                div.setAttribute("data-aos", "zoom-out");
                div.setAttribute("data-aos-delay", "100");
                
                const button = document.createElement("a");
                button.href = link.url;
                button.textContent = link.name;
                button.classList.add("btn-get-started");
                
                div.appendChild(button);
                container.appendChild(div);
            });
        });
});

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      document.body.innerHTML = '<div style="background:black;width:100vw;height:100vh;"></div>';
    } else {
      location.reload(); // atau tampilkan ulang konten
    }
  });

  Object.defineProperty(window, 'html2canvas', {
    get() {
      alert("Niat curang ya?");
      return undefined;
    }
  });
    
  document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && (e.key === 's' || e.key === 'u' || e.key === 'p')) {
    e.preventDefault();
  }
});

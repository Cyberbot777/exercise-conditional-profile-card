import "../style/index.css";

function render(variables = {}) {
  console.log("Current state:", variables);

  // Cover image logic
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover === false) {
    cover = "<div class='cover'></div>";
  }

  // Social icons
  let socialLinks = "";
  if (variables.twitter)
    socialLinks += `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`;
  if (variables.github)
    socialLinks += `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`;
  if (variables.linkedin)
    socialLinks += `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`;
  if (variables.instagram)
    socialLinks += `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`;

  // Inject card
  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL}" class="photo" />
      <h1>${variables.name ?? "Richard"} ${variables.lastName ?? ""}</h1>
      <h2>${variables.role ?? "Developer"}</h2>
      <h3>${variables.city ?? "Your City"}, ${variables.country ??
    "Your Country"}</h3>
      <ul class="${variables.socialMediaPosition}">
        ${socialLinks}
      </ul>
    </div>
  `;
}

// Bootcamp boilerplate — leave this as-is
window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/men/42.jpg",
    socialMediaPosition: "position-left",
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: "Richard",
    lastName: "Dev",
    role: "Full Stack Developer",
    country: "USA",
    city: "Chicago"
  };
  render(window.variables);

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("input", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value === "" || this.value === "null"
          ? null
          : this.value === "true"
          ? true
          : this.value === "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values));
    });
  });

  // Toggle dark mode
  const toggleBtn = document.querySelector("#theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }
};

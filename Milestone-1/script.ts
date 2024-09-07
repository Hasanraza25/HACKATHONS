const toggleSkillsBtn = document.querySelector(".toggleBtn") as HTMLButtonElement;
const skillsSection = document.querySelector(".skills") as HTMLElement;

toggleSkillsBtn.addEventListener("click", () => {
  if (skillsSection.classList.contains("hidden")) {
    skillsSection.classList.remove("hidden");
  } else {
    skillsSection.classList.add("hidden");
  }
});

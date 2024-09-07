"use strict";
const toggleSkillsBtn = document.querySelector(".toggleBtn");
const skillsSection = document.querySelector(".skills");
toggleSkillsBtn.addEventListener("click", () => {
    if (skillsSection.classList.contains("hidden")) {
        skillsSection.classList.remove("hidden");
    }
    else {
        skillsSection.classList.add("hidden");
    }
});

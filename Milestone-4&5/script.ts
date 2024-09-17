// Add event listener to the language input field
document.getElementById("languageInput")?.addEventListener("input", function () {
  const languageInput = document.getElementById("languageInput") as HTMLInputElement;
  const inputText = languageInput.value.trim();

  // Check if the input contains a comma
  if (inputText.includes(",")) {
    // Split the input by commas and remove any empty items
    const languages = inputText.split(",").map(lang => lang.trim()).filter(lang => lang !== "");

    // Add each language to the resume and clear the input field
    languages.forEach(addLanguageToResume);

    // Clear the input field after adding languages
    languageInput.value = "";
  }
});

// Function to add a language to the resume's languages section
function addLanguageToResume(language: string) {
  const languagesList = document.getElementById("languages-list") as HTMLUListElement;

  // Check if the language already exists (to avoid duplicates)
  const existingLanguages = Array.from(languagesList.getElementsByTagName("li")).map(li => li.textContent?.toLowerCase() || "");
  if (!existingLanguages.includes(language.toLowerCase())) {
    // Create a new list item for the language
    const languageItem = document.createElement("li");
    languageItem.textContent = language;

    // Append the new language item to the list in the resume section
    languagesList.appendChild(languageItem);
  }
}

// Event listener for pressing the "Enter" key in the input field
document.getElementById("skillInput")?.addEventListener("keypress", function (event: KeyboardEvent) {
  if (event.key === "Enter") {
    event.preventDefault();
    addSkillFromInput();
  }
});

// Event listener for clicking the "Enter" button
document.getElementById("addSkillBtn")?.addEventListener("click", function () {
  addSkillFromInput();
});

// Function to get the skill input value and add it to the list
function addSkillFromInput() {
  const skillInput = document.getElementById("skillInput") as HTMLInputElement;
  const skill = skillInput.value.trim();

  if (skill) {
    addSkill(skill);
    skillInput.value = ""; // Clear input field after adding the skill
  }
}

// Function to add the skill to the list
function addSkill(skill: string) {
  const skillsList = document.getElementById("skillsList") as HTMLElement;

  const skillItem = document.createElement("div");
  skillItem.classList.add("skill-item");
  skillItem.style.display = "inline-block";
  skillItem.style.padding = "5px 10px";
  skillItem.style.margin = "5px";
  skillItem.style.backgroundColor = "#f1f1f1";
  skillItem.style.borderRadius = "15px";
  skillItem.style.display = "flex";
  skillItem.style.alignItems = "center";

  const skillText = document.createElement("span");
  skillText.textContent = skill;
  skillText.style.marginRight = "8px";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "x";
  removeBtn.style.backgroundColor = "#ff4d4d";
  removeBtn.style.color = "white";
  removeBtn.style.border = "none";
  removeBtn.style.borderRadius = "50%";
  removeBtn.style.width = "20px";
  removeBtn.style.height = "20px";
  removeBtn.style.cursor = "pointer";
  removeBtn.onclick = function () {
    skillsList.removeChild(skillItem);
  };

  skillItem.appendChild(skillText);
  skillItem.appendChild(removeBtn);
  skillsList.appendChild(skillItem);
}

// Image upload functionality
document.getElementById("image-upload")?.addEventListener("change", function (event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target?.files?.[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e: ProgressEvent<FileReader>) {
      const img = document.getElementById("profile-image") as HTMLImageElement;
      if (e.target?.result) {
        img.src = e.target.result as string;
      }
    };

    reader.readAsDataURL(file);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const nameDisplay = document.getElementById("name") as HTMLElement;

  const updateName = () => {
    const firstName = (document.getElementById("first-name") as HTMLInputElement).value.trim();
    const lastName = (document.getElementById("last-name") as HTMLInputElement).value.trim();
    const designation = (document.getElementById("designation") as HTMLInputElement).value.trim();

    nameDisplay.innerHTML = `${firstName} ${lastName}<br /><span>${designation}</span>`;
  };

  document
    .querySelectorAll(".input-field input, .textarea-field textarea")
    .forEach((input) => input.addEventListener("input", updateName));
});

// Contact Info Update
document.addEventListener('DOMContentLoaded', function () {
  const updateContactInfo = () => {
    const mobileNumber = (document.getElementById("mobile-number") as HTMLInputElement).value.trim();
    const email = (document.getElementById("my-email") as HTMLInputElement).value.trim();
    const linkedinProfile = (document.getElementById("linkedin-input") as HTMLInputElement).value.trim();
    const githubProfile = (document.getElementById("github-input") as HTMLInputElement).value.trim();

    const phoneLink = document.getElementById("phone") as HTMLAnchorElement;
    const emailLink = document.getElementById("email") as HTMLAnchorElement;
    const linkedinDisplay = document.getElementById("linkedin-display")?.querySelector('a') as HTMLAnchorElement;
    const githubDisplay = document.getElementById("github-display")?.querySelector('a') as HTMLAnchorElement;

    phoneLink.href = `tel:${mobileNumber}`;
    phoneLink.textContent = mobileNumber || "Mobile Number";

    emailLink.href = `mailto:${email}`;
    emailLink.textContent = email || "Email Address";

    linkedinDisplay.href = linkedinProfile || 'https://www.linkedin.com/in/your-profile';
    linkedinDisplay.textContent = linkedinProfile || 'LinkedIn Profile';

    githubDisplay.href = githubProfile || 'https://github.com/your-profile';
    githubDisplay.textContent = githubProfile || 'GitHub Profile';
  };

  // Add event listeners to input fields
  document.getElementById('linkedin-input')?.addEventListener('input', updateContactInfo);
  document.getElementById('github-input')?.addEventListener('input', updateContactInfo);
  document.getElementById('mobile-number')?.addEventListener('input', updateContactInfo);
  document.getElementById('my-email')?.addEventListener('input', updateContactInfo);
});

// Skill Management
const skillInput = document.getElementById("skillInput") as HTMLInputElement;
const skillsList = document.getElementById("skillsList") as HTMLElement;
const resumeSkillsList = document.getElementById("skills-list") as HTMLUListElement;

// Function to update resume skills
function updateResumeSkills() {
  resumeSkillsList.innerHTML = "";
  const skills = skillsList.querySelectorAll(".skill-item");
  skills.forEach((skill) => {
    const li = document.createElement("li");
    li.textContent = skill.textContent?.replace("×", "").trim() || "";
    resumeSkillsList.appendChild(li);
  });
}

// Event listener for input
skillInput.addEventListener("keypress", (e: KeyboardEvent) => {
  if (e.key === "Enter" && skillInput.value.trim() !== "") {
    addSkill(skillInput.value.trim());
    skillInput.value = "";
    e.preventDefault(); // Prevent form submission or other actions
  }
});

interface EducationEntry {
  institutionName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
}

interface ExperienceEntry {
  companyName: string;
  jobTitle: string;
  fieldOfWork: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
}

interface ProjectEntry {
  title: string;
  description: string;
  link: string;
}

let educationEntries: EducationEntry[] = [];
let experienceEntries: ExperienceEntry[] = [];
let projectEntries: ProjectEntry[] = [];

// Function to update the resume section immediately
function updateResume(): void {
  const educationList = document.getElementById("education-list") as HTMLElement;

  // Clear the current education list
  educationList.innerHTML = "";

  // Add each entry to the education list
  educationEntries.forEach((entry) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <i class="fa fa-graduation-cap" aria-hidden="true"></i>
      <strong>${entry.institutionName}</strong> – ${entry.degree} in ${entry.fieldOfStudy} |
      <em>${entry.startDate} - ${entry.endDate}</em> | Grade: ${entry.grade}
    `;

    educationList.appendChild(listItem);
  });

  // Show the remove button if there are any entries
  const removeBtn = document.getElementById("removeEducationBtn") as HTMLElement;
  removeBtn.style.display = educationEntries.length > 0 ? "block" : "none";
}

// Function to handle form submission and add new education entry
function addEducation(): void {
  const institutionName = (document.getElementById("institution-name") as HTMLInputElement).value.trim();
  const degree = (document.getElementById("degree") as HTMLInputElement).value.trim();
  const fieldOfStudy = (document.getElementById("field-of-study") as HTMLInputElement).value.trim();
  const startDate = (document.getElementById("start-date") as HTMLInputElement).value;
  const endDate = (document.getElementById("end-date") as HTMLInputElement).value;
  const grade = (document.getElementById("grade") as HTMLInputElement).value.trim();

  // Validate inputs
  if (institutionName && degree && fieldOfStudy && startDate && endDate && grade) {
    const entry: EducationEntry = {
      institutionName,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      grade,
    };

    // Add new entry to the array
    educationEntries.push(entry);

    // Update the resume display
    updateResume();

    // Clear input fields
    (document.getElementById("institution-name") as HTMLInputElement).value = "";
    (document.getElementById("degree") as HTMLInputElement).value = "";
    (document.getElementById("field-of-study") as HTMLInputElement).value = "";
    (document.getElementById("start-date") as HTMLInputElement).value = "";
    (document.getElementById("end-date") as HTMLInputElement).value = "";
    (document.getElementById("grade") as HTMLInputElement).value = "";
  } else {
    alert("Please fill in all fields.");
  }
}

// Function to remove the last education entry
function removeLastEducation(): void {
  if (educationEntries.length > 0) {
    educationEntries.pop(); // Remove the last entry from the array
    updateResume(); // Update the resume to reflect the change
  } else {
    alert("No education entries to remove.");
  }
}

// Add event listeners for education buttons
document.getElementById("addEducationBtn")?.addEventListener("click", addEducation);
document.getElementById("removeEducationBtn")?.addEventListener("click", removeLastEducation);

// Add event listeners to update resume dynamically on input fields
const educationInputs = document.querySelectorAll("#educationFields input");
educationInputs.forEach((input) => {
  input.addEventListener("input", updateResume);
});

// Update Name Section
document.addEventListener("DOMContentLoaded", () => {
  const dobResume = document.getElementById("dob-resume") as HTMLElement;
  const religionResume = document.getElementById("religion-resume") as HTMLElement;
  const nationalityResume = document.getElementById("nationality-resume") as HTMLElement;
  const addressText = document.getElementById("address") as HTMLElement;

  const updateName = () => {
    const dob = (document.getElementById("dob") as HTMLInputElement).value.trim();
    const religion = (document.getElementById("religion") as HTMLInputElement).value.trim();
    const nationality = (document.getElementById("nationality") as HTMLInputElement).value.trim();
    const address = (document.getElementById("my-address") as HTMLInputElement).value.trim();

    dobResume.innerHTML = `${dob}`;
    religionResume.innerHTML = `${religion}`;
    nationalityResume.innerHTML = `${nationality}`;
    addressText.innerHTML = `${address}`;
  };

  document.querySelectorAll(".input-field input, .textarea-field textarea").forEach((input) => {
    input.addEventListener("input", updateName);
  });
});

// Function to update the resume with experience entries
function updateExperience(): void {
  const experienceList = document.getElementById("experience-list") as HTMLElement;

  // Clear the current experience list
  experienceList.innerHTML = "";

  experienceEntries.forEach((entry) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <strong>${entry.jobTitle}</strong> at <a href="#">${entry.companyName}</a><br />
      <em>${entry.startDate} - ${entry.endDate}</em><br />
      ${entry.fieldOfWork}<br />
      Responsibilities: ${entry.responsibilities}
    `;

    experienceList.appendChild(listItem);
  });

  const removeBtn = document.getElementById("removeExperienceBtn") as HTMLElement;
  removeBtn.style.display = experienceEntries.length > 0 ? "block" : "none";
}

// Function to handle form submission and add a new experience entry
function addExperience(): void {
  const companyName = (document.getElementById("company-name") as HTMLInputElement).value.trim();
  const jobTitle = (document.getElementById("job-title") as HTMLInputElement).value.trim();
  const fieldOfWork = (document.getElementById("field-of-work") as HTMLInputElement).value.trim();
  const startDate = (document.getElementById("start-date-exp") as HTMLInputElement).value;
  const endDate = (document.getElementById("end-date-exp") as HTMLInputElement).value.trim();
  const responsibilities = (document.getElementById("responsibilities") as HTMLInputElement).value.trim();

  // Validate inputs
  if (companyName && jobTitle && fieldOfWork && startDate && endDate && responsibilities) {
    const entry: ExperienceEntry = {
      companyName,
      jobTitle,
      fieldOfWork,
      startDate,
      endDate: endDate === "" ? "Present" : endDate,
      responsibilities,
    };

    experienceEntries.push(entry);

    updateExperience();

    (document.getElementById("company-name") as HTMLInputElement).value = "";
    (document.getElementById("job-title") as HTMLInputElement).value = "";
    (document.getElementById("field-of-work") as HTMLInputElement).value = "";
    (document.getElementById("start-date-exp") as HTMLInputElement).value = "";
    (document.getElementById("end-date-exp") as HTMLInputElement).value = "";
    (document.getElementById("responsibilities") as HTMLInputElement).value = "";
  } else {
    alert("Please fill in all fields.");
  }
}

// Function to remove the last experience entry
function removeLastExperience(): void {
  if (experienceEntries.length > 0) {
    experienceEntries.pop();
    updateExperience();
  } else {
    alert("No experience entries to remove.");
  }
}

// Add event listeners for experience buttons
document.getElementById("addExperienceBtn")?.addEventListener("click", addExperience);
document.getElementById("removeExperienceBtn")?.addEventListener("click", removeLastExperience);

// Add event listeners to update experience dynamically
const experienceInputs = document.querySelectorAll("#experienceFields input");
experienceInputs.forEach((input) => {
  input.addEventListener("input", updateExperience);
});

// Function to update the resume with project entries
function updateProjects(): void {
  const projectList = document.getElementById("projects-list") as HTMLElement;

  projectList.innerHTML = "";

  projectEntries.forEach((entry) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <strong>${entry.title}</strong> – ${entry.description}<br />
      <a href="${entry.link}" target="_blank">View Project</a>
    `;

    projectList.appendChild(listItem);
  });

  const removeBtn = document.getElementById("removeProjectBtn") as HTMLElement;
  removeBtn.style.display = projectEntries.length > 0 ? "block" : "none";
}

// Function to add a new project entry
function addProject(): void {
  const title = (document.querySelector("#projectFields input[placeholder='Enter the project title']") as HTMLInputElement).value.trim();
  const description = (document.querySelector("#projectFields input[placeholder='Enter a brief description']") as HTMLInputElement).value.trim();
  const link = (document.querySelector("#projectFields input[placeholder='Enter the project link']") as HTMLInputElement).value.trim();

  if (title && description && link) {
    const entry: ProjectEntry = {
      title,
      description,
      link,
    };

    projectEntries.push(entry);

    updateProjects();

    (document.querySelector("#projectFields input[placeholder='Enter the project title']") as HTMLInputElement).value = "";
    (document.querySelector("#projectFields input[placeholder='Enter a brief description']") as HTMLInputElement).value = "";
    (document.querySelector("#projectFields input[placeholder='Enter the project link']") as HTMLInputElement).value = "";
  } else {
    alert("Please fill in all fields.");
  }
}

// Function to remove the last project entry
function removeLastProject(): void {
  if (projectEntries.length > 0) {
    projectEntries.pop();
    updateProjects();
  } else {
    alert("No project entries to remove.");
  }
}

// Add event listeners for project buttons
document.getElementById("addProjectBtn")?.addEventListener("click", addProject);
document.getElementById("removeProjectBtn")?.addEventListener("click", removeLastProject);

// Add event listeners to update project dynamically
const projectInputs = document.querySelectorAll("#projectFields input");
projectInputs.forEach((input) =>{
  input.addEventListener("input", updateProjects);
});

// Populate profile image
function populateProfileImage(): void {
  const imageDataURL = sessionStorage.getItem("profileImage");
  if (imageDataURL) {
    (document.getElementById("profile-image") as HTMLImageElement).src = imageDataURL;
  }
}

// Call the function to populate the profile image when the page loads
document.addEventListener("DOMContentLoaded", populateProfileImage);
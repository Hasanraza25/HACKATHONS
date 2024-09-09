// Add event listener to the language input field
document
  .getElementById("languageInput")?.addEventListener("keypress", function (event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default form submission

      const languageInput = document.getElementById("languageInput") as HTMLInputElement;
      const language = languageInput.value.trim();

      // Add language if input is not empty
      if (language) {
        addLanguageToResume(language); // Add to dynamic resume section
        languageInput.value = ""; // Clear the input field
      }
    }
  });

// Function to add a language to the resume's languages section
function addLanguageToResume(language: string): void {
  const languagesList = document.getElementById("languages-list") as HTMLUListElement;

  // Create a new list item for the language
  const languageItem = document.createElement("li");
  languageItem.textContent = language;

  // Append the new language item to the list in the resume section
  languagesList.appendChild(languageItem);
}

// Add event listener to the skill input field
document
  .getElementById("skillInput")?.addEventListener("keypress", function (event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();

      const skillInput = document.getElementById("skillInput") as HTMLInputElement;
      const skill = skillInput.value.trim();

      if (skill) {
        addSkill(skill);
        skillInput.value = "";
      }
    }
  });

// Function to add a skill
function addSkill(skill: string): void {
  const skillsList = document.getElementById("skillsList") as HTMLDivElement;

  const skillItem = document.createElement("div");
  skillItem.classList.add("skill-item");

  const skillText = document.createElement("span");
  skillText.textContent = skill;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "x";
  removeBtn.classList.add("remove-btn");
  removeBtn.onclick = function () {
    skillsList.removeChild(skillItem);
  };

  skillItem.appendChild(skillText);
  skillItem.appendChild(removeBtn);
  skillsList.appendChild(skillItem);
}

// Image upload event listener
document
  .getElementById("image-upload")?.addEventListener("change", function (event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const img = document.getElementById("profile-image") as HTMLImageElement;
        if (e.target && e.target.result) {
          img.src = e.target.result as string;
        }
      };

      reader.readAsDataURL(file);
    }
  });

// Update name and designation event listeners
document.addEventListener("DOMContentLoaded", () => {
  const nameDisplay = document.getElementById("name") as HTMLDivElement;

  const updateName = () => {
    const firstName = (document.getElementById("first-name") as HTMLInputElement).value.trim();
    const lastName = (document.getElementById("last-name") as HTMLInputElement).value.trim();
    const designation = (document.getElementById("designation") as HTMLInputElement).value.trim();

    nameDisplay.innerHTML = `${firstName} ${lastName}<br /><span>${designation}</span>`;
  };

  document
    .querySelectorAll<HTMLInputElement>(".input-field input, .textarea-field textarea")
    .forEach((input) => input.addEventListener("input", updateName));
});

document.addEventListener('DOMContentLoaded', function () {
  const updateContactInfo = (): void => {
    const mobileNumber = (document.getElementById("mobile-number") as HTMLInputElement).value.trim();
    const email = (document.getElementById("my-email") as HTMLInputElement).value.trim();
    const linkedinProfile = (document.getElementById("linkedin-input") as HTMLInputElement).value.trim();
    const githubProfile = (document.getElementById("github-input") as HTMLInputElement).value.trim();

    // Get references to the elements to be updated
    const phoneLink = document.getElementById("phone") as HTMLAnchorElement;
    const emailLink = document.getElementById("email") as HTMLAnchorElement;
    const linkedinDisplay = document.querySelector("#linkedin-display a") as HTMLAnchorElement;
    const githubDisplay = document.querySelector("#github-display a") as HTMLAnchorElement;

    // Update the href attributes and text content
    phoneLink.href = `tel:${mobileNumber}`;
    phoneLink.textContent = mobileNumber || "Mobile Number";

    emailLink.href = `mailto:${email}`;
    emailLink.textContent = email || "Email Address";

    linkedinDisplay.href = linkedinProfile || 'https://www.linkedin.com/in/your-profile';
    linkedinDisplay.textContent = linkedinProfile ? linkedinProfile : 'LinkedIn Profile';

    githubDisplay.href = githubProfile || 'https://github.com/your-profile';
    githubDisplay.textContent = githubProfile ? githubProfile : 'GitHub Profile';
  };

  // Add event listeners to input fields
  document.getElementById('linkedin-input')?.addEventListener('input', updateContactInfo);
  document.getElementById('github-input')?.addEventListener('input', updateContactInfo);
  document.getElementById('mobile-number')?.addEventListener('input', updateContactInfo);
  document.getElementById('my-email')?.addEventListener('input', updateContactInfo);
});

// Select elements
const skillInput = document.getElementById("skillInput") as HTMLInputElement;
const skillsList = document.getElementById("skillsList") as HTMLDivElement;
const resumeSkillsList = document.getElementById("skills-list") as HTMLUListElement;

// Function to add a skill
function addSkill(skill: string): void {
  // Create skill item
  const skillItem = document.createElement("div");
  skillItem.className = "skill-item";
  skillItem.textContent = skill;

  // Create remove button
  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "×";
  removeBtn.onclick = (): void => {
    skillItem.remove();
    updateResumeSkills();
  };

  skillItem.appendChild(removeBtn);
  skillsList.appendChild(skillItem);

  // Update resume skills
  updateResumeSkills();
}

// Function to update resume skills
function updateResumeSkills(): void {
  resumeSkillsList.innerHTML = "";
  const skills = skillsList.querySelectorAll(".skill-item");

  skills.forEach((skill: Element) => {
    const li = document.createElement("li");
    li.textContent = skill.textContent?.replace("×", "").trim() || "";
    resumeSkillsList.appendChild(li);
  });
}

// Event listener for input
skillInput.addEventListener("keypress", (e: KeyboardEvent): void => {
  if (e.key === "Enter" && skillInput.value.trim() !== "") {
    addSkill(skillInput.value.trim());
    skillInput.value = "";
    e.preventDefault(); // Prevent form submission or other actions
  }
});

// Array to keep track of education entries
interface EducationEntry {
  institutionName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
}

let educationEntries: EducationEntry[] = [];

// Function to update the resume section immediately
function updateResume(): void {
  const educationList = document.getElementById("education-list") as HTMLUListElement;

  // Clear the current education list
  educationList.innerHTML = "";

  // Add each entry to the education list
  educationEntries.forEach((entry: EducationEntry) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <i class="fa fa-graduation-cap" aria-hidden="true"></i>
      <strong>${entry.institutionName}</strong> – ${entry.degree} in ${entry.fieldOfStudy} |
      <em>${entry.startDate} - ${entry.endDate}</em> | Grade: ${entry.grade}
    `;

    educationList.appendChild(listItem);
  });
}

// Define types for education and experience entries
interface EducationEntry {
  institutionName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
}

interface ExperienceEntry {
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  fieldOfWork: string;
  responsibilities: string;
}

// Initialize arrays to store education and experience entries
let educationEntries: EducationEntry[] = [];
let experienceEntries: ExperienceEntry[] = [];

// Function to update the resume section with education entries
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
  (document.getElementById("removeEducationBtn") as HTMLElement).style.display =
    educationEntries.length > 0 ? "block" : "none";
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

// Add event listener to the "Add More Education" button
(document.getElementById("addEducationBtn") as HTMLElement).addEventListener("click", addEducation);

// Add event listener to the "Remove Last Education" button
(document.getElementById("removeEducationBtn") as HTMLElement).addEventListener("click", removeLastEducation);

// Add event listeners to the input fields to update resume dynamically
const educationInputs = document.querySelectorAll("#educationFields input");
educationInputs.forEach((input) => {
  input.addEventListener("input", updateResume);
});

// Update name, date of birth, religion, nationality, and address fields in the resume
document.addEventListener("DOMContentLoaded", () => {
  const dobResume = document.getElementById("dob-resume") as HTMLElement;
  const religionResume = document.getElementById("religion-resume") as HTMLElement;
  const nationalityResume = document.getElementById("nationality-resume") as HTMLElement;
  const addressText = document.getElementById("address") as HTMLElement;

  const updateName = (): void => {
    const dob = (document.getElementById("dob") as HTMLInputElement).value.trim();
    const religion = (document.getElementById("religion") as HTMLInputElement).value.trim();
    const nationality = (document.getElementById("nationality") as HTMLInputElement).value.trim();
    const address = (document.getElementById("my-address") as HTMLTextAreaElement).value.trim();

    dobResume.innerHTML = `${dob}`;
    religionResume.innerHTML = `${religion}`;
    nationalityResume.innerHTML = `${nationality}`;
    addressText.innerHTML = `${address}`;
  };

  document.querySelectorAll(".input-field input, .textarea-field textarea").forEach((input) => {
    input.addEventListener("input", updateName);
  });
});

// Function to update the resume section with experience entries
function updateExperience(): void {
  const experienceList = document.getElementById("experience-list") as HTMLElement;

  // Clear the current experience list
  experienceList.innerHTML = "";

  // Add each entry to the experience list
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

  // Show the remove button if there are any entries
  (document.getElementById("removeExperienceBtn") as HTMLElement).style.display =
    experienceEntries.length > 0 ? "block" : "none";
}
// Define the structure of an experience entry
interface ExperienceEntry {
  companyName: string;
  jobTitle: string;
  fieldOfWork: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
}

// Define the structure of a project entry
interface ProjectEntry {
  title: string;
  description: string;
  link: string;
}

// Array to keep track of experience entries
let experienceEntries: ExperienceEntry[] = [];

// Function to handle form submission and add new experience entry
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

    // Add new entry to the array
    experienceEntries.push(entry);

    // Update the experience display
    updateExperience();

    // Clear input fields
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
    experienceEntries.pop(); // Remove the last entry from the array
    updateExperience(); // Update the resume to reflect the change
  } else {
    alert("No experience entries to remove.");
  }
}

// Add event listener to the "Add More Experience" button
document.getElementById("addExperienceBtn")?.addEventListener("click", addExperience);

// Add event listener to the "Remove Last Experience" button
document.getElementById("removeExperienceBtn")?.addEventListener("click", removeLastExperience);

// Add event listeners to the input fields to update experience dynamically
const experienceInputs = document.querySelectorAll<HTMLInputElement>("#experienceFields input");
experienceInputs.forEach((input) => {
  input.addEventListener("input", updateExperience);
});

// Array to keep track of project entries
let projectEntries: ProjectEntry[] = [];

// Function to update the project section immediately
function updateProjects(): void {
  const projectList = document.getElementById("projects-list") as HTMLElement;

  // Clear the current project list
  projectList.innerHTML = "";

  // Add each project entry to the project list
  projectEntries.forEach((entry) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <strong>${entry.title}</strong> – ${entry.description}<br />
      <a href="${entry.link}" target="_blank">View Project</a>
    `;

    projectList.appendChild(listItem);
  });

  // Show the remove button if there are any entries
  document.getElementById("removeProjectBtn")!.style.display =
    projectEntries.length > 0 ? "block" : "none";
}

// Function to handle form submission and add new project entry
function addProject(): void {
  const title = (document.querySelector("#projectFields input[placeholder='Enter the project title']") as HTMLInputElement).value.trim();
  const description = (document.querySelector("#projectFields input[placeholder='Enter a brief description']") as HTMLInputElement).value.trim();
  const link = (document.querySelector("#projectFields input[placeholder='Enter the project link']") as HTMLInputElement).value.trim();

  // Validate inputs
  if (title && description && link) {
    const entry: ProjectEntry = {
      title,
      description,
      link,
    };

    // Add new entry to the array
    projectEntries.push(entry);

    // Update the project display
    updateProjects();

    // Clear input fields
    (document.querySelector("#projectFields input[placeholder='Enter the project title']") as HTMLInputElement).value = "";
    (document.querySelector("#projectFields input[placeholder='Enter a brief description']") as HTMLInputElement).value = "";
    (document.querySelector("#projectFields input[placeholder='Enter the project link']") as HTMLInputElement).value = "";
  } else {
    alert("Please fill in all fields.");
  }
}

// Add event listener to the "Add More Project" button
document.getElementById("addProjectBtn")?.addEventListener("click", addProject);

// Add event listener to the "Remove Last Project" button
document.getElementById("removeProjectBtn")?.addEventListener("click", () => {
  if (projectEntries.length > 0) {
    projectEntries.pop(); // Remove the last project
    updateProjects(); // Update the project display
  } else {
    alert("No project entries to remove.");
  }
});

// Define the structure of a project entry
interface ProjectEntry {
  title: string;
  description: string;
  link: string;
}
// Define the structure of a project entry
interface ProjectEntry {
  title: string;
  description: string;
  link: string;
}

// Array to keep track of project entries
let projectEntries: ProjectEntry[] = [];

// Function to remove the last project entry
function removeLastProject(): void {
  if (projectEntries.length > 0) {
    projectEntries.pop(); // Remove the last entry from the array
    updateProjects(); // Update the project list to reflect the change
  } else {
    alert("No project entries to remove.");
  }
}

// Function to handle form submission and add new project entry
function addProject(): void {
  // Placeholder for the actual implementation
}

// Function to update the project list dynamically
function updateProjects(): void {
  // Placeholder for the actual implementation
}

// Add event listener to the "Add Project" button
document.getElementById("addProjectBtn")?.addEventListener("click", addProject);

// Add event listener to the "Remove Last Project" button
document.getElementById("removeProjectBtn")?.addEventListener("click", removeLastProject);

// Add event listeners to the input fields to update project list dynamically
const projectInputs = document.querySelectorAll<HTMLInputElement>("#projectFields input");
projectInputs.forEach((input) => {
  input.addEventListener("input", updateProjects);
});

window.onload = function () {
  document.getElementById('printResumeBtn')?.addEventListener("click", () => {
    const resume = document.getElementById('resume');
    console.log(resume);
    console.log(window);
    if (resume) {
      html2pdf().from(resume).save();
    }
  });
}

document.getElementById('downloadResumeBtn')?.addEventListener('click', function () {
  const resumeElement = document.getElementById('resume');
  if (resumeElement) {
    html2canvas(resumeElement, {
      useCORS: true, // This allows cross-origin images to be used
      scale: 2, // This improves the resolution of the generated image
    }).then(function (canvas) {
      const imgData = canvas.toDataURL('image/png'); // Convert canvas to PNG data URL

      // Create a link element
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'resume.png'; // Set the download filename

      // Append link to the body (necessary for Firefox)
      document.body.appendChild(link);
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    }).catch(function (error) {
      console.error('Error generating image:', error);
    });
  }
});

// Add event listener to the language input field
document.getElementById("languageInput").addEventListener("input", function () {
  const languageInput = document.getElementById("languageInput");
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
function addLanguageToResume(language) {
  const languagesList = document.getElementById("languages-list");

  // Check if the language already exists (to avoid duplicates)
  const existingLanguages = Array.from(languagesList.getElementsByTagName("li")).map(li => li.textContent.toLowerCase());
  if (!existingLanguages.includes(language.toLowerCase())) {
    // Create a new list item for the language
    const languageItem = document.createElement("li");
    languageItem.textContent = language;

    // Append the new language item to the list in the resume section
    languagesList.appendChild(languageItem);
  }
}

// Event listener for pressing the "Enter" key in the input field
document.getElementById("skillInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addSkillFromInput();
  }
});

// Event listener for clicking the "Enter" button
document.getElementById("addSkillBtn").addEventListener("click", function (event) {
  event.preventDefault();
  addSkillFromInput();
});

// Function to get the skill input value and add it to the list
function addSkillFromInput() {
  const skillInput = document.getElementById("skillInput");
  const skill = skillInput.value.trim();

  if (skill) {
    addSkill(skill);
    skillInput.value = ""; // Clear input field after adding the skill
  }
}

// Function to add the skill to the list
function addSkill(skill) {
  const skillsList = document.getElementById("skillsList");

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



document
  .getElementById("image-upload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const img = document.getElementById("profile-image");
        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  const nameDisplay = document.getElementById("name");

  const updateName = () => {
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const designation = document.getElementById("designation").value.trim();

    nameDisplay.innerHTML = `${firstName} ${lastName}<br /><span>${designation}</span>`;
  };

  document
    .querySelectorAll(".input-field input, .textarea-field textarea")
    .forEach((input) => input.addEventListener("input", updateName));
});

document.addEventListener('DOMContentLoaded', function() {
  const updateContactInfo = () => {
      const mobileNumber = document.getElementById("mobile-number").value.trim();
      const email = document.getElementById("my-email").value.trim();
      const linkedinProfile = document.getElementById("linkedin-input").value.trim();
      const githubProfile = document.getElementById("github-input").value.trim();

      // Get references to the elements to be updated
      const phoneLink = document.getElementById("phone");
      const emailLink = document.getElementById("email");
      const linkedinDisplay = document.getElementById("linkedin-display").querySelector('a');
      const githubDisplay = document.getElementById("github-display").querySelector('a');

      // Update the href attributes and text content
      phoneLink.href = `tel:${mobileNumber}`;
      phoneLink.textContent = mobileNumber || "Mobile Number";

      emailLink.href = `mailto:${email}`;
      emailLink.textContent = email || "Email Address";

      linkedinDisplay.href = linkedinProfile || 'https://www.linkedin.com/in/your-profile';
      linkedinDisplay.textContent = `${linkedinProfile}` ? `${linkedinProfile}` : 'LinkedIn Profile';

      githubDisplay.href = githubProfile || 'https://github.com/your-profile';
      githubDisplay.textContent = `${githubProfile}` ? `${githubProfile}` : 'GitHub Profile';
  };

  // Add event listeners to input fields
  document.getElementById('linkedin-input').addEventListener('input', updateContactInfo);
  document.getElementById('github-input').addEventListener('input', updateContactInfo);
  document.getElementById('mobile-number').addEventListener('input', updateContactInfo);
  document.getElementById('my-email').addEventListener('input', updateContactInfo);
});


// Select elements
const skillInput = document.getElementById("skillInput");
const skillsList = document.getElementById("skillsList");
const resumeSkillsList = document.getElementById("skills-list");

// Function to add a skill
function addSkill(skill) {
  // Create skill item
  const skillItem = document.createElement("div");
  skillItem.className = "skill-item";
  skillItem.textContent = skill;

  // Create remove button
  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "×";
  removeBtn.onclick = () => {
    skillItem.remove();
    updateResumeSkills();
  };

  skillItem.appendChild(removeBtn);
  skillsList.appendChild(skillItem);

  // Update resume skills
  updateResumeSkills();
}

// Function to update resume skills
function updateResumeSkills() {
  resumeSkillsList.innerHTML = "";
  const skills = skillsList.querySelectorAll(".skill-item");
  skills.forEach((skill) => {
    const li = document.createElement("li");
    li.textContent = skill.textContent.replace("×", "").trim();
    resumeSkillsList.appendChild(li);
  });
}

// Event listener for input
skillInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && skillInput.value.trim() !== "") {
    addSkill(skillInput.value.trim());
    skillInput.value = "";
    e.preventDefault(); // Prevent form submission or other actions
  }
});

// Array to keep track of education entries
let educationEntries = [];

// Function to update the resume section immediately
function updateResume() {
  const educationList = document.getElementById("education-list");

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
  document.getElementById("removeEducationBtn").style.display =
    educationEntries.length > 0 ? "block" : "none";
}

// Function to handle form submission and add new education entry
function addEducation() {
  const institutionName = document
    .getElementById("institution-name")
    .value.trim();
  const degree = document.getElementById("degree").value.trim();
  const fieldOfStudy = document.getElementById("field-of-study").value.trim();
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const grade = document.getElementById("grade").value.trim();

  // Validate inputs
  if (
    institutionName &&
    degree &&
    fieldOfStudy &&
    startDate &&
    endDate &&
    grade
  ) {
    const entry = {
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
    storeFormDataInSession(); 
    // Clear input fields
    document.getElementById("institution-name").value = "";
    document.getElementById("degree").value = "";
    document.getElementById("field-of-study").value = "";
    document.getElementById("start-date").value = "";
    document.getElementById("end-date").value = "";
    document.getElementById("grade").value = "";
  } else {
    alert("Please fill in all fields.");
  }
}

// Function to remove the last education entry
function removeLastEducation() {
  if (educationEntries.length > 0) {
    educationEntries.pop(); // Remove the last entry from the array
    updateResume(); 
    storeFormDataInSession();
  } else {
    alert("No education entries to remove.");
  }
}

// Add event listener to the "Add More Education" button
document
  .getElementById("addEducationBtn")
  .addEventListener("click", addEducation);

// Add event listener to the "Remove Last Education" button
document
  .getElementById("removeEducationBtn")
  .addEventListener("click", removeLastEducation);

// Add event listeners to the input fields to update resume dynamically
const inputs = document.querySelectorAll("#educationFields input");
inputs.forEach((input) => {
  input.addEventListener("input", updateResume);
});

document.addEventListener("DOMContentLoaded", () => {
  const dobResume = document.getElementById("dob-resume");
  const religionResume = document.getElementById("religion-resume");
  const nationalityResume = document.getElementById("nationality-resume");
  const addressText = document.getElementById("address");

  const updateName = () => {
    const dob = document.getElementById("dob").value.trim();
    const religion = document.getElementById("religion").value.trim();
    const nationality = document.getElementById("nationality").value.trim();
    const address = document.getElementById("my-address").value.trim();

    dobResume.innerHTML = `${dob}`;
    religionResume.innerHTML = `${religion}`;
    nationalityResume.innerHTML = `${nationality}`;
    addressText.innerHTML = `${address}`;
  };

  document
    .querySelectorAll(".input-field input, .textarea-field textarea")
    .forEach((input) => input.addEventListener("input", updateName));
});

// Array to keep track of experience entries
let experienceEntries = [];

// Function to update the resume section immediately
function updateExperience() {
  const experienceList = document.getElementById("experience-list");

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
  document.getElementById("removeExperienceBtn").style.display =
    experienceEntries.length > 0 ? "block" : "none";
}

// Function to handle form submission and add new experience entry
function addExperience() {
  const companyName = document.getElementById("company-name").value.trim();
  const jobTitle = document.getElementById("job-title").value.trim();
  const fieldOfWork = document.getElementById("field-of-work").value.trim();
  const startDate = document.getElementById("start-date-exp").value;
  const endDate = document.getElementById("end-date-exp").value.trim();
  const responsibilities = document.getElementById("responsibilities").value.trim();

  // Validate inputs
  if (companyName && jobTitle && fieldOfWork && startDate && endDate && responsibilities) {
    const entry = {
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
    storeFormDataInSession();
    // Clear input fields
    document.getElementById("company-name").value = "";
    document.getElementById("job-title").value = "";
    document.getElementById("field-of-work").value = "";
    document.getElementById("start-date-exp").value = "";
    document.getElementById("end-date-exp").value = "";
    document.getElementById("responsibilities").value = "";
  } else {
    alert("Please fill in all fields.");
  }
}

// Function to remove the last experience entry
function removeLastExperience() {
  if (experienceEntries.length > 0) {
    experienceEntries.pop(); // Remove the last entry from the array
    updateExperience(); // Update the resume to reflect the change
    storeFormDataInSession();
  } else {
    alert("No experience entries to remove.");
  }
}

// Add event listener to the "Add More Experience" button
document
  .getElementById("addExperienceBtn")
  .addEventListener("click", addExperience);

// Add event listener to the "Remove Last Experience" button
document
  .getElementById("removeExperienceBtn")
  .addEventListener("click", removeLastExperience);

// Add event listeners to the input fields to update experience dynamically
const experienceInputs = document.querySelectorAll("#experienceFields input");
experienceInputs.forEach((input) => {
  input.addEventListener("input", updateExperience);
});

// Array to keep track of project entries
let projectEntries = [];

// Function to update the project section immediately
function updateProjects() {
  const projectList = document.getElementById("projects-list");

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
  document.getElementById("removeProjectBtn").style.display =
    projectEntries.length > 0 ? "block" : "none";
}

// Function to handle form submission and add new project entry
function addProject() {
  const title = document.querySelector("#projectFields input[placeholder='Enter the project title']").value.trim();
  const description = document.querySelector("#projectFields input[placeholder='Enter a brief description']").value.trim();
  const link = document.querySelector("#projectFields input[placeholder='Enter the project link']").value.trim();

  // Validate inputs
  if (title && description && link) {
    const entry = {
      title,
      description,
      link,
    };

    // Add new entry to the array
    projectEntries.push(entry);

    // Update the project display
    updateProjects();
    storeFormDataInSession();
    // Clear input fields
    document.querySelector("#projectFields input[placeholder='Enter the project title']").value = "";
    document.querySelector("#projectFields input[placeholder='Enter a brief description']").value = "";
    document.querySelector("#projectFields input[placeholder='Enter the project link']").value = "";
  } else {
    alert("Please fill in all fields.");
  }
}

// Function to remove the last project entry
function removeLastProject() {
  if (projectEntries.length > 0) {
    projectEntries.pop(); // Remove the last entry from the array
    updateProjects(); // Update the project list to reflect the change
    storeFormDataInSession();
  } else {
    alert("No project entries to remove.");
  }
}

// Add event listener to the "Add Project" button
document.getElementById("addProjectBtn").addEventListener("click", addProject);

// Add event listener to the "Remove Last Project" button
document.getElementById("removeProjectBtn").addEventListener("click", removeLastProject);

// Add event listeners to the input fields to update project list dynamically
const projectInputs = document.querySelectorAll("#projectFields input");
projectInputs.forEach((input) => {
  input.addEventListener("input", updateProjects);
});

window.onload = function(){
  document.getElementById('printResumeBtn')
  .addEventListener("click", ()=>{
    const resume = this.document.getElementById('resume');
    console.log(resume);
    console.log(window);
    html2pdf().from(resume).save();
    
  })
}

document.getElementById('downloadResumeBtn').addEventListener('click', function () {
  // Use html2canvas to capture the resume
  html2canvas(document.getElementById('resume'), {
    useCORS: true, // Allows cross-origin images to be used
    scale: 2 // Improves the resolution of the canvas
  }).then(function (canvas) {
    // Initialize jsPDF
    const { jsPDF } = window.jspdf;

    // Get the canvas as an image
    var imgData = canvas.toDataURL('image/png');

    // Get the actual width and height of the canvas in pixels
    var imgWidth = canvas.width;
    var imgHeight = canvas.height;

    // Convert canvas width/height from pixels to mm for jsPDF
    var pdfWidth = (imgWidth * 25.4) / 96; 
    var pdfHeight = (imgHeight * 25.4) / 96; 

    // Create a PDF of the exact size of the canvas
    var pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);

    // Add the image to the PDF
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Download the PDF
    pdf.save('resume.pdf');
  }).catch(function (error) {
    console.error('Error generating PDF:', error);
  });
});

document.getElementById('downloadResumePngBtn').addEventListener('click', function() {
  html2canvas(document.getElementById('resume'), { 
      useCORS: true, // This allows cross-origin images to be used
      scale: 2 // This improves the resolution of the generated image
  }).then(function(canvas) {
      var imgData = canvas.toDataURL('image/png'); // Convert canvas to PNG data URL
      
      // Create a link element
      var link = document.createElement('a');
      link.href = imgData;
      link.download = 'resume.png'; // Set the download filename
      
      // Append link to the body (necessary for Firefox)
      document.body.appendChild(link);
      link.click();
      
      // Remove the link from the document
      document.body.removeChild(link);
  }).catch(function(error) {
      console.error('Error generating image:', error);
  });
});

// Function to show the form and focus on the first input field
function enableEdit() {
  // Hide the resume and show the form
  document.querySelector("form").style.display = "block"; // Show form

  // Focus on the first form input field ("First Name")
  document.getElementById("first-name").focus(); 
}

// Add event listener to the "Edit Resume" button
document.getElementById("editResumeBtn").addEventListener("click", function () {
  enableEdit(); // Enable editing by focusing on the first form input field
});

// Save form data and profile image in localStorage
document.getElementById("generateShareLinkBtn").addEventListener("click", function () {
  const resumeData = {
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    designation: document.getElementById("designation").value,
    mobileNumber: document.getElementById("mobile-number").value,
    email: document.getElementById("my-email").value,
    linkedinProfile: document.getElementById("linkedin-input").value,
    githubProfile: document.getElementById("github-input").value,
    dob: document.getElementById("dob").value,
    religion: document.getElementById("religion").value,
    nationality: document.getElementById("nationality").value,
    address: document.getElementById("my-address").value,
    profileImage: sessionStorage.getItem("profileImage"),  // Store profile image from sessionStorage
    education: educationEntries,
    experience: experienceEntries,
    projects: projectEntries,
    skills: Array.from(document.querySelectorAll("#skills-list li")).map(li => li.textContent),
    languages: Array.from(document.querySelectorAll("#languages-list li")).map(li => li.textContent)
  };

  // Store everything in localStorage
  localStorage.setItem("resumeData", JSON.stringify(resumeData));

  // Redirect to share.html
  window.location.href = "share.html";
});


// Function to add a skill dynamically
document.getElementById("skillInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const skillInput = document.getElementById("skillInput");
    const skill = skillInput.value.trim();

    if (skill) {
      addSkillToResume(skill);
      skillInput.value = ""; // Clear the input
    }
  }
});

function addSkillToResume(skill) {
  const skillsList = document.getElementById("skillsList");
  const skillItem = document.createElement("li");
  skillItem.textContent = skill;
  skillsList.appendChild(skillItem);
}
// Function to store form data in sessionStorage when the user inputs data
function storeFormDataInSession() {
  const resumeData = {
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    designation: document.getElementById("designation").value,
    mobileNumber: document.getElementById("mobile-number").value,
    email: document.getElementById("my-email").value,
    linkedinProfile: document.getElementById("linkedin-input").value,
    githubProfile: document.getElementById("github-input").value,
    dob: document.getElementById("dob").value,
    religion: document.getElementById("religion").value,
    nationality: document.getElementById("nationality").value,
    address: document.getElementById("my-address").value,

    // Storing education, experience, and project entries
    education: educationEntries, // Assuming this is an array storing education entries
    experience: experienceEntries, // Assuming this is an array storing experience entries
    projects: projectEntries, // Assuming this is an array storing project entries
    skills: Array.from(document.querySelectorAll("#skills-list li")).map(li => li.textContent),
    languages: Array.from(document.querySelectorAll("#languages-list li")).map(li => li.textContent),
  };

  // Store the updated resume data in sessionStorage
  sessionStorage.setItem("resumeData", JSON.stringify(resumeData));

  // Debugging: Check if the data is saved correctly
  console.log("Stored Data:", JSON.parse(sessionStorage.getItem("resumeData")));
}

// Add event listeners to all input fields to save data to sessionStorage as the user types
document.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('input', storeFormDataInSession);
});

// Function to populate the form and resume from sessionStorage
function populateResumeFromSession() {
  const resumeData = JSON.parse(sessionStorage.getItem("resumeData"));

  if (resumeData) {
    // Profile Section
    document.getElementById("name").innerHTML = `${resumeData.firstName} ${resumeData.lastName}`;
    document.getElementById("my-job-title").innerHTML = resumeData.designation || "";

    // Contact Info Section
    document.getElementById("phone").textContent = resumeData.mobileNumber || "Mobile Number";
    document.getElementById("phone").href = `tel:${resumeData.mobileNumber}`;
    document.getElementById("email").textContent = resumeData.email || "Email Address";
    document.getElementById("email").href = `mailto:${resumeData.email}`;
    document.querySelector("#linkedin-display a").textContent = resumeData.linkedinProfile || "LinkedIn Profile";
    document.querySelector("#linkedin-display a").href = `https://www.linkedin.com/in/${resumeData.linkedinProfile}`;
    document.querySelector("#github-display a").textContent = resumeData.githubProfile || "GitHub Profile";
    document.querySelector("#github-display a").href = `https://github.com/${resumeData.githubProfile}`;

     // About Section
     document.getElementById("dob-resume").textContent = resumeData.dob || "";
     document.getElementById("religion-resume").textContent = resumeData.religion || "";
     document.getElementById("nationality-resume").textContent = resumeData.nationality || "";
     document.getElementById("address").textContent = resumeData.address || "";

    // Skills Section
    const skillsList = document.getElementById("skills-list");
    skillsList.innerHTML = ""; // Clear existing skills
    resumeData.skills.forEach(skill => {
      const li = document.createElement("li");
      li.textContent = skill;
      skillsList.appendChild(li);
    });

    // Languages Section
    const languagesList = document.getElementById("languages-list");
    languagesList.innerHTML = ""; 
    resumeData.languages.forEach(language => {
      const li = document.createElement("li");
      li.textContent = language;
      languagesList.appendChild(li);
    });

    // Education Section
    const educationList = document.getElementById("education-list");
    educationList.innerHTML = "";
    resumeData.education.forEach(entry => {
      const li = document.createElement("li");
      li.innerHTML = `<i class="fa fa-graduation-cap" aria-hidden="true"></i>
                      <strong>${entry.institutionName}</strong> – ${entry.degree} in ${entry.fieldOfStudy} |
                      <em>${entry.startDate} - ${entry.endDate}</em> | Grade: ${entry.grade}`;
      educationList.appendChild(li);
    });

    // Experience Section
    const experienceList = document.getElementById("experience-list");
    experienceList.innerHTML = "";
    resumeData.experience.forEach(entry => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${entry.jobTitle}</strong> at ${entry.companyName}<br />
                      <em>${entry.startDate} - ${entry.endDate}</em><br />
                      ${entry.fieldOfWork}<br />Responsibilities: ${entry.responsibilities}`;
      experienceList.appendChild(li);
    });

    // Projects Section
    const projectsList = document.getElementById("projects-list");
    projectsList.innerHTML = "";
    resumeData.projects.forEach(entry => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${entry.title}</strong> – ${entry.description}<br />
                      <a href="${entry.link}" target="_blank">View Project</a>`;
      projectsList.appendChild(li);
    });
  }
}

// Call the function to populate the resume when the page loads
document.addEventListener("DOMContentLoaded", populateResumeFromSession);


function addEducationToForm(entry) {
  document.getElementById("institution-name").value = entry.institutionName || "";
  document.getElementById("degree").value = entry.degree || "";
  document.getElementById("field-of-study").value = entry.fieldOfStudy || "";
  document.getElementById("start-date").value = entry.startDate || "";
  document.getElementById("end-date").value = entry.endDate || "";
  document.getElementById("grade").value = entry.grade || "";
}

function addExperienceToForm(entry) {
  document.getElementById("company-name").value = entry.companyName || "";
  document.getElementById("job-title").value = entry.jobTitle || "";
  document.getElementById("field-of-work").value = entry.fieldOfWork || "";
  document.getElementById("start-date-exp").value = entry.startDate || "";
  document.getElementById("end-date-exp").value = entry.endDate || "";
  document.getElementById("responsibilities").value = entry.responsibilities || "";
}

function addProjectToForm(entry) {
  document.querySelector("#projectFields input[placeholder='Enter the project title']").value = entry.title || "";
  document.querySelector("#projectFields input[placeholder='Enter a brief description']").value = entry.description || "";
  document.querySelector("#projectFields input[placeholder='Enter the project link']").value = entry.link || "";
}

function addEducation() {
  const entry = {
    institutionName: document.getElementById("institution-name").value,
    degree: document.getElementById("degree").value,
    fieldOfStudy: document.getElementById("field-of-study").value,
    startDate: document.getElementById("start-date").value,
    endDate: document.getElementById("end-date").value,
    grade: document.getElementById("grade").value
  };

  // Add entry to the array
  educationEntries.push(entry);
  
  // Update the resume display
  updateResume();
}
// Function to populate the profile image
function populateProfileImage() {
  const imageDataURL = sessionStorage.getItem("profileImage");
  if (imageDataURL) {
    document.getElementById("profile-image").src = imageDataURL;
  }
}

// Call the function to populate the profile image when the page loads
document.addEventListener("DOMContentLoaded", populateProfileImage);

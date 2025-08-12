const projectList = document.getElementById('projectList');
const content = document.getElementById('content');
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const homeLink = document.getElementById('homeLink');

let projectsData = [];
let activeLink = null;  // No active project initially

// Highlight clicked project link
function highlightActive(link) {
  if (activeLink && activeLink !== link) {
    activeLink.classList.remove('active');
  }
  link.classList.add('active');
  activeLink = link;
}

// Show welcome message initially
function loadWelcome() {
  content.innerHTML = `
    <h1>Welcome to My Project Archive</h1>
    <p>Select a project from the left to see details.</p>
  `;
  content.focus();
}

// Fetch project.json and create sidebar links
fetch('project.json')
  .then(response => response.json())
  .then(data => {
    projectsData = data;
    populateSidebar(projectsData);
  })
  .catch(err => {
    console.error('Error loading projects:', err);
    content.innerHTML = '<p>Error loading projects data.</p>';
  });

function populateSidebar(projects) {
  projects.forEach(project => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = project.title;
    a.dataset.projectId = project.id;

    a.addEventListener('click', e => {
      e.preventDefault();
      loadProject(project);
      highlightActive(a);
      closeSidebarOnMobile();
    });

    li.appendChild(a);
    projectList.appendChild(li);
  });
}

function loadProject(project) {
  let html = `<h1>${project.title}</h1>`;
  html += `<p>${project.description}</p>`;

  if (project.images && project.images.length) {
    html += `<div class="project-images">`;
    project.images.forEach(img => {
      html += `<img loading="lazy" src="${img}" alt="${project.title} Image" />`;
    });
    html += `</div>`;
  }

  content.innerHTML = html;
  content.focus();
}

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

homeLink.addEventListener('click', e => {
  e.preventDefault();
  loadWelcome();
  if (activeLink) {
    activeLink.classList.remove('active');
    activeLink = null;
  }
  closeSidebarOnMobile();
});

function closeSidebarOnMobile() {
  if (window.innerWidth <= 768) {
    sidebar.classList.remove('open');
  }
}

window.addEventListener('load', () => {
  loadWelcome();
});

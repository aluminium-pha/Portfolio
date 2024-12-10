let mouseX = -100;
let mouseY = -100;
const textElement = document.getElementById('hero-text'); // Text element for movement
const maxDistance = 150; // Max distance for effects

// Handle click to enlarge/shrink project images
const projects = document.querySelectorAll('.project');

projects.forEach(project => {
  project.addEventListener('click', () => {
    project.classList.toggle('enlarged');

    if (project.classList.contains('enlarged')) {
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      document.body.appendChild(overlay);

      overlay.addEventListener('click', () => {
        project.classList.remove('enlarged');
        document.body.removeChild(overlay);
      });
    }
  });
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    

    const targetId = link.getAttribute('href').slice(1); // Extract section ID
    const targetSection = document.getElementById(targetId);

    // Smooth scroll to section
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: 'smooth',
    });
  });
});

// Scroll animation for section reveal
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));

// Mouse movement for interactive text
window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  const offset = 50;
  const dx = mouseX - (textElement.offsetLeft + textElement.offsetWidth / 2);
  const dy = mouseY - (textElement.offsetTop + textElement.offsetHeight / 2);
  const distance = Math.sqrt(dx * dx + dy * dy);

  const moveX = (dx / distance) * offset;
  const moveY = (dy / distance) * offset;

  textElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Dot grid background
function createDots() {
  const container = document.body;
  const dotSpacing = 30; // Spacing between dots

  // Remove existing dots
  document.querySelectorAll('.dot').forEach(dot => dot.remove());

  // Calculate rows and columns for the grid
  const columns = Math.ceil(window.innerWidth / dotSpacing);
  const rows = Math.ceil(window.innerHeight / dotSpacing);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');

      // Position each dot
      dot.style.left = `${Math.min(col * dotSpacing, window.innerWidth - dotSpacing)}px`;
      dot.style.top = `${Math.min(row * dotSpacing, window.innerHeight - dotSpacing)}px`;
      dot.style.width = `${Math.random() * 5 + 2}px`; // Random size for variation
      dot.style.height = dot.style.width; // Circular dots

      container.appendChild(dot);
    }
  }
}

// Handle resizing for dot layout
window.addEventListener('resize', createDots);
document.addEventListener('DOMContentLoaded', createDots);

// Function to trigger the slider animation
function triggerSlider(content, callback) {
  const slider = document.querySelector('.slider-container');
  const sliderContent = document.querySelector('.slider-content');

  // Set the slider content
  sliderContent.textContent = content;

  // Activate the slider
  slider.classList.add('active');

  // Wait for the animation to complete, then remove the slider
  setTimeout(() => {
    slider.classList.remove('active');
    if (callback) callback(); // Execute callback (e.g., scroll to new section)
  }, 800); // Match this duration to the CSS transition time
}

// Example: Smooth transition between "Projects" and "About Me"
document.querySelector('#to-about-me').addEventListener('click', (e) => {
  e.preventDefault();

  triggerSlider('About Me', () => {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelector('#to-projects').addEventListener('click', (e) => {
  e.preventDefault();

  triggerSlider('Projects', () => {
    const projectsSection = document.getElementById('projects');
    projectsSection.scrollIntoView({ behavior: 'smooth' });
  });
});







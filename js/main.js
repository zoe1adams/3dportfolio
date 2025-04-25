// Wait until the DOM is fully loaded
window.addEventListener('DOMContentLoaded', (event) => {

  // Hide the loader after a 3-second delay (match this with CSS animation duration)
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.style.display = 'none';
  }, 3000);

  // Animate "WORKS" text letter by letter
  const worksTitle = document.querySelector('.works-title');
  const letters = worksTitle.querySelectorAll('span');
  let delay = 0;

  letters.forEach((letter, index) => {
    setTimeout(() => {
      letter.classList.add('fly-away');
    }, delay);
    delay += 300; // Delay for each letter (300ms for each letter)
  });

  // Fade in the works images after "WORKS" letters animation
  const workItems = document.querySelectorAll('.work-item');
  workItems.forEach((item, index) => {
    // Delay the fade-in of each image one after another
    setTimeout(() => {
      item.classList.add('fade-in');
    }, 4000 + index * 500); // Starting after the letters fly away and spacing between images
  });
});

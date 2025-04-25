// Wait for the window to load
window.addEventListener('load', () => {
  // Set up the scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('3d-text').appendChild(renderer.domElement);  // Append the renderer to the DOM

  // Add ambient light and a spotlight for better visibility
  const ambientLight = new THREE.AmbientLight(0x404040, 1); // Ambient light
  scene.add(ambientLight);
  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(50, 50, 50);
  scene.add(spotLight);

  // Load the 3D models (letters)
  const loader = new THREE.GLTFLoader();
  const letters = ['P', 'H', 'O', 'T', 'O', 'G', 'R', 'A', 'P', 'H', 'E', 'R'];
  const models = [];
  let loadedCount = 0;

  letters.forEach((letter, index) => {
    loader.load(`assets/models/${letter}.glb`, (gltf) => {
      const model = gltf.scene;
      model.position.set(index * 4 - 20, Math.sin(index) * 3, 0); // Position each letter in 3D space
      model.scale.set(2, 2, 2); // Scale the model for visibility
      models.push(model);
      scene.add(model);
      loadedCount++;

      // Once all models are loaded, start animating them
      if (loadedCount === letters.length) {
        animate();
      }
    });
  });

  // Camera position
  camera.position.z = 50;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Update the rotation of each letter to create the "bouncing" effect
    models.forEach((model, index) => {
      model.rotation.x += 0.01; // Rotate along x-axis
      model.rotation.y += 0.01; // Rotate along y-axis
      model.position.y = Math.sin(Date.now() * 0.005 + index) * 3; // "Ball pit" bouncing effect
    });

    // Render the scene
    renderer.render(scene, camera);
  }
});

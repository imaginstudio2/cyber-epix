const clickSound = document.getElementById("click-sound");

Array.from(channels).forEach(channel => {
  const name = channel.getElementsByTagName("name")[0].textContent;
  const url = channel.getElementsByTagName("url")[0].textContent;
  const logo = channel.getElementsByTagName("logo")[0].textContent;

  const div = document.createElement("div");
  div.classList.add("radio");
  div.innerHTML = `<img src="${logo}" alt="${name}" /><p>${name}</p>`;

  div.addEventListener("click", () => {
    // Play click sound effect
    clickSound.currentTime = 0;
    clickSound.play().catch(e => console.warn("Sound error:", e.message));

    if (currentPlaying) currentPlaying.classList.remove("playing");
    currentPlaying = div;
    div.classList.add("playing");

    audio.pause();
    audio.src = url;
    audio.load();
    audio.play().catch(e => alert("Play error: " + e.message));
    nowPlaying.textContent = `🎧 Now Listening: ${name}`;

    if (Notification.permission === 'granted') {
      new Notification('📻 DLA Radio', {
        body: `Now Listening: ${name}`,
        icon: logo
      });
    }
  });

  container.appendChild(div);
});

export function initializeAnimationsAndVideo() {
  // Ensure the DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    const imageWrapper = document.querySelector('.image-wrapper');
    const video = document.getElementById('myVideo');

    // Intersection Observer for image animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            imageWrapper.classList.add('animate');
          } else {
            imageWrapper.classList.remove('animate');
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (imageWrapper) {
      observer.observe(imageWrapper);
    }

    // Ensure video plays when it's loaded
    if (video) {
      video.play();
    }
  });

  const hoverVideo = document.getElementById('hoverVideo');

  // Play the video when hovering over it
  if (hoverVideo) {
    hoverVideo.addEventListener('mouseenter', () => {
      hoverVideo.play();
    });
    hoverVideo.addEventListener('mouseleave', () => {
      hoverVideo.pause();
    });
  }
}

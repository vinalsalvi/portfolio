window.onscroll = function () {
    var btn = document.getElementById("scrollTopBtn");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = "block"; // Show button when user scrolls down
    } else {
        btn.style.display = "none"; // Hide button when user is at the top
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
}


document.addEventListener('DOMContentLoaded', function () {
    const offcanvasElement = document.getElementById('offcanvasExample');
    const toggleButton = document.getElementById('navToggleBtn');
    const toggleIcon = toggleButton ? toggleButton.querySelector('.fa') : null; // Get the Font Awesome icon span

    if (offcanvasElement && toggleButton && toggleIcon) {
        // Listen for when the offcanvas is shown
        offcanvasElement.addEventListener('shown.bs.offcanvas', function () {
            // Change icon to 'times' (X)
            toggleIcon.classList.remove('fa-bars');
            toggleIcon.classList.add('fa-times');
            // Update aria-label for accessibility
            toggleButton.setAttribute('aria-label', 'Close navigation');
        });

        // Listen for when the offcanvas is hidden
        offcanvasElement.addEventListener('hidden.bs.offcanvas', function () {
            // Change icon back to 'bars' (hamburger)
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
            // Update aria-label for accessibility
            toggleButton.setAttribute('aria-label', 'Open navigation');
        });
    }

    // --- Multi-line Typing Animation Logic ---
    const staticTextContainer = document.querySelector('.static-text-group');
    const loopingTextContainer = document.querySelector('.looping-text-group');
    const loopingLineElement = document.getElementById('looping-line');

    const staticPhrases = [
        { element: document.getElementById('static-line-1'), text: "Hi, my name is" },
        { element: document.getElementById('static-line-2'), text: "Vinal Salvi" },
        { element: document.getElementById('static-line-3'), text: "I am Software Developer" }
    ];

    const loopingPhrases = [
        "I enjoy creating stuffs",
        "Building intelligent systems with Python",
        "Let's learn from each other.",
    ];

    let staticPhraseIndex = 0;
    let staticCharIndex = 0;
    let loopingPhraseIndex = 0;
    let loopingCharIndex = 0;

    const typingSpeed = 70; // milliseconds per character
    const pauseAfterStaticLine = 100; // milliseconds to pause after typing a static line
    const pauseBeforeErase = 100; // milliseconds to pause after typing a looping line
    const erasingSpeed = 50; // milliseconds per character for erasing a looping line
    const pauseBeforeNextLoop = 1000; // milliseconds to pause after erasing a looping line

    function typeStatic() {
        if (staticPhraseIndex < staticPhrases.length) {
            const currentStatic = staticPhrases[staticPhraseIndex];
            if (staticCharIndex < currentStatic.text.length) {
                currentStatic.element.textContent += currentStatic.text.charAt(staticCharIndex);
                staticCharIndex++;
                setTimeout(typeStatic, typingSpeed);
            } else {
                // Line typed, move to next static line or start looping
                staticCharIndex = 0; // Reset char index for next line
                staticPhraseIndex++;
                if (staticPhraseIndex < staticPhrases.length) {
                    setTimeout(typeStatic, pauseAfterStaticLine);
                } else {
                    // All static lines typed, start looping animation
                    staticTextContainer.classList.remove('typing-active'); // Hide static caret
                    setTimeout(startLoopingAnimation, pauseBeforeNextLoop);
                }
            }
        }
    }

    function typeLooping() {
        if (loopingLineElement) { // Ensure element exists
            const currentLoopingPhrase = loopingPhrases[loopingPhraseIndex];
            loopingTextContainer.classList.add('typing-active'); // Show caret
            if (loopingCharIndex < currentLoopingPhrase.length) {
                loopingLineElement.textContent += currentLoopingPhrase.charAt(loopingCharIndex);
                loopingCharIndex++;
                setTimeout(typeLooping, typingSpeed);
            } else {
                // Phrase typed, now pause and then erase
                loopingTextContainer.classList.remove('typing-active'); // Hide caret
                setTimeout(eraseLooping, pauseBeforeErase);
            }
        }
    }

    function eraseLooping() {
        if (loopingLineElement) { // Ensure element exists
            const currentLoopingPhrase = loopingPhrases[loopingPhraseIndex];
            loopingTextContainer.classList.add('typing-active'); // Show caret during erase
            if (loopingCharIndex > 0) {
                loopingLineElement.textContent = currentLoopingPhrase.substring(0, loopingCharIndex - 1);
                loopingCharIndex--;
                setTimeout(eraseLooping, erasingSpeed);
            } else {
                // Phrase erased, move to next phrase in loop
                loopingPhraseIndex++;
                if (loopingPhraseIndex >= loopingPhrases.length) {
                    loopingPhraseIndex = 0; // Loop back to the first phrase
                }
                loopingTextContainer.classList.remove('typing-active'); // Hide caret
                setTimeout(typeLooping, pauseBeforeNextLoop);
            }
        }
    }

    function startLoopingAnimation() {
        if (loopingTextContainer) {
            typeLooping(); // Start the looping animation
        }
    }

    // Start the static typing animation when the page loads
    if (staticTextContainer) {
        staticTextContainer.classList.add('typing-active'); // Show caret for static typing
        typeStatic();
    }
    // --- End Multi-line Typing Animation Logic ---


    // Animate the entire skills grid container
    gsap.fromTo(".skills-grid",
        { opacity: 0, scale: 1.2 }, // Initial state: transparent and zoomed out (larger)
        {
            opacity: 1,
            scale: 1, // Final state: opaque and normal size
            duration: 1, // Animation duration
            ease: "ease-in-out", // Easing function
            delay: 0.7, // Delay before animation starts
            scrollTrigger: {
                trigger: ".skills-grid",
                start: "top 80%", // When the top of the grid is 80% down from the top of the viewport
                toggleActions: "play none none none", // Play animation once when triggered
                // markers: true // Uncomment for debugging ScrollTrigger
            }
        }
    );
});


// --- GSAP ScrollTrigger Animations for Sections ---
// Hero content fade-in from left
gsap.from(".hero-content-sec", {
    scrollTrigger: ".hero-content-sec",
    opacity: 0,
    x: -100,
    duration: 1.2,
    ease: "power3.out"
});

gsap.from(".hero-content-sec1", {
    scrollTrigger: ".hero-content-sec1",
    opacity: 0,
    x: 100,
    duration: 1.2,
    ease: "power3.out"
});

gsap.from(".img-sec", {
    scrollTrigger: ".img-sec",
    opacity: 0,
    x: -100,
    duration: 1.2,
    ease: "power3.out"
});

// About Section Animations
gsap.fromTo(".about-sec1 .about-content-sec",
    { opacity: 0, y: 50 },
    {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
            trigger: "#about",
            start: "top 75%",
            toggleActions: "play none none none",
        }
    }
);

// Skills Section Animations
gsap.fromTo(".skill-sec1 h2",
    { opacity: 0, y: 50 },
    {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#skills",
            start: "top 80%",
            toggleActions: "play none none none",
        }
    }
);

gsap.fromTo(".skill-sec1 .skill-content-sec",
    { opacity: 0, y: 50 },
    {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
            trigger: "#skills",
            start: "top 75%",
            toggleActions: "play none none none",
        }
    }
);

// Education Section Animations
gsap.fromTo(".education-sec1 h2",
    { opacity: 0, y: 50 },
    {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#Education",
            start: "top 80%",
            toggleActions: "play none none none",
        }
    }
);
gsap.fromTo(".education-sec1 .skill-title-content",
    { opacity: 0, y: 50 },
    {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
            trigger: "#Education",
            start: "top 75%",
            toggleActions: "play none none none",
        }
    }
);

gsap.utils.toArray(".box1").forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 80,
        duration: 0.8,
        ease: "power2.out",
        delay: i * 0.2
    });
});

// Projects Section Animations
gsap.fromTo(".project-sec1 h2",
    { opacity: 0, y: 50 },
    {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#project",
            start: "top 80%",
            toggleActions: "play none none none",
        }
    }
);
gsap.from(".project-card", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.8,
    ease: "power1.out",
    scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 75%",
        toggleActions: "play none none none",
    }
});

// certificate section 

gsap.fromTo(".certificate-sec1 h2",
    { opacity: 0, y: 50 },
    {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#Certificate",
            start: "top 80%",
            toggleActions: "play none none none",
        }
    }
);

gsap.fromTo(".certificate-sec1 p",
    { opacity: 0, y: 50 },
    {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#Certificate",
            start: "top 80%",
            toggleActions: "play none none none",
        }
    }
);

gsap.fromTo(".certificate-grid .certificate-card",
    { opacity: 0, y: 50 },
    {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#Certificate",
            start: "top 80%",
            toggleActions: "play none none none",
        }
    }
);
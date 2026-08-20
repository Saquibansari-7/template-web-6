const seals = document.querySelectorAll(".seal");
const light = document.getElementById("lightBurst");
const couple = document.getElementById("couple");

let opened = false;

seals.forEach(s => s.addEventListener("click", startShow));

/* gentle breathing animation on the seal */
gsap.to(".seal", {
    scale: 1.08,
    duration: 1.4,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    transformOrigin: "50% 50%"
});

/* ---------------- */
/* opening          */
/* ---------------- */

function startShow() {
    if (opened) return;
    opened = true;

    seals.forEach(s => s.style.pointerEvents = "none");
    gsap.killTweensOf(".seal");

    const tl = gsap.timeline();

    tl.to(".seal", {
        scale: 1.4,
        rotation: 15,
        duration: 0.3
    })

        .to(".seal", {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: "back.in(2)"
        })

        .to("#lightBurst", {
            opacity: 1,
            duration: 0.5
        }, "-=0.3")

        .to("#lightBurst", {
            opacity: 0,
            duration: 1.2
        })

        .to("#leftGateD, #leftGateM", {
            x: "-50vw",
            duration: 2.5,
            ease: "power4.inOut"
        }, "-=1")

        .to("#rightGateD, #rightGateM", {
            x: "50vw",
            duration: 2.5,
            ease: "power4.inOut"
        }, "<")

        .to("#couple", {
            opacity: 1,
            duration: 2
        }, "-=3");
}

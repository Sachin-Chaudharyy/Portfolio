document.addEventListener("DOMContentLoaded", () => {
    const navBar = document.getElementById("navBar");
    const links = document.querySelectorAll(".option");
    const menuBtn = document.getElementById("menuBtn");
    const options = document.querySelector(".options");
    const sections = document.querySelectorAll("section");
    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const closeModal = document.getElementById("closeModal");
    const projectViewBtns = document.querySelectorAll(".projectViewBtn");

    // SMOOTH SCROLL
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            const navHeight = navBar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });

    // TYPE EFFECT
    const textArray = [
        "Full Stack Developer",
        "ML Enthusiast",
        "Problem Solver"
    ];

    let index = 0;
    let charIndex = 0;
    const dynamicText = document.querySelector(".dynamic-text");

    function typeEffect() {
        if (charIndex < textArray[index].length) {
            dynamicText.textContent += textArray[index].charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 100);
        } else {
            setTimeout(eraseEffect, 1500);
        }
    }

    function eraseEffect() {
        if (charIndex > 0) {
            dynamicText.textContent = textArray[index].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseEffect, 50);
        } else {
            index = (index + 1) % textArray.length;
            setTimeout(typeEffect, 300);
        }
    }

    typeEffect();

    // HAMBURGER MENU
    menuBtn.addEventListener("click", () => {
        options.classList.toggle("active");

        menuBtn.textContent = options.classList.contains("active") ? "✖" : "☰";
    });

    links.forEach(link => {
        link.addEventListener("click", () => {
            options.classList.remove("active");
            menuBtn.textContent = "☰";
        });
    });

    document.addEventListener("click", (e) => {
        if (!menuBtn.contains(e.target) && !options.contains(e.target)) {
            options.classList.remove("active");
            menuBtn.textContent = "☰";
        }
    });

    // FOR NAV OPTIONS
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const navHeight = navBar.offsetHeight;

            if(window.scrollY >= sectionTop - navHeight - 50){
                current = section.getAttribute("id");
            }
        });

        links.forEach(link => {
            link.classList.remove("active");

            if(link.getAttribute("href") === "#" + current){
                link.classList.add("active");
            }
        });
    });

    const projectData = {
        1: {
            title: "Heart Disease Predictor",
            desc: `
                <h4>Overview</h4>
                <p>ML web app that predicts heart disease risk using user health data.</p>

                <h4>Problem</h4>
                <p>Prediction tools are not easily accessible to common users.</p>

                <h4>Solution</h4>
                <p>Used Logistic Regression model trained on medical dataset for real-time prediction.</p>

                <h4>Tech Stack</h4>
                <p>Python, Scikit-learn, Pandas, Streamlit</p>
            `
        },
        2: {
            title: "Responsive Portfolio",
            desc: `
                <h4>Overview</h4>
                <p>Personal portfolio website showcasing skills and projects.</p>

                <h4>Features</h4>
                <ul>
                    <li>Responsive design</li>
                    <li>Smooth scrolling</li>
                    <li>Interactive UI</li>
                </ul>

                <h4>Tech Stack</h4>
                <p>HTML, CSS, JavaScript</p>
            `
        }
    };

    projectViewBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-project");

            modalTitle.textContent = projectData[id].title;
            modalDesc.innerHTML = projectData[id].desc;

            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    modal.addEventListener("click", (e) => {
        if(e.target === modal){
            modal.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });
});


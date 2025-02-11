let currentStep = 0;

const steps = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3'),
    document.getElementById('summary-step')
];

function showStep(stepIndex) {
    steps.forEach((step, index) => {
        step.style.display = stepIndex === index ? 'block' : 'none';
    });
    currentStep = stepIndex;
}

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentStep < steps.length - 1) showStep(currentStep + 1);
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentStep > 0) showStep(currentStep - 1);
});

showStep(0); // Mostrar primer paso al cargar la página

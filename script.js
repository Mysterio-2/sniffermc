document.addEventListener('DOMContentLoaded', function() {
    // Copy IP functionality with enhanced feedback
    const copyBtn = document.querySelector('.copy-btn');
    const ipBox = document.querySelector('.ip-box');

    copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(ipBox.textContent).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.backgroundColor = '#00ff9d';
            copyBtn.style.borderColor = '#00cc7d';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '';
                copyBtn.style.borderColor = '';
            }, 2000);
        });
    });

    // Animate features on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        observer.observe(card);
    });

    // Particle effect in hero section
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 50; i++) {
        createParticle(hero);
    }

    // Add button click sound effect
    const buttons = document.querySelectorAll('.minecraft-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            playButtonSound();
        });
    });

    // Particle.js configuration for vote page
    if (document.querySelector('.vote-page')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#ffd700', '#ff6b6b', '#4caf50', '#2196f3']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffd700',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Add enhanced particle effects to vote links
    document.querySelectorAll('.vote-link').forEach(link => {
        link.addEventListener('mouseover', () => {
            const particles = link.querySelector('.vote-particles');
            
            // Create multiple particle types
            const particleTypes = ['diamond', 'star', 'circle', 'square'];
            const colors = ['#ffd700', '#ff6b6b', '#4caf50', '#2196f3'];
            
            for (let i = 0; i < 12; i++) {
                const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
                const particle = document.createElement('div');
                particle.className = `particle-${type}`;
                
                // Random position
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                
                // Random movement direction
                const angle = Math.random() * Math.PI * 2;
                const distance = 20 + Math.random() * 30;
                particle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
                particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
                
                // Random delay
                particle.style.animationDelay = Math.random() * 500 + 'ms';
                
                particles.appendChild(particle);
                
                // Remove particle after animation
                setTimeout(() => {
                    particle.remove();
                }, 2000);
            }
        });
        
        // Add click effect
        link.addEventListener('click', () => {
            const particles = link.querySelector('.vote-particles');
            
            // Burst effect
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle-star';
                
                const angle = (i / 20) * Math.PI * 2;
                const distance = 40;
                particle.style.left = '50%';
                particle.style.top = '50%';
                particle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
                particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
                
                particles.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 2000);
            }
        });
    });
});

function createParticle(parent) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(255, 255, 255, 0.5);
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${5 + Math.random() * 10}s linear infinite;
    `;
    parent.appendChild(particle);
}

function playButtonSound() {
    const audio = new Audio('sounds/click.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {}); // Catch and ignore errors if sound can't play
}

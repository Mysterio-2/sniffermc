// Particle Animation for Rules Section
class RulesParticleAnimation {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.setup();
    }

    setup() {
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';
        this.container.style.position = 'relative';
        this.container.appendChild(this.canvas);

        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(52, 152, 219, ${Math.random() * 0.3 + 0.1})`
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Particle Animation for Ranks and Levels Section
class RanksParticleAnimation {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 150;
        this.setup();
    }

    setup() {
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';
        this.container.style.position = 'relative';
        this.container.appendChild(this.canvas);

        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 4 + 1,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                color: `rgba(52, 152, 219, ${Math.random() * 0.4 + 0.1})`,
                opacity: Math.random(),
                opacitySpeed: (Math.random() - 0.5) * 0.02
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Pulsing opacity effect
            particle.opacity += particle.opacitySpeed;
            if (particle.opacity > 1 || particle.opacity < 0) {
                particle.opacitySpeed *= -1;
            }

            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle with dynamic opacity
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(52, 152, 219, ${particle.opacity * 0.4})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Levels Section Functionality
const levelsData = {
    levels: Object.entries({
        '1': {
            name: '&x&f&b&e&2&0&0&lL&x&f&c&c&7&3&a&le&x&f&c&a&b&7&4&lv&x&f&d&9&0&a&d&le&x&f&d&7&4&e&7&ll 1',
            money: 25000,
            info: [
                '&x&e&7&0&0&f&b&lR&x&e&b&1&3&f&8&le&x&e&e&2&7&f&4&lw&x&f&2&3&a&f&1&la&x&f&6&4&d&e&e&lr&x&f&9&6&1&e&a&ld&x&f&d&7&4&e&7&ls:',
                '&8⋅ &x&f&b&e&2&0&0250x Claim Blocks'
            ],
            commands: [
                'lp user %player% parent add 1',
                'acb %player% 250',
                'cmi broadcast &7[&bRanks&7] &6%player% &eadvanced to rank &71'
            ]
        },
        // Add more levels as needed
    }).map(([level, data]) => ({
        level: parseInt(level),
        ...data
    }))
};

function generateLevelGrid() {
    const levelGrid = document.getElementById('level-grid');
    levelGrid.innerHTML = '';

    for (let i = 1; i <= 100; i++) {
        const levelBox = document.createElement('div');
        levelBox.classList.add('level-box');
        levelBox.textContent = i;
        levelBox.dataset.level = i;

        levelBox.addEventListener('click', () => showLevelDetails(i));
        levelGrid.appendChild(levelBox);
    }
}

function showLevelDetails(level) {
    const levelPopup = document.getElementById('level-details-popup');
    const popupContent = document.getElementById('level-details-content');
    
    if (!levelPopup || !popupContent) return;

    const details = levelDetails[level] || {
        money: 'N/A',
        info: ['No specific information']
    };

    const closestLevel = findClosestLevelData(level);

    popupContent.innerHTML = `
        <div class="popup-header">
            <h2>Level ${level}</h2>
            <span class="popup-close">&times;</span>
        </div>
        <div class="popup-body">
            <div class="level-popup-section">
                <h3>Money Required</h3>
                <p>$${details.money.toLocaleString()}</p>
            </div>
            <div class="level-popup-section">
                <h3>Level Info</h3>
                <ul>${details.info.map(info => `<li>${info}</li>`).join('')}</ul>
            </div>
        </div>
    `;

    // Add close functionality
    const closeButton = popupContent.querySelector('.popup-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            levelPopup.style.display = 'none';
        });
    }

    levelPopup.style.display = 'flex';
}

function findClosestLevelData(level) {
    return levelsData.levels.find(l => l.level <= level && l.level === Math.max(...levelsData.levels.filter(x => x.level <= level).map(x => x.level)));
}

function setupLevelSearch() {
    const searchInput = document.getElementById('level-search-input');
    const searchResults = document.getElementById('level-search-results');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = '';

        if (query.length < 2) return;

        const matchingResults = levelsData.levels.filter(levelData => 
            levelData.commands.some(cmd => cmd.toLowerCase().includes(query)) ||
            levelData.info.some(info => info.toLowerCase().includes(query))
        );

        matchingResults.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('search-result-item');
            resultItem.innerHTML = `
                <span class="result-level">Level ${result.level}</span>
                <span class="result-details">${[...result.commands, ...result.info].join(', ')}</span>
            `;
            resultItem.addEventListener('click', () => showLevelDetails(result.level));
            searchResults.appendChild(resultItem);
        });
    });
}

function setupLevelPopupClose() {
    const popup = document.getElementById('level-details-popup');
    const closeButton = document.querySelector('.close-popup');

    closeButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
}

// Initialize Levels Section
document.addEventListener('DOMContentLoaded', () => {
    generateLevelGrid();
    setupLevelSearch();
    setupLevelPopupClose();
});

// Rank Popup Functionality
const rankTiers = document.querySelectorAll('.rank-tier');
const rankPopup = document.getElementById('rank-popup');
const popupRankName = document.getElementById('popup-rank-name');
const popupRankDetails = document.getElementById('popup-rank-details');
const closePopup = document.querySelector('.close-popup');

// Predefined rank details with cumulative commands
const rankDetails = {
    'hunter': {
        commands: [
            '/dispose',
            '/recipe',
            '/seen',
            '/tpahere'
        ]
    },
    'hero': {
        commands: [
            // Hunter commands
            '/dispose',
            '/recipe',
            '/seen',
            '/tpahere',
            
            // Hero specific commands
            '/nick',
            '/hat',
            '/craft',
            '/ptime',
            '/pweather',
            '/AFK [2 Hours]',
            '/Kit Hero [30 Days Cooldown/1 Max Use]'
        ]
    },
    'elite': {
        commands: [
            // Hunter commands
            '/dispose',
            '/recipe',
            '/seen',
            '/tpahere',
            
            // Hero commands
            '/nick',
            '/hat',
            '/craft',
            '/ptime',
            '/pweather',
            '/AFK [2 Hours]',
            '/Kit Hero [30 Days Cooldown/1 Max Use]',
            
            // Elite specific commands
            '/condense [new]',
            '/uncondense [new]',
            '/head [new]',
            '/enderchest [new]',
            '/AFK [3 Hours]',
            '/Kit Elite [30 Days Cooldown/1 Max Use]'
        ]
    },
    'titan': {
        commands: [
            // Hunter commands
            '/dispose',
            '/recipe',
            '/seen',
            '/tpahere',
            
            // Hero commands
            '/nick',
            '/hat',
            '/craft',
            '/ptime',
            '/pweather',
            '/AFK [2 Hours]',
            '/Kit Hero [30 Days Cooldown/1 Max Use]',
            
            // Elite commands
            '/condense [new]',
            '/uncondense [new]',
            '/head [new]',
            '/enderchest [new]',
            '/AFK [3 Hours]',
            '/Kit Elite [30 Days Cooldown/1 Max Use]',
            
            // Titan specific commands
            '/grindstone [new]',
            '/stonecutter [new]',
            '/loom [new]',
            '/cartographytable [new]',
            '/anvil [Virtual Anvil] [new]',
            '/AFK [4 Hours]',
            '/Kit Titan [30 Days Cooldown/1 Max Use]'
        ]
    },
    'legend': {
        commands: [
            // Hunter commands
            '/dispose',
            '/recipe',
            '/seen',
            '/tpahere',
            
            // Hero commands
            '/nick',
            '/hat',
            '/craft',
            '/ptime',
            '/pweather',
            '/AFK [2 Hours]',
            '/Kit Hero [30 Days Cooldown/1 Max Use]',
            
            // Elite commands
            '/condense [new]',
            '/uncondense [new]',
            '/head [new]',
            '/enderchest [new]',
            '/AFK [3 Hours]',
            '/Kit Elite [30 Days Cooldown/1 Max Use]',
            
            // Titan commands
            '/grindstone [new]',
            '/stonecutter [new]',
            '/loom [new]',
            '/cartographytable [new]',
            '/anvil [Virtual Anvil] [new]',
            '/AFK [4 Hours]',
            '/Kit Titan [30 Days Cooldown/1 Max Use]',
            
            // Legend specific commands
            'Open Shulkers with Shift + Right Click [new]',
            '/fastplace 5 [new]',
            '/glow [new]',
            '/jump [new]',
            '/top [new]',
            '/itemname [Rename items] [new]',
            '/nv [Night Vision] [new]',
            '/itemframe Invisible [new]',
            '/me [new]',
            '/AFK [5 Hours]',
            '/Kit Legend [30 Days Cooldown/1 Max Use]'
        ]
    },
    'lord': {
        commands: [
            // Hunter commands
            '/dispose',
            '/recipe',
            '/seen',
            '/tpahere',
            
            // Hero commands
            '/nick',
            '/hat',
            '/craft',
            '/ptime',
            '/pweather',
            '/AFK [2 Hours]',
            '/Kit Hero [30 Days Cooldown/1 Max Use]',
            
            // Elite commands
            '/condense [new]',
            '/uncondense [new]',
            '/head [new]',
            '/enderchest [new]',
            '/AFK [3 Hours]',
            '/Kit Elite [30 Days Cooldown/1 Max Use]',
            
            // Titan commands
            '/grindstone [new]',
            '/stonecutter [new]',
            '/loom [new]',
            '/cartographytable [new]',
            '/anvil [Virtual Anvil] [new]',
            '/AFK [4 Hours]',
            '/Kit Titan [30 Days Cooldown/1 Max Use]',
            
            // Legend commands
            'Open Shulkers with Shift + Right Click [new]',
            '/fastplace 5 [new]',
            '/glow [new]',
            '/jump [new]',
            '/top [new]',
            '/itemname [Rename items] [new]',
            '/nv [Night Vision] [new]',
            '/itemframe Invisible [new]',
            '/me [new]',
            '/AFK [5 Hours]',
            '/Kit Legend [30 Days Cooldown/1 Max Use]',
            
            // Lord specific commands
            '/Dye [new]',
            '/hdb [Free Heads] [new]',
            'Sign Editing [new]',
            'ArmorStand Editing [new]',
            '/fastplace 10 [new]',
            '/AFK [6 Hours]',
            '/Kit Lord [30 Days Cooldown/1 Max Use]'
        ]
    },
    'overlord': {
        commands: [
            // Hunter commands
            '/dispose',
            '/recipe',
            '/seen',
            '/tpahere',
            
            // Hero commands
            '/nick',
            '/hat',
            '/craft',
            '/ptime',
            '/pweather',
            '/AFK [2 Hours]',
            '/Kit Hero [30 Days Cooldown/1 Max Use]',
            
            // Elite commands
            '/condense [new]',
            '/uncondense [new]',
            '/head [new]',
            '/enderchest [new]',
            '/AFK [3 Hours]',
            '/Kit Elite [30 Days Cooldown/1 Max Use]',
            
            // Titan commands
            '/grindstone [new]',
            '/stonecutter [new]',
            '/loom [new]',
            '/cartographytable [new]',
            '/anvil [Virtual Anvil] [new]',
            '/AFK [4 Hours]',
            '/Kit Titan [30 Days Cooldown/1 Max Use]',
            
            // Legend commands
            'Open Shulkers with Shift + Right Click [new]',
            '/fastplace 5 [new]',
            '/glow [new]',
            '/jump [new]',
            '/top [new]',
            '/itemname [Rename items] [new]',
            '/nv [Night Vision] [new]',
            '/itemframe Invisible [new]',
            '/me [new]',
            '/AFK [5 Hours]',
            '/Kit Legend [30 Days Cooldown/1 Max Use]',
            
            // Lord commands
            '/Dye [new]',
            '/hdb [Free Heads] [new]',
            'Sign Editing [new]',
            'ArmorStand Editing [new]',
            '/fastplace 10 [new]',
            '/AFK [6 Hours]',
            '/Kit Lord [30 Days Cooldown/1 Max Use]',
            
            // Overlord specific commands
            '/ride [Passive Mobs] [new]',
            '/fastplace 15 [new]',
            '/AFK [7 Hours]',
            '/Kit Overlord [30 Days Cooldown/1 Max Use]'
        ]
    }
};

rankTiers.forEach(tier => {
    tier.addEventListener('click', () => {
        const rankName = tier.getAttribute('data-rank');
        const details = rankDetails[rankName];

        // Populate popup
        popupRankName.textContent = rankName.charAt(0).toUpperCase() + rankName.slice(1);
        
        // Create popup content
        let detailsHTML = '<h3>Commands:</h3>';
        detailsHTML += '<ul>' + 
            details.commands.map(cmd => `<li>${cmd}</li>`).join('') + 
            '</ul>';
        
        popupRankDetails.innerHTML = detailsHTML;

        rankPopup.style.display = 'block';
    });
});

// Close popup when clicking on close button or outside the popup
closePopup.addEventListener('click', () => {
    rankPopup.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === rankPopup) {
        rankPopup.style.display = 'none';
    }
});

const menuItems = document.querySelectorAll('.menu-item');
const sections = document.querySelectorAll('.section');

// Default first section active
sections[0].classList.add('active');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all menu items and sections
        menuItems.forEach(m => m.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        // Add active class to clicked menu item and corresponding section
        item.classList.add('active');
        const sectionId = item.getAttribute('data-section');
        const activeSection = document.getElementById(sectionId);
        activeSection.classList.add('active');

        // Optional: Add a subtle animation to menu items
        item.style.transform = 'scale(1.05)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 200);

        // Initialize particle animations for specific sections
        if (sectionId === 'rules') {
            new RulesParticleAnimation('rules');
        } else if (sectionId === 'ranks-levels') {
            new RanksParticleAnimation('ranks-levels');
        }
    });
});

// Optional: Add subtle hover effects
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.backgroundColor = 'transparent';
    });
});

// Initialize particle animation for initial Ranks and Levels section
const ranksLevelsSection = document.getElementById('ranks-levels');
if (ranksLevelsSection.classList.contains('active')) {
    new RanksParticleAnimation('ranks-levels');
}

// Rank Details Interactivity
const rankDetailCards = document.querySelectorAll('.rank-detail-card');
    
rankDetailCards.forEach(card => {
    const header = card.querySelector('.rank-header');
    const toggleDetails = header.querySelector('.toggle-details');
    const commands = card.querySelector('.rank-commands');

    // Mark new commands
    const commandItems = commands.querySelectorAll('li');
    commandItems.forEach(item => {
        if (item.textContent.includes('[new]')) {
            item.setAttribute('data-new', 'true');
            item.textContent = item.textContent.replace('[new]', '').trim();
        }
    });

    // Toggle rank details
    header.addEventListener('click', () => {
        card.classList.toggle('expanded');
        
        // Optional: Close other expanded cards
        rankDetailCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('expanded');
            }
        });
    });
});

// Levels System
const levelDetails = {
    '1': {
        money: 25000,
        info: ['250x Claim Blocks']
    },
    '2': {
        money: 50000,
        info: ['500x Claim Blocks']
    },
    '3': {
        money: 100000,
        info: ['750x Claim Blocks']
    },
    '4': {
        money: 250000,
        info: ['1000x Claim Blocks']
    },
    '5': {
        money: 500000,
        info: ['1250x Claim Blocks']
    },
    '10': {
        money: 1000000,
        info: ['1500x Claim Blocks']
    },
    '25': {
        money: 2500000,
        info: ['1750x Claim Blocks']
    },
    '50': {
        money: 5000000,
        info: ['2000x Claim Blocks']
    },
    '75': {
        money: 10000000,
        info: ['2250x Claim Blocks']
    },
    '100': {
        money: 25000000,
        info: ['2500x Claim Blocks']
    }
};

function createLevelGrid() {
    const levelGridContainer = document.getElementById('level-grid');
    if (!levelGridContainer) return;

    for (let level = 1; level <= 100; level++) {
        const levelBox = document.createElement('div');
        levelBox.className = 'level-box';
        levelBox.setAttribute('data-level', level);
        levelBox.textContent = level;
        
        levelBox.addEventListener('click', () => showLevelDetails(level));
        
        levelGridContainer.appendChild(levelBox);
    }
}

function showLevelDetails(level) {
    const levelPopup = document.getElementById('level-details-popup');
    const popupContent = document.getElementById('level-details-content');
    
    if (!levelPopup || !popupContent) return;

    const details = levelDetails[level] || {
        money: 'N/A',
        info: ['No specific information']
    };

    const closestLevel = findClosestLevelData(level);

    popupContent.innerHTML = `
        <div class="popup-header">
            <h2>Level ${level}</h2>
            <span class="popup-close">&times;</span>
        </div>
        <div class="popup-body">
            <div class="level-popup-section">
                <h3>Money Required</h3>
                <p>$${details.money.toLocaleString()}</p>
            </div>
            <div class="level-popup-section">
                <h3>Level Info</h3>
                <ul>${details.info.map(info => `<li>${info}</li>`).join('')}</ul>
            </div>
        </div>
    `;

    // Add close functionality
    const closeButton = popupContent.querySelector('.popup-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            levelPopup.style.display = 'none';
        });
    }

    levelPopup.style.display = 'flex';
}

function setupLevelSearch() {
    const searchInput = document.getElementById('level-search-input');
    const searchResults = document.getElementById('level-search-results');
    
    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        searchResults.innerHTML = '';

        if (query === '') return;

        // Search through commands, perks, and info
        Object.entries(levelDetails).forEach(([level, details]) => {
            const searchText = [
                ...details.info
            ].join(' ').toLowerCase();

            if (searchText.includes(query)) {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <span class="result-level">Level ${level}</span>
                    <span class="result-details">${searchText}</span>
                `;
                resultItem.addEventListener('click', () => showLevelDetails(parseInt(level)));
                searchResults.appendChild(resultItem);
            }
        });
    });
}

function setupPopupClosing() {
    const levelPopup = document.getElementById('level-details-popup');
    const levelSearchPopup = document.getElementById('level-search-popup');
    
    if (levelPopup) {
        levelPopup.addEventListener('click', (e) => {
            if (e.target === levelPopup) {
                levelPopup.style.display = 'none';
            }
        });
    }

    const closeButtons = document.querySelectorAll('.close-popup');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popup = button.closest('.popup');
            if (popup) popup.style.display = 'none';
        });
    });
}

createLevelGrid();
setupLevelSearch();
setupPopupClosing();

document.addEventListener('DOMContentLoaded', () => {
    // Rank Popup Functionality
    const rankTiers = document.querySelectorAll('.rank-tier');
    const rankPopup = document.getElementById('rank-popup');
    const popupRankName = document.getElementById('popup-rank-name');
    const popupRankDetails = document.getElementById('popup-rank-details');
    const closePopup = document.querySelector('.close-popup');

    // Predefined rank details with cumulative commands
    const rankDetails = {
        'hunter': {
            commands: [
                '/dispose',
                '/recipe',
                '/seen',
                '/tpahere'
            ]
        },
        'hero': {
            commands: [
                // Hunter commands
                '/dispose',
                '/recipe',
                '/seen',
                '/tpahere',
                
                // Hero specific commands
                '/nick',
                '/hat',
                '/craft',
                '/ptime',
                '/pweather',
                '/AFK [2 Hours]',
                '/Kit Hero [30 Days Cooldown/1 Max Use]'
            ]
        },
        'elite': {
            commands: [
                // Hunter commands
                '/dispose',
                '/recipe',
                '/seen',
                '/tpahere',
                
                // Hero commands
                '/nick',
                '/hat',
                '/craft',
                '/ptime',
                '/pweather',
                '/AFK [2 Hours]',
                '/Kit Hero [30 Days Cooldown/1 Max Use]',
                
                // Elite specific commands
                '/condense [new]',
                '/uncondense [new]',
                '/head [new]',
                '/enderchest [new]',
                '/AFK [3 Hours]',
                '/Kit Elite [30 Days Cooldown/1 Max Use]'
            ]
        },
        'titan': {
            commands: [
                // Hunter commands
                '/dispose',
                '/recipe',
                '/seen',
                '/tpahere',
                
                // Hero commands
                '/nick',
                '/hat',
                '/craft',
                '/ptime',
                '/pweather',
                '/AFK [2 Hours]',
                '/Kit Hero [30 Days Cooldown/1 Max Use]',
                
                // Elite commands
                '/condense [new]',
                '/uncondense [new]',
                '/head [new]',
                '/enderchest [new]',
                '/AFK [3 Hours]',
                '/Kit Elite [30 Days Cooldown/1 Max Use]',
                
                // Titan specific commands
                '/grindstone [new]',
                '/stonecutter [new]',
                '/loom [new]',
                '/cartographytable [new]',
                '/anvil [Virtual Anvil] [new]',
                '/AFK [4 Hours]',
                '/Kit Titan [30 Days Cooldown/1 Max Use]'
            ]
        },
        'legend': {
            commands: [
                // Hunter commands
                '/dispose',
                '/recipe',
                '/seen',
                '/tpahere',
                
                // Hero commands
                '/nick',
                '/hat',
                '/craft',
                '/ptime',
                '/pweather',
                '/AFK [2 Hours]',
                '/Kit Hero [30 Days Cooldown/1 Max Use]',
                
                // Elite commands
                '/condense [new]',
                '/uncondense [new]',
                '/head [new]',
                '/enderchest [new]',
                '/AFK [3 Hours]',
                '/Kit Elite [30 Days Cooldown/1 Max Use]',
                
                // Titan commands
                '/grindstone [new]',
                '/stonecutter [new]',
                '/loom [new]',
                '/cartographytable [new]',
                '/anvil [Virtual Anvil] [new]',
                '/AFK [4 Hours]',
                '/Kit Titan [30 Days Cooldown/1 Max Use]',
                
                // Legend specific commands
                'Open Shulkers with Shift + Right Click [new]',
                '/fastplace 5 [new]',
                '/glow [new]',
                '/jump [new]',
                '/top [new]',
                '/itemname [Rename items] [new]',
                '/nv [Night Vision] [new]',
                '/itemframe Invisible [new]',
                '/me [new]',
                '/AFK [5 Hours]',
                '/Kit Legend [30 Days Cooldown/1 Max Use]'
            ]
        },
        'lord': {
            commands: [
                // Hunter commands
                '/dispose',
                '/recipe',
                '/seen',
                '/tpahere',
                
                // Hero commands
                '/nick',
                '/hat',
                '/craft',
                '/ptime',
                '/pweather',
                '/AFK [2 Hours]',
                '/Kit Hero [30 Days Cooldown/1 Max Use]',
                
                // Elite commands
                '/condense [new]',
                '/uncondense [new]',
                '/head [new]',
                '/enderchest [new]',
                '/AFK [3 Hours]',
                '/Kit Elite [30 Days Cooldown/1 Max Use]',
                
                // Titan commands
                '/grindstone [new]',
                '/stonecutter [new]',
                '/loom [new]',
                '/cartographytable [new]',
                '/anvil [Virtual Anvil] [new]',
                '/AFK [4 Hours]',
                '/Kit Titan [30 Days Cooldown/1 Max Use]',
                
                // Legend commands
                'Open Shulkers with Shift + Right Click [new]',
                '/fastplace 5 [new]',
                '/glow [new]',
                '/jump [new]',
                '/top [new]',
                '/itemname [Rename items] [new]',
                '/nv [Night Vision] [new]',
                '/itemframe Invisible [new]',
                '/me [new]',
                '/AFK [5 Hours]',
                '/Kit Legend [30 Days Cooldown/1 Max Use]',
                
                // Lord specific commands
                '/Dye [new]',
                '/hdb [Free Heads] [new]',
                'Sign Editing [new]',
                'ArmorStand Editing [new]',
                '/fastplace 10 [new]',
                '/AFK [6 Hours]',
                '/Kit Lord [30 Days Cooldown/1 Max Use]'
            ]
        },
        'overlord': {
            commands: [
                // Hunter commands
                '/dispose',
                '/recipe',
                '/seen',
                '/tpahere',
                
                // Hero commands
                '/nick',
                '/hat',
                '/craft',
                '/ptime',
                '/pweather',
                '/AFK [2 Hours]',
                '/Kit Hero [30 Days Cooldown/1 Max Use]',
                
                // Elite commands
                '/condense [new]',
                '/uncondense [new]',
                '/head [new]',
                '/enderchest [new]',
                '/AFK [3 Hours]',
                '/Kit Elite [30 Days Cooldown/1 Max Use]',
                
                // Titan commands
                '/grindstone [new]',
                '/stonecutter [new]',
                '/loom [new]',
                '/cartographytable [new]',
                '/anvil [Virtual Anvil] [new]',
                '/AFK [4 Hours]',
                '/Kit Titan [30 Days Cooldown/1 Max Use]',
                
                // Legend commands
                'Open Shulkers with Shift + Right Click [new]',
                '/fastplace 5 [new]',
                '/glow [new]',
                '/jump [new]',
                '/top [new]',
                '/itemname [Rename items] [new]',
                '/nv [Night Vision] [new]',
                '/itemframe Invisible [new]',
                '/me [new]',
                '/AFK [5 Hours]',
                '/Kit Legend [30 Days Cooldown/1 Max Use]',
                
                // Lord commands
                '/Dye [new]',
                '/hdb [Free Heads] [new]',
                'Sign Editing [new]',
                'ArmorStand Editing [new]',
                '/fastplace 10 [new]',
                '/AFK [6 Hours]',
                '/Kit Lord [30 Days Cooldown/1 Max Use]',
                
                // Overlord specific commands
                '/ride [Passive Mobs] [new]',
                '/fastplace 15 [new]',
                '/AFK [7 Hours]',
                '/Kit Overlord [30 Days Cooldown/1 Max Use]'
            ]
        }
    };

    rankTiers.forEach(tier => {
        tier.addEventListener('click', () => {
            const rankName = tier.getAttribute('data-rank');
            const details = rankDetails[rankName];

            // Populate popup
            popupRankName.textContent = rankName.charAt(0).toUpperCase() + rankName.slice(1);
            
            // Create popup content
            let detailsHTML = '<h3>Commands:</h3>';
            detailsHTML += '<ul>' + 
                details.commands.map(cmd => `<li>${cmd}</li>`).join('') + 
                '</ul>';
            
            popupRankDetails.innerHTML = detailsHTML;

            rankPopup.style.display = 'block';
        });
    });

    // Close popup when clicking on close button or outside the popup
    closePopup.addEventListener('click', () => {
        rankPopup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === rankPopup) {
            rankPopup.style.display = 'none';
        }
    });

    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section');

    // Default first section active
    sections[0].classList.add('active');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all menu items and sections
            menuItems.forEach(m => m.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked menu item and corresponding section
            item.classList.add('active');
            const sectionId = item.getAttribute('data-section');
            const activeSection = document.getElementById(sectionId);
            activeSection.classList.add('active');

            // Optional: Add a subtle animation to menu items
            item.style.transform = 'scale(1.05)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 200);

            // Initialize particle animations for specific sections
            if (sectionId === 'rules') {
                new RulesParticleAnimation('rules');
            } else if (sectionId === 'ranks-levels') {
                new RanksParticleAnimation('ranks-levels');
            }
        });
    });

    // Optional: Add subtle hover effects
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'transparent';
        });
    });

    // Initialize particle animation for initial Ranks and Levels section
    const ranksLevelsSection = document.getElementById('ranks-levels');
    if (ranksLevelsSection.classList.contains('active')) {
        new RanksParticleAnimation('ranks-levels');
    }

    // Rank Details Interactivity
    const rankDetailCards = document.querySelectorAll('.rank-detail-card');
    
    rankDetailCards.forEach(card => {
        const header = card.querySelector('.rank-header');
        const toggleDetails = header.querySelector('.toggle-details');
        const commands = card.querySelector('.rank-commands');

        // Mark new commands
        const commandItems = commands.querySelectorAll('li');
        commandItems.forEach(item => {
            if (item.textContent.includes('[new]')) {
                item.setAttribute('data-new', 'true');
                item.textContent = item.textContent.replace('[new]', '').trim();
            }
        });

        // Toggle rank details
        header.addEventListener('click', () => {
            card.classList.toggle('expanded');
            
            // Optional: Close other expanded cards
            rankDetailCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                }
            });
        });
    });

    // Levels System
    const levelDetails = {
        '1': {
            money: 25000,
            info: ['250x Claim Blocks']
        },
        '2': {
            money: 50000,
            info: ['500x Claim Blocks']
        },
        '3': {
            money: 100000,
            info: ['750x Claim Blocks']
        },
        '4': {
            money: 250000,
            info: ['1000x Claim Blocks']
        },
        '5': {
            money: 500000,
            info: ['1250x Claim Blocks']
        },
        '10': {
            money: 1000000,
            info: ['1500x Claim Blocks']
        },
        '25': {
            money: 2500000,
            info: ['1750x Claim Blocks']
        },
        '50': {
            money: 5000000,
            info: ['2000x Claim Blocks']
        },
        '75': {
            money: 10000000,
            info: ['2250x Claim Blocks']
        },
        '100': {
            money: 25000000,
            info: ['2500x Claim Blocks']
        }
    };

    function createLevelGrid() {
        const levelGridContainer = document.getElementById('level-grid');
        if (!levelGridContainer) return;

        for (let level = 1; level <= 100; level++) {
            const levelBox = document.createElement('div');
            levelBox.className = 'level-box';
            levelBox.setAttribute('data-level', level);
            levelBox.textContent = level;
            
            levelBox.addEventListener('click', () => showLevelDetails(level));
            
            levelGridContainer.appendChild(levelBox);
        }
    }

    function showLevelDetails(level) {
        const levelPopup = document.getElementById('level-details-popup');
        const popupContent = document.getElementById('level-details-content');
        
        if (!levelPopup || !popupContent) return;

        const details = levelDetails[level] || {
            money: 'N/A',
            info: ['No specific information']
        };

        popupContent.innerHTML = `
            <div class="popup-header">
                <h2>Level ${level}</h2>
                <span class="popup-close">&times;</span>
            </div>
            <div class="popup-body">
                <div class="level-popup-section">
                    <h3>Money Required</h3>
                    <p>$${details.money.toLocaleString()}</p>
                </div>
                <div class="level-popup-section">
                    <h3>Rewards</h3>
                    <ul>
                        ${details.info.map(info => `<li>${info}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        // Add close functionality
        const closeButton = popupContent.querySelector('.popup-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                levelPopup.style.display = 'none';
            });
        }

        levelPopup.style.display = 'flex';
    }

    function setupLevelSearch() {
        const searchInput = document.getElementById('level-search-input');
        const searchResults = document.getElementById('level-search-results');
        
        if (!searchInput || !searchResults) return;

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            searchResults.innerHTML = '';

            if (query === '') return;

            // Search through commands, perks, and info
            Object.entries(levelDetails).forEach(([level, details]) => {
                const searchText = [
                    ...details.info
                ].join(' ').toLowerCase();

                if (searchText.includes(query)) {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'search-result-item';
                    resultItem.innerHTML = `
                        <span class="result-level">Level ${level}</span>
                        <span class="result-details">${searchText}</span>
                    `;
                    resultItem.addEventListener('click', () => showLevelDetails(parseInt(level)));
                    searchResults.appendChild(resultItem);
                }
            });
        });
    }

    function setupPopupClosing() {
        const levelPopup = document.getElementById('level-details-popup');
        const levelSearchPopup = document.getElementById('level-search-popup');
        
        if (levelPopup) {
            levelPopup.addEventListener('click', (e) => {
                if (e.target === levelPopup) {
                    levelPopup.style.display = 'none';
                }
            });
        }

        const closeButtons = document.querySelectorAll('.close-popup');
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const popup = button.closest('.popup');
                if (popup) popup.style.display = 'none';
            });
        });
    }

    createLevelGrid();
    setupLevelSearch();
    setupPopupClosing();

    generateLevelGrid();
    setupLevelSearch();
    setupLevelPopupClose();
});

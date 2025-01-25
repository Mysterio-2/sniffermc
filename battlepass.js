// Tier Details Popup
function showTierDetails(tier) {
    // Create popup similar to level details popup
    const tierPopup = document.getElementById('tier-details-popup');
    const popupContent = document.getElementById('tier-details-content');
    
    if (!tierPopup || !popupContent) return;

    const tierDetails = getBattlepassTierDetails(tier);

    popupContent.innerHTML = `
        <div class="popup-header">
            <h2>Tier ${tier}</h2>
            <span class="popup-close">&times;</span>
        </div>
        <div class="popup-body">
            <div class="tier-popup-section">
                <h3>Rewards</h3>
                <ul>${tierDetails.rewards.map(reward => `<li>${reward}</li>`).join('')}</ul>
            </div>
            <div class="tier-popup-section">
                <h3>XP Required</h3>
                <p>${tierDetails.xpRequired.toLocaleString()} XP</p>
            </div>
        </div>
    `;

    // Add close functionality
    const closeButton = popupContent.querySelector('.popup-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            tierPopup.style.display = 'none';
        });
    }

    tierPopup.style.display = 'flex';
}

// Battlepass Tier Details
function getBattlepassTierDetails(tier) {
    // This is a sample implementation. You would replace this with actual tier details.
    const tierDetailsMap = {
        '1': {
            rewards: ['Basic Battlepass Reward', '100 Coins'],
            xpRequired: 1000
        },
        '25': {
            rewards: ['Epic Skin', '500 Coins', 'Unique Emote'],
            xpRequired: 25000
        },
        '50': {
            rewards: ['Legendary Weapon Skin', '1000 Coins', 'Exclusive Mount'],
            xpRequired: 50000
        },
        '100': {
            rewards: ['Ultimate Battlepass Reward', '2500 Coins', 'Mythic Character Skin'],
            xpRequired: 100000
        }
    };

    // Default tier details if not specified
    return tierDetailsMap[tier] || {
        rewards: ['Standard Tier Reward'],
        xpRequired: tier * 100
    };
}

// Add Tier Details Popup to HTML
function addTierDetailsPopup() {
    const existingPopup = document.getElementById('tier-details-popup');
    if (existingPopup) return;

    const popupDiv = document.createElement('div');
    popupDiv.id = 'tier-details-popup';
    popupDiv.innerHTML = `
        <div id="tier-details-content" class="popup-content"></div>
    `;
    document.body.appendChild(popupDiv);
}

// Initialize Battlepass Page
document.addEventListener('DOMContentLoaded', () => {
    setupPopupClosing();
});

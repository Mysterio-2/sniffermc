document.addEventListener('DOMContentLoaded', () => {
    const elementCards = document.querySelectorAll('.element-card');
    const elementPopup = document.getElementById('element-popup');
    const popupContent = elementPopup.querySelector('.element-popup-content');
    const popupIcon = document.querySelector('.element-popup-icon');
    const popupElementName = document.getElementById('popup-element-name');
    const popupElementDescription = document.getElementById('popup-element-description');
    const popupAcquisitionMethods = document.getElementById('popup-acquisition-methods');
    const popupElementRarity = document.getElementById('popup-element-rarity');
    const closePopupButton = document.querySelector('.close-popup');
    const exchangeButton = document.getElementById('popup-exchange-btn');

    console.log('Popup elements loaded:', {
        elementPopup,
        closePopupButton,
        popupContent
    });

    // Debug: Find all close popup buttons
    const closePopupButtons = document.querySelectorAll('.close-popup');
    console.log('Close popup buttons found:', closePopupButtons.length);
    closePopupButtons.forEach((button, index) => {
        console.log(`Close button ${index}:`, button);
    });

    // Element details mapping
    const elementDetails = {
        'fire': {
            name: 'Fire Element',
            icon: '🔥',
            description: 'Harness the power of flames and destruction',
            acquisitionMethods: [
                'Killing Nether-related mobs'
            ],
            rarity: 3
        },
        'water': {
            name: 'Water Element',
            icon: '💧',
            description: 'Control the fluid essence of life',
            acquisitionMethods: [
                'Killing Guardian, Elder Guardian, Cod, Salmon, Tropical Fish, Pufferfish',
                'Killing Squid, Glow Squid, Dolphin, Turtle, Axolotl, Drowned',
                'Killing Tadpole, Frog, Jellyfish'
            ],
            rarity: 3
        },
        'earth': {
            name: 'Earth Element',
            icon: '🌍',
            description: 'Tap into the strength of the ground',
            acquisitionMethods: [
                'Mining Blocks',
                'Farming'
            ],
            rarity: 1
        },
        'air': {
            name: 'Air Element',
            icon: '💨',
            description: 'Manipulate winds and freedom',
            acquisitionMethods: [
                'Killing Bat, Parrot, Bee, Chicken, Blaze, Vex, Allay, Phantom, Wither'
            ],
            rarity: 2
        },
        'light': {
            name: 'Light Element',
            icon: '✨',
            description: 'Radiate pure energy and hope',
            acquisitionMethods: [
                'Killing Sheep, Cow, Pig, Chicken, Horse, Donkey, Mule, Mooshroom',
                'Killing Villager, Wandering Trader, Rabbit, Wolf, Cat, Ocelot, Fox',
                'Killing Goat, Llama, Trader Llama, Panda, Parrot, Bat, Bee',
                'Killing Snow Golem, Iron Golem',
                'Killing Zombie, Skeleton, Creeper, Spider, Cave Spider, Enderman, Witch',
                'Killing Husk, Stray, Zombie Villager, Pillager, Vindicator',
                'Killing Evoker, Ravager, Vex, Allay, Phantom',
                'Killing Turtle, Axolotl, Frog, Goat, Camel, Sniffer'
            ],
            rarity: 1
        },
        'dark': {
            name: 'Dark Element',
            icon: '🌑',
            description: 'Embrace the mysterious shadows',
            acquisitionMethods: [
                'Killing Enderman, Endermite, Ender Dragon, Shulker'
            ],
            rarity: 4
        }
    };

    // Function to create rarity stars
    function createRarityStars(rarity) {
        const rarityStarsContainer = document.getElementById('popup-element-rarity');
        rarityStarsContainer.innerHTML = ''; // Clear previous stars
        
        // Ensure rarity is between 1 and 5
        const clampedRarity = Math.max(1, Math.min(5, rarity));
        
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.classList.add('rarity-star');
            
            if (i <= clampedRarity) {
                star.classList.add('filled');
                star.textContent = '★';
            } else {
                star.textContent = '☆';
            }
            
            rarityStarsContainer.appendChild(star);
        }
    }

    // Open popup with element details
    function openElementPopup(element) {
        const details = elementDetails[element];
        
        popupIcon.textContent = details.icon;
        popupElementName.textContent = details.name;
        popupElementDescription.textContent = details.description;
        
        // Populate acquisition methods
        const acquisitionList = document.getElementById('popup-acquisition-methods');
        acquisitionList.innerHTML = '';
        details.acquisitionMethods.forEach(method => {
            const li = document.createElement('li');
            li.textContent = method;
            acquisitionList.appendChild(li);
        });
        
        // Create rarity stars
        createRarityStars(details.rarity);
        
        // Set exchange button text
        exchangeButton.textContent = details.exchangeInfo;
        
        // Show popup
        elementPopup.classList.add('active');
        console.log('Popup opened for element:', element);
    }

    // Close popup
    function closeElementPopup() {
        elementPopup.classList.remove('active');
        console.log('Popup closed');
    }

    // Add click event to each element card
    elementCards.forEach(card => {
        const element = card.getAttribute('data-element');
        
        card.addEventListener('click', () => {
            openElementPopup(element);
        });
    });

    // Add click event to ALL close popup buttons
    closePopupButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            console.log('Close button clicked:', button);
            
            // Traverse up to find the closest popup
            const popup = button.closest('.element-popup');
            if (popup) {
                popup.classList.remove('active');
                console.log('Removed active class from popup');
            } else {
                console.log('No popup found for this close button');
            }
        });
    });

    // Ensure close button works with multiple methods
    if (closePopupButton) {
        // Method 1: Direct click on close button
        closePopupButton.addEventListener('click', (event) => {
            event.stopPropagation();
            closeElementPopup();
            console.log('Close button clicked');
        });

        // Method 2: Prevent event from propagating to popup
        closePopupButton.addEventListener('mousedown', (event) => {
            event.stopPropagation();
        });
    }

    // Close popup when clicking outside the popup content
    elementPopup.addEventListener('click', (event) => {
        if (event.target === elementPopup) {
            closeElementPopup();
        }
    });

    // Keyboard escape key to close popup
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && elementPopup.classList.contains('active')) {
            closeElementPopup();
        }
    });
});

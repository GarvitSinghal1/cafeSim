// ============================================
// CaféVibe - Game Configuration
// ============================================

const CONFIG = {
    STARTING_MONEY: 100,
    CUSTOMER_SPAWN_INTERVAL: { cozy: 8000, competitive: 4000 },
    CUSTOMER_PATIENCE: { cozy: 120, competitive: 60 },
    MAX_CUSTOMERS: 5,

    // Camera settings
    CAMERA_HEIGHT: 1.6,
    MOVE_SPEED: 50,

    // World bounds
    BOUNDS: {
        minX: -6, maxX: 6,
        minZ: -8, maxZ: 10
    }
};

// Menu items
const MENU_ITEMS = [
    { id: 'espresso', name: 'Espresso', icon: '☕', basePrice: 3, type: 'drink' },
    { id: 'latte', name: 'Latte', icon: '🥛', basePrice: 5, type: 'drink' },
    { id: 'cappuccino', name: 'Cappuccino', icon: '☕', basePrice: 5, type: 'drink' },
    { id: 'vanillaLatte', name: 'Vanilla Latte', icon: '🍦', basePrice: 6, type: 'drink' },
    { id: 'caramelMac', name: 'Caramel Macchiato', icon: '🍯', basePrice: 6, type: 'drink' },
    { id: 'mocha', name: 'Mocha', icon: '🍫', basePrice: 6, type: 'drink' },
    { id: 'croissant', name: 'Croissant', icon: '🥐', basePrice: 4, type: 'pastry' },
    { id: 'muffin', name: 'Muffin', icon: '🧁', basePrice: 3, type: 'pastry' }
];

// Customer types
const CUSTOMER_TYPES = {
    regular: { name: 'Regular', color: 0x8b7355, patience: 1.0, tipBonus: 1.0 },
    chill: { name: 'Chill', color: 0x6b9b8a, patience: 1.5, tipBonus: 1.2 },
    hurried: { name: 'Hurried', color: 0xc94444, patience: 0.5, tipBonus: 1.5 },
    vip: { name: 'VIP', color: 0xd4af37, patience: 0.8, tipBonus: 2.0 }
};

// Drink recipes - what ingredients are needed
const DRINK_RECIPES = {
    espresso: { espresso: true },
    latte: { espresso: true, milk: true },
    cappuccino: { espresso: true, milk: true },
    vanillaLatte: { espresso: true, milk: true, vanilla: true },
    caramelMac: { espresso: true, milk: true, caramel: true },
    mocha: { espresso: true, milk: true, chocolate: true }
};

// Queue positions for customers at counter
const QUEUE_POSITIONS = [
    { x: 0, z: -2 },
    { x: -1.5, z: -1 },
    { x: 1.5, z: -1 },
    { x: -0.7, z: 0 },
    { x: 0.7, z: 0 }
];

// Shop upgrades
const UPGRADES = [
    { id: 'fasterPrep', name: 'Quick Hands', icon: '⚡', desc: 'Faster preparation', price: 50, effect: () => { gameState.modifiers.prepSpeed = 1.3; } },
    { id: 'betterTips', name: 'Charm', icon: '💕', desc: '+20% tips', price: 75, effect: () => { gameState.modifiers.tipMultiplier = 1.2; } },
    { id: 'premiumBeans', name: 'Premium Beans', icon: '✨', desc: 'Better quality coffee', price: 100, effect: () => { gameState.modifiers.satisfactionMultiplier = 1.25; } }
];

// Colors for 3D models
const COLORS = {
    // Building
    wallExterior: 0x2a2a2a,
    wallInterior: 0x3a3a3a,
    floor: 0x4a4a4a,
    counter: 0x5a4a3a,

    // Equipment
    espressoMachine: 0xc0392b,
    milkStation: 0xbdc3c7,
    cupDispenser: 0x95a5a6,

    // Environment
    ground: 0x3d5c3d,
    path: 0x8b7355,
    sky: 0x87ceeb
};

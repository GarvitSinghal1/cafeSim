# CaféVibe Assets

## How to Add High-Quality 3D Models

### Free CC0 Assets to Download

1. **Quaternius Ultimate Food Pack** (cups, pastries, food)
   - https://quaternius.com/packs/ultimatefood.html
   - Download and extract
   - Convert FBX files to GLB using Blender or online converter

2. **Quaternius Nature MegaKit** (trees, plants)
   - https://quaternius.com/packs/ultimatenature.html
   - Look for maple/autumn trees

3. **Quaternius City Pack** (buildings, storefronts)
   - https://quaternius.com/packs/ultimatecity.html

4. **Sketchfab Rosie Character** (free NPC)
   - https://sketchfab.com/3d-models/rosie-rigged-cartoon-girl-character-2b9b5c9323b94476b40e8786c4730766
   - Download as GLTF/GLB

### Converting FBX to GLB

**Option 1: Blender (Recommended)**
1. Open Blender
2. File → Import → FBX
3. File → Export → glTF 2.0 (.glb)
4. Choose "GLB" format

**Option 2: Online Converter**
- https://products.aspose.app/3d/conversion/fbx-to-glb
- https://imagetostl.com/convert/file/fbx/to/glb

### File Naming Convention

Place converted GLB files in this folder with these names:
```
models/
  cafe.glb           # Main café building
  espresso.glb       # Espresso machine
  cup.glb            # Coffee cup
  table.glb          # Café table
  chair.glb          # Café chair
  tree.glb           # Maple tree
  customer.glb       # NPC character
  pastry.glb         # Croissant/pastry
  counter.glb        # Counter
  syrup.glb          # Syrup bottle
  milk_pitcher.glb   # Milk pitcher
```

### After Adding Models

1. Update `assets.js` with the model paths:
```javascript
AssetManager.modelPaths = {
    cafe: 'assets/models/cafe.glb',
    espressoMachine: 'assets/models/espresso.glb',
    coffeeCup: 'assets/models/cup.glb',
    // ... etc
};
```

2. Initialize the loader in `game.js`:
```javascript
// In init() function, before buildWorld()
initAssetLoader();
await loadAllModels();
```

3. The game will automatically use high-quality models when available, falling back to procedural geometry if not.

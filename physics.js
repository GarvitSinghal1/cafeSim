// ============================================
// CaféVibe - Physics System (Cannon.js)
// Real physics for throwing, dropping, collisions
// ============================================

// Physics world
let physicsWorld;
let physicsBodies = [];
let physicsToMesh = new Map();

// Ground physics body
let groundBody;

// Physics materials
let defaultMaterial, groundMaterial, cupMaterial;
let groundContactMaterial, cupGroundContact;

// ============================================
// INITIALIZE PHYSICS WORLD
// ============================================
function initPhysics() {
    // Create physics world
    physicsWorld = new CANNON.World();
    physicsWorld.gravity.set(0, -9.82, 0);
    physicsWorld.broadphase = new CANNON.NaiveBroadphase();
    physicsWorld.solver.iterations = 10;

    // Materials
    defaultMaterial = new CANNON.Material('default');
    groundMaterial = new CANNON.Material('ground');
    cupMaterial = new CANNON.Material('cup');

    // Contact materials (how things interact)
    groundContactMaterial = new CANNON.ContactMaterial(
        groundMaterial,
        defaultMaterial,
        { friction: 0.4, restitution: 0.3 }
    );

    cupGroundContact = new CANNON.ContactMaterial(
        cupMaterial,
        groundMaterial,
        { friction: 0.5, restitution: 0.2 }
    );

    physicsWorld.addContactMaterial(groundContactMaterial);
    physicsWorld.addContactMaterial(cupGroundContact);

    // Ground plane
    groundBody = new CANNON.Body({
        mass: 0, // Static
        material: groundMaterial,
        shape: new CANNON.Plane()
    });
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    physicsWorld.addBody(groundBody);

    // Counter collision box
    addStaticBox(0, 0.55, -5.5, 6, 1.1, 0.8); // Counter

    // Café floor
    addStaticBox(0, 0.05, -4, 8, 0.1, 5);

    // Walls (invisible physics barriers)
    addStaticBox(-4, 2, -4, 0.2, 4, 5); // Left wall
    addStaticBox(4, 2, -4, 0.2, 4, 5);  // Right wall
    addStaticBox(0, 2, -6.5, 8, 4, 0.2); // Back wall
}

// Add static box collider
function addStaticBox(x, y, z, w, h, d) {
    const body = new CANNON.Body({
        mass: 0,
        material: groundMaterial,
        shape: new CANNON.Box(new CANNON.Vec3(w / 2, h / 2, d / 2))
    });
    body.position.set(x, y, z);
    physicsWorld.addBody(body);
    return body;
}

// ============================================
// PHYSICS OBJECT CREATION
// ============================================
function createPhysicsCup(mesh) {
    const body = new CANNON.Body({
        mass: 0.3, // Light cup
        material: cupMaterial,
        shape: new CANNON.Cylinder(0.06, 0.05, 0.12, 8),
        linearDamping: 0.3,
        angularDamping: 0.5
    });

    body.position.copy(mesh.position);
    physicsWorld.addBody(body);

    physicsBodies.push(body);
    physicsToMesh.set(body, mesh);
    mesh.userData.physicsBody = body;

    return body;
}

function createPhysicsPastry(mesh) {
    const body = new CANNON.Body({
        mass: 0.1,
        material: defaultMaterial,
        shape: new CANNON.Sphere(0.08),
        linearDamping: 0.2,
        angularDamping: 0.3
    });

    body.position.copy(mesh.position);
    physicsWorld.addBody(body);

    physicsBodies.push(body);
    physicsToMesh.set(body, mesh);
    mesh.userData.physicsBody = body;

    return body;
}

// ============================================
// THROWING PHYSICS
// ============================================
function throwObject(mesh, camera, throwForce = 8) {
    const body = mesh.userData.physicsBody;
    if (!body) return;

    // Get camera direction
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    // Add slight upward arc
    direction.y += 0.3;
    direction.normalize();

    // Apply impulse
    const impulse = new CANNON.Vec3(
        direction.x * throwForce,
        direction.y * throwForce,
        direction.z * throwForce
    );

    body.applyImpulse(impulse, body.position);

    // Add spin
    body.angularVelocity.set(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
    );
}

function dropObject(mesh) {
    const body = mesh.userData.physicsBody;
    if (!body) return;

    // Just enable physics, gravity does the rest
    body.wakeUp();
}

// ============================================
// PHYSICS UPDATE
// ============================================
function updatePhysics(delta) {
    if (!physicsWorld) return;

    // Step physics simulation
    physicsWorld.step(1 / 60, delta, 3);

    // Sync meshes to physics bodies
    for (const body of physicsBodies) {
        const mesh = physicsToMesh.get(body);
        if (mesh) {
            mesh.position.copy(body.position);
            mesh.quaternion.copy(body.quaternion);
        }
    }
}

// ============================================
// PHYSICS HELPERS
// ============================================
function removePhysicsBody(mesh) {
    const body = mesh.userData.physicsBody;
    if (!body) return;

    physicsWorld.removeBody(body);
    physicsBodies = physicsBodies.filter(b => b !== body);
    physicsToMesh.delete(body);
    mesh.userData.physicsBody = null;
}

function setBodyKinematic(mesh, isKinematic) {
    const body = mesh.userData.physicsBody;
    if (!body) return;

    if (isKinematic) {
        body.type = CANNON.Body.KINEMATIC;
        body.velocity.set(0, 0, 0);
        body.angularVelocity.set(0, 0, 0);
    } else {
        body.type = CANNON.Body.DYNAMIC;
        body.wakeUp();
    }
}

function syncBodyToMesh(mesh) {
    const body = mesh.userData.physicsBody;
    if (!body) return;

    body.position.copy(mesh.position);
    body.quaternion.copy(mesh.quaternion);
    body.velocity.set(0, 0, 0);
    body.angularVelocity.set(0, 0, 0);
}

// Check if object is at rest
function isBodyAtRest(mesh) {
    const body = mesh.userData.physicsBody;
    if (!body) return true;

    const vel = body.velocity.length();
    const angVel = body.angularVelocity.length();

    return vel < 0.1 && angVel < 0.1;
}

// Get all physics objects in radius
function getPhysicsObjectsInRadius(position, radius) {
    const results = [];

    for (const body of physicsBodies) {
        const mesh = physicsToMesh.get(body);
        if (!mesh) continue;

        const dist = new THREE.Vector3(
            body.position.x - position.x,
            body.position.y - position.y,
            body.position.z - position.z
        ).length();

        if (dist <= radius) {
            results.push({ mesh, body, distance: dist });
        }
    }

    return results.sort((a, b) => a.distance - b.distance);
}

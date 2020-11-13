class DirectionalLight {
    constructor (scene, x, y, z) {
        this.geometry = new THREE.BoxGeometry( 1, 1, 1);
        const light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
        light.position.set( 0, 1, 0 ); //default; light shining from top
        light.castShadow = true; // default false
        scene.add( light );
    }
}

export default DirectionalLight;
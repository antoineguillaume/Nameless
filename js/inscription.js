$(document).ready(function(){

    var renderer, scene, camera, mesh, step, spGroup, hullMesh, points;

    init();
    animate();

    function init(){
        renderer = new THREE.WebGLRenderer();
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000 );
        if($('body').hasClass('inscription-page')){
            camera.position.set(0, 0, 400);
        } else {
            camera.position.set(0, 0, 75);
        }

        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.9 );
        directionalLight.position.set( 6, 6, 0 );

        renderer.setClearColor(new THREE.Color(0xffffff, 1.0));
        renderer.shadowMapEnabled = true;
        renderer.setSize( window.innerWidth, window.innerHeight );

        document.getElementById('container-exp-1').appendChild(renderer.domElement);

        scene.add(camera, directionalLight);

        generatePoints();

        function generatePoints() {
            // add X random spheres
            points = [];
            for (var i = 0; i < 25; i++) {
                var randomX = -15 + Math.round(Math.random() * 30);
                var randomY = -15 + Math.round(Math.random() * 30);
                var randomZ = -15 + Math.round(Math.random() * 30);

                points.push(new THREE.Vector3(randomX, randomY, randomZ));
            }

            constructor();
        }

        function constructor() {
            spGroup = new THREE.Object3D();
            var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: false});
            points.forEach(function (point) {

                var spGeom = new THREE.SphereGeometry(0.2);
                var spMesh = new THREE.Mesh(spGeom, material);
                spMesh.position.copy(point);
                spGroup.add(spMesh);
            });
            
            var hullGeometry = new THREE.ConvexGeometry(points);
            hullMesh = new THREE.Mesh(hullGeometry, new THREE.MeshNormalMaterial({color: 0xe8e8e8, transparent: true, opacity: 0.2}));
            scene.add(hullMesh);
        }

        if($('body').hasClass('inscription-page')){
            var tween = new TWEEN.Tween({
                z: camera.position.z
            }).to({
                z: 75
            }, 6000).easing(TWEEN.Easing.Linear.None).onUpdate(function(){
                camera.position.z = Math.round(this.z);
            }).start();
        }

        $('.connexion-form').submit(function(e){
            // e.preventDefault();
            var tween = new TWEEN.Tween({
                z: camera.position.z
            }).to({
                z: 5
            }, 3000).easing(TWEEN.Easing.Linear.None).onUpdate(function(){
                camera.position.z = Math.round(this.z);
            }).start();

            $('.container').fadeOut(2000);
        });

        renderer.render( scene, camera );
    }
    $('.tooltip').fadeOut(0);
    $('.information').click(function(){
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
            $('.tooltip').fadeIn(400);
        } else {
            $('.tooltip').fadeOut(400);
        }
    });

    step = 0;

    function animate(){

        spGroup.rotation.y = step;
        hullMesh.rotation.y = step += 0.01;

        requestAnimationFrame( animate );
        TWEEN.update();
        renderer.render( scene, camera );
    }

    THREEx.WindowResize(renderer, camera);
});
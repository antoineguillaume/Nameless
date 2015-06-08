$(document).ready(function(){

    var container, renderer, scene, camera, mesh, spGroup, hullMesh, points, delta, clock, camControls, hullGeometry, notification, selectedObj, user_recept, user_emit;
    var tween, objectPosition, jsonPosition, ID, n, nameObj, chatTime, id_conversation, setMatrixJson, smjPos, id_room, statut, user_a, user_b;
    var arrayShape = [], arrayName = [], tab_user_connected = [];
    var lastid = 0;
    var id = true, new_member = false;

    renderer = new THREE.WebGLRenderer();
    scene = new THREE.Scene();
    clock = new THREE.Clock();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    camera.position.set(0, 0, 0);
    camera.target = scene.position.clone();

    renderer.setClearColor(new THREE.Color(0xffffff, 1.0));
    renderer.shadowMapEnabled = true;
    renderer.setSize( window.innerWidth, window.innerHeight );
    container = document.getElementById('container-exp-1');
    container.appendChild(renderer.domElement);
    container.focus();

    scene.add(camera);

    //
    // First Person Controls Camera
    //

    camControls = new THREE.FirstPersonControls(camera, container);
    camControls.lookSpeed = 0.05;
    camControls.movementSpeed = 170;
    camControls.noFly = false;
    camControls.activeLook = true;
    camControls.lookVertical = true;
    camControls.constrainVertical = false;
    camControls.verticalMin = 0;
    camControls.verticalMax = 0;
    camControls.lon = -150;
    camControls.lat = 120;

    //
    // Détecte lorsqu'un nouveau membre s'inscris
    //

    $.ajax({
        url: 'espace-membre/script.php',
        type: 'POST',
        data: 'action=' + 'newMember',
        success: function(data){
            var newM = $.parseJSON(data);
            new_member = newM.new_member;
            if(new_member === true){
                randomPosition();
                $.ajax({
                    url: 'espace-membre/script.php',
                    type: 'POST',
                    data: 'action=' + 'activeMember'
                });
            }
        },
        complete: function(){
            //
            // Calcule le nombre de membre inscris et génère leurs formes dans la matrice. La caméra se dirige ensuite vers la forme de la personne qui s'est connectée.
            //
            $.ajax({
                url: 'espace-membre/script.php',
                type: 'POST',
                data: 'action=' + 'setMatrix',
                success: function(data){
                    setMatrixJson = $.parseJSON(data);
                    smjPos = setMatrixJson.position;
                    n = smjPos.length;
                    
                    for(i=0; i<n; i++)
                    {
                        generatePoints();
                        var pShape = splitText(smjPos[i]);
                        var positionShape = pShape[0].split(/,+/g);
                       
                        hullMesh.position.x = +positionShape[0];
                        hullMesh.position.y = +positionShape[1];
                        hullMesh.position.z = +positionShape[2];
                        hullMesh.name = i+1;
                        arrayShape.push(hullMesh);
                    }
                    if(setMatrixJson.user_a != undefined)
                    {
                        for(i=0; i<setMatrixJson.user_a.length; i++)
                        {
                            user_a = setMatrixJson.user_a[i];
                            user_b = setMatrixJson.user_b[i];

                            var constructLign = new THREE.Geometry();

                            constructLign.vertices.push(new THREE.Vector3( arrayShape[+user_a].position.x, arrayShape[+user_a].position.y, arrayShape[+user_a].position.z ), new THREE.Vector3( arrayShape[+user_b].position.x, arrayShape[+user_b].position.y, arrayShape[+user_b].position.z ));

                            for (var a = 0; a < constructLign.vertices.length; a++) {
                                constructLign.colors[a] = new THREE.Color(Math.random(), Math.random(), Math.random());
                            }

                            var lign = new THREE.Line( constructLign, new THREE.LineBasicMaterial({ transparent: true, opacity: 0.3, color: 0xffffff, vertexColors: THREE.VertexColors }), THREE.LinePieces);
                            scene.add(lign);
                        }
                    }
                    setStatistics();
                },
                complete: function(data){
                    ID = +setMatrixJson.ID;
                    var obj = arrayShape[ID];
                    obj.material.wireframe = true;
                    obj.material.wireframeLinewidth = 1;
                    obj.material.opacity = 0.2;
                    obj.scale.x, obj.scale.y, obj.scale.z = 3;

                    tween = new TWEEN.Tween(
                    { 
                        x: camera.position.x,
                        y: camera.position.y,
                        z: camera.position.z
                    }
                    ).to(
                    {
                        x: obj.position.x,
                        y: obj.position.y,
                        z: obj.position.z
                    }, 2000 )
                    .easing( TWEEN.Easing.Sinusoidal.In ).onUpdate(function()
                    {
                        camera.position.x = this.x;
                        camera.position.y = this.y;
                        camera.position.z = this.z;
                    }
                    ).onComplete(function(){ 
                        if(new_member === true){
                            openModal('welcome');
                        } 
                    }).start();
                }
            });
        }
    });


    //
    // Création de la forme noire, celle qui permet de se déconnecter
    //


    var logoutMaterial = new THREE.MeshPhongMaterial({color: 0x5c5c5c, ambient: 0xe6e6e6, emissive: 0x373737, specular: 0x7d7d7d});
    var logoutShape = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), logoutMaterial);
    logoutShape.position.set(0, 0, 0);
    logoutShape.name = 'logout';

    scene.add(logoutShape);
    arrayShape.push(logoutShape);

        
    //
    // Traite les infos reçues de la base de donnée (au niveau des positions) pour qu'elles soient exploitables
    //

    function splitText(arg){
        var string = arg.substring(1, arg.length-1);
        var result = string.split(/],\[+/g);
        return result;
    }

    //
    // Attribue une position aléatoire aux formes des nouveaux membres et l'enregistre dans la base de donnée
    //

    function randomPosition() {
        objectPosition = [];

        var posX = Math.random() * 600;
        var posY = Math.random() * 600;
        var posZ = Math.random() * 600;

        objectPosition.push(posX, posY, posZ);
        jsonPosition = JSON.stringify(objectPosition);

        $.ajax({
            url: 'espace-membre/script.php',
            type: 'POST',
            data: {userPosition:jsonPosition, action: 'setPositionShape'},
            complete: function(data, statut){
                console.log(statut);
            }
        });
    }

    //
    // Génère des points aléatoires pour construire les formes
    //

    function generatePoints() {
        points = [];
        for (var i = 0; i < 4; i++) {
            var randomX = -15 + Math.round(Math.random() * 30);
            var randomY = -15 + Math.round(Math.random() * 30);
            var randomZ = -15 + Math.round(Math.random() * 30);

            points.push(new THREE.Vector3(randomX, randomY, randomZ));
        }

        constructor();
    }

    //
    // Fonction permettant de construire une forme sur base des points générés 
    //

    function constructor() {
        spGroup = new THREE.Object3D();
        var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: false});
        points.forEach(function (point) {

            var spGeom = new THREE.SphereGeometry(0.2);
            var spMesh = new THREE.Mesh(spGeom, material);
            spMesh.position.copy(point);
            spGroup.add(spMesh);
        });

        hullGeometry = new THREE.ConvexGeometry(points);
        hullMesh = new THREE.Mesh(hullGeometry, new THREE.MeshNormalMaterial({color: 0xe8e8e8, transparent: true, opacity: 0.18}));
        
        scene.add(hullMesh);
    }

    renderer.render( scene, camera );


    //
    // Fonction permettant d'interagir avec les formes et d'ouvrir une modal
    //

    $(container).click(function(event){

        event.preventDefault();
        var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
        vector = vector.unproject(camera);
        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        var intersects = raycaster.intersectObjects(tab_user_connected);

        if (intersects.length > 0 && intersects[0].object != arrayShape[ID])
        {
            selectedObj = intersects[0].object;
            nameObj = selectedObj.name;

            if(nameObj == 'logout')
            {
                $.ajax({
                    url: 'espace-membre/script.php',
                    type: 'POST',
                    data: 'action=' + 'isNotConnected',
                    success: function(data){
                        document.location.href="espace-membre/deconnexion.php";
                    }
                });
            }
            else
            {
                //  console.log(camControls.target);
                //  console.log(selectedObj.position);
                
                console.log('ID Forme sélectionnée : ' + nameObj);
                console.log('ID personnel : ' + ID);

                $.ajax({
                    url: 'espace-membre/script.php',
                    type: 'POST',
                    data: {name_object: nameObj, action: 'createDiscussion'},
                    success: function(data){
                        $('#fiche').html('');
                        var js = $.parseJSON(data);
                        var information = js.information;
                        id_conversation = js.id_conversation;
                        console.log(information);
                        if(information != null)
                        {
                            $('#fiche').html('');
                            $('#fiche').val(information);
                            console.log('Information fiche : ' + information);
                        }
                        else
                        {
                            $('#fiche').val('');
                        }
                        console.log('ID conversation : ' + id_conversation);
                        chatTime = setInterval(getMessage, 3000);
                        clearInterval(intervalNotification);
                    }
                });

                if(camera.position.x != selectedObj.position.x && camera.position.y != selectedObj.position.y)
                {
                    tween = new TWEEN.Tween(
                    { 
                        x: camera.position.x,
                        y: camera.position.y,
                        z: camera.position.z
                    }
                    ).to(
                    {
                        x: selectedObj.position.x,
                        y: selectedObj.position.y,
                        z: (selectedObj.position.z)
                    }, 2000 )
                    .easing( TWEEN.Easing.Sinusoidal.In ).onUpdate(function()
                    {
                        camera.position.x = this.x;
                        camera.position.y = this.y;
                        camera.position.z = this.z;
                    }
                    ).onComplete(function(){

                        openModal('chat');

                        $('.statistiques').css({
                            '-webkit-transform' : 'translateY(90px)',
                            '-moz-transform' : 'translateY(90px)',
                            '-ms-transform' : 'translateY(90px)',
                            '-o-transform' : 'translateY(90px)',
                            'transform' : 'translateY(90px)'
                        });
                    }).start();
                } 
                else
                {
                    openModal('chat');
                    $('.statistiques').css({
                        '-webkit-transform' : 'translateY(90px)',
                        '-moz-transform' : 'translateY(90px)',
                        '-ms-transform' : 'translateY(90px)',
                        '-o-transform' : 'translateY(90px)',
                        'transform' : 'translateY(90px)'
                    });
                }
            }                           
        }
    });

    $('.md-close').click(function(){
        intervalNotification = setInterval(getNotification, 10000);
        clearInterval(chatTime);
        camControls.lookSpeed = 0.05;
        // $("#container-exp-1").css({
        //     "-webkit-filter" : "blur(0px)",
        //     "-moz-filter" : "blur(0px)",
        //     "-ms-filter" : "blur(0px)",
        //     "-o-filter" : "blur(0px)",
        //     "filter" : "blur(0px)"
        // });
        $(".chatroom li").remove();
        $('.container-modal-chat').fadeOut(400);
        $('.modal-welcome').fadeOut(400);

        $('.statistiques').css({
            '-webkit-transform' : 'translateY(0px)',
            '-moz-transform' : 'translateY(0px)',
            '-ms-transform' : 'translateY(0px)',
            '-o-transform' : 'translateY(0px)',
            'transform' : 'translateY(0px)'
        });

        removeNotif();
        container.focus();
        return false;
    });

    $('.disconnect').click(function(){
        $.ajax({
            url: 'espace-membre/script.php',
            type: 'POST',
            data: 'action=' + 'isNotConnected',
            success: function(data){
                document.location.href="espace-membre/deconnexion.php";
            }
        });
    });

    function openModal(argument){

        if(argument == 'chat')
        {
            $(".container-modal-chat").fadeIn(400);
        }
        else if(argument == 'welcome')
        {
            $(".modal-welcome").fadeIn(400);
        }

        camControls.lookSpeed = 0.01;
    } 

    $('#chatForm').submit(function(e){
        e.preventDefault();
        var message = $('#message').val();
        notification = 1;

        if(message.length > 130)
        {
            $('.text-lenght').html(message.length);
            $('.error-length').fadeIn(400);
            return false;
        }
        else if(message != '')
        {
            $('.error-length').fadeOut(400);
            $.ajax({
                url: "espace-membre/script.php",
                type: "POST",
                data: {message: message, action: "sendMessage", id_conversation: id_conversation, notif: notification, name_object: nameObj},
                success: function(data){
                    getMessage();
                    $('#message').val('');
                    $('#message').focus();

                    var shape_transit_material = new THREE.MeshNormalMaterial({color: 0xe8e8e8, transparent: true, opacity: 0.3});
                    var shape_transit = new THREE.Mesh(new THREE.SphereGeometry(2, 5, 5), shape_transit_material);
                    shape_transit.position.set(arrayShape[ID].position.x, arrayShape[ID].position.y, arrayShape[ID].position.z);
                    shape_transit.name = 'shape_transit';
                    scene.add(shape_transit);

                    var constructLign = new THREE.Geometry();
                    constructLign.vertices.push(new THREE.Vector3( arrayShape[ID].position.x, arrayShape[ID].position.y, arrayShape[ID].position.z ), new THREE.Vector3( selectedObj.position.x, selectedObj.position.y, selectedObj.position.z ));

                    for (var i = 0; i < constructLign.vertices.length; i++) {
                        constructLign.colors[i] = new THREE.Color(Math.random(), Math.random(), Math.random());
                    }

                    var lign = new THREE.Line( constructLign, new THREE.LineBasicMaterial({ transparent: true, opacity: 0.3, color: 0xffffff, vertexColors: THREE.VertexColors }), THREE.LinePieces);
                    scene.add(lign);

                    tween = new TWEEN.Tween(
                    { 
                        x: shape_transit.position.x,
                        y: shape_transit.position.y,
                        z: shape_transit.position.z
                    }
                    ).to(
                    {
                        x: selectedObj.position.x,
                        y: selectedObj.position.y,
                        z: selectedObj.position.z
                    }, 4000 )
                    .easing( TWEEN.Easing.Sinusoidal.In ).onUpdate(function()
                    {
                        shape_transit.position.x = this.x;
                        shape_transit.position.y = this.y;
                        shape_transit.position.z = this.z;
                    }
                    ).onComplete(function(){
                        scene.remove(shape_transit);
                    }).start();
                }
            });
        }
        if($('.chatroom li').length >= 1){
            $('.chatroom li:first-child').remove();
        }
        return false;
    });

    $('#chatFiche').submit(function(e){
        e.preventDefault();
        var information = $('#fiche').val();

        if(information.length > 430)
        {
            $('.text-lenght').html(information.length);
            $('.error-length').fadeIn(400);
            return false;
        }
        else if(information != '')
        {
            $('.error-length').fadeOut(400);
            $.ajax({
                url: "espace-membre/script.php",
                type: "POST",
                data: {information: information, action: "setInformation", id_conversation: id_conversation},
                success: function(data){
                    var data = $.parseJSON(data);
                    var infos_fiche = data.infos;
                    $('.save-informations').fadeIn(400).delay(5000).fadeOut(400);
                }
            });
        }    });

    function getMessage(){
        $.ajax({
            url: "espace-membre/script.php",
            type: "POST",
            data: {action: "getMessage", id_conversation: id_conversation, lastid: lastid},
            success: function(data){
                var jsonMsg = $.parseJSON(data);
                if(jsonMsg.msg != null && jsonMsg.id != null){
                    $('.chatroom').append("<li>" + jsonMsg.msg + "</li>");
                    lastid = jsonMsg.id;
                } 
                if($('.chatroom li').length > 1){
                    $('.chatroom li:first-child').remove();
                }
            }
        });
        return false;
    }

    function getNotification(){
        $.ajax({
            url: 'espace-membre/script.php',
            type: 'POST',
            data: 'action=' + 'getNotification',
            success: function(data){
                var js = $.parseJSON(data);
                if(js != null)
                {
                    console.log('Notification : ' +js.id_room[0]);
                    id_room = js.id_room[0];
                    $('.popup').fadeIn(400);
                }
            }
        });
    }

    //
    // Permet de mettre à jour les utilisateurs connectés, les statistiques et les notifications
    //

    var intervalNotification = setInterval(getNotification, 10000);

    setInterval(setStatistics, 10000);

    //
    // Fonction permettant d'aller chercher toutes les statistiques de l'expérimentation
    //

    function setStatistics(){
        $.ajax({
            url: 'espace-membre/script.php',
            type: 'POST',
            data: 'action=' + 'setStatistics',
            success: function(data){
                var j = $.parseJSON(data);
                var nbr_shapes= j.nbr_shapes;
                var nbr_shapes_connected = j.nbr_shapes_connected;
                var nbr_link_created = j.nbr_link_created;
                var nbr_linkPerso_created = j.nbr_linkPerso_created;
                var nbr_msg_sended = j.nbr_msg_sended;
                var user_connected = j.user_connected;
                user_recept = j.user_recept;
                user_emit = j.user_emit;
                tab_user_connected = [];
                tab_user_connected.push(logoutShape);

                if(j.user_recept != null && j.user_emit != null){
                    console.log(user_recept);
                    console.log(user_emit);

                    for(e=0; e<j.user_recept.length; e++)
                    {
                        var shape_transit_material = new THREE.MeshNormalMaterial({color: 0xe8e8e8, transparent: true, opacity: 0.4});
                        var shape_transit = new THREE.Mesh(new THREE.SphereGeometry(2, 5, 5), shape_transit_material);
                        shape_transit.position.set(arrayShape[user_emit[e]].position.x, arrayShape[user_emit[e]].position.y, arrayShape[user_emit[e]].position.z);
                        shape_transit.name = 'shape_transit';
                        scene.add(shape_transit);

                        tween = new TWEEN.Tween(
                        { 
                            x: shape_transit.position.x,
                            y: shape_transit.position.y,
                            z: shape_transit.position.z
                        }
                        ).to(
                        {
                            x: arrayShape[user_recept[e]].position.x,
                            y: arrayShape[user_recept[e]].position.y,
                            z: arrayShape[user_recept[e]].position.z
                        }, 4000 )
                        .easing( TWEEN.Easing.Sinusoidal.In ).onUpdate(function()
                        {
                            shape_transit.position.x = this.x;
                            shape_transit.position.y = this.y;
                            shape_transit.position.z = this.z;
                        }
                        ).onComplete(function(){
                            scene.remove(shape_transit);
                        }).start();
                    }
                }

                for(i=0; i<user_connected.length; i++)
                {
                    var us_co = user_connected[i];
                    tab_user_connected.push(arrayShape[us_co]);
                    tab_user_connected[i].material.opacity = 0.2;
                }

                $('.chiffre1').html(nbr_shapes);
                $('.chiffre2').html(nbr_shapes_connected);
                $('.chiffre3').html(nbr_link_created);
                $('.chiffre4').html(nbr_linkPerso_created);
                $('.chiffre5').html(nbr_msg_sended);
            }
        });
    }

    //
    // Popup permettant d'accepter une conversation avec une autre forme
    //

    $('.left-button').click(function(){
        id_conversation = id_room;
        clearInterval(intervalNotification);
        chatTime = setInterval(getMessage, 3000);
        $('.popup').fadeOut(400);
        openModal('chat'); 
        removeNotif();
    });

    //
    // Popup permettant de refuser une conversation avec une autre forme
    //

    $('.right-button').click(function(){
        $('.popup').fadeOut(400);
        removeNotif();
    });

    //
    // Fonction permettant, via une requête AJAX, de supprimer la notification lorsque l'utilisateur à chosisis soit d'accepter soit de refuser
    //

    function removeNotif(){
        $.ajax({
            url: 'espace-membre/script.php',
            type: 'POST',
            data: {ID: ID, action: 'removeNotif'}
        });
    }

    render();

    function render() {
        requestAnimationFrame(render);

        delta = clock.getDelta();
        camControls.update(delta);
        TWEEN.update();
        renderer.clear();

        renderer.render(scene, camera);
    }

    var change_interface = new Konami(function(){
        function color(){
            var color = (Math.random() * 0xFF4444);
            renderer.setClearColor(new THREE.Color(color, 1.0));
        }

        var sound = new Audio("sound/nightmare.wav");
        sound.loop = true;
        sound.play();

        setInterval(color, 100);
    });

    //
    // Permet au canvas de se centrer par rapport à la largeur de la fenêtre.
    //

    THREEx.WindowResize(renderer, camera);

    var x, y;
    $('body').mouseleave(function(e){
        x = 0;
        y = 0;
    });

    $('body').mouseenter(function(e){
        x = 1;
        y = 1;
    });

    window.onbeforeunload = closeIt;
    
    function closeIt(e){
        if(!x && !y){
            $.ajax({
                url: 'espace-membre/script.php',
                type: 'POST',
                data: 'action=' + 'isNotConnected',
                success: function(data){
                    document.location.href="espace-membre/deconnexion.php";
                }
            });
        }
    }
});
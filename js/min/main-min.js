$(document).ready(function(){function e(e){var t=e.substring(1,e.length-1),o=t.split(/],\[+/g);return o}function t(){M=[];var e=600*Math.random(),t=600*Math.random(),o=600*Math.random();M.push(e,t,o),S=JSON.stringify(M),$.ajax({url:"espace-membre/script.php",type:"POST",data:{userPosition:S,action:"setPositionShape"},complete:function(e,t){console.log(t)}})}function o(){x=[];for(var e=0;4>e;e++){var t=-15+Math.round(30*Math.random()),o=-15+Math.round(30*Math.random()),i=-15+Math.round(30*Math.random());x.push(new THREE.Vector3(t,o,i))}n()}function n(){v=new THREE.Object3D;var e=new THREE.MeshBasicMaterial({color:16777215,transparent:!1});x.forEach(function(t){var o=new THREE.SphereGeometry(.2),n=new THREE.Mesh(o,e);n.position.copy(t),v.add(n)}),g=new THREE.ConvexGeometry(x),w=new THREE.Mesh(g,new THREE.MeshNormalMaterial({color:15263976,transparent:!0,opacity:.08})),h.add(w)}function a(e){"chat"==e?$(".container-modal-chat").fadeIn(400):"welcome"==e&&$(".modal-welcome").fadeIn(400),$("#container-exp-1").css({"-webkit-filter":"blur(15px)","-moz-filter":"blur(15px)","-ms-filter":"blur(15px)","-o-filter":"blur(15px)",filter:"blur(15px)"}),y.lookSpeed=.01}function r(){return $.ajax({url:"espace-membre/script.php",type:"POST",data:{action:"getMessage",id_conversation:j,lastid:G},success:function(e){var t=$.parseJSON(e);null!=t.msg&&null!=t.id&&($(".chatroom").append("<li>"+t.msg+"</li>"),G=t.id),$(".chatroom li").length>1&&$(".chatroom li:first-child").remove()}}),!1}function s(){$.ajax({url:"espace-membre/script.php",type:"POST",data:"action=getNotification",success:function(e){var t=$.parseJSON(e);null!=t&&(console.log("Notification : "+t.id_room[0]),N=t.id_room[0],$(".popup").fadeIn(400))}})}function c(){$.ajax({url:"espace-membre/script.php",type:"POST",data:"action=isConnected",success:function(e){var t=$.parseJSON(e),o=t.user_connected;for(J=[],J.push(q),i=0;i<o.length;i++){var n=o[i];J.push(W[n]),J[i].material.opacity=.2}}})}function p(){$.ajax({url:"espace-membre/script.php",type:"POST",data:"action=setStatistics",success:function(e){var t=$.parseJSON(e),o=t.nbr_shapes,n=t.nbr_shapes_connected,i=t.nbr_link_created,a=t.nbr_linkPerso_created,r=t.nbr_msg_sended;$(".chiffre1").html(o),$(".chiffre2").html(n),$(".chiffre3").html(i),$(".chiffre4").html(a),$(".chiffre5").html(r)}})}function l(){$.ajax({url:"espace-membre/script.php",type:"POST",data:{ID:O,action:"removeNotif"}})}function u(){requestAnimationFrame(u),T=b.getDelta(),y.update(T),TWEEN.update(),d.clear(),d.render(h,f)}var m,d,h,f,E,v,w,x,T,b,y,g,H,R,M,S,O,z,_,P,j,I,C,N,k,D,V,W=[],L=[],J=[],G=0,B=!0,F=!1;d=new THREE.WebGLRenderer,h=new THREE.Scene,b=new THREE.Clock,f=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e4),f.position.set(0,0,0),f.target=h.position.clone(),d.setClearColor(new THREE.Color(16777215,1)),d.shadowMapEnabled=!0,d.setSize(window.innerWidth,window.innerHeight),m=document.getElementById("container-exp-1"),m.appendChild(d.domElement),m.focus(),h.add(f),y=new THREE.FirstPersonControls(f,m),y.lookSpeed=.05,y.movementSpeed=170,y.noFly=!1,y.activeLook=!0,y.lookVertical=!0,y.constrainVertical=!1,y.verticalMin=0,y.verticalMax=0,y.lon=-150,y.lat=120,$.ajax({url:"espace-membre/script.php",type:"POST",data:"action=newMember",success:function(e){var o=$.parseJSON(e);F=o.new_member,F===!0&&(t(),$.ajax({url:"espace-membre/script.php",type:"POST",data:"action=activeMember"}))},complete:function(){$.ajax({url:"espace-membre/script.php",type:"POST",data:"action=setMatrix",success:function(t){for(I=$.parseJSON(t),C=I.position,z=C.length,i=0;z>i;i++){o();var n=e(C[i]),a=n[0].split(/,+/g);w.position.x=+a[0],w.position.y=+a[1],w.position.z=+a[2],w.name=i+1,W.push(w)}if(void 0!=I.user_a)for(i=0;i<I.user_a.length;i++){D=I.user_a[i],V=I.user_b[i];var r=new THREE.Geometry;r.vertices.push(new THREE.Vector3(W[+D].position.x,W[+D].position.y,W[+D].position.z),new THREE.Vector3(W[+V].position.x,W[+V].position.y,W[+V].position.z));for(var s=0;s<r.vertices.length;s++)r.colors[s]=new THREE.Color(Math.random(),Math.random(),Math.random());var l=new THREE.Line(r,new THREE.LineBasicMaterial({transparent:!0,opacity:.2,color:16777215,vertexColors:THREE.VertexColors}),THREE.LinePieces);h.add(l)}p(),c()},complete:function(e){O=+I.ID;var t=W[O];t.material.wireframe=!0,t.material.wireframeLinewidth=1,t.material.opacity=.2,t.scale.x,t.scale.y,t.scale.z=3,R=new TWEEN.Tween({x:f.position.x,y:f.position.y,z:f.position.z}).to({x:t.position.x,y:t.position.y,z:t.position.z},2e3).easing(TWEEN.Easing.Sinusoidal.In).onUpdate(function(){f.position.x=this.x,f.position.y=this.y,f.position.z=this.z}).onComplete(function(){F===!0&&a("welcome")}).start()}})}});var U=new THREE.MeshPhongMaterial({color:6052956,ambient:15132390,emissive:3618615,specular:8224125}),q=new THREE.Mesh(new THREE.BoxGeometry(20,20,20),U);q.position.set(0,0,0),q.name="logout",h.add(q),W.push(q),d.render(h,f),$(m).click(function(e){e.preventDefault();var t=new THREE.Vector3(e.clientX/window.innerWidth*2-1,2*-(e.clientY/window.innerHeight)+1,.5);t=t.unproject(f);var o=new THREE.Raycaster(f.position,t.sub(f.position).normalize()),n=o.intersectObjects(W);if(n.length>0&&n[0].object!=W[O]){var i=n[0].object;_=i.name,"logout"==_?$.ajax({url:"espace-membre/script.php",type:"POST",data:"action=isNotConnected",success:function(e){document.location.href="espace-membre/deconnexion.php"}}):(console.log("ID Forme sélectionnée : "+_),console.log("ID personnel : "+O),$.ajax({url:"espace-membre/script.php",type:"POST",data:{name_object:_,action:"createDiscussion"},success:function(e){var t=$.parseJSON(e);j=t.id_conversation,console.log("ID conversation : "+j),P=setInterval(r,3e3),clearInterval(A)}}),f.position.x!=i.position.x&&f.position.y!=i.position.y?R=new TWEEN.Tween({x:f.position.x,y:f.position.y,z:f.position.z}).to({x:i.position.x,y:i.position.y,z:i.position.z},2e3).easing(TWEEN.Easing.Sinusoidal.In).onUpdate(function(){f.position.x=this.x,f.position.y=this.y,f.position.z=this.z}).onComplete(function(){f.rotation=i.position,a("chat");var e=new THREE.Geometry;e.vertices.push(new THREE.Vector3(W[O].position.x,W[O].position.y,W[O].position.z),new THREE.Vector3(i.position.x,i.position.y,i.position.z));for(var t=0;t<e.vertices.length;t++)e.colors[t]=new THREE.Color(Math.random(),Math.random(),Math.random());var o=new THREE.Line(e,new THREE.LineBasicMaterial({transparent:!0,opacity:.3,color:16777215,vertexColors:THREE.VertexColors}),THREE.LinePieces);h.add(o)}).start():a("chat"))}}),$(".md-close").click(function(){return A=setInterval(s,1e4),clearInterval(P),y.lookSpeed=.05,$("#container-exp-1").css({"-webkit-filter":"blur(0px)","-moz-filter":"blur(0px)","-ms-filter":"blur(0px)","-o-filter":"blur(0px)",filter:"blur(0px)"}),$(".chatroom li").remove(),$(".container-modal-chat").fadeOut(400),$(".modal-welcome").fadeOut(400),l(),m.focus(),!1}),$(".disconnect").click(function(){$.ajax({url:"espace-membre/script.php",type:"POST",data:"action=isNotConnected",success:function(e){document.location.href="espace-membre/deconnexion.php"}})}),$("#chatForm").submit(function(e){e.preventDefault();var t=$("#message").val();return H=1,t.length>130?($(".text-lenght").html(t.length),$(".error-length").fadeIn(400),!1):(""!=t&&($(".error-length").fadeOut(400),$.ajax({url:"espace-membre/script.php",type:"POST",data:{message:t,action:"sendMessage",id_conversation:j,notif:H,name_object:_},success:function(e){r(),$("#message").val(""),$("#message").focus()}})),$(".chatroom li").length>=1&&$(".chatroom li:first-child").remove(),!1)});var A=setInterval(s,1e4);setInterval(function(){c(),p()},1e4),$(".left-button").click(function(){j=N,clearInterval(A),P=setInterval(r,3e3),$(".popup").fadeOut(400),a("chat"),l()}),$(".right-button").click(function(){$(".popup").fadeOut(400),l()}),u(),THREEx.WindowResize(d,f)});
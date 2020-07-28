var zmija, brzina_vrednost, brzina_ispis, poslednja_pozicija_x,poslednja_pozicija_y, igraliste, velicinazmije, hrana, zx, zy, hx, hy, sirina, t, pravac, brzina, izgubio_si, meni, zadnji_taster;
brzina_vrednost = document.getElementById("brzina");
brzina_ispis = document.getElementById("brzina_ispis");
brzina_ispis.innerHTML = brzina_vrednost.value;
brzina_vrednost.oninput = function() {
brzina_ispis.innerHTML = this.value;
promeni_brzinu();
}
function promeni_brzinu(){
brzina=1/brzina_vrednost.value*1000;
}
function pripremi() {
    promeni_brzinu();
    zmija=[];
    zy=[];
    zx=[];
    igraliste= document.getElementById("kontejner");
    sirina=getComputedStyle(document.documentElement).getPropertyValue("--sirina");
    zmija[0]=document.createElement("div");
    igraliste.appendChild(zmija[0]);
    hrana=document.createElement("div");
    igraliste.appendChild(hrana);
    zmija[0].classList.add("zmija");
    hrana.classList.add("hrana");
    podesi_poziciju();
    nacrtaj();
    izgubio_si=false;
    meni=document.getElementById(kraj);
    velicinazmije=0;
}
pripremi();
function podesi_poziciju(){
    podesi_zmiju();
    podesi_hranu();
}
function podesi_zmiju(){
    zx[0]=Math.floor(Math.random()*sirina+1);
    zy[0]=Math.floor(Math.random()*sirina+1);
}
function podesi_hranu(){
    hx=Math.floor(Math.random()*sirina+1);
    hy=Math.floor(Math.random()*sirina)+1;
    for(i=zx.length-1; i>=0; i--){
    if(zx[i]==hx && zy[i]==hy){
    podesi_hranu();
}}}
function nacrtaj(){
    nacrtaj_hranu();
    nacrtaj_zmiju();
}
function nacrtaj_hranu(){
    hrana.style.gridColumn=hx;
    hrana.style.gridRow=hy;
}
function nacrtaj_zmiju(){
    zmija[0].style.gridColumn=zx[0];
    zmija[0].style.gridRow=zy[0];
    if(zmija.length!=1){
    for(i=zmija.length-1; i>=1; i--){
        zmija[i].style.gridColumn=zx[i];
        zmija[i].style.gridRow=zy[i];
    }
    }
}
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (izgubio_si!=true){
    if(event.key=="ArrowLeft" && zadnji_taster!="desno"){
        clearInterval(t);
        pravac=[-1,0];
        zadnji_taster="levo";
        t=setInterval(pokreni_se, brzina);
    }
    else if(event.key=="ArrowRight" && zadnji_taster!="levo"){
        clearInterval(t);
        pravac=[1,0];
        zadnji_taster="desno";
        t=setInterval(pokreni_se, brzina);
    }
    else if(event.key=="ArrowUp" && zadnji_taster!="dole"){
        clearInterval(t);
        pravac=[0,-1];
        zadnji_taster="gore";
        t=setInterval(pokreni_se, brzina);
    }
    else if(event.key=="ArrowDown" && zadnji_taster!="gore"){
        clearInterval(t);
        pravac=[0,1];
        zadnji_taster="dole";
        t=setInterval(pokreni_se, brzina);
    }
}});
function pokreni_se(){
    poslednja_pozicija_x=zx[zx.length-1];
    poslednja_pozicija_y=zy[zx.length-1];
    for(i=zx.length-1; i>=1; i--){
        zx[i]=zx[i-1];
        zy[i]=zy[i-1];
    }
    zx[0]+=pravac[0];
    zy[0]+=pravac[1];
    for(i=zmija.length-1; i>=1; i--){
        if(zx[0]==zx[i] && zy[0]==zy[i]){
            krajigre();
        }
    }
    if(zx[0]<=0 || zx[0]>sirina || zy[0]<=0 || zy[0]>sirina){
        krajigre();
    }
    else{
    nacrtaj_zmiju();
    proveri_hranu();
}}
function proveri_hranu(){
    if(zx[0]==hx&&zy[0]==hy){
        jedi();
        podesi_hranu();
        nacrtaj_hranu();
    }
}
function jedi(){
    zmija[zmija.length]=document.createElement("div");
    zmija[zmija.length-1].classList.add("zmija");
    igraliste.appendChild(zmija[zmija.length-1]);
    zmija[zmija.length-1].style.gridColumn= poslednja_pozicija_x;
    zmija[zmija.length-1].style.gridRow=poslednja_pozicija_y;
    zx[zx.length]=poslednja_pozicija_x;
    zy[zy.length]=poslednja_pozicija_y;
    document.getElementById("rezultat").innerHTML=zmija.length;
}
function krajigre(){
    izgubio_si=true;
    clearInterval(t);
    kraj.style.height="100px";
    }
function nova(){
    for (i=zmija.length-1; i>=0 ; i--){
    igraliste.removeChild(zmija[i]);
    }
    igraliste.removeChild(hrana);
    izgubio_si=false;
    pripremi();
    kraj.style.height="0px";    
}
function podesavanja(){
    document.getElementById("podesavanja").style.height="100px";
}
function zatvoripodesavanja(){
    document.getElementById("podesavanja").style.height="0px";
}
var sirina_vrednost = document.getElementById("sirina");
var sirina_ispis = document.getElementById("sirina_ispis");
sirina_ispis.innerHTML = sirina_vrednost.value;
sirina_vrednost.oninput = function() {
sirina_ispis.innerHTML = this.value;
document.documentElement.style.setProperty("--sirina",sirina_vrednost.value);
console.log(getComputedStyle(document.documentElement).getPropertyValue("--sirina"));
nova();
}

/* DEBUG Detective — cenas em pixel art (mesmo código do jogo) */
(function(){
"use strict";
/* ============ CENAS EM PIXEL ART ============ */
const RM = (()=>{ try{ return matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){ return false; } })();
const SCN = {laptop:[192,120], phone:[192,108], chase:[128,60], arrest:[128,72]};
function rnd(seed){ let s = seed>>>0 || 1; return () => ((s = (Math.imul(s,1664525)+1013904223)>>>0) / 4294967296); }
function R(c,x,y,w,h,col){ c.fillStyle = col; c.fillRect(Math.round(x),Math.round(y),w,h); }
function S(c,map,x,y,pal){ for(let j=0;j<map.length;j++){ const row=map[j]; for(let i=0;i<row.length;i++){ const ch=row[i]; if(ch==="."||!pal[ch]) continue; c.fillStyle=pal[ch]; c.fillRect(Math.round(x+i),Math.round(y+j),1,1); } } }


function sky(c,W,H){ R(c,0,0,W,H,"#0d1422"); R(c,0,Math.floor(H*.45),W,H,"#111b2c"); }
function stars(c,W,H,t,seed){ const r=rnd(seed); for(let i=0;i<26;i++){ const x=r()*W|0, y=r()*H*0.45|0, ph=r()*6; if(Math.sin(t*2+ph)>-0.6) R(c,x,y,1,1, Math.sin(t*3+ph)>0.6?"#e8e2d2":"#5a6878"); } }
function moon(c,cx,cy,rad){ for(let y=-rad;y<=rad;y++) for(let x=-rad;x<=rad;x++) if(x*x+y*y<=rad*rad) R(c,cx+x,cy+y,1,1,"#e8e2d2"); R(c,cx-1,cy-1,2,1,"#c9c2b2"); R(c,cx+2,cy+2,1,1,"#c9c2b2"); }
function skyline(c,W,gy,t,seed){
  const r=rnd(seed); let x=-4;
  while(x<W){
    const w=12+(r()*16|0), h=18+(r()*Math.max(4,gy-30)|0), top=gy-h, col=r()<.5?"#18222f":"#1d293a", ant=r();
    R(c,x,top,w,h,col); R(c,x,top,w,1,"#2a3a50"); if(ant<.3) R(c,x+(w>>1),top-4,1,4,"#2a3a50");
    for(let wy=top+3; wy<gy-3; wy+=4) for(let wx=x+2; wx<x+w-2; wx+=4){ const v=r(); if(v<.32){ const off = v<.03 && Math.sin(t*4+wx*1.7)>0.3; R(c,wx,wy,2,2, off?"#2a3850":(v<.2?"#ffb84d":"#c98a3a")); } }
    x += w+1+(r()*3|0);
  }
}
function street(c,W,H,gy){ R(c,0,gy,W,3,"#2b2f36"); R(c,0,gy+3,W,H-gy-3,"#151a20"); const dy=gy+3+((H-gy-3)>>1); for(let x=2;x<W;x+=16) R(c,x,dy,8,1,"#5a6470");
  for(const lx of [Math.round(W*.22),Math.round(W*.72)]){ R(c,lx,gy-30,2,30,"#2a3442"); R(c,lx-2,gy-31,6,2,"#2a3442"); R(c,lx-1,gy-29,4,1,"#ffd88a"); c.globalAlpha=.07; c.fillStyle="#ffd88a"; c.beginPath(); c.moveTo(lx-1,gy-28); c.lineTo(lx+3,gy-28); c.lineTo(lx+12,gy); c.lineTo(lx-10,gy); c.fill(); c.globalAlpha=1; } }
function servers(c,W,H,gy,t){
  R(c,0,0,W,H,"#0a1017"); R(c,0,5,W,1,"#162231");
  const r=rnd(7);
  for(let x=6;x<W;x+=30){
    R(c,x-1,8,24,gy-8,"#05080b"); R(c,x,9,22,gy-9,"#1a2431");
    for(let y=12;y<gy-4;y+=5){
      R(c,x+2,y,18,3,"#111923"); R(c,x+15,y+1,3,1,"#2a3a4a");
      const n=1+(r()*3|0);
      for(let k=0;k<n;k++){ const ph=r()*10, sp=1+r()*4, cr=r(); const on=Math.sin(t*sp+ph)>0; R(c,x+4+k*3,y+1,1,1, on?(cr<.7?"#86e08f":"#ffb84d"):"#1f3326"); }
    }
  }
  R(c,0,gy,W,H-gy,"#16202b"); for(let x=0;x<W;x+=12) R(c,x,gy,1,H-gy,"#243342"); R(c,0,gy,W,1,"#2f4256");
}
function sLaptop(c,W,H,t){
  R(c,0,0,W,H,"#101823");
  R(c,6,8,52,46,"#05080b"); c.save(); c.beginPath(); c.rect(8,10,48,42); c.clip(); sky(c,W,60); stars(c,64,60,t,3); moon(c,46,18,4); skyline(c,64,52,t,5); c.restore();
  R(c,31,10,2,42,"#05080b"); R(c,8,30,48,2,"#05080b");
  R(c,166,10,20,28,"#05080b"); R(c,167,11,18,26,"#16202b"); R(c,167,11,18,6,"#2f8f84"); R(c,170,20,12,2,"#5a6878"); R(c,170,24,8,2,"#5a6878"); R(c,170,28,10,2,"#5a6878");
  R(c,0,90,W,30,"#2c2018"); R(c,0,88,W,3,"#4a3526"); for(let y=96;y<H;y+=6) R(c,0,y,W,1,"#33251b");
  c.globalAlpha=.1; R(c,24,91,144,10,"#ffb84d"); c.globalAlpha=1;
  R(c,32,6,128,78,"#05080b"); R(c,33,7,126,76,"#1f2836"); R(c,36,10,120,66,"#04090a"); R(c,95,8,2,1,"#3a4a59");
  c.globalAlpha=.3; for(let y=10;y<76;y+=2) R(c,36,y,120,1,"#000"); c.globalAlpha=1;
  for(let i=0;i<9;i++) R(c,30-i,84+i,132+2*i,1,i===0?"#5a6470":"#9aa6b2");
  R(c,21,93,150,2,"#5a6470");
  for(let ky=0;ky<2;ky++) for(let kx=0;kx<19;kx++) R(c,37+kx*6-ky*2,86+ky*2,4,1,"#6c7885");
  R(c,82,90,28,2,"#7f8b97");
  R(c,154,91,2,1, Math.sin(t*3)>0?"#86e08f":"#24402a");
  R(c,168,72,14,18,"#05080b"); R(c,169,73,12,16,"#e8e2d2"); R(c,169,73,12,2,"#3b2414"); R(c,171,80,8,3,"#2f8f84");
  R(c,182,76,3,1,"#05080b"); R(c,184,76,1,7,"#05080b"); R(c,182,82,3,1,"#05080b");
  for(let k=0;k<3;k++){ const ph=(t*0.9+k*0.33)%1; c.globalAlpha=Math.max(0,1-ph); R(c,171+k*3+Math.round(Math.sin((t+k)*3)),70-ph*16,1,2,"#8d9aa6"); } c.globalAlpha=1;
}
function sPhone(c,W,H,t){
  R(c,0,0,W,H,"#2c2018"); const r=rnd(9); for(let y=0;y<H;y+=3+(r()*4|0)) R(c,0,y,W,1,"#33251b");
  R(c,6,14,40,76,"#05080b"); R(c,7,15,38,74,"#e8e2d2"); for(let y=22;y<88;y+=5) R(c,9,y,34,1,"#b9c2cc"); R(c,13,15,1,74,"#ff7a6b");
  for(let y=22,k=0;y<62;y+=5,k++) R(c,16,y-2,8+(k*7)%18,1,"#5a6878");
  R(c,18,64,20,10,"#05080b"); R(c,19,65,18,8,"#e8e2d2"); R(c,21,67,4,4,"#5b4b6e"); R(c,27,68,8,1,"#8d9aa6");
  for(let i=0;i<20;i++) R(c,24+i,100-(i>>1),2,2,i<3?"#e8e2d2":"#ffb84d");
  R(c,146,18,40,30,"#05080b"); R(c,147,19,38,28,"#e8e2d2"); R(c,147,19,38,7,"#2f8f84"); R(c,150,29,10,12,"#5a6878"); R(c,152,31,6,4,"#c98c64"); R(c,163,30,18,2,"#8d9aa6"); R(c,163,34,14,2,"#8d9aa6"); R(c,163,38,16,2,"#8d9aa6");
  c.globalAlpha=.25; for(let a=0;a<40;a++){ const ang=a/40*Math.PI*2; R(c,166+Math.cos(ang)*11,78+Math.sin(ang)*9,1,1,"#1a120c"); } c.globalAlpha=1;
  R(c,56,4,80,100,"#05080b"); R(c,57,5,78,98,"#232c3a"); R(c,60,8,72,92,"#0a1220"); R(c,88,6,16,1,"#05080b");
  if(RM || (t%1.6)<0.7){ const o=RM?0:Math.floor(t*12)%2; for(const [x,d] of [[51,-1],[140,1]]){ for(const yy of [26,68]){ R(c,x+d*o,yy+3,1,6,"#ffb84d"); R(c,x+d*(o+2),yy,1,12,"#c98a3a"); } } }
}
/* ---------- personagens (estilo chibi, cabeça grande) ---------- */
const PAL_AG = {k:"#1b1f2a",c:"#26406e",C:"#18284a",g:"#f2c14e",h:"#3b2a20",s:"#f2c09a",S:"#d79c76",e:"#1b1f2a",m:"#8a4a3a",u:"#2c4a80",U:"#1f3560",b:"#15171c",y:"#f2c14e",B:"#0f1114"};
const PAL_SUS = {k:"#10131c",L:"#4a5275",h:"#30364f",H:"#20253a",m:"#e6eaf0",M:"#b7bfcc",e:"#10131c",l:"#aab3c0",o:"#f29a38",b:"#3b8fd6",U:"#2b3a5c",B:"#d9dde4"};
const PAL_PR = {k:"#1b1f2a",h:"#3b2a20",s:"#f0bc94",S:"#cf9a74",e:"#1b1f2a",m:"#8a4a3a",o:"#f08a24",O:"#c4661a",L:"#ffb35c",g:"#c9d1d9",U:"#c4661a",B:"#2a2d33"};
const AG_TOP = [
  "...kkkkkkk....",
  "..kcccccccck..",
  ".kcccgggcccck.",
  ".kCCCCCCCCCCCk",
  "..khhsssssssk.",
  "..khssesssesk.",
  "..kSsssssssk..",
  "...kSssmsSk...",
  "....kkSSkk....",
  "...kuuuuuuk...",
  "..kuuuuguuuk..",
  "..kuUuuuuuUk..",
  "..ksbbbybbsk..",
  "...kUUUUUUk..."
];
const SUS_TOP = [
  "....kkkkkk....",
  "...kLhhhhhk...",
  "..kLhhhhhhhk..",
  "..khhmmmmmhk..",
  "..khmmememhk..",
  "..khmMMMMmhk..",
  "..khhmmmmhhk..",
  "...khhhhhhk...",
  "..khhhhhhhhk..",
  ".kkkkkkkkkhhk.",
  ".klllllllkhhk.",
  ".kllolbllkhhk.",
  ".klllllllkhhk.",
  ".kkkkkkkkkHHk."
];
const PR_TOP = [
  "...kkkkkkk....",
  "..khhhhhhhk...",
  ".khhhhhhhhhk..",
  ".khsssssssshk.",
  ".kssesssessk..",
  ".ksssssssssk..",
  "..kssSmmSsk...",
  "...kkSSSkk....",
  "..koooooooOk..",
  ".kooLoooooOOk.",
  ".koLooooooOOk.",
  ".kooosggsoOOk.",
  ".kooooooooOOk.",
  "..koooooooOk.."
];
const LEGS_STAND = ["...kUUkUUk....","...kUUkUUk....","..kBBBkBBBk...","..kkkkkkkkk..."];
const LEGS_A = ["..kUUk.kUUk...",".kUUk...kUUk..",".kBBBk..kBBBk.",".kkkk....kkkk."];
const LEGS_B = ["...kUUUUk.....","...kUUkBBk....","..kBBBkkk.....","..kkkk........"];
function person(c,top,pal,x,y,legs){ S(c,top,x,y,pal); S(c,legs,x,y+top.length,pal); }
/** corredor: alterna as pernas e sobe 1 pixel no passo */
function runner(c,x,y,fr,top,pal){ const b = fr?0:-1; person(c,top,pal,x,y+b,fr?LEGS_B:LEGS_A); }
function shadow(c,x,y,w){ c.globalAlpha=.3; R(c,x+2,y,w-4,1,"#000"); R(c,x+3,y+1,w-6,1,"#000"); c.globalAlpha=1; }

/* ---------- viatura (sedã branco com frente e traseira cinza-escuro) ---------- */
function car(c,x,y,t,beam){
  x=Math.round(x); y=Math.round(y);
  const on=Math.floor(t*7)%2, K="#12151c", W="#eef1f5", Ws="#c8ced8", D="#3d434d", Dh="#565d69", G="#2a3242", Gh="#5d6f88";
  // sombra
  c.globalAlpha=.35; R(c,x+3,y+16,36,1,"#000"); c.globalAlpha=1;
  // farol
  if(beam){ c.globalAlpha=.13; c.fillStyle="#ffe9a8"; c.beginPath(); c.moveTo(x+40,y+8); c.lineTo(x+70,y+3); c.lineTo(x+70,y+15); c.closePath(); c.fill(); c.globalAlpha=1; }
  // giroflex com raios
  R(c,x+16,y,8,2,K); R(c,x+17,y,3,1,on?"#ff4a3d":"#7a2620"); R(c,x+20,y,3,1,on?"#22356e":"#4aa0ff");
  if(on){ R(c,x+15,y-2,1,1,"#ff4a3d"); R(c,x+14,y-3,1,1,"#ff4a3d"); R(c,x+17,y-2,1,1,"#ff4a3d"); R(c,x+18,y-3,1,1,"#ff4a3d"); }
  else  { R(c,x+24,y-2,1,1,"#4aa0ff"); R(c,x+25,y-3,1,1,"#4aa0ff"); R(c,x+22,y-2,1,1,"#4aa0ff"); R(c,x+21,y-3,1,1,"#4aa0ff"); }
  // teto e vidros
  R(c,x+14,y+2,12,1,K);
  R(c,x+12,y+3,1,1,K); R(c,x+13,y+3,14,1,W); R(c,x+27,y+3,1,1,K);
  for(let i=0;i<3;i++){
    const yy=y+4+i, l=x+11-i, r=x+28+i;
    R(c,l,yy,1,1,K); R(c,l+1,yy,r-l-1,1,G); R(c,r,yy,1,1,K);
    R(c,x+19,yy,2,1,W);
  }
  R(c,x+13,y+4,2,1,Gh); R(c,x+22,y+4,3,1,Gh); R(c,x+21,y+5,1,1,Gh);
  // carroceria
  R(c,x+1,y+7,39,1,K);
  for(let yy=y+8; yy<y+13; yy++){
    R(c,x+1,yy,1,1,K); R(c,x+2,yy,8,1,D); R(c,x+10,yy,20,1,W); R(c,x+30,yy,9,1,D); R(c,x+39,yy,1,1,K);
  }
  R(c,x+2,y+8,8,1,Dh); R(c,x+30,y+8,9,1,Dh); R(c,x+10,y+12,20,1,Ws);
  R(c,x+19,y+8,1,5,"#9aa3b0"); R(c,x+16,y+9,2,1,"#5a606b"); R(c,x+26,y+9,2,1,"#5a606b");
  R(c,x+38,y+9,2,2,"#fff2b0"); R(c,x+1,y+9,2,2,"#e8443a");
  R(c,x+1,y+13,39,1,K); R(c,x+40,y+10,1,3,K); R(c,x,y+10,1,3,K);
  // rodas
  for(const wx of [x+9,x+31]){
    R(c,wx-3,y+12,7,4,K); R(c,wx-2,y+11,5,6,K); R(c,wx-2,y+12,5,4,"#111317");
    R(c,wx-1,y+13,3,2,"#b9bfc9"); R(c,wx,y+13+(Math.floor(t*10)%2),1,1,"#5a606b");
  }
}

function disc(c,cx,cy,r,col){ for(let y=-r;y<=r;y++){ const w=Math.floor(Math.sqrt(r*r-y*y+r*0.8)); R(c,cx-w,cy+y,w*2+1,1,col); } }
/* ---------- cidade ao entardecer, em camadas (estilo skyline de São Paulo) ---------- */
const CACHE = {};
function cityDusk(c,W,H,gy,t,seed){
  const key="dusk"+W+H+gy+seed;
  if(!CACHE[key]){
    const cv=document.createElement("canvas"); cv.width=W; cv.height=H; const g=cv.getContext("2d");
    const r=rnd(seed);
    // céu em faixas: roxo no alto, rosa e pêssego no horizonte
    const sky=["#2e2652","#3d2d5e","#553668","#704172","#8e4d7a","#ae5d80","#c96e84","#de8486","#ec9c8c"];
    const bh=Math.ceil((gy-6)/sky.length);
    sky.forEach((col,i)=>R(g,0,i*bh,W,bh,col));
    // pontilhado entre as faixas para suavizar
    for(let i=1;i<sky.length;i++) for(let x=(i%2);x<W;x+=2) R(g,x,i*bh,1,1,sky[i-1]);
    // sol grande se pondo atrás da cidade
    const sx=Math.round(W*.42), sy=gy-20;
    g.globalAlpha=.25; disc(g,sx,sy,13,"#ffd2a0"); g.globalAlpha=.45; disc(g,sx,sy,10,"#ffd9ae"); g.globalAlpha=1; disc(g,sx,sy,7,"#fff0d2");
    // camada distante (rosa, com névoa)
    for(let x=-2;x<W;){
      const w=4+(r()*7|0), h=10+(r()*16|0), top=gy-4-h;
      R(g,x,top,w,h+4,"#d48a98");
      for(let wy=top+2; wy<gy-4; wy+=2) for(let wx=x+1; wx<x+w-1; wx+=2) if(r()<.25) R(g,wx,wy,1,1,"#e8a7b0");
      x+=w;
    }
    // torre de TV com antena
    const tx=Math.round(W*.78);
    R(g,tx,gy-34,3,30,"#c97b8e"); R(g,tx-1,gy-30,5,3,"#c97b8e"); R(g,tx+1,gy-44,1,10,"#c97b8e"); R(g,tx+1,gy-45,1,1,"#ff6a6a");
    // torre de topo arredondado
    const rx=Math.round(W*.12); R(g,rx,gy-30,7,26,"#c97b8e"); disc(g,rx+3,gy-30,3,"#c97b8e");
    // camada do meio (malva)
    for(let x=-3;x<W;){
      const w=6+(r()*9|0), h=8+(r()*14|0), top=gy-3-h;
      R(g,x,top,w,h+3,"#93597d"); R(g,x,top,w,1,"#a86b8f");
      for(let wy=top+2; wy<gy-3; wy+=3) for(let wx=x+1; wx<x+w-1; wx+=2){ const v=r(); if(v<.3) R(g,wx,wy,1,1,v<.08?"#ffd27a":"#b77a9a"); }
      x+=w+(r()*2|0);
    }
    // camada da frente (azul-petróleo escuro, com faixas verdes e janelas quentes)
    for(let x=-2;x<W;){
      const w=9+(r()*9|0), h=8+(r()*16|0), top=gy-h, kind=r();
      const body = kind<.35 ? "#1f3a46" : kind<.7 ? "#262a40" : "#2c2440";
      R(g,x,top,w,h,"#141626"); R(g,x+1,top+1,w-2,h-1,body);
      if(kind<.35){
        for(let wy=top+3; wy<gy-1; wy+=3) R(g,x+2,wy,w-4,1, r()<.75?"#5fbf8f":"#2f6a5a");
      } else {
        for(let wy=top+3; wy<gy-1; wy+=3) for(let wx=x+2; wx<x+w-2; wx+=2){ const v=r(); R(g,wx,wy,1,1, v<.3?"#ffcf7a":v<.4?"#9fe0b8":"#3a3550"); }
      }
      if(r()<.25){ R(g,x+(w>>1),top-4,1,4,"#141626"); }
      if(r()<.2){ // telhado em triângulo
        for(let k=0;k<4;k++) R(g,x+1+k,top-k,w-2-2*k,1,"#141626");
      }
      x+=w;
    }
    // estrelas no alto
    for(let i=0;i<14;i++) R(g,r()*W|0,r()*(gy*.3)|0,1,1,"#f4e3f0");
    CACHE[key]=cv;
  }
  c.drawImage(CACHE[key],0,0);
}

/* ---------- escritório do RH (paredes brancas, janelas com a cidade) ---------- */
const GL = {R:["110","101","110","101","101"],H:["101","101","111","101","101"],1:["010","110","010","010","111"]};
function txt3(c,s,x,y,col){ let cx=x; for(const ch of s){ const g=GL[ch]; if(g) for(let j=0;j<5;j++) for(let i=0;i<3;i++) if(g[j][i]==="1") R(c,cx+i,y+j,1,1,col); cx+=4; } }
function office(c,W,H,gy,t){
  const K="#2f3542";
  R(c,0,0,W,H,"#eef1f4");
  R(c,0,gy-3,W,3,"#d6dbe2"); R(c,0,gy-3,W,1,"#c3c9d2");
  // janelas mostrando a cidade lá fora
  const key="officewin"+W+gy;
  if(!CACHE[key]){
    const cv=document.createElement("canvas"); cv.width=W; cv.height=gy; cityDusk(cv.getContext("2d"),W,gy,gy,0,9); CACHE[key]=cv;
  }
  for(const wx of [4,34]){
    R(c,wx,3,24,17,"#9aa3b0");
    c.drawImage(CACHE[key], wx*2, Math.max(0,gy-28), 22, 15, wx+1, 4, 22, 15);
    R(c,wx+12,4,1,15,"#9aa3b0"); R(c,wx,11,24,1,"#9aa3b0"); R(c,wx-1,20,26,1,"#c3c9d2");
  }
  // quadro branco
  R(c,64,4,26,14,K); R(c,65,5,24,12,"#fbfcfd"); R(c,65,16,24,1,"#c9ced6");
  R(c,67,7,10,1,"#3b8fd6"); R(c,67,9,14,1,"#9aa3b0"); R(c,67,11,8,1,"#e0443a"); R(c,79,7,6,4,"#f2c14e");
  // relógio
  disc(c,98,10,5,"#2c4a80"); disc(c,98,10,4,"#fbfcfd"); R(c,98,7,1,4,K); R(c,98,10,3,1,K);
  // calendário e placa do RH
  R(c,107,4,9,11,K); R(c,108,5,7,9,"#fbfcfd"); R(c,108,5,7,3,"#e0443a"); txt3(c,"1",110,8,K);
  R(c,W-11,5,10,7,K); R(c,W-10,6,8,5,"#2f8f84"); txt3(c,"RH",W-10,6,"#e8f4f2");
  // bebedouro
  const bx=4; R(c,bx,gy-15,8,15,K); R(c,bx+1,gy-14,6,14,"#b9c0ca"); R(c,bx+2,gy-11,4,3,"#5a6374"); R(c,bx+2,gy-11,1,1,"#e0443a"); R(c,bx+4,gy-11,1,1,"#3b8fd6");
  R(c,bx+1,gy-22,6,7,K); R(c,bx+2,gy-21,4,6,"#7cc4ec"); R(c,bx+2,gy-19,4,1,"#a8dbf5"); R(c,bx+2,gy-17,4,1,"#a8dbf5");
  // mesas com notebook e papéis
  for(const [dx,extra] of [[18,"mug"],[66,"papers"]]){
    R(c,dx,gy-11,40,2,K); R(c,dx+1,gy-11,38,1,"#8a6a4a");
    R(c,dx+1,gy-9,38,9,K); R(c,dx+2,gy-9,36,8,"#c4c9d1"); R(c,dx+4,gy-7,18,6,"#d6dbe2"); R(c,dx+30,gy-9,1,8,"#a9b0ba");
    R(c,dx+12,gy-19,12,8,K); R(c,dx+13,gy-18,10,6,"#1f3a46");
    for(let row=0; row<3; row++) for(let col=0; col<3; col++){ const on=(row*3+col+Math.floor(t*2))%7!==0; R(c,dx+14+col*3,gy-17+row*2,2,1,on?"#5fe0a0":"#2a6a54"); }
    R(c,dx+10,gy-12,16,1,"#4a5262");
    if(extra==="mug"){ R(c,dx+3,gy-15,4,4,K); R(c,dx+4,gy-14,2,3,"#e8e2d2"); R(c,dx+30,gy-14,7,3,K); R(c,dx+31,gy-13,5,2,"#2f8f84"); }
    else { R(c,dx+3,gy-15,3,4,"#c98a3a"); R(c,dx+4,gy-17,1,2,"#e0443a"); R(c,dx+5,gy-17,1,2,"#2f8f84"); for(let k=0;k<4;k++){ R(c,dx+29,gy-12-k*1,9,1,K); R(c,dx+30,gy-12-k*1,7,1,"#f4f4f0"); } }
  }
  // piso claro
  R(c,0,gy,W,H-gy,"#cfd4db"); R(c,0,gy,W,1,"#b8bfc9");
  for(let x=0;x<W;x+=12) R(c,x,gy+1,1,H-gy,"#c2c8d0");
  R(c,0,gy+8,W,1,"#c2c8d0");
}

/* ---------- delegacia: cela branca, preso dentro e policial do lado de fora ---------- */
function jail(c,W,H,gy,t){
  const K="#2f3542";
  R(c,0,0,W,H,"#e9ecf0"); R(c,0,gy-14,W,14,"#d9dee5"); R(c,0,gy-14,W,1,"#c3c9d2");
  // emblema da delegacia na parede (estrela dourada)
  const ex=14, ey=12;
  disc(c,ex,ey,6,"#2c4a80"); disc(c,ex,ey,5,"#365a96");
  R(c,ex,ey-4,1,8,"#f2c14e"); R(c,ex-4,ey-1,9,2,"#f2c14e"); R(c,ex-2,ey-2,5,5,"#f2c14e"); R(c,ex-3,ey+2,2,2,"#f2c14e"); R(c,ex+2,ey+2,2,2,"#f2c14e");
  // quadro de avisos e luminária
  R(c,26,6,16,11,K); R(c,27,7,14,9,"#c9a35a"); R(c,28,8,5,4,"#fbfcfd"); R(c,34,9,5,5,"#fbfcfd"); R(c,30,13,3,2,"#f2c14e");
  R(c,6,gy-1,18,1,"#b8bfc9");
  // cela
  const cx=48, cw=W-cx-2;
  R(c,cx,2,cw,gy-2,"#dfe3e9");
  // beliche
  const bx=cx+cw-24;
  R(c,bx,gy-24,22,1,"#8a93a0"); R(c,bx,gy-24,1,24,"#8a93a0"); R(c,bx+21,gy-24,1,24,"#8a93a0");
  R(c,bx+1,gy-20,20,3,"#8a93a0"); R(c,bx+1,gy-20,20,2,"#fbfcfd"); R(c,bx+2,gy-21,5,1,"#fbfcfd");
  R(c,bx+1,gy-8,20,3,"#8a93a0"); R(c,bx+1,gy-8,20,2,"#fbfcfd"); R(c,bx+2,gy-9,5,1,"#fbfcfd");
  // vaso sanitário
  const vx=cx+6; R(c,vx,gy-6,7,6,K); R(c,vx+1,gy-5,5,5,"#fbfcfd"); R(c,vx,gy-9,4,3,K); R(c,vx+1,gy-8,2,2,"#fbfcfd");
  // piso
  R(c,0,gy,W,H-gy,"#c9cfd7"); R(c,0,gy,W,1,"#b3bac4"); for(let x=0;x<W;x+=10) R(c,x,gy+1,1,H-gy,"#bec5ce");
}
function jailBars(c,W,gy){
  const cx=48, cw=W-cx-2;
  // grades brancas por cima do preso
  R(c,cx,2,cw,2,"#9aa3b0"); R(c,cx,3,cw,1,"#f6f8fa");
  R(c,cx,gy-16,cw,2,"#9aa3b0"); R(c,cx,gy-16,cw,1,"#f6f8fa");
  for(let x=cx; x<cx+cw; x+=10){ R(c,x,2,2,gy-2,"#9aa3b0"); R(c,x,2,1,gy-2,"#fbfcfd"); }
  R(c,cx+cw-1,2,1,gy-2,"#9aa3b0");
  // fechadura
  R(c,cx+40,gy-22,4,5,"#5a6374"); R(c,cx+41,gy-20,2,1,"#f2c14e");
}

/* ---------- cenas ---------- */
function sChase(c,W,H,t,env){
  const gy=H-16;
  if(env==="e2") servers(c,W,H,gy,t);
  else if(env==="e3") office(c,W,H,gy,t);
  else { cityDusk(c,W,H,gy,t,17); street(c,W,H,gy); }
  const P=5.5, tt=t%P, fr=Math.floor(t*9)%2;
  const rx=-14+tt*52;
  shadow(c,rx,gy,14);
  runner(c,rx,gy-17,fr,SUS_TOP,PAL_SUS);
  if(env==="e1"||!env) car(c,-48+(tt-1.0)*64,gy-13,t,true);
  else { const ax=-14+(tt-0.9)*56; shadow(c,ax,gy,14); runner(c,ax,gy-17,fr^1,AG_TOP,PAL_AG); }
}
function sArrest(c,W,H,t){
  const gy=H-14;
  jail(c,W,H,gy,t);
  const ax=26, px=67; // preso entre duas barras da grade
  shadow(c,ax,gy,14); shadow(c,px,gy,14);
  person(c,PR_TOP,PAL_PR,px,gy-17,LEGS_STAND);
  jailBars(c,W,gy);
  person(c,AG_TOP,PAL_AG,ax,gy-17,LEGS_STAND);
  if(RM || Math.floor(t*2)%2===0){ R(c,px+6,gy-26,2,5,"#ffb84d"); R(c,px+6,gy-20,2,1,"#ffb84d"); }
}

const STATIC_T = {laptop:0.3, phone:0.2, chase:2.1, arrest:0};
function drawScene(cv,t){
  const c=cv.getContext("2d"); if(!c) return;
  const k=cv.dataset.scene, [W,H]=SCN[k]; const tt = (t===null) ? STATIC_T[k] : t;
  c.clearRect(0,0,W,H);
  if(k==="laptop") sLaptop(c,W,H,tt); else if(k==="phone") sPhone(c,W,H,tt);
  else if(k==="chase") sChase(c,W,H,tt,cv.dataset.env); else if(k==="arrest") sArrest(c,W,H,tt);
}
let loopOn=false, lastDraw=0;
function tick(ts){
  const cvs=document.querySelectorAll("canvas[data-scene]");
  if(!cvs.length){ loopOn=false; return; }
  if(ts-lastDraw>=50){ lastDraw=ts; cvs.forEach(cv=>drawScene(cv,ts/1000)); }
  requestAnimationFrame(tick);
}
function scenesInit(){
  document.querySelectorAll("canvas[data-scene]").forEach(cv=>{ const [W,H]=SCN[cv.dataset.scene]; cv.width=W; cv.height=H; drawScene(cv, RM?null:performance.now()/1000); });
  if(!RM && !loopOn){ loopOn=true; requestAnimationFrame(tick); }
}

if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", scenesInit); else scenesInit();
})();

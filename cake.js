const blowButton=document.getElementById("blowButton");
const againButton=document.getElementById("againButton");
const cakeScene=document.querySelector(".cake-scene");
const wishMessage=document.getElementById("wishMessage");
const confetti=document.getElementById("confetti");
let blown=false;

function celebrate(){const colors=["#ec4d7a","#ffbf40","#7c6cff","#5ec7ad","#ff8d67"];for(let i=0;i<100;i++){const piece=document.createElement("i");piece.className="piece";piece.style.left=`${Math.random()*100}%`;piece.style.background=colors[Math.floor(Math.random()*colors.length)];piece.style.setProperty("--drift",`${(Math.random()-.5)*230}px`);piece.style.animationDelay=`${Math.random()*.45}s`;confetti.appendChild(piece);piece.addEventListener("animationend",()=>piece.remove());}}

blowButton.addEventListener("click",()=>{if(blown)return;blown=true;cakeScene.classList.add("blown");blowButton.hidden=true;againButton.hidden=false;wishMessage.textContent="Your wish is on its way! May this year be full of love, laughter, and magic. 💖";celebrate();});
againButton.addEventListener("click",()=>{blown=false;cakeScene.classList.remove("blown");againButton.hidden=true;blowButton.hidden=false;wishMessage.textContent="The candles are glowing again—make one more beautiful wish!";});

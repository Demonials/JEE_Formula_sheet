let DB,subject="Physics",cls="11th";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const getSaved=()=>JSON.parse(localStorage.getItem("jeeSaved")||"[]");
const getRev=()=>JSON.parse(localStorage.getItem("jeeRev")||"[]");
function startApp(d){DB=d;$("#count").textContent=d.formulas.length+"+";renderQuick();renderRev();}
if(window.JEE_DATA) startApp(window.JEE_DATA);
else fetch("data.json").then(r=>r.json()).then(startApp).catch(()=>{$("#quick").innerHTML="<div class=\"card\"><h3>Formula database could not load.</h3><small>Run this folder with a local server (for example: python -m http.server 8000).</small></div>";});
function esc(x){return x.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}
function card(f){let s=getSaved().includes(f.id);return `<article class="card"><button class="star ${s?"saved":""}" onclick="save(${f.id})">★</button><button class="copy" onclick="copyFormula(${f.id})" title="Copy formula">⧉</button><span class="tag">${f.subject} • ${f.class}</span><h3>${esc(f.name)}</h3><div class="eq">${esc(f.formula)}</div><small>${esc(f.chapter)}</small></article>`}
function renderQuick(){let x=DB.formulas.filter(f=>f.class===cls).slice(0,9);$("#quick").innerHTML=x.map(card).join("")}
function library(s){subject=s;$("#home").classList.add("hidden");$("#bookmarks").classList.add("hidden");$("#results").classList.add("hidden");$("#revision").classList.add("hidden");$("#library").classList.remove("hidden");$("#kicker").textContent=s.toUpperCase();$("#title").textContent=s.toUpperCase();let arr=DB.chapters[s][cls]||[];$("#chapters").innerHTML=arr.map((ch,i)=>{let fs=DB.formulas.filter(f=>f.subject===s&&f.class===cls&&f.chapter===ch);return `<article class="chapter" onclick="this.classList.toggle('open')"><h3>${i+1}. ${ch}</h3><p>${fs.length} formula entries</p><div class="inside">${fs.map(card).join("")||"<div class='card'>Chapter mapped. Formula entries can be expanded in data.json.</div>"}</div></article>`}).join("")}
function home(){ $$(".page").forEach(x=>x.classList.add("hidden"));$("#home").classList.remove("hidden");}
function allFormulas(){ $$(".page").forEach(x=>x.classList.add("hidden"));$("#all").classList.remove("hidden"); renderAll();}
function renderAll(){ if(!DB)return; let fs=DB.formulas.filter(f=>f.class===cls); $("#allCards").innerHTML=fs.map(card).join(""); }
function copyFormula(id){const f=DB.formulas.find(x=>x.id===id); if(!f)return; navigator.clipboard?.writeText(f.formula).then(()=>toast("Formula copied"));}
function bookmarks(){ $$(".page").forEach(x=>x.classList.add("hidden"));$("#bookmarks").classList.remove("hidden");let fs=DB.formulas.filter(f=>getSaved().includes(f.id));$("#saved").innerHTML=fs.length?fs.map(card).join(""):"<div class='card'><h3>No bookmarks yet.</h3><small>Star a formula to save it.</small></div>";$("#sideSaved").innerHTML=fs.slice(0,5).map(f=>`<p>${esc(f.name)}</p>`).join("")||"No saved formulas"}
function save(id){let a=getSaved();a=a.includes(id)?a.filter(x=>x!==id):[...a,id];localStorage.setItem("jeeSaved",JSON.stringify(a));renderQuick();bookmarks();toast(a.includes(id)?"Formula bookmarked":"Bookmark removed")}
function search(q){q=q.trim().toLowerCase();if(!q)return home();$$(".page").forEach(x=>x.classList.add("hidden"));$("#results").classList.remove("hidden");let fs=DB.formulas.filter(f=>`${f.name} ${f.formula} ${f.chapter} ${f.subject} ${f.class}`.toLowerCase().includes(q));$("#resultCards").innerHTML=fs.length?fs.map(card).join(""):"<div class='card'><h3>No match.</h3><small>Try a chapter, formula name, subject or keyword.</small></div>"}
function renderRev(){if(!DB)return;let arr=[];Object.entries(DB.chapters).forEach(([s,c])=>Object.entries(c).forEach(([yr,chs])=>chs.forEach(ch=>{let k=s+"|"+yr+"|"+ch;arr.push(`<label><input type="checkbox" ${getRev().includes(k)?"checked":""} onchange="rev('${k.replaceAll("'","\\'")}')"> ${s} • ${yr} • ${ch}</label>`)})));$("#rev").innerHTML=arr.join("");let p=Math.round(getRev().length/arr.length*100)||0;$("#ring").textContent=p+"%";$("#ring").style.setProperty("--p",p+"%")}
function rev(k){let a=getRev();a=a.includes(k)?a.filter(x=>x!==k):[...a,k];localStorage.setItem("jeeRev",JSON.stringify(a));renderRev()}
function toast(t){let x=$("#toast");x.textContent=t;x.style.cssText="position:fixed;right:22px;bottom:22px;background:#0c1b28;border:1px solid #34536c;padding:10px 14px;border-radius:7px;z-index:20";setTimeout(()=>x.style.cssText="",1300)}
$$("nav button").forEach(b=>b.onclick=()=>{let p=b.dataset.page;if(p==="home")home();else if(p==="all")allFormulas();else if(p==="bookmarks")bookmarks();else if(p==="revision"){$$(".page").forEach(x=>x.classList.add("hidden"));$("#revision").classList.remove("hidden");renderRev()}else library(p)});
$$(".subjects button").forEach(b=>b.onclick=()=>library(b.dataset.sub));
$$(".toggle button").forEach(b=>b.onclick=()=>{cls=b.dataset.class;$$(".toggle button").forEach(x=>x.classList.toggle("sel",x.dataset.class===cls));if($("#home").classList.contains("hidden")&&subject&& !$("#all").classList.contains("hidden")) renderAll(); else if($("#home").classList.contains("hidden")&&subject)library(subject);else renderQuick()});
$("#search").oninput=e=>search(e.target.value);$("#side").oninput=e=>search(e.target.value);
$$(".chips button").forEach(b=>b.onclick=()=>{$("#search").value=b.textContent;search(b.textContent)});
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#search").focus()}});
$("#theme").onclick=()=>document.body.classList.toggle("light");
$("#menu").onclick=()=>document.querySelector(".layout>aside:first-child").classList.toggle("open");

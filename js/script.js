const root=document.documentElement;
const themeButton=document.querySelector(".theme-button");
const menuButton=document.querySelector(".menu-button");
const navigation=document.querySelector("#site-navigation");

function applyTheme(theme){
  root.setAttribute("data-theme",theme);
  if(themeButton){
    const dark=theme==="dark";
    themeButton.setAttribute("aria-pressed",String(dark));
    themeButton.setAttribute("aria-label",dark?"Switch to light theme":"Switch to dark theme");
  }
}
const saved=localStorage.getItem("portfolio-theme");
if(saved==="dark"||saved==="light") applyTheme(saved);

if(themeButton){
  themeButton.addEventListener("click",()=>{
    const next=root.getAttribute("data-theme")==="dark"?"light":"dark";
    localStorage.setItem("portfolio-theme",next);
    applyTheme(next);
  });
}
if(menuButton&&navigation){
  menuButton.addEventListener("click",()=>{
    const open=navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded",String(open));
    menuButton.querySelector(".sr-only").textContent=open?"Close navigation menu":"Open navigation menu";
  });
  navigation.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded","false");
    menuButton.querySelector(".sr-only").textContent="Open navigation menu";
  }));
}
document.querySelectorAll(".current-year").forEach(el=>el.textContent=new Date().getFullYear());

const form=document.querySelector("#contact-form");
if(form){
  const ids=["name","email","subject","message"];
  const messages={
    name:"Please enter your name using at least 2 characters.",
    email:"Please enter a valid email address.",
    subject:"Please enter a subject using at least 3 characters.",
    message:"Please enter a message using at least 10 characters."
  };
  function validate(field){
    const error=document.querySelector("#"+field.id+"-error");
    if(field.validity.valid){error.textContent="";field.removeAttribute("aria-invalid");return true;}
    error.textContent=messages[field.id];field.setAttribute("aria-invalid","true");return false;
  }
  ids.forEach(id=>{
    const f=document.querySelector("#"+id);
    f.addEventListener("blur",()=>validate(f));
    f.addEventListener("input",()=>{if(f.getAttribute("aria-invalid")==="true")validate(f);});
  });
  form.addEventListener("submit",e=>{
    e.preventDefault(); let ok=true;
    ids.forEach(id=>{if(!validate(document.querySelector("#"+id)))ok=false;});
    const status=document.querySelector("#form-status");
    if(ok){
      status.textContent="Your message passed validation. Connect this form to a real form service before publishing.";
      form.reset();
      ids.forEach(id=>document.querySelector("#"+id).removeAttribute("aria-invalid"));
    }else{
      status.textContent="Please correct the highlighted fields.";
      const first=ids.map(id=>document.querySelector("#"+id)).find(f=>!f.validity.valid);
      if(first)first.focus();
    }
  });
}

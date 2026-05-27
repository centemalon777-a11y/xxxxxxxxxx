// home.js — Dashboard behavior: subject selection, start logic, and prefill
document.addEventListener('DOMContentLoaded', ()=>{
  const subjectsGrid = document.getElementById('subjectsGrid');
  const selCountEl = document.getElementById('selCount');
  const subjectsBar = document.getElementById('subjectsBar');
  const startExamBtn = document.getElementById('startExam');
  const agreeChk = document.getElementById('agreeChk');
  const heroStart = document.getElementById('heroStart');
  const readInstr = document.getElementById('readInstr');
  const candNameEl = document.getElementById('candName');
  const candIdEl = document.getElementById('candId');

  // Prefill candidate info from sessionStorage if available (set on login)
  try{
    const name = sessionStorage.getItem('zenova_name');
    const reg = sessionStorage.getItem('zenova_reg');
    if(name) candNameEl.textContent = name;
    if(reg) candIdEl.textContent = reg;
  }catch(e){/* ignore storage errors */}

  // Initial state: English is preselected
  let selected = new Set(['English']);
  // mark English as selected in DOM
  const englishCard = document.querySelector('.subject-card.locked');
  if(englishCard) englishCard.classList.add('selected');

  updateUI();

  // Subject card click handler
  subjectsGrid.addEventListener('click', (e)=>{
    const card = e.target.closest('.subject-card');
    if(!card) return;
    if(card.classList.contains('locked')) return; // English locked

    const subj = card.getAttribute('data-subject');

    if(card.classList.contains('selected')){
      // deselect
      card.classList.remove('selected');
      selected.delete(subj);
    } else {
      // prevent selecting more than 3 extras
      const extras = selected.size - 1; // excluding English
      if(extras >= 3){
        // pulse to indicate limit
        card.animate([{transform:'scale(1)'},{transform:'scale(1.03)'},{transform:'scale(1)'}],{duration:300});
        return;
      }
      card.classList.add('selected');
      selected.add(subj);
    }
    updateUI();
  });

  // Checkbox toggles start button availability
  agreeChk.addEventListener('change', updateUI);

  // Hero actions
  heroStart.addEventListener('click', ()=>{
    document.getElementById('subjectsSection').scrollIntoView({behavior:'smooth',block:'center'});
  });
  readInstr.addEventListener('click', ()=>{
    document.getElementById('instructions').scrollIntoView({behavior:'smooth',block:'center'});
  });

  // Start exam button
  startExamBtn.addEventListener('click', ()=>{
    if(canStart()){
      // persist selected subjects for exam
      sessionStorage.setItem('zenova_subjects', JSON.stringify(Array.from(selected)));
      // small confirmation animation
      startExamBtn.animate([{transform:'translateY(0)'},{transform:'translateY(-6px)'},{transform:'translateY(0)'}],{duration:320,easing:'ease-out'});
      setTimeout(()=> window.location.href = 'exam.html',200);
    } else {
      // brief shake to indicate requirement
      startExamBtn.animate([{transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(0)'}],{duration:420});
    }
  });

  function updateUI(){
    const count = selected.size;
    selCountEl.textContent = count;
    const pct = Math.round((count / 4) * 100);
    subjectsBar.style.width = pct + '%';

    // enable start only when exactly 4 selected (English + 3) and checkbox checked
    if(canStart()){
      startExamBtn.disabled = false;
      startExamBtn.classList.add('ready');
    } else {
      startExamBtn.disabled = true;
      startExamBtn.classList.remove('ready');
    }
  }

  function canStart(){
    return selected.size === 4 && agreeChk.checked;
  }
});

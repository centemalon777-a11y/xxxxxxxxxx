// Zenova CBT — script.js
// Handles input focus animations and Begin Exam button

document.addEventListener('DOMContentLoaded', ()=>{
  const beginBtn = document.getElementById('beginBtn');
  const fullname = document.getElementById('fullname');
  const examcode = document.getElementById('examcode');

  // Small micro-interaction for inputs
  [fullname, examcode].forEach(input=>{
    input.addEventListener('focus', ()=>{
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', ()=>{
      input.parentElement.classList.remove('focused');
    });
  });

  // Begin exam handler — basic validation then redirect
  beginBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(!fullname.value.trim() || !examcode.value.trim()){
      // soft shake animation to indicate missing fields
      shakeCard();
      return;
    }

    // Add subtle button press animation
    beginBtn.animate([{transform:'scale(1)'},{transform:'scale(.98)'}],{duration:120,easing:'ease-out'});

    // Redirect to home (placeholder) after small delay for UX
    setTimeout(()=>{
      window.location.href = 'home.html';
    },220);
  });
});

function shakeCard(){
  const card = document.getElementById('entryCard');
  card.animate([
    {transform:'translateX(0) rotate(0deg)'},
    {transform:'translateX(-8px) rotate(-1deg)'},
    {transform:'translateX(8px) rotate(1deg)'},
    {transform:'translateX(0) rotate(0deg)'}
  ],{duration:360,easing:'cubic-bezier(.36,.07,.19,.97)'});
}

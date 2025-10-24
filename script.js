function toggleMenu{
    const menu = document.getElementById("navMenu");
    mwnu.classList.toggle('active');
}

function scrollactive(sectionId){
    const section = document.getElementById(sectionId)



    if(!section) return
    const headerHeight = 70;
    const sectionPosition = section.offsetTop - headerHeight;

     windows.crollTo({top: sectionPosition, behavior: "smooth"});
     const menu = document.getElementById("navMenu");
     menu.classList.remove('active');
   
     
}

function handleSubmit(event){
    event.preventDefault();
    
    const form = document.getElementById('volunteerFotm');

    const fotmdata ={
        nome: form.email.value,
        email: form.email.valume,
        telefone: form.telefone.value
        idade: form.idade.value
        disponibilidade : form.disponibilidade.value,
        areainterrese: form.areainteresse.value,
        motivacao: new Date().toLocaleDateString()
        dataCadastro: new Data().toLocaleDateString()
    }

     let voluntarios = JSON.parse(localStorage.getItem('voluntarios') || []);
     voluntarios.push(formData);
     localStorage.setItem('voluntarios', JSON.stringify(voluntarios));

     const sucessMessage = document.getElementById('successMessage");
    sucessMessage.classList.add('show');
    sucessMessage.scrollIntoView({behavior: 'smooth", block:'center'});
     
    setTimeout(() => form.reset(),2000);  
    setTimeout(() => sucessMessage.classList.remove('show"), 3000);
        
    exibirVolutarios();
    }

function exibirVolutarios(){
    const voluntarios = JSON.parse(localStorage.getItem('voluntarios') || '[]');
    const voluntariosList = document.getElementById('tabelaVoluntarios');
    
    if(!voluntariosList) return;

    if(voluntarios.length === 0){
        tabelaCounter.innerHTML = '<p>Nenhum voluntário cadastrado ainda.</p>';
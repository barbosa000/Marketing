
let tasks=[
{titulo:'Criar artigo SEO',status:'Pendentes'},
{titulo:'Campanha Google Ads',status:'Em Andamento'},
{titulo:'Arte Instagram',status:'Concluídas'},
{titulo:'Landing Page Promoção',status:'Atrasadas'}
];

function addTask(){
const titulo=document.getElementById('titulo').value;
const status=document.getElementById('status').value;
if(!titulo)return;
tasks.push({titulo,status});
document.getElementById('titulo').value='';
render();
}

function render(){
['Pendentes','Em Andamento','Concluídas','Atrasadas'].forEach(c=>{
document.getElementById(c).innerHTML='';
});

tasks.forEach(t=>{
const div=document.createElement('div');
div.className='task';
div.textContent=t.titulo;
document.getElementById(t.status).appendChild(div);
});

document.getElementById('total').textContent=tasks.length;
document.getElementById('pendentesCount').textContent=tasks.filter(t=>t.status==='Pendentes').length;
document.getElementById('andamentoCount').textContent=tasks.filter(t=>t.status==='Em Andamento').length;
document.getElementById('concluidasCount').textContent=tasks.filter(t=>t.status==='Concluídas').length;
document.getElementById('atrasadasCount').textContent=tasks.filter(t=>t.status==='Atrasadas').length;
}
render();

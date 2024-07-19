let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tep;



function getTotal()
{
    if(price.value != ''&& taxes.value>0){
        let result=(+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background='#040';
    }else{

        total.innerHTML = '  ';
        total.style.background = 'a00d02';


         
    }


}

let dataPro=[];


if(localStorage.product!= null){
    dataPro=JSON.parse(localStorage.product)
}else{
    dataPro=[];
}


submit.onclick = function(){
  let newPro = {
     title:title.value.toLowerCase(),
     price:price.valye,
     taxes:taxes.value,
     ads:ads.value,
     discount:discount.value,
     total:total.innerHTML,
     count:count.value,
     category:category.value.toLowerCase(),
    }

    if(title.value!='' && price.value!=''&&category.value){

        if(mood==='create'){

            if(newPro.count > 1){
                for(let i=0; i<newPro.count; i++){
                    dataPro.push(newPro)
        
                }
            }else{
                dataPro.push(newPro)
            }
    
        }else{
            dataPro[ tmp ]=newPro;
            mood='create';
            submit.innerHTML='create'
            count.style.display='block'
        }
    
    }

   

   


    localStorage.setItem('product',JSON.stringify(dataPro)     )
    cleardata()
    showdata()
    
}

function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';

}

function showdata(){

    getTotal()

    let table='';
    for(let i=0;i<dataPro.length;i++){
        table+= 
         `
         <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>

            <td><button id="update">update</button></td>
            <td><button onclick="function deletedata( ${i} )" id="delete">delete</button></td>
        </tr>
         
         `
        
    }
    document.getElementById('tbody').innerHTML = table;

    let btndelete=document.getElementById('deleteall')
    if(dataPro.length > 0 ){
        btndelete.innerHTML = `
        
        <button onclick=deleteall()>deleteall(${dataPro.length})</button>        `

    }else{
        btndelete.innerHTML='';
    }
}
showdata()

function deletedata(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    showdata()

}

function deleteall(){
    localStorage.clear()
    dataPro.splice(0)
    showdata()


}

function updatedata(){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    getTotal()
    count.style.display='none';
    category.value=dataPro[i].category;
    submit.innerHTML='update';
    mood='update';
    tmp=i;
    scroll({
      to:0,
      behavior:"smooth",
         

    })



}

let searchmood='title';

function getsearchmood(id)
{
   let search=document.getElementById('search')

  if(id=='searchtitle'){
    searchmood='title'

  }else{
    searchmood ='category'


  }

  search.Placeholder='search by' + searchmood;


    search.focus()
    search.value='';
    showdata()



}


function searchdata(value){
    let table='';

    if(searchmood=='title'){

        for(let i=0;i<dataPro.length;i++){
              if(dataPro[i].title.include(value.tolowercase()))
              table += 
              `
              <tr>
                 <td>${i}</td>
                 <td>${dataPro[i].title}</td>
                 <td>${dataPro[i].price}</td>
                 <td>${dataPro[i].taxes}</td>
                 <td>${dataPro[i].ads}</td>
                 <td>${dataPro[i].discount}</td>
                 <td>${dataPro[i].total}</td>
                 <td>${dataPro[i].category}</td>
     
                 <td><button id="update">update</button></td>
                 <td><button onclick="function deletedata( ${i} )" id="delete">delete</button></td>
             </tr>
              
              `
             
        }
    }else{

        
        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].category.include(value.tolowercase()))
            table += 
            `
            <tr>
               <td>${i}</td>
               <td>${dataPro[i].title}</td>
               <td>${dataPro[i].price}</td>
               <td>${dataPro[i].taxes}</td>
               <td>${dataPro[i].ads}</td>
               <td>${dataPro[i].discount}</td>
               <td>${dataPro[i].total}</td>
               <td>${dataPro[i].category}</td>
   
               <td><button id="update">update</button></td>
               <td><button onclick="function deletedata( ${i} )" id="delete">delete</button></td>
           </tr>
            
            `
           
      }
        
    }

    document.getElementById('tbody').innerHTML = table;


}
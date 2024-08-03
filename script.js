const tierInput=document.getElementById('tier');
const submitBtn=document.getElementById('submit');
const imageForm=document.getElementById('image-form');
const itemContainers=document.getElementsByClassName('item-container');
let currentDraggedItem;
for(const itemContainer of itemContainers){
    setUpItemContainerForDrag(itemContainer);
}
submitBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    if(tierInput.value==""){
          alert('please enter the valid name');
          return;
    }
    createTierList(tierInput.value);
    tierInput.value="";
});
imageForm.addEventListener('click',(event)=>{
    event.preventDefault();
    const imageItemInput=document.getElementById('image-item');
    if(imageItemInput.value==""){
        alert('please enter the valid url');
        return;
    }
    const imageUrl=imageItemInput.value;
    console.log(imageUrl);
    createTierListItem(imageUrl);
    imageItemInput.value='';
});
function createTierList(tierListName){
    const newTierList=document.createElement('div');
    newTierList.classList.add('tier-list');
    const heading=document.createElement('div');
    heading.classList.add('heading');
    const textContainer=document.createElement('div');
    textContainer.textContent=tierListName;
    heading.appendChild(textContainer);
    const newTierListItems=document.createElement('div');
    newTierListItems.classList.add('tier-list-items');
    newTierList.appendChild(heading);
    newTierList.appendChild(newTierListItems);
    setUpDropZoneInTierListItem(newTierListItems);

    const tierSection=document.getElementById('tier-list-section');
    tierSection.appendChild(newTierList);
    
}
function createTierListItem(imageUrl){
    const imageDiv=document.createElement('div');
    imageDiv.classList.add('item-container');
    imageDiv.setAttribute('draggable','true');
    
    const img=document.createElement('img');
    
    img.src=imageUrl;
    imageDiv.appendChild(img);
    
    const nonTierSection=document.getElementById('non-tier-section');
    nonTierSection.appendChild(imageDiv);
    setUpItemContainerForDrag(imageDiv);
}
function setUpItemContainerForDrag(itemContainer){
    itemContainer.addEventListener('dragstart',(event)=>{
        console.log(event);
        currentDraggedItem=event.target.parentNode;
    });
    itemContainer.addEventListener('dblclick',(event)=>{
        const parentNode=event.target.parentNode;
        const nonTierSection=document.getElementById('non-tier-section');
        nonTierSection.appendChild(parentNode);
    })
}
function setUpDropZoneInTierListItem(tierListItem){
    tierListItem.addEventListener('drop',(event)=>{
        event.preventDefault();
    })
    tierListItem.addEventListener('dragover',function (event){ 
        console.log("event coming up");
        if(this!==currentDraggedItem.parentNode){
            this.appendChild(currentDraggedItem);
        }

    })
}

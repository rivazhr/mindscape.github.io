const clouds = document.querySelectorAll('.cloud')

clouds.forEach(item=>{
    item.addEventListener('click', ()=>{
        clouds.forEach(item=>{
            // make pasive
            item.src = "./images/blue-cloud2.svg";
        });
        // make active
        item.src = "./images/red-cloud2.svg";
    });
});
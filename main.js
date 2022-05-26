window.addEventListener("load",(e)=>{
    var img=document.getElementById("img");
    var btn=document.getElementById("btn");
    var input=document.getElementById("search");
    var container=document.querySelector(".row");
    var model=document.getElementById("model");
    var download=document.getElementById("download");
    var check=document.getElementById("check");

    function firstDisplay(params){
        container.innerHTML="";
        params.forEach(element => {
                   var card=document.createElement("div");
                   var img=document.createElement("img");
                    card.setAttribute("class","col-md-6 col-xl-3 mt-5 items");
                    img.src=element;
                    img.addEventListener("click",handleClick);
                    card.appendChild(img);
                    container.appendChild(card);
               });    ;
    }

    function handleClick(e){
        var imgsrc=e.target.src;
        model.style.display="block";
        img.src=imgsrc;
        fetch(imgsrc).then((res)=>res.blob()).then((data)=>{
            var blob=URL.createObjectURL(data);
            download.href=blob;
        }).catch((err)=>console.log(err));
    }

    
    download.addEventListener("click",(e)=>{
        setTimeout(()=>{
            URL.revokeObjectURL(e.target.href);
        },5000);
    });

    function closeModel(){
        model.style.display="none";
    }

    img.addEventListener("click",closeModel);
    check.addEventListener("change",closeModel);

    function getStorage(){
        var obj=Object.values(localStorage);
        return obj;
    }


    function putData(params,searchkey){
        container.innerHTML="";
        params.forEach(element => {
            const result = Math.random().toString(36).substring(2,6);
                   var key=searchkey+result;
                   localStorage.setItem(key,element.src.large);
                   var card=document.createElement("div");
                   var img=document.createElement("img");
                    card.setAttribute("class","col-md-6 col-xl-3 mt-5 items");
                    img.src=element.src.large;
                    img.addEventListener("click",handleClick);
                    card.appendChild(img);
                    container.appendChild(card);
               });    
    }

    var filter,txtValue;
    var obj=container.childNodes;
    input.addEventListener("keyup",(e)=>{
        // filter=e.target.value.toUpperCase();
        // for (var i=1;i<obj.length;i++) {
        //     txtValue = obj[i].textContent || obj.innerText;
        //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
        //         obj[i].style.display = "";
        //       } else {
        //         obj[i].style.display = "none";
        //       }     
        // }
    });

    function checkData(x){
        var keys=Object.values(sessionStorage);
        var rs=keys.filter((v)=>v==x);
        if (rs!=[]) {
            var ks=Object.keys(localStorage)
            for (let i = 0; i < ks.length; i++) {
                console.log(i);
            }
            return true;
        }else{
            return false;
        }
    }

    btn.addEventListener("click",(e)=>{
        var search=input.value;
        if(search=="")return;
        const result = Math.random().toString(36).substring(2,6);
        if(checkData(search)) return;
        sessionStorage.setItem(result,search);
        var url=`https://api.pexels.com/v1/search?page=1&query=${search}`;
        fetch(url,{
            method:"GET",
            headers:{"Authorization":"563492ad6f917000010000013dfe20610936485eb1672aec5d09b6f3"}
        }).then((res)=>res.json()).then((data)=>{
            putData(data.photos,search);
        }).catch((err)=>{
            console.log(err);
        })         
    });

   firstDisplay(getStorage()) ;
});
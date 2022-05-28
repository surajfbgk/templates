window.addEventListener("load",(e)=>{
    var container=document.getElementById("content");
    var inputSearch=document.getElementById("search");
    var img=document.getElementById("img");
    var download=document.getElementById("download");
    var pagination=document.querySelectorAll(".pagination");
    var pageDiv=document.getElementById("pagination");
    var form=document.getElementById("form");


    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        var formData=new FormData(e.target);
        e.target.reset();
        alert("message sent successfully");
    });

    pagination.forEach((v)=>{
        v.addEventListener("click",(e)=>{
            e.preventDefault();
            if (inputSearch.value!="") {
                searchData(inputSearch.value,e.target.innerText);    
            }else{
                searchData("india",e.target.innerText);    
            }
            
            e.target.style.backgroundColor="red";
        });
    });
    var data=Object.values(localStorage);
    function getAlldata(x){
        var arr;
        if (x!=null) {
            arr=x.split(",");
            return arr;
        }else{
            arr=data[0].split(",");
            return arr;
        } 
    }

    if (data!="") {
        firstDisplay(getAlldata());    
    }
    
    function handleClick(e){
        if (model.style.display=="block"){
            model.style.display="none";
            return;
        }
        var imgsrc=e.target.src;
        model.style.display="block";
        img.src=imgsrc;
        fetch(imgsrc).then((res)=>res.blob()).then((data)=>{
            var blob=URL.createObjectURL(data);
            download.href=blob;
        }).catch((err)=>console.log(err));
    }

    function firstDisplay(params){
        container.innerHTML="";
        params.forEach(element => {
                   var card=document.createElement("div");
                   var img=document.createElement("img");
                   card.setAttribute("class",'class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5');
                    img.addEventListener("click",handleClick);
                    card.innerHTML=`
                    <figure class="effect-ming tm-video-item">
                    <img src="cloud.png" alt="no download" class="download">
                    <img src="${element}" alt="Image" class="img-fluid divimg">
                        <figcaption class="d-flex align-items-center justify-content-center">
                            <h2>Turtle</h2>
                            <a href="#" class="downloads">View more</a>
                        </figcaption>                    
                    </figure>
                    <div class="d-flex justify-content-between tm-text-gray">
                        <span class="tm-text-gray-light">9 Aug 2020</span>
                        <span>121,300 views</span>
                    </div`;
                    container.appendChild(card);
               });
               pageDiv.style.visibility="visible";
    }

    container.addEventListener("click",(e)=>{
        e.stopPropagation();
        download.click();
    });

    function getStorage(val){
        var d=localStorage.getItem(val);
        firstDisplay(getAlldata(d));
    }
    
    function savetoStorage(x,y){
        var objs=[];
        x.forEach((v)=>{
            objs.push(v.src.large);
        });
        localStorage.setItem(y,objs);
    }

    function putData(params,searchkey){
        container.innerHTML="";
        savetoStorage(params,searchkey);
        params.forEach(element => {
            const result = Math.random().toString(36).substring(2,6);
                   var card=document.createElement("div");
                   card.setAttribute("class",'class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5');
                   var img=document.createElement("img");
                    img.src=element.src.large;
                    img.addEventListener("click",handleClick);
                    card.innerHTML=`
                    <figure class="effect-ming tm-video-item">
                    <img src="cloud.png" alt="no download" class="download">
                    <img src="${element.src.large}" alt="Image" class="img-fluid">
                        <figcaption class="d-flex align-items-center justify-content-center">
                            <h2>Turtle</h2>
                            <a href="#" class="downloads">View more</a>
                        </figcaption>                    
                    </figure>
                    <div class="d-flex justify-content-between tm-text-gray">
                        <span class="tm-text-gray-light">9 Aug 2020</span>
                        <span>121,300 views</span>
                    </div>
                    `;
                    container.appendChild(card);
               });    
               pageDiv.style.visibility="visible";
    }
    var keys=Object.keys(localStorage);
    function checkSearch(x){
        var test=keys.filter((v)=>v==x);
        if (test!=""){
            getStorage(test[0]);
            return true;
        }else{
            return false;
        };    
    }

    function searchData(search,pageno){
        var url;
        if(search=="")return;
        if (pageno==null) {
            if(checkSearch(search)) return;
            url=`https://api.pexels.com/v1/search?page=1&query=${search}`;    
        }
        url=`https://api.pexels.com/v1/search?page=${pageno}&query=${search}`;
        fetch(url,{
            method:"GET",
            headers:{"Authorization":"563492ad6f917000010000013dfe20610936485eb1672aec5d09b6f3"}
        }).then((res)=>res.json()).then((data)=>{
            putData(data.photos,search);
        }).catch((err)=>{
            console.log(err);
        })         
    }
    inputSearch.addEventListener("change",(e)=>{
        var search=e.target.value;
        searchData(search)
    });

    document.onscroll=(e)=>{
        var div=document.querySelectorAll("div");
        div.forEach((v)=>{
            
        });
    }
});
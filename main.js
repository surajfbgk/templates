window.addEventListener("load",(e)=>{
    var btn=document.getElementById("btn");
    var search=document.getElementById("search");
    var container=document.querySelector(".row");
    var check=document.getElementById("check");
    var model=document.getElementById("model");
    var modelimg=document.getElementById("img");
    
    function allStorage() {
        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
        }
        return values;
    }
    const alldata=function(v){
        var re = new RegExp(v, "g");
        var keys = Object.keys(localStorage)
        for (const obj of keys) {
            var c=obj.endsWith(v);
                if (c) {
                    console.log(obj);
                }
            
        }
    };

    alldata("animals");

    function allStorages() {
        var values = [],
            keys = Object.keys(sessionStorage),
            i = keys.length;

        while ( i-- ) {
            values.push( sessionStorage.getItem(keys[i]) );
        }
        return values;
    }

    var ar=allStorages();
    function handleClick (e){
        modelimg.src=e.target.src;
        model.style.display="block";
        
    };

    check.addEventListener("change",(e)=>{
    model.style.display="none";
    });

    btn.addEventListener("click",(e)=>{
       container.innerHTML="";
        const searchid = Math.random().toString(36).substring(2,7);
       var searchVal=search.value;
       if (ar.some((v)=>v==searchVal) || searchVal=="") {
           loadimg();
           return true;
       }
        sessionStorage.setItem(searchid,searchVal);
        var url=`https://api.pexels.com/v1/search?query=${searchVal}&page=5`;
       fetch(url,{
           method:"GET",
           headers:{"Authorization":"563492ad6f917000010000013dfe20610936485eb1672aec5d09b6f3"}
       }).then((res)=>res.json()).then((data)=>{
           data.photos.forEach(element => {
        const result = Math.random().toString(36).substring(2,7);
                var key=result+searchVal;
               var imgurl=element.src.large;
               localStorage.setItem(key,imgurl);
               var card=document.createElement("div");
               var img=document.createElement("img");
                card.setAttribute("class","col-md-6 col-xl-3 mt-5");
                img.src=imgurl;
                img.addEventListener("click",handleClick);
                card.appendChild(img);
                container.appendChild(card);
           });
           loadimg();
       });
    });
    function loadimg(){
        var number=allStorage();
    for (var imgurl of number) {
               var card=document.createElement("div");
               var img=document.createElement("img");
                card.setAttribute("class","col-md-6 col-xl-3 mt-5");
                img.src=imgurl;
                img.addEventListener("click",handleClick);
                card.appendChild(img);
                container.appendChild(card);
            }
    
    }
    loadimg();


    
    // program to generate random st
});
    
    
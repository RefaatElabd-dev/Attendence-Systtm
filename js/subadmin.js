 // toDay date
 const today = new Date();
 const D = today.getDate();
 const M = today.getMonth();
 const H = today.getHours();
 const Minutes = today.getMinutes();
 const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

     
 $(function(){   //load fn
     // sub admin data
     $.ajax({
         url: "data.json",
         dataType:"json",
         success: function (res)
         {
             let subAdmin=res.find((value)=>{return value.username==='subadmin'});
             $("#title").text(subAdmin.name);
             $("#img").attr('src',(subAdmin.gender==='M'?'images/male.jpg':'images/female.png')); // emp pic
             $("#empName").text(subAdmin.name);//emp name
             $("#empEmail").text(subAdmin.email);//emp Email
             const locationSpan=`<span class="fas fa-map-marker-alt text-success"></span>`;
             $("#empAddress").html(locationSpan+ "   " +subAdmin.address);//emp Address
             //handle date
             let day=days[today.getDay()] +" "+today.getUTCFullYear() + '-' + today.getDate() +'-'+(months[today.getMonth()].slice(0,3));
             //daily report
             $("#dayDate").text(day);
             if(+(subAdmin.comeAt.toString().slice(-1*(D.toString().length))) === D)
             {
                 $("#comeAt").text(subAdmin.comeAt.slice(0,(subAdmin.comeAt.length-1-(D.toString().length))));
                 $("#goAt").text(subAdmin.goAt.slice(0,(subAdmin.goAt.length-1-(D.toString().length))));
                 $("#dayStatus").text(subAdmin.dayStatus);
             }
             else
             {
                 $("#comeAt").text('did not come yet');
                 $("#goAt").text('still here');
                 $("#dayStatus").text('abscence');
             }
             
             //monthly Report
             $("#monthDate").text(months[today.getMonth()]+" / "+today.getUTCFullYear());
             $("#att").text(subAdmin.attendences);
             $("#absence").text(subAdmin.absence);
             $("#lates").text(subAdmin.lates);
             $("#excuses").text(subAdmin.Excuse);
         },
         error: function (ErrorMessage) 
         {
             alert(ErrorMessage);
         }
     })
 })//end load fn

 //show data from search box
 function empDatahandler()
 {
     const empUname=($("#searchInput").val()).trim();
     $.ajax({
         url: "data.json",
         dataType:"json",
         success: function (res)
         {
             if(!empUname)// search is empty
             {
                 $("#sight").html('<div class="offset-2 col-10 p-3 rounded text-danger" style="font-size: 1.5rem;">Enter Emp user name before searching</div>');
             }
             else
             {
                 let userData=res.find((value)=>{return value.username===empUname});
                 if(!userData )//undifined username
                 {
                     $("#sight").html('<div class="offset-2 col-10 p-3 rounded text-danger" style="font-size: 1.5rem;">There is no employees with this username</div>');
                 }
                 else if(!userData.flag)// Not approved employees
                 {
                     $("#sight").html('<div class="offset-2 col-10 p-3 rounded text-danger" style="font-size: 1.5rem;">This username doesnot approved yet</div>');
                 }
                 else  // our bisness
                 {
                     $("#sight").html(`<div class="offset-1 col-9 media p-2 rounded" id="searchedMedia"><img src="images/${(userData.gender=='M')?'male.jpg':'female.png'}" alt="img" class="m-3 mt-3 rounded-circle"><div class="media-body"><div class="col-6 d-inline-block"><h4 class="mt-4 ml-3 mb-1 text-primary" id="empName">${userData.name}</h4><p class="ml-4 mt-1 text-black-50" id="empEmail"><i>${userData.email}</i></p><p class="mt-1 ml-4 text-black-50 font-weight-bold" id="empAddress"><span class="fas fa-map-marker-alt text-success"></span>&nbsp;&nbsp;&nbsp;${userData.address}</p></div><div class="float-right m-4"><button id="comeGo" class="btn btn-primary" type="button" onclick="mainhandler()">${(H>=8 && H<=10)?'Come now':'Go now'}</button><br/><button class="btn btn-primary mt-4" type="button" onclick="excuseHandeller()">Excuse</button><br/></div></div></div></div>`)
                 }
             }   
         },
         error: function (ErrorMessage) 
         {
             alert(ErrorMessage);
         }
     })
 }//end search fn
 
 function mainhandler() //Come Go identifier fn
 {
     const empUname=($("#searchInput").val()).trim();
     $.ajax({
         url: "data.json",
         dataType:"json",
         success: function (res)
         {
             let userData=res.find((value)=>{return value.username===empUname});
             if(H>=8 && H<=10)
             {
                 if(H>=8 && (H<=9 && Minutes<=15))// in time
                 {
                     if( +(userData.comeAt.toString().slice(-1*(D.toString().length))) !== D)
                         {
                             userData.attendences++;
                             userData.dayStatus = "attend";
                             userData.comeAt = ( H.toString() + " : " + Minutes.toString() + " " + D);
                             download(JSON.stringify(res),'data.json','text/plain');
                         }
                         else
                         {
                             alert('you have signed this employee succesflly before that');
                         }
                 }
                 else   //late
                 {
                     if(+(userData.comeAt.toString().slice(-1*(D.toString().length))) !== D)
                     {
                         userData.lates++;
                         userData.dayStatus="late";
                         userData.comeAt=H + " : " + Minutes + " " + D;
                         download(JSON.stringify(res),'data.json','text/plain');
                     } 
                     else
                     {
                         alert('you have signed this employee succesflly before that');
                     }
                 }
             }
             else if(H>=12 && H<=22)
             {
                 if(+(userData.comeAt.toString().slice(-1*(D.toString().length))) !== D)
                 {
                     userData.goAt = H + " : " + Minutes + " " + D;
                     download(JSON.stringify(res),'data.json','text/plain');
                 }
                 else
                 {
                     alert('you have signed this employee succesflly before that');
                 }
             }
             else{
                 alert('this time is out you should sign comming from 8:00 -> 10:00 and sign going from 12:00 -> 22:00');
             }
         },
         error: function (ErrorMessage) 
         {
             alert(ErrorMessage);
         }
     })
 }//end Come/Go fn

 function excuseHandeller()//excuse handler fn
 {
     const empUname=($("#searchInput").val()).trim();
     $.ajax({
         url: "data.json",
         dataType:"json",
         success: function (res)
         {
             let userData=res.find((value)=>{return value.username===empUname});
             if( H >= 8 && H <= 10)
             {
                 if(+(userData.comeAt.toString().slice(-1*(D.toString().length))) !== D)
                 {
                     userData.Excuse++;
                     userData.dayStatus="Excuse";
                     userData.comeAt = "didn't come" + D;
                     download(JSON.stringify(res),'data.json','text/plain');
                 }
                 else
                 {
                     alert('you have signed this employee succesflly before that');
                 }
             }
             else
             {
                 alert('this time is out you should sign excuse promise from 8:00 -> 10:00 am');
             }
             
         },
         error: function (ErrorMessage) 
         {
             alert(ErrorMessage);
         }
     })
 }//end excuseHandeller

 //check absence for all employees
 function calculateAbsence(){
     $.ajax({
         url: "data.json",
         dataType:"json",
         success: function (res)
         {
             if(H>10)
             {
                 res.forEach((value)=>{
                     value.absence = (D-(value.attendences+value.lates));
                     value.dayStatus="absence";
                 })
                 download(JSON.stringify(res),'data.json','text/plain');
             }
             else 
             {
                 alert("you can't take absence before 10 am")
             }
         },
         error: function (ErrorMessage) 
         {
             alert(ErrorMessage);
         }
     }) 
 }//end absence fn

 //update values for new month
 function upbateNewMonth(){
     $.ajax({
         url: "data.json",
         dataType:"json",
         success: function (res)
         {
             if( D === 1 )
             {
                 res.forEach((value)=>{
                     value.absence=0;
                     value.attendences=0;
                     value.lates=0;
                     value.Excuse=0;
                 })
                 download(JSON.stringify(res),'data.json','text/plain');
             }
             else
             {
                 alert("you should update at the first day of the comming month");
             }
         },
         error: function (ErrorMessage) 
         {
             alert(ErrorMessage);
         }
     }) 
 }//end of monthly update fn

 //download Fn
 function download(content, fileName, contentType) {
     var a = document.createElement("a");
     var file = new Blob([content], {type: contentType});
     a.href = URL.createObjectURL(file);
     a.download = fileName;
     a.click();
 }
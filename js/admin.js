$(function(){ //load fn
    var i=0;
    $.ajax({
        url: "data.json",
        dataType:"json",
        success: function (res) {
            res.forEach((emp,i) => {
                if(emp.flag)//approved Employees
                {
                    let x=`<div class="card shadow-sm border-warning b"><img class="card-img-top" src="images/${(emp.gender=='m'||emp.gender=='M')?'male.jpg':'female.png'}" alt="emp image" ><div class="card-body"><h4 class="card-title">${emp.name}|</h4><p class="card-text ml-2 text-danger">Lates : ${emp.lates}</p><p class="card-text ml-2 text-success">Attendances : ${emp.attendences} </p><p class="card-text ml-2 text-warning">Excuse : ${emp.Excuse} </p><div id="restData${i}" class="collapse"><p class="card-text ml-2 text-info">age : ${emp.age}</p><p class="card-text ml-2 text-info">Absences : ${emp.absence}</p><p class="card-text ml-2 text-info">Email : ${emp.email}</p><p class="card-text ml-2 text-info">gender : ${(emp.gender==='M')?'Male':'Female'}</p><p class="card-text ml-2 text-info">Address : ${emp.address}</div><button class="btn btn-lg mt-3" id="btn${i}" style="background-color: #ffc107;" data-toggle="collapse" data-target="#restData${i}" >See prief data</button></div></div>`;
                    $("#clms").append(x);
                }
                else
                {
                    let y=`<tr><td>${emp.name}</td><td>${emp.email}</td><td>${emp.age}</td><td>${emp.gender}</td><td>${emp.address}</td><td><button class="btn btn-success rounded" id="bttn${i}" onclick='accept(event);'>Accept</button></td></tr>`;
                    $("#requests").append(y);
                }
            });
        },
        error: function(ErrorMessage){alert(ErrorMessage);}
        })//end of ajaxs
})//end load

function accept(e){ //waiting employees
    $.ajax({
        url: "data.json",
        dataType:"json",
        success: function (res) {// console.log(((e.target).parentNode.previousSibling.previousSibling.previousSibling.previousSibling).innerText);
            let name = ((e.target).parentNode.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling).innerText;
            let email = ((e.target).parentNode.previousSibling.previousSibling.previousSibling.previousSibling).innerText
            let newEmp = res.find((emp)=>{return (name === emp.name && email === emp.email) });
            newEmp.flag=true;
            download(JSON.stringify(res),'data.json','text/plain');
            (e.target).parentNode.parentNode.remove();
        },
        error: function(ErrorMessage){console.log(ErrorMessage);}
    })//end of ajax
}//end approve fn

//download fn
function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
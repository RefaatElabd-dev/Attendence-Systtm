// toDay date
const today = new Date();
const D = today.getDate();
const M = today.getMonth();
const H = today.getHours();
const Minutes = today.getMinutes();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

$(function(){
    $.ajax({
        url: "empLogin.json",
        dataType:"json",
        success: function (res)
        {
            $("#title").text(res.name);
            $("#img").attr('src',(res.gender==='M'?'images/male.jpg':'images/female.png')); // emp pic
            $("#empName").text(res.name);//emp name
            $("#empEmail").text(res.email);//emp Email
            const locationSpan=`<span class="fas fa-map-marker-alt text-success"></span>`;
            $("#empAddress").html(locationSpan+ "   " +res.address);//emp Address
            
            const day = days[today.getDay()] + " " + today.getUTCFullYear() + '-' + D + '-' + ( months[today.getMonth()].slice(0,3) );
            //daily report
            $("#dayDate").text(day);
            if( +(res.comeAt.toString().slice(-1*(D.toString().length))) === D )
            {
                $("#comeAt").text(res.comeAt.slice(0,(res.comeAt.length-1-(D.toString().length))));
                $("#goAt").text(res.goAt.slice(0,(res.goAt.length-1-(D.toString().length))));
                $("#dayStatus").text(res.dayStatus);
            }
            else
            {
                $("#comeAt").text('did not come yet');
                $("#goAt").text('still here');
                $("#dayStatus").text('abscence');
            }
            console.log(months[M]+" / "+today.getUTCFullYear());
            //monthly Report
            $("#monthDate").text(months[M]+" / "+today.getUTCFullYear());
            $("#att").text(res.attendences);
            $("#absence").text(res.absence);
            $("#lates").text(res.lates);
            $("#excuses").text(res.Excuse);
        },
        error: function(ErrorMessage){alert(ErrorMessage);}
    })//end ajax
})//end load
//download fn
function download(content, fileName, contentType) { 
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
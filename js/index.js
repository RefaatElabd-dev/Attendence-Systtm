$(document).ready(function()
        {
            let now = new Date();
            //login template
            $("#firLogin").one("click",function(){
                $("#image").fadeOut("slow");
                $(this).hide(1000);
                //collapsed login form
                $("#firLoginD").after('<form class="was-validated"><div class="input-group mb-3"><input type="text" class="form-control" placeholder="Enter Username" name="Luname" pattern="^[a-zA-Z0-9]{3,}" required><div class="input-group-prepend"><span class="input-group-text text-muted fas fa-user pt-2" style="border-left: none;"></span></div><div class="valid-feedback">Valid.</div><div class="invalid-feedback">Please fill out this field with valid username.</div></div><div class="input-group mb-3"><input type="password" class="form-control" placeholder="Enter password" name="pass" pattern="^[a-zA-Z0-9]{3,}" required><div class="input-group-prepend"><span class="input-group-text text-muted fas fa-lock-open pt-2" style="border-left: none;"></span></div><div class="valid-feedback">Valid.</div><div class="invalid-feedback">Please enter a valied password.</div></div><button type="button" id="login" class="btn btn-primary offset-3 col-6" onclick="Loginfn();" >Log in</button></form>');
                $("#form").hide().slideDown(2000);
            })//end login

            //register functionality
            $("#regester").on("click",function(){
                if(($(":input[ name = 'uname' ]").val().trim()).length && $( ":input[ name = 'Age' ]" ).val() && $( ":input[ name = 'mail' ]" ).val() && $( ":input[ name = 'Address' ]" ).val())
                {
                    let obj={
                        "username"    : $( ":input[name='uname']" ).slice( 0, 2) + now.getSeconds() + $( ":input[ name = 'uname' ]" ).slice(-2),  //F2chars + seconds + L2chars  (Refaat ==> Re24at) 
                        "name"        : $( ":input[name = 'uname']" ).val(),
                        "password"    : "think",
                        "email"       : $( ":input[name = 'mail']" ).val(),
                        "address"     : $( ":input[name = 'Address']" ).val(),
                        "lates"       : 0,
                        "attendences" : 0,
                        "absence"     : 0,
                        "Excuse"      : 0,
                        "comeAt"      : "08 : 00 8",
                        "goAt"        : "17 : 30 8",
                        "dayStatus"   : "absence",
                        "age"         : $( ":input[name = 'Age']" ).val(),
                        "gender"      : $( ":input[name = 'optradio']" ).val(),
                        "flag"        : false
                    }

                    $.ajax({
                        url : "../data.json",
                        dataType : "json",
                        success : function (res) {
                            res.push(obj);
                            download(JSON.stringify(res),'data.json','text/plain');
                        },
                        error : function (ErrorMessage) {console.log(ErrorMessage);}
                    })//end of ajax
                    alert( "Done wait for your username & password " );
                }
            })//end of register
        })//end load

        function Loginfn()
        {
            let username = ($( ":input[name = 'Luname']" ).val()).trim();
            let password = ( $( ":input[name = 'pass']" ).val() ).trim();
            if( username && password )// empty ?
            {
                 $.ajax({
                    url: "../data.json",
                    dataType:"json",
                    success: function (res) {
                        const admin = { username : "admin" ,password : "123"};
                        const subAdmin = { username : "subadmin" ,password : "1234"};
                        if( username === admin.username && password === admin.password)
                            var wndw = open( "admin.html" ,"_self" ,"toolbar=1 ,status=1 ,titlebar=1 ,resizable=1 ,menubar=1" ,true );
                        else if( username === subAdmin.username && password === subAdmin.password )
                            var wndw = open( "subadmin.html" ,"_self" ,"toolbar=1 ,status=1 ,titlebar=1 ,resizable=1 ,menubar=1" ,true );
                        else//emp page & false data
                        {
                            let user = res.find((value)=>{ return ( username === value.username && password === value.password && value.flag ); });
                            if(user)
                            {
                                download(JSON.stringify(user),'empLogin.json','text/plain');
                                var wndw = open( "employee.html" ,"_self" ,"toolbar=1 ,status=1 ,titlebar=1 ,resizable=1 ,menubar=1" ,true );
                            }
                            else
                            {
                                alert("this employee doesn't approved yet");
                            }
                        }
                    },
                    error: function (ErrorMessage){console.log(ErrorMessage)}
                })//end of ajax
            }
            else
            {
                alert("You enterd no data");
            }
        }//end of function

        //download function
        function download(content, fileName, contentType) {
                var a = document.createElement("a");
                var file = new Blob([content], {type: contentType});
                a.href = URL.createObjectURL(file);
                a.download = fileName;
                a.click();
            }
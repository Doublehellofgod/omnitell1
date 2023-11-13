const mailer = require("./nodemailer");

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.get('name'))
var app = angular.module('app',[])
app.controller('home', function ($scope) {
    $scope.namecaller = urlParams.get('name')
    $scope.visible = [false,false,false]
    $scope.hello = false;
    $scope.ClickBtn = function (index){
        if ($scope.visible[index]){
            $scope.visible[index]=false
        }
        else {
            $scope.visible =[false,false,false]
            $scope.visible[index]=true
        }

    }
});
app.controller('appeal', ['$scope','$http', function ($scope, $http){
    //маска панели телефона
    $(function($){
        $("#selfon").mask("+7 (999) 999-99-99");
    });
    //отправка сообщения на почту
    $scope.visible = true;
    $scope.sendMail = function (){

        /*console.log('$scope.name',$('#name').val())
        // до конца код выполняется в файле index.js, который посылает к коду на nodemailer.js
        $http({
            method: 'GET',
            url: `/email?name=${$('#name').val()}&org=${$('#org').val()}&sel=${$('#selfon').val()}&text=${$('#text').val()}`,
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.visible = false
            console.log("congratulation")
            console.log(response.data)
        }, function errorCallback(response) {
            console.log("Error")
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });*/

        const message = {
            //charset:'utf-8',
            from:'smtp.ethereal.email',
            to: ' khusainov@spg-trade.com',
            subject: $('#name').val(),
            text: `Организация: ${$('#org').val()} \nТелефон: ${$('#selfon').val()} \n Сообщение:\n${$('#text').val()} `
        }

        mailer(message);

    }
}])

app.controller('krioaz',['$scope','$http',function ($scope, $http){
    //console.log(decodeURI(`/assets/file/Перечень_действующих_КРИОАЗС.xlsx`));
    //$scope.visible = true;
    //открытие файла
    (
        async()=>{
            let wb = XLSX.read(await
                (await fetch(`name.xlsx`,{
                    method: "GET",
                    headers: { "Content-Type": "text/html; charset=UTF-8" },
                })).
                arrayBuffer());
            const ws = wb.Sheets[wb.SheetNames[0]];
            const header = ["A", "B", "C", "D", "E", "F", "G"];
            let data = XLSX.utils.sheet_to_json(ws,{header:header});

            console.log(data[0]);
            console.log(data);
            //заполнение таблицы
            let table = document.querySelector('.table')

            let string = "";

            string += "<tbody>"
            for (let row = 0; row < data.length; row++){
                string +="<tr>";
                for (key of header){
                    string += row? `<td> ${data[row][key]??''} </td>`:`<th> ${data[0][key]} </th>`
                }
                string +="</tr>";
            }
            string += "</tbody>"
            table.innerHTML +=string;

        }
    )()
}]);

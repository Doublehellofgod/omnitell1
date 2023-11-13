const nademailer = require('nodemailer')

const transport = nademailer.createTransport({
    /*host: 'smtp.mail.ru',
    port: 465,
    secure:true,
    auth: {
        type: "OAuth2",
        user: 'roma.ostroumov98@mail.ru',
        //accessToken: "ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x",
        //pass: 'ifuckyourmam1000times.'
        //pass: 'FY2efKKfzpaGgwjiXasB'
    }*/
    host:'10.130.0.29',
    port: 9259,
    //secure:true,
    auth:{
        user:'oktell@tech.omnitell.ru'
    }

})

const mailer = message =>{
    transport.sendMail(message, (err, info) =>{
        if(err) return  console.log(err)
        console.log('Email send ', info)
    })
}
/*const message = {
    from:'angus.windler92@ethereal.email',
    to: 'roma.ostroumov@gmail.com',
    subject: 'Congratulations! Tou are here!',
    text: `Поздравляю с решением задачи login roma.ostroumov98@mail.ru pass: HI`
    /!*from:'ansel.blanda93@ethereal.email',
    to: data.name,
    subject: data.org,
    text: `Телефон: ${data.selfon} \n Сообщение:\n${data.text} `*!/
}*/
//mailer(message)
module.exports = mailer
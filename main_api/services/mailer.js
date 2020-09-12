const mailjet = require("node-mailjet").connect(
	"7b9fb1a436167917214bb3f56b79c7b9",
	"2d17951556c468db69368f44f3ef781b"
);

/**
 * Returns a boolean based on the status of the mail sent
 * @param {senderEmail: string} senderEmail in string
 * @param {senderName: string} senderName in string
 * @param {url: string} url to be sent in string
 * @return {sent: boolean} if sent successfully then returns true
 */
function sendVerificaionMail(senderEmail, senderName, url) {
	const request = mailjet.post("send", {version: "v3.1"}).request({
		Messages: [
			{
				From: {
					Email: "no-reply@thehearty.tk",
					Name: "Hearty Verification"
				},
				To: [
					{
						Email: senderEmail,
						Name: senderName
					}
				],
				Subject: "Verify Your Email Address",
				TemplateLanguage: true,
				TextPart: `HEARTY.
						 
						Dear HomoSapien,
						
						Thanks for joining our team and we couldn't be more happy.
						We are as excited as you to get your heart the care it
						deserved. This is the last step to that process, we promise.
						Just click on the link below to verify your email and get
						started right away.
						You may need to login again.
						 Verify Here. [${url}]
						 
						or copy this link to browser 
						${url}
						 
						
						
						This email was auto generated and sent from the Hearty
						office
						 
						
						Made in India Project
						
						All Rights Reserved to Hearty inc.
						
						Protecting your Heart since 2020`,
				HTMLPart: `<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"/> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <title>Hearty Verification Email</title> </head> <body style=" margin: 0; padding: 0; box-sizing: border-box; font-family: 'Lato', sans-serif; " > <div class="container" style="max-width: 640px;"> <div class="row"> <div class="content" style="position: relative; height: 500px;"> <div class="main" style=" background-color: rgb(230, 230, 230); padding: 20px; width: 650px; height: 500px; text-align: center; " > <div class="main-box" style="box-shadow: 0 0 7px rgba(0, 0, 0, 0.24);" > <div class="brand" style=" background-color: #fad77f; color: #f11d50; text-align: center; " > <div class="brand-content" style="margin: 0 auto; text-align: center; padding: 10px;" > <h1 style="font-size: 20px;"> Hearty. </h1> </div></div><div class="main-content" style=" background-color: rgb(255, 255, 255); display: grid; padding: 10px 40px; text-align: left; " > <div class="desc" style=" margin: 5px; color: rgb(105, 105, 105); letter-spacing: 1.5px; line-height: 30px; font-size: 12px; " > <p>Dear HomoSapien,</p><span >Thanks for joining our team and we couldn't be more happy. We are as excited as you to get your heart the care it deserved. This is the last step to that process, we promise. Just click on the link below to verify your email and get started right away.<br/> <em>You may need to login again.</em> </span> </div><div class="link" style="text-align: center; margin: 5px;"> <a style=" background-color: #ff5f5f; text-decoration: none; color: #fff !important; padding: 5px 20px; font-size: 15px; border-radius: 50px; display: inline-block; " href=${url}target="_blank" >Verify Here.</a > <p style="color: rgb(105, 105, 105);"> or copy this link to browser <br/>${url}</p></div></div><div class="footer" style=" padding: 5px; color: rgb(214, 214, 214); background-color: rgb(144, 144, 144); font-size: 10px; " > <div class="footer-text"> <p> This email was auto generated and sent from the Hearty office </p><p>Made in India Project</p><p>All Rights Reserved to Hearty inc.</p><p>Protecting your Heart since 2020</p></div></div></div></div></div></div></div></body></html>`
			}
		]
	});

	request
		.then(result => {
			console.log("Mail Sent ", result.body);
		})
		.catch(err => {
			console.log(err.statusCode);
		});
}

module.exports = {sendVerificaionMail};

const sgMail = require("@sendgrid/mail");

const sendEmail = (email, verificationToken) => {
  const msg = {
    to: email,
    from: "shevchenkovitalii@meta.ua",
    subject: "Please, confirm your registration",
    text: `Please, confirm your email address: http://localhost:3000/users/verify/${verificationToken}`,
    html: `Please, confirm your email address: <br/> 
    <a href="http://localhost:3000/users/verify/${verificationToken}">
					Confirm!
				</a>
    `,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { sendEmail };

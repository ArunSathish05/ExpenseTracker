const nodemailer = require("nodemailer");


const EmailControl = async (req, res) => {
  const { from, to, message } = req.body;
  console.log("req,body",req.body);
  
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "samarunsathish@gmail.com",
        pass: "ylbq xcud nxab noyw",
      },
    });

    await transporter.sendMail({
      from,
      to,
      subject: "New Enquiry",
      text: message,
    });

    res.json({ ok: true, message: "Email sent successfully" });
  } catch (error) {
   console.error("Nodemailer Failed:", error);
   res.status(500).json({ ok: false, message: error.message });

  }
};

module.exports = EmailControl;

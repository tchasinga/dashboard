import Aply from "../models/aply.model.js";
import nodemailer from "nodemailer";
import mjml2html from "mjml";

// MJML email template
const mjmlTemplate = `
<mjml>
  <mj-body background-color="#ffffff" font-size="13px">
    <mj-section background-color="#ffffff" padding-bottom="0px" padding-top="0">
      <mj-column vertical-align="top" width="100%">
        <mj-image src="http://go.mailjet.com/tplimg/mtrq/b/ox8s/mg1rw.png" alt="" align="center" border="none" width="600px" padding-left="0px" padding-right="0px" padding-bottom="0px" padding-top="0"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#009FE3" vertical-align="top" padding-bottom="0px" padding-top="0">
      <mj-column vertical-align="top" width="100%">
        <mj-text align="left" color="#ffffff" font-size="45px" font-weight="bold" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="30px" padding-top="50px">Welcome aboard</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#009fe3" padding-bottom="20px" padding-top="20px">
      <mj-column vertical-align="middle" width="100%">
        <mj-text align="left" color="#ffffff" font-size="22px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px"><span style="color:#FEEB35">Dear {{fullName}}</span><br /><br /> Welcome to TECHSOL SOFTWARE KENYA.</mj-text>
        <mj-text align="left" color="#ffffff" font-size="15px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">Thank you for choosing TechSol Software Kenya! We're thrilled that you've applied for our services. Your application has been received and we'll get back to you shortly. If you have any questions in the meantime, feel free to reach out to us at <span style="padding-top:10px">Kiokoj81@gmail.com.</span>
        </mj-text>
        <mj-text align="left" color="#ffffff" font-size="15px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">Thanks, <br /> The TECHSOL SOFTWARE KENYA Team</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

// THIS FUNCTION HAS PURPOSE TO SEND AN EMAIL TO THE USER WHEN USER IS SIGNING UP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD || "ezku kxhc uexi cqbg",
  },
});

export const createAply = async (req, res) => {
  const { fullName, email, typeofservices, description, imageUrls } = req.body;
  try {
    const newAply = new Aply({ fullName, email, typeofservices, description, imageUrls });
    await newAply.save();
    res.status(201).json({
      success: true,
      message: 'Aply created successfully',
      data: newAply,
    });

    // Replace placeholder in MJML template
    const mjmlWithFullName = mjmlTemplate.replace('{{fullName}}', fullName);

    // Convert MJML to HTML
    const { html: emailHtml } = mjml2html(mjmlWithFullName);

    // Sending email to the user
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Aply created successfully',
      html: emailHtml,
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: 'Aply creation failed',
      error: error,
    });
  }
};


// this will be used to view all the aplys in our admin pages
export const getAply = async (req, res) => {
    try {
        const aplys = await Aply.find();
        res.status(200).json({
            success : true,
            message : 'Aplys fetched successfully',
            data : aplys,
        });
    } catch (error) {
        res.status(404).json({
            success : false,
            message : 'Aplys not found',
            error : error,
        });
    }
}

// this will used to be aplied in our admins pages to view the aply details
export const getAplyById = async (req, res) => {
    const { id } = req.params;
    try {
        const aply = await Aply.findById(id);
        res.status(200).json({
            success : true,
            message : 'Aply fetched by signle data successfully',
            data : aply,
        });
    } catch (error) {
        res.status(404).json({
            success : false,
            message : 'Aply not found',
            error : error,
        });
    }
}
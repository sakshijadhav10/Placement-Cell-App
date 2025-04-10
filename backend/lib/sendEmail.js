const nodemailer = require("nodemailer");

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email provider
  auth: {
    user: "jadhavsakshi218@gmail.com", // Your email
    pass: "evgpyrjlvuferdhe", // Your email app password
  },
});

// Function to send emails to all users
const sendJobNotification = async (matchingApplicants, job) => {
  try {
    const emailList = matchingApplicants.map((user) => user.email);
    const mailOptions = {
      from: "jadhavsakshi218@gmail.com",
      to: emailList.join(","), // Send to multiple users
      subject: `New Job Posted: ${job.title}`,
      html: `
        <h2>New Job Available!</h2>
        <p><strong>Title:</strong> ${job.title}</p>
        <p><strong>CompanyName:</strong> ${job.companyName}</p>
        <p><strong>Maximum Applicants:</strong> ${job.maxApplicants}</p>
        <p><strong>Maximum Positions:</strong> ${job.maxPositions}</p>

        <p><strong>Date Of Posting:</strong> ${job.dateOfPosting}</p>
        <p><strong>Deadline:</strong> ${job.deadline}</p>
        <p><strong>SkillSet:</strong> ${job.skillsets}</p>
        <p><strong>Job Type:</strong> ${job.jobType}</p>
        <p><strong>Job Domain:</strong> ${job.domain}</p>
        <p><strong>Duration:</strong> ${job.duration}month</p>
        <p><strong>Salary:</strong> ${job.salary}</p>

        <p>"Everyone Needs to Reply back  regarding your Response Either Attending drive or not"</p>
          <button >Accepted</button>
         <button >Rejected</button>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Emails sent successfully!");
  } catch (error) {
    console.error("❌ Error sending emails:", error);
  }
};

module.exports = sendJobNotification;

import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

export const POST = async (req: Request) => {
  const { name, surname, email, message } = await req.json();
  const msg = `
    Da "${name + ' ' + surname}"\n
    ${message}\n
    \n\n\n\n\n\n\n\n\n\n
    Email: ${email}\n
    `;

  try {
    await sendgrid.send({
      to: 'wordsequotes@gmail.com', // Your email where you'll receive emails
      from: 'wordsequotes@gmail.com', // your website email address here
      subject: name + ' ' + surname + ' - Message',
      html: msg.replace(/\n/g, '<br />'),
    });
  } catch (error: any) {
    // console.log(error);
    return new Response(error, { status: 500 });
  }

  return new Response(JSON.stringify(msg), { status: 200 });
};

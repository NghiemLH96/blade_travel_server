export interface mailOption {
  from: string;
  to: string;
  subject: string;
  html?:string;
  text?: string;
}

export type sendMailFn ={
  (to:string, subject:string, html?:string,from?:string):Promise<boolean>
}

var mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
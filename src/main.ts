import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { Client } = require("@notionhq/client")
// const gcal = require('@googleapis/calendar');
import { google } from 'googleapis';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
const oauth2GCalUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.profile openid", 
      "https://www.googleapis.com/auth/calendar.app.created",
      "https://www.googleapis.com/auth/calendar.calendarlist.readonly",
      "https://www.googleapis.com/auth/calendar.events.freebusy",
      "https://www.googleapis.com/auth/calendar.events.public.readonly",
      "https://www.googleapis.com/auth/calendar.settings.readonly",
      "https://www.googleapis.com/auth/calendar.freebusy",
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.acls",
      "https://www.googleapis.com/auth/calendar.acls.readonly",
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/calendar.calendarlist",
      "https://www.googleapis.com/auth/calendar.calendars",
      "https://www.googleapis.com/auth/calendar.calendars.readonly",
      "https://www.googleapis.com/auth/calendar.events",
      "https://www.googleapis.com/auth/calendar.events.owned",
      "https://www.googleapis.com/auth/calendar.events.owned.readonly"
    ]
})

async function bootstrap() {

  console.log(oauth2GCalUrl)

  // console.log(gcal);
  // const auth = new gcal.auth.GoogleAuth({
  //   keyFilename: '',
  //   scopes: ['https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/calendar.app.created https://www.googleapis.com/auth/calendar.calendarlist.readonly https://www.googleapis.com/auth/calendar.events.freebusy https://www.googleapis.com/auth/calendar.events.public.readonly https://www.googleapis.com/auth/calendar.settings.readonly https://www.googleapis.com/auth/calendar.freebusy https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.acls https://www.googleapis.com/auth/calendar.acls.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.calendarlist https://www.googleapis.com/auth/calendar.calendars https://www.googleapis.com/auth/calendar.calendars.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.owned https://www.googleapis.com/auth/calendar.events.owned.readonly']
  // });

  // const authClient = await auth.getClient();
  // const client = gcal.calendar({
  //   version: 'v3',
  //   auth: authClient
  // });

  // const res = await client.calendarList.list();
  // console.log(res.data);

  // const client = await gcal.calendar({
  //     version: 'v1',
  //     auth: authClient
  // });

  // const listUsersResponse = await notion.users.list({})
  // console.log(listUsersResponse)

  // const db = await notion.databases.query({
  //   database_id: "262f2a21a73780169082eb4692ca9f00"
  // })

  // const db = await notion.databases.retrieve({
  //   database_id: "262f2a21a73780169082eb4692ca9f00"
  // })
  // // console.log(JSON.stringify(db, null, 2))


  // const { results } = await notion.databases.query({
  //   database_id: "262f2a21a73780169082eb4692ca9f00"
  // })

  // console.log(JSON.stringify(results, null, 2))

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


// m2m

// const docs = require('@googleapis/docs')

// const auth = new docs.auth.GoogleAuth({
//   keyFilename: 'PATH_TO_SERVICE_ACCOUNT_KEY.json',
//     // Scopes can be specified either as an array or as a single, space-delimited string.
//   scopes: ['https://www.googleapis.com/auth/documents']
// });
// const authClient = await auth.getClient();

// const client = await docs.docs({
//     version: 'v1',
//     auth: authClient
// });

// const createResponse = await client.documents.create({
//     requestBody: {
//       title: 'Your new document!',
//     },
// });

// console.log(createResponse.data);
import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { oauth2Client } from './main';
import { calendar_v3, google } from 'googleapis';
import { GaxiosResponseWithHTTP2 } from 'googleapis-common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // https://developers.google.com/workspace/calendar/api/v3/reference/events/watch

  /*??????
    const res = await calendar.events.watch({
    calendarId: 'primary',
    requestBody: {
      id: crypto.randomUUID(),
      type: 'web_hook',
      address: 'https://yourdomain.com/calendar/webhook',
    },
  });
  */

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/calendar-watch-webhook")
  calendarWatchWebhook(@Req() param): any {
    console.log("headers", param.headers);
    console.log("body", param.body);
    console.log("WEBHOOK WATCH CALENDAR EVENT");
    return "ok";
  }

  @Get("/callback")
  async oauth2GoogleCallback(@Req() param): Promise<any> {

    const { code } = param.query;
    const { tokens } = await oauth2Client.getToken(code);
    console.log("tokens", tokens);
    oauth2Client.setCredentials(tokens);
    
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const calendars:GaxiosResponseWithHTTP2<calendar_v3.Schema$CalendarList>= await calendar.calendarList.list();
    
    const res = await calendar.events.list({
      calendarId: calendars.data.items?.filter( item => item.id === "lapotion.store@gmail.com")[0].id as string,
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    // console.log(res.data.items);


    return(res.data);
  }

//   app.get("/callback", async (req, res) => {
//   const { code } = req.query;
//   const { tokens } = await oauth2Client.getToken(code);
//   oauth2Client.setCredentials(tokens);

//   // 3️⃣ Appel de l’API Calendar
//   const calendar = google.calendar({ version: "v3", auth: oauth2Client });
//   const result = await calendar.calendarList.list();
//   res.json(result.data);
// });

}

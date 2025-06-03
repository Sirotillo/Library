import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import { readFileSync } from "fs";
import { join } from "path";

@Injectable()
export class GoogleSheetsService {
  private auth: any;
  private spreadsheetId = "14Tow3-oTmnSv_0D0rWGta__V_rTXeYM4_yxMPPrEiS8";

  constructor() {
    const keyFile = join(
      process.cwd(),
      "credentials",
      "library-461511-fd64948b657f.json"
    );
    const credentials = JSON.parse(readFileSync(keyFile, "utf-8"));

    this.auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }

  private async getSheets() {
    const client = await this.auth.getClient();
    return google.sheets({ version: "v4", auth: client });
  }

  async writeRows(sheetName: string, headers: string[], rows: any[][]) {
    const sheets = await this.getSheets();

    await sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [headers],
      },
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!A2`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: rows,
      },
    });
  }
}

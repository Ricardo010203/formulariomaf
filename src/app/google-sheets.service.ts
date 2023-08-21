 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetsService {
  private baseUrl = 'https://app-formu-maf.vercel.app'; // La URL del servidor Node.js

  constructor(private http: HttpClient) {}

  // Esta función realiza una solicitud GET al servidor para obtener datos desde Google Sheets
  getDataFromGoogleSheets(): Observable<any[]> {
    const url = `${this.baseUrl}/get-data`; // La URL final sería "http://localhost:3000/get-data"
    return this.http.get<any[]>(url); // Retorna un Observable con los datos obtenidos
  }

  enviarDatos(arreglo: any[]) {
    console.log(arreglo);
    const url = `${this.baseUrl}/get-data`;
    return this.http.post(url, arreglo);
  }
}


/* import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetsService {
  private googleSheetsUrl =
    'https://sheets.googleapis.com/v4/spreadsheets/1tV58GQA8i96JUxSsjm0mIAqofT0fzPVi4NRv80NcTNY/values/A1:append';

  private googleSheetsCredentials = {
    "type": "service_account",
    "project_id": "formulario-maf",
    "private_key_id": "aa6dae542053c31ffa9259cc1323eb1583cffcc2",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDZWHHcrTb3rgF4\nJCNceyzIAl2DXViABpWO5zFe5z94SmhC+n/vfd8KZkgcdzC85/QKgC0NfpUbFlE1\ntX2OmmUe6J4rjYcdBdqUy2MGYEnb/QC1BQ4nKtXD/Cb9lERsYAk20rEXEiEMQQTs\nfSoDwOzF2E04eJ35U2XCSx93wtN31JAsJLCe5OfzGYPhMfM+AUsSSFoMaX+ryLve\n+WKElsSnGgPCErkLULYOodLGYou9Tyb/m+dMCXxG657NE1CNifxLKRxKDkIdYHJY\nDgCmWmebk2klp7bHvH35K8FscZMQTxncJlzWduorJGtNPJesXtFXkRSKZk4iHnrC\nQgEn4TbvAgMBAAECggEAIsRqpl3Q+qrLkl/Zhjwv7Ciws8hVVVl4SB1EgQVl2kSw\ny/INUA6nBJ9a7q7ETZufJqTdUBjNGkGmKPzIwmyBO4IDdz0S/XoHvqCQTR9PAVFF\n8S8HVg2cl1a5F/xFO77bCnmGmYWtYqvt8TSOaX5NgdJ5e8yTnKQSFZP1yy8Pq825\n1EEe+KTULMxLkX2Hw1Ci2TX+2A5nAdQibQQINSj8WoECHLbJ89ge8xNnhtWHjXdr\n7R9Uv8KAS3w8BwCkeSVSkz6Ix3GfERzYWqsJsfQOUcFeOnANTIxL+GKv1B/w0hKF\nbI0Y0KDeeWwLL/9ZmOZZrj7Z8K7GxEZvxx0SdbGN0QKBgQD5GqytCQwetIktq9PE\n299ipcH+rzr/0+yU1iWF0SFPwK/pkWTp3x6V5BZFVYz8lMp2/M9jothe+d5T+/Ho\nrFRqs/F3zLuqknEyMRGhfI/TnfNX/kVCXK+UT0NZMKp2S7bgeAkvi6S8+AFsTUtL\nZQ+LJ9E/ezjPk7inEn7JmJKLPwKBgQDfXLS6JmPCy2pLcd1HEBYC/vJpO5+bsBPS\ng/mrhAtBtId2taUDpYJcQeGgzKlmTgoLSg92iIZfieqXksJnKh4+LDJtrk9qzQDS\nNDYmtLssz7ydFNGt01fRjrBMbKvAeYuyePeyT6CKsbneQ8EOJlIIFflV0lHIX+X9\njWJCIHrYUQKBgFo3TehRCYGpUrEmtMhr9QguDgcmAVEbuGfi8q33IoBWwZ7umESX\nGOWiOGqd5DSp0nWrc5SbKo+jIOD7sw3YM659QutnS2QoKzTJTqBUk2ZJoxLwNLcn\nCDPHTRXlKSc0nqPG9VSx11TU4PcPO0Cv9iQopIDAKMAMuOhRK3fpeNFTAoGAdOI3\ndN4YAFygICDSsZg6XJD7W5Qm3rrSdKw5X8a2eUi2RqmhU3ot8IdNQe83imC2Itg7\npUSmRKKQT4cuEfxZXSGVtg2sY3ApyNYnrDORa06+HdlCLFtXLkMkAKoxaoRwVRG2\nVOoUUd/VKvl7siLddHvDQWTRBTEh0oBE9eO3RTECgYAnucKzt+cWgDVOdgZ9F5kO\nFsYPt3PPXRBqnEQe6IODrZ54zU1vTwdquu6wriIIsF0svAFPoLzW/ExfagqtWPtf\n+HjVPk9vMSYFDtauHU3czu3b5+zFlIhemYuHyFMiZ0Tp2SUhwbzQVD0Lano+TXDh\n6ykqyc1RXPDey79wyJgisA==\n-----END PRIVATE KEY-----\n",
    "client_email": "formulario-perfilador@formulario-maf.iam.gserviceaccount.com",
    "client_id": "113899197695756036802",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/formulario-perfilador%40formulario-maf.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  };

  constructor() {}

  async appendData(data: any[]): Promise<void> {
    try {
      const response = await axios.post(this.googleSheetsUrl, {
        values: data,
      }, {
        params: {
          key: this.googleSheetsCredentials.private_key,
        },
      });

      if (response.status === 200) {
        console.log('Datos enviados exitosamente a Google Sheets.');
      } else {
        console.error('Error al enviar datos:', response.data);
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  }
} */
/* import { Injectable } from '@angular/core';
import { google, sheets_v4 } from 'googleapis';
import { JWT } from 'google-auth-library';

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetsService {
  private readonly credentials = {
    "type": "service_account",
    "project_id": "formulario-maf",
    "private_key_id": "aa6dae542053c31ffa9259cc1323eb1583cffcc2",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDZWHHcrTb3rgF4\nJCNceyzIAl2DXViABpWO5zFe5z94SmhC+n/vfd8KZkgcdzC85/QKgC0NfpUbFlE1\ntX2OmmUe6J4rjYcdBdqUy2MGYEnb/QC1BQ4nKtXD/Cb9lERsYAk20rEXEiEMQQTs\nfSoDwOzF2E04eJ35U2XCSx93wtN31JAsJLCe5OfzGYPhMfM+AUsSSFoMaX+ryLve\n+WKElsSnGgPCErkLULYOodLGYou9Tyb/m+dMCXxG657NE1CNifxLKRxKDkIdYHJY\nDgCmWmebk2klp7bHvH35K8FscZMQTxncJlzWduorJGtNPJesXtFXkRSKZk4iHnrC\nQgEn4TbvAgMBAAECggEAIsRqpl3Q+qrLkl/Zhjwv7Ciws8hVVVl4SB1EgQVl2kSw\ny/INUA6nBJ9a7q7ETZufJqTdUBjNGkGmKPzIwmyBO4IDdz0S/XoHvqCQTR9PAVFF\n8S8HVg2cl1a5F/xFO77bCnmGmYWtYqvt8TSOaX5NgdJ5e8yTnKQSFZP1yy8Pq825\n1EEe+KTULMxLkX2Hw1Ci2TX+2A5nAdQibQQINSj8WoECHLbJ89ge8xNnhtWHjXdr\n7R9Uv8KAS3w8BwCkeSVSkz6Ix3GfERzYWqsJsfQOUcFeOnANTIxL+GKv1B/w0hKF\nbI0Y0KDeeWwLL/9ZmOZZrj7Z8K7GxEZvxx0SdbGN0QKBgQD5GqytCQwetIktq9PE\n299ipcH+rzr/0+yU1iWF0SFPwK/pkWTp3x6V5BZFVYz8lMp2/M9jothe+d5T+/Ho\nrFRqs/F3zLuqknEyMRGhfI/TnfNX/kVCXK+UT0NZMKp2S7bgeAkvi6S8+AFsTUtL\nZQ+LJ9E/ezjPk7inEn7JmJKLPwKBgQDfXLS6JmPCy2pLcd1HEBYC/vJpO5+bsBPS\ng/mrhAtBtId2taUDpYJcQeGgzKlmTgoLSg92iIZfieqXksJnKh4+LDJtrk9qzQDS\nNDYmtLssz7ydFNGt01fRjrBMbKvAeYuyePeyT6CKsbneQ8EOJlIIFflV0lHIX+X9\njWJCIHrYUQKBgFo3TehRCYGpUrEmtMhr9QguDgcmAVEbuGfi8q33IoBWwZ7umESX\nGOWiOGqd5DSp0nWrc5SbKo+jIOD7sw3YM659QutnS2QoKzTJTqBUk2ZJoxLwNLcn\nCDPHTRXlKSc0nqPG9VSx11TU4PcPO0Cv9iQopIDAKMAMuOhRK3fpeNFTAoGAdOI3\ndN4YAFygICDSsZg6XJD7W5Qm3rrSdKw5X8a2eUi2RqmhU3ot8IdNQe83imC2Itg7\npUSmRKKQT4cuEfxZXSGVtg2sY3ApyNYnrDORa06+HdlCLFtXLkMkAKoxaoRwVRG2\nVOoUUd/VKvl7siLddHvDQWTRBTEh0oBE9eO3RTECgYAnucKzt+cWgDVOdgZ9F5kO\nFsYPt3PPXRBqnEQe6IODrZ54zU1vTwdquu6wriIIsF0svAFPoLzW/ExfagqtWPtf\n+HjVPk9vMSYFDtauHU3czu3b5+zFlIhemYuHyFMiZ0Tp2SUhwbzQVD0Lano+TXDh\n6ykqyc1RXPDey79wyJgisA==\n-----END PRIVATE KEY-----\n",
    "client_email": "formulario-perfilador@formulario-maf.iam.gserviceaccount.com",
    "client_id": "113899197695756036802",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/formulario-perfilador%40formulario-maf.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  };

  private readonly jwtClient = new JWT({
    email: this.credentials.client_email,
    key: this.credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  private readonly sheets = google.sheets('v4');

  async appendData(data: any[]): Promise<void> {
    try {
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: '1tV58GQA8i96JUxSsjm0mIAqofT0fzPVi4NRv80NcTNY',
        range: 'Sheet1', // Cambia esto al rango que desees
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: data },
        auth: this.jwtClient,
      });      

      if (response.status === 200) {
        console.log('Datos enviados exitosamente a Google Sheets.');
      } else {
        console.error('Error al enviar datos:', response.data);
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  }
}
 */
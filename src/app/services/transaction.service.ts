import { Injectable } from '@angular/core';
import { Transaction } from '../Model/transaction.model'
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxJs';
import { AppConfigService } from './app-config.service';
import { ParentTransaction } from '../Model/parentTransaction.model';
import { TransactionChild } from '../Model/transactionChildResponse.model';



@Injectable()
export class TransactionService {

  constructor(private http: Http) {

  }

  getTransactions(applicationId: number, serviceId: number, consumer: string, messageId: number, initialDate: Date, finalDate: Date, page: number, rows: number): Observable<ParentTransaction> {

    var url = `${AppConfigService.config.webApiUrl}/parentTransactions?app=` + applicationId + "&service=" + serviceId + "&page=" + page + "&rows=" + rows;
    url = AppConfigService.config.webApiUrl;
    var headers = new Headers();

    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url, {
      headers
    }).map(response => {
      return response.json() as ParentTransaction;
    });
  }

  getTransactionsTransaction(idTransaction: number): Observable<TransactionChild> {
    var url = `${AppConfigService.config.webApiUrl}/childTransactions?trx=` + idTransaction;
    var headers = new Headers();

    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json; charset=utf-8');

    return this.http.get(url, {
      headers
    }).map(response => {
      return response.json() as TransactionChild;
    });
  }

  getXmlTransaction(idTransaction: number) {
    var url = `${AppConfigService.config.webApiUrl}/transactiondata?trx=` + idTransaction;
    var headers = new Headers();

    headers.append('Content-Type', 'application/xml; charset=utf-8');
    headers.append('Accept', 'application/json, text/plain, */*');

    return this.http.get(url, {
      headers
    }).map(response => {
      var xml = '<out5:crearDobleAsesoria xmlns:out5="http://tempuri.org/" xmlns:out7="http://schemas.datacontract.org/2004/07/CRM_Proteccion_Services"><out5:nuevaAsesoria><out7:ApruebaHistoria>true</out7:ApruebaHistoria><out7:Asunto>Doble Asesoria</out7:Asunto><out7:ClienteContactado>true</out7:ClienteContactado><out7:Consecutivo>DA1234567</out7:Consecutivo><out7:Descripcion>Se le explica la diferencia de r�gimen.</out7:Descripcion><out7:ElAfiliadoDecide>2</out7:ElAfiliadoDecide><out7:EstadoHistoriaLaboral>1</out7:EstadoHistoriaLaboral><out7:FechaInicio>2017-02-02T12:09:23.299-05:00</out7:FechaInicio><out7:LeConvieneQuedarse>1</out7:LeConvieneQuedarse><out7:ListaDocumentos/><out7:MasAnosRAI>true</out7:MasAnosRAI><out7:MedioUtilizado>2</out7:MedioUtilizado><out7:NumeroIdentificacion>1</out7:NumeroIdentificacion><out7:Propietario>JMGIL</out7:Propietario><out7:SegundaAsesoria>false</out7:SegundaAsesoria><out7:TipoAsesoria>2</out7:TipoAsesoria><out7:TipoIdentificacion>CC</out7:TipoIdentificacion></out5:nuevaAsesoria></out5:crearDobleAsesoria>';
      return response.text();
    });
  }
}

FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

copy ..

EXPOSE 3000

CMD ["npm","start"]

import {SocketService} from './socket.service';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
// import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
private socket  = io('http://localhost:3000');
}

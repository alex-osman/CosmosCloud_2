import { Indicator } from './indicator';
import { Relay } from './relay';
import { Channel } from './channel';

export class Node {
  _id: string;
  name: string;
  ip: string;
  modules: any[];
}

import { Router } from 'express';

export interface Options {
  port: number;
  publicPath: string;
  routes: Router;
}

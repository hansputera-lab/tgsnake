// Tgsnake - Telegram MTProto framework developed based on gram.js.
// Copyright (C) 2022 Butthx <https://github.com/butthx>
//
// This file is part of Tgsnake
//
// Tgsnake is a free software : you can redistribute it and/or modify
//  it under the terms of the MIT License as published.
import fs from 'fs';
import { ResultGetEntity } from '../Telegram/Users/GetEntity';
export class EntityCache {
  private _cache: Map<bigint | string, ResultGetEntity> = new Map();
  private _sessionName!: string;
  constructor(sessionName: string) {
    this._sessionName = sessionName;
  }
  set(key: bigint | string, value: ResultGetEntity) {
    let _set = this._cache.set(key, value);
    if (!fs.existsSync(`${process.cwd()}/${this._sessionName}`)) {
      fs.mkdirSync(`${process.cwd()}/${this._sessionName}`);
    }
    fs.writeFileSync(
      `${process.cwd()}/${this._sessionName}/cache.json`,
      JSON.stringify([...this._cache.entries()], (k, v) => {
        return typeof v == 'bigint' ? `:bigint:${v}` : v;
      })
    );
    return _set;
  }
  get(key: string | bigint) {
    return this._cache.get(key);
  }
  has(key: string | bigint) {
    return this._cache.has(key);
  }
  clear() {
    return this._cache.clear();
  }
  delete(key: string | bigint) {
    return this._cache.delete(key);
  }
  get size() {
    return this._cache.size;
  }
  entries() {
    return this._cache.entries();
  }
  load() {
    if (!fs.existsSync(`${process.cwd()}/${this._sessionName}`)) {
      fs.mkdirSync(`${process.cwd()}/${this._sessionName}`);
    }
    if (fs.existsSync(`${process.cwd()}/${this._sessionName}/cache.json`)) {
      let file = JSON.parse(
        fs.readFileSync(`${process.cwd()}/e-cache-${this._sessionName}.json`, 'utf8')
      );
      for (let [k, v] of file) {
        let g = new ResultGetEntity();
        for (let [kk, vv] of Object.entries(v)) {
          if (typeof vv == 'string') {
            if (vv.startsWith(':bigint:')) {
              let vvv = vv.replace(':bigint:', '');
              if (!isNaN(Number(vvv))) {
                g[kk] = BigInt(vvv);
              }
            } else {
              g[kk] = vv;
            }
          } else {
            g[kk] = vv;
          }
        }
        this._cache.set(k.startsWith(':bigint:') ? BigInt(k.replace(':bigint:', '')) : k, g);
      }
    }
    return this;
  }
}

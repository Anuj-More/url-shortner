const CHARSET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export class Base62 {
  static encode(id: bigint): string {
    if (id === 0n) return CHARSET[0];
    
    let res = '';
    while (id > 0n) {
      res = CHARSET[Number(id % 62n)] + res;
      id = id / 62n;
    }
    return res;
  }

  static decode(str: string): bigint {
    let res = 0n;
    for (const char of str) {
      res = res * 62n + BigInt(CHARSET.indexOf(char));
    }
    return res;
  }
}
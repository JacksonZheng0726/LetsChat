// import { error } from 'console';
import { SignJWT, jwtVerify } from 'jose'

export class idConvert {
  public async idTojwt(memberID: string): Promise<string> {
    const encodedKey = new TextEncoder().encode(process.env.MASTER_SECRET + 'MIDT')
    return new SignJWT({ id: memberID })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30m')
      .sign(encodedKey)
  }
}

export class jwtConvert {
  public async jwtToid(jwtToken: string): Promise<string> {
    if (!process.env.MASTER_SECRET) {
      throw Error('secret has error');
    }
    const mainKey = new TextEncoder().encode(process.env.MASTER_SECRET)
    const midtKey = new TextEncoder().encode(process.env.MASTER_SECRET + 'MIDT') 
    let result = await this.verify(jwtToken, mainKey);
    if (!result) {
      result = await this.verify(jwtToken, midtKey);
    }
    if (result) {
      return result.id as string;
    }
    throw new Error('unknown ID token');
  }
  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/Uint8Array*/
  private async verify(token: string, key: Uint8Array) {
    try {
      const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] });
      return payload;
    } catch {
      return null;
    }
  }
}

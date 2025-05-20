import { TurboFactory } from '@ardrive/turbo-sdk';
import Arweave from 'arweave';
import { Readable } from 'stream';
import { withTimeout } from '../utils/timeout.js';

export const handleFileUpload = async (buffer: Buffer): Promise<string> => {
  const arweave = new Arweave({});
  const jwk = await arweave.wallets.generate();

  const turbo = TurboFactory.authenticated({ privateKey: jwk });

  const fileSize = buffer.length;

  const uploadResult = await withTimeout(
    turbo.uploadFile({
      fileStreamFactory: () => Readable.from(buffer),
      fileSizeFactory: () => fileSize,
    }),
    15000 // 15 seconds
  );

  return uploadResult.id;
};

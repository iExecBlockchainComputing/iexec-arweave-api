import { TurboFactory } from '@ardrive/turbo-sdk';
import Arweave from 'arweave';
import { Readable } from 'stream';

export const handleFileUpload = async (buffer: Buffer): Promise<string> => {
  const arweave = new Arweave({});
  const jwk = await arweave.wallets.generate();

  const turbo = TurboFactory.authenticated({ privateKey: jwk });

  const fileSize = buffer.length;

  const uploadResult = await turbo.uploadFile({
    fileStreamFactory: () => Readable.from(buffer),
    fileSizeFactory: () => fileSize,
    dataItemOpts: {
      tags: [
        {
          name: "App-Name",
          value: "iExec",
        },
      ],
    },
    signal: AbortSignal.timeout(15_000),
  });

  return uploadResult.id;
};

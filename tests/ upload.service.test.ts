import { describe, expect, it } from 'vitest';
import { handleFileUpload } from '../src/upload/upload.service';

describe('handleFileUpload', () => {
  it('should upload and return an Arweave ID', async () => {
    const buffer = Buffer.from('Hello Arweave!');
    const id = await handleFileUpload(buffer);
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(10);
  }, 10_000);
});

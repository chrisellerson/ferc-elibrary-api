import { existsSync, mkdirSync } from 'fs'
import { beforeAll, describe, expect, test } from 'vitest'
import { downloadFile, generatePDF } from '~/util/download'

describe.concurrent('Download Files', () => {
  beforeAll(async () => {
    if (!existsSync('temp')) mkdirSync('temp')
  })

  test('Download PDF', async () => {
    const fileID = '020AAB97-66E2-5005-8110-C31FAFC91712'
    await downloadFile(
      {
        FileType: '',
        accession: '',
        fileid: 0,
        FileIDAll: '',
        fileidLst: [fileID],
        Islegacy: false,
      },
      {
        file: fileID,
      }
    )
    expect(existsSync(`temp/${fileID}.pdf`)).toBeTruthy()
  })

  test('Download Empty PDF', async () => {
    const fileID = 'temp'
    await downloadFile(
      {
        FileType: '',
        accession: '',
        fileid: 0,
        FileIDAll: '',
        fileidLst: [],
        Islegacy: false,
      },
      {
        file: fileID,
      }
    )
    expect(existsSync(`temp/${fileID}.pdf`)).toBeTruthy()
  })

  test('Download TIF', async () => {
    const fileID = '020D2E72-66E2-5005-8110-C31FAFC91712'
    await downloadFile(
      {
        FileType: '',
        accession: '',
        fileid: 0,
        FileIDAll: '',
        fileidLst: [fileID],
        Islegacy: false,
      },
      {
        format: 'tif',
      }
    )
    expect(existsSync(`temp/${fileID}.tif`)).toBeTruthy()
  })

  test('Generate PDF', async () => {
    const fileID = '20201119-5202'
    await generatePDF(fileID, {
      format: 'pdf',
    })
    expect(existsSync(`temp/${fileID}.pdf`)).toBeTruthy()
  })
})

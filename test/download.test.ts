import { existsSync } from 'fs'
import { describe, expect, test } from 'vitest'
import { downloadFile, generatePDF } from '~/util/download'

describe.concurrent('Download Files', () => {
  test('Download PDF', async () => {
    const fileID = '020AAB97-66E2-5005-8110-C31FAFC91712'
    await downloadFile({
      FileType: '',
      accession: '',
      fileid: 0,
      FileIDAll: '',
      fileidLst: [fileID],
      Islegacy: false,
    })
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

//  https://elibrary.ferc.gov/eLibrarywebapi/api/File/DownloadP8File

import { writeFile } from 'fs'
import { join } from 'path'
import { DownloadFileParams } from '~/types/DownloadFile'

export type FileInfo = {
  path: string
  file: string
  format: string
}

const FileInfoDefault: FileInfo = {
  path: 'temp',
  format: 'pdf',
  file: 'temp',
}

export async function downloadFile(
  params: DownloadFileParams,
  fileInfo?: Partial<FileInfo>
) {
  const fi = {
    ...FileInfoDefault,
    ...{ file: params.fileidLst[0] ?? FileInfoDefault.file },
    ...fileInfo,
  } as FileInfo

  return download(fi, 'File/DownloadP8File', {}, params)
}

export async function generatePDF(
  accessionNumber: string,
  fileInfo?: Partial<FileInfo>
) {
  const fi = {
    ...FileInfoDefault,
    ...{ file: accessionNumber },
    ...fileInfo,
  } as FileInfo

  return download(
    fi,
    'File/DownloadPDF',
    { accessionNumber },
    '{serverLocation: ""}'
  )
}

async function download<
  B extends Record<string, unknown> | string,
  P extends Record<string, string>
>(fileInfo: FileInfo, url: string, params: P, body: B) {
  return fetch(
    `https://elibrary.ferc.gov/eLibrarywebapi/api/${url}?` +
      new URLSearchParams(params),
    {
      headers: {
        accept: 'application/json, text/plain, */*',
        'content-type': 'application/json',
      },
      body: typeof body === 'string' ? body : JSON.stringify(body),
      method: 'POST',
    }
  )
    .then((r) => r.arrayBuffer())
    .then((ab) =>
      writeFile(
        join(fileInfo.path, `${fileInfo.file}.${fileInfo.format}`),
        Buffer.from(ab),
        'binary',
        () => {}
      )
    )
}

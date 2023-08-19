import { http } from '~/axios'

export async function fetchBlobData(url: string) {
  const res = await http.get<{ data: Blob }>(url, {
    responseType: 'blob',
    meta: {
      allReturn: true,
    },
  })

  return res.data
}

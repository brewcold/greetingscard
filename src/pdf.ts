import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export async function saveCard() {
  const card = document.querySelector<HTMLElement>('#card')
  if (!card) return

  const hideTargets = document.querySelectorAll<HTMLElement>('button')
  hideTargets.forEach(el => el.classList.add('pdf-hide'))

  if (document.fonts?.ready) await document.fonts.ready

  const canvas = await html2canvas(card, {
    backgroundColor: '#333', // card의 배경색 그대로 쓰고 싶으면 null
    scale: Math.min(2, window.devicePixelRatio || 1), // 너무 크면 모바일에서 메모리 터짐
    useCORS: true, // 같은 출처 이미지면 ok. 외부 이미지면 CORS 필요
  })

  // UI 복구
  hideTargets.forEach(el => el.classList.remove('pdf-hide'))

  const imgData = canvas.toDataURL('image/png')

  // A4 세로(mm) 기준
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [100, 148] })
  const pageW = pdf.internal.pageSize.getWidth()
  const pageH = pdf.internal.pageSize.getHeight()

  // 여백
  const margin = 1
  const maxW = pageW - margin * 2
  const maxH = pageH - margin * 2

  // 이미지 비율 유지해서 페이지에 맞추기
  const imgW = canvas.width
  const imgH = canvas.height
  const ratio = Math.min(maxW / (imgW * 0.264583), maxH / (imgH * 0.264583))
  // 캔버스 px -> mm 변환: 1px ≈ 0.264583mm(96dpi 가정)
  const renderW = imgW * 0.264583 * ratio
  const renderH = imgH * 0.264583 * ratio

  const x = (pageW - renderW) / 2
  const y = (pageH - renderH) / 2

  pdf.addImage(imgData, 'PNG', x, y, renderW, renderH)
  pdf.save('selected-greetings-2026.pdf')
}

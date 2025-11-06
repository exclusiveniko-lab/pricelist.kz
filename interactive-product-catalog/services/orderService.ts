import { CustomerInfo, OrderDetail } from '../types';
import { robotoNormal } from './robotoFont';

// FIX: Add jspdf to the global Window interface to resolve TypeScript error.
// The jsPDF library, when loaded via a script tag, attaches itself to the window object as 'jspdf'.
declare global {
  interface Window {
    jspdf: any;
  }
}

// Let TypeScript know that these are global variables from the script tags
declare var XLSX: any;
declare var jsPDF: any;

export function exportOrderToExcel(
  orderDetails: OrderDetail[],
  grandTotal: number,
  customerInfo: CustomerInfo
): void {
  // --- 1. Prepare Data ---
  const customerData = [
    ["Название магазина:", customerInfo.shopName],
    ["Имя покупателя:", customerInfo.customerName],
    ["Номер телефона:", customerInfo.phone],
    ["Адрес магазина:", customerInfo.address],
    [], // Spacer
    ["Дата заказа:", new Date().toLocaleDateString('ru-RU')]
  ];

  const productHeader = ["Модель", "Категория", "Количество", "Цена (₸)", "Сумма (₸)"];
  
  const productData = orderDetails.map(item => [
    item.product.model,
    item.product.category,
    item.quantity,
    { t: 'n', v: item.product.price, z: '#,##0.00' }, // Format as number with 2 decimal places
    { t: 'n', v: item.totalPrice, z: '#,##0.00' }
  ]);
  
  const totalRow = [
    "", "", "", 
    { t: 's', v: 'ИТОГО:', s: { font: { bold: true } } },
    { t: 'n', v: grandTotal, z: '#,##0.00', s: { font: { bold: true } } }
  ];

  // --- 2. Create Worksheet ---
  const ws = XLSX.utils.aoa_to_sheet(customerData);
  XLSX.utils.sheet_add_aoa(ws, [[]], { origin: -1 }); // Spacer
  XLSX.utils.sheet_add_aoa(ws, [productHeader], { origin: -1 });
  XLSX.utils.sheet_add_json(ws, productData, { origin: -1, skipHeader: true });
  XLSX.utils.sheet_add_aoa(ws, [totalRow], { origin: -1 });

  // --- 3. Style and Format Worksheet ---
  // Set column widths for better readability
  ws['!cols'] = [
    { wch: 20 }, // Model
    { wch: 20 }, // Category
    { wch: 12 }, // Quantity
    { wch: 15 }, // Price
    { wch: 15 }  // Total
  ];

  // --- 4. Create Workbook and Download ---
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Накладная");

  // Generate a filename
  const fileName = `Заказ_${customerInfo.shopName.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
  
  XLSX.writeFile(wb, fileName);
}


export function exportOrderToPdf(
  orderDetails: OrderDetail[],
  grandTotal: number,
  customerInfo: CustomerInfo
): void {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Add Roboto font that supports Cyrillic
  doc.addFileToVFS("Roboto-Regular.ttf", robotoNormal);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto");

  // --- Header ---
  doc.setFontSize(22);
  doc.text("Накладная", 14, 22);
  
  // --- Customer Info ---
  doc.setFontSize(11);
  doc.text(`Название магазина: ${customerInfo.shopName}`, 14, 40);
  doc.text(`Имя покупателя: ${customerInfo.customerName}`, 14, 46);
  doc.text(`Номер телефона: ${customerInfo.phone}`, 14, 52);
  doc.text(`Адрес магазина: ${customerInfo.address}`, 14, 58);
  doc.text(`Дата заказа: ${new Date().toLocaleDateString('ru-RU')}`, 14, 64);

  // --- Products Table ---
  const tableColumn = ["Модель", "Категория", "Кол-во", "Цена (₸)", "Сумма (₸)"];
  const tableRows: (string | number)[][] = [];

  orderDetails.forEach(item => {
    const itemData = [
      item.product.model,
      item.product.category,
      item.quantity,
      item.product.price.toFixed(2),
      item.totalPrice.toFixed(2)
    ];
    tableRows.push(itemData);
  });
  
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 75,
    theme: 'grid',
    headStyles: { fillColor: [22, 160, 133], font: 'Roboto' },
    styles: { font: 'Roboto' }
  });

  // --- Grand Total ---
  const finalY = doc.autoTable.previous.finalY;
  doc.setFontSize(14);
  doc.setFont("Roboto", "normal", "bold");
  doc.text(`Итого: ₸${grandTotal.toFixed(2)}`, 14, finalY + 15);

  // --- Save File ---
  const fileName = `Заказ_${customerInfo.shopName.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}
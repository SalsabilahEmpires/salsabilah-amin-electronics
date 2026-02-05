/**
 * SALSABILAH AMIN EMPIRES LTD - OFFICIAL CORE ENGINE
 * Registered in UK: 09814720 | Strategy: MD AL AMIN SOHAG
 */

const EMPIRE_CONFIG = {
    API_KEY: "9957b74834b6681bca3660749917d404134724ff49426",
    GATEWAY_URL: "https://amarsmsbd.xyz/api/smsSendApi",
    SENDER_ID: "880961761xxxx", 
    EMI_DIVIDER: 6
};

// ১. সুপার এসএমএস ও কিস্তি ইঞ্জিন
async function processSmartReminders(customerName, totalDue, mobile) {
    let cleanDue = parseFloat(totalDue.toString().replace(/[^0-9.]/g, ''));
    if (isNaN(cleanDue) || cleanDue <= 0) return;
    let installment = (cleanDue / EMPIRE_CONFIG.EMI_DIVIDER).toFixed(2);
    let nextDate = "10/" + (new Date().getMonth() + 2) + "/" + new Date().getFullYear();
    let msg = `Shu-priyo ${customerName}, Salsabilah Electronics-e apnar kisti ${installment} TK. Shesh tarik: ${nextDate}. Dhonno-bad. Salsabilah Electronics Ltd.`;
    const url = `${EMPIRE_CONFIG.GATEWAY_URL}?apiKey=${EMPIRE_CONFIG.API_KEY}&smsText=${encodeURIComponent(msg)}&number=${mobile}&senderid=${EMPIRE_CONFIG.SENDER_ID}`;
    try { await fetch(url); console.log("Success"); } catch (e) { console.log("Error"); }
}

// ২. রাজকীয় ওয়ারেন্টি প্রিন্ট ইঞ্জিন
function printOfficialWarranty(invoiceId, customerName, itemName, expiryDate) {
    const w = window.open('', '_blank');
    w.document.write(`
        <html><body onload="window.print()">
        <div style="width:190mm; height:277mm; border:15px double #002366; margin:10mm auto; padding:40px; position:relative; font-family:serif; box-sizing:border-box;">
            <div style="text-align:center; border-bottom:2px solid #002366; padding-bottom:10px;">
                <h1 style="font-size:36pt; margin:0;">WARRANTY CERTIFICATE</h1>
                <p style="font-size:14pt; font-weight:bold;">SALSABILAH AMIN EMPIRES LTD. (UK REG: 09814720)</p>
            </div>
            <div style="margin-top:60px; font-size:16pt; line-height:2.5;">
                <p><strong>Certificate ID:</strong> ${invoiceId}</p>
                <p><strong>Beneficiary:</strong> ${customerName}</p>
                <p><strong>Product Detail:</strong> ${itemName}</p>
                <p><strong>Valid Until:</strong> ${expiryDate}</p>
            </div>
            <div style="position:absolute; bottom:80px; right:80px; text-align:center;">
                <img src="https://salsabilah.com/assets/signature.png" width="200" onerror="this.style.display='none'"><br>
                <strong style="font-size:16pt;">MD. AL AMIN SOHAG</strong><br>Managing Director
            </div>
            <div style="position:absolute; top:35%; left:15%; font-size:80pt; color:rgba(0,35,102,0.03); transform:rotate(-45deg); z-index:-1;">SALSABILAH</div>
        </div>
        </body></html>`);
    w.document.close();
}

console.log("Empire Core: Active and Optimized.");

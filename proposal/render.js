const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///home/user/mediadar/proposal/index.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  // report overflow per page
  const info = await page.evaluate(() => {
    return [...document.querySelectorAll('.page')].map((p,i)=>({
      i:i, h:p.scrollHeight, ch:p.clientHeight, over: p.scrollHeight - p.clientHeight
    }));
  });
  console.log(JSON.stringify(info));
  await page.pdf({
    path: '/home/user/mediadar/proposal/사업제안서_시술이후를팝니다.pdf',
    width: '297mm', height: '210mm', printBackground: true,
    margin: {top:'0',right:'0',bottom:'0',left:'0'}
  });
  await browser.close();
})();

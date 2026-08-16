const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport:{width:1122,height:794}, deviceScaleFactor:1.6 });
  await p.goto('file:///home/user/mediadar/proposal/index.html', { waitUntil:'networkidle' });
  await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(500);
  const pages = await p.$$('.page');
  for (const [i,el] of pages.entries()) {
    await el.screenshot({ path:`/tmp/claude-0/-home-user-mediadar/7efd0b36-a9f6-54da-b8f0-bbc974744cbe/scratchpad/p${String(i).padStart(2,'0')}.png` });
  }
  await b.close();
})();

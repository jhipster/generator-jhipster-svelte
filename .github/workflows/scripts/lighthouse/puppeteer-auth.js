module.exports = async (browser, context) => {
	const page = await browser.newPage();
	await page.goto('http://localhost:8080/login');
	await page.waitForSelector('#username', { timeout: 4000 });
	await page.type('#username', 'admin');
	await page.type('#password', 'admin');
	await page.click('[type="submit"]');
	await page.waitForNavigation();
};

const { test, expect } = require('@playwright/test');

const pages = [
  ['/', 'Building toward the next generation of AI.'],
  ['/projects.html', 'Projects I’ve built to learn by building.'],
  ['/chicago.html', 'Chicago is part of how I introduce myself.'],
  ['/food.html', 'I’m always looking for the next place worth the walk.'],
  ['/gym.html', 'Chest day is the best day. I will defend that position.'],
  ['/adventures.html', 'I’m happiest when there’s something new to try.'],
];

test('all public pages load with a usable heading, skip link, and site guide control', async ({ page }) => {
  for (const [path, heading] of pages) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    if (path === '/') await page.keyboard.type('jovanny');
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main-content');
    expect(await page.locator('#main-content').count(), path).toBe(1);
    await expect(page.getByRole('button', { name: 'Open Águila site guide' })).toBeVisible();
  }
});

test('visitor can enter the home page and find projects and contact', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toHaveClass(/name-sequence-locked/);
  await page.keyboard.type('jovanny');
  await expect(page.locator('body')).not.toHaveClass(/name-sequence-locked/);
  await expect(page.locator('[data-name-status]')).toHaveText('You’re in.');
  await expect(page.getByRole('heading', { name: /Let’s build what/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /jfigu53@illinois.edu/ }).first()).toHaveAttribute('href', 'mailto:jfigu53@illinois.edu');
  await page.getByRole('link', { name: 'See my projects' }).click();
  await expect(page).toHaveURL(/\/projects\.html$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Projects I’ve built');
});

test('Águila answers a known question and declines an unrelated one', async ({ page }) => {
  await page.goto('/projects.html');
  const open = page.getByRole('button', { name: 'Open Águila site guide' });
  await open.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(open).toHaveAttribute('aria-expanded', 'true');
  const input = page.getByRole('textbox', { name: 'Ask about Jovanny or this website' });
  await input.fill('How can I contact Jovanny?');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.locator('.assistant-message-answer').last()).toContainText('jfigu53@illinois.edu');
  await input.fill('What is the weather on Mars?');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.locator('.assistant-message-answer').last()).toContainText('outside Águila’s lane');
  await page.getByRole('button', { name: 'Close Águila site guide' }).click();
  await expect(open).toHaveAttribute('aria-expanded', 'false');
});

test('both project presentations navigate and load their media', async ({ page, request }) => {
  await page.goto('/projects.html');
  for (const [deck, finalCount] of [['hearmeout', '09'], ['clarity', '08']]) {
    const viewer = page.locator(`[data-deck-viewer="${deck}"]`);
    const count = viewer.locator('[data-deck-count]');
    await expect(count).toHaveText(`01 / ${finalCount}`);
    await viewer.locator('[data-deck-next]').click();
    await expect(count).toHaveText(`02 / ${finalCount}`);
    await viewer.locator('.deck-thumbnail').last().click();
    await expect(count).toHaveText(`${finalCount} / ${finalCount}`);
    await expect(viewer.locator('[data-deck-next]')).toBeDisabled();
    await expect.poll(
      () => viewer.locator('[data-deck-stage]').evaluate(img => img.complete && img.naturalWidth > 0),
      { message: `${deck} slide image loads` },
    ).toBe(true);
    const video = await viewer.locator('video source').first().getAttribute('src');
    const response = await request.head(new URL(video, page.url()).toString());
    expect(response.status(), `${deck} video`).toBe(200);
  }
});

test('main pages fit a phone screen without horizontal scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ['/', '/projects.html']) {
    await page.goto(path);
    if (path === '/') await page.keyboard.type('jovanny');
    const widths = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: window.innerWidth }));
    expect(widths.document, `${path}: ${JSON.stringify(widths)}`).toBeLessThanOrEqual(widths.viewport + 1);
    await expect(page.getByRole('link', { name: 'Projects', exact: true }).first()).toBeVisible();
  }
});

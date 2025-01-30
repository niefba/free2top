import { test, expect } from '@playwright/test';

const course = {
  target: 'Col du Bel Oiseau',
  itinerary: 'Depuis La Léchère',
  description: 'Matériel standard: DVA, pelle, sonde.',
  category: 'ski touring',
  dateBegin: '2030-01-31',
  altitude: 2500,
  ascending: 1200,
  hours: 4,
  publicTransport: true,
  dateStamm: '2030-01-30',
  inactive: false
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('should have the title Free2Top', async ({ page }) => {
  await expect(page).toHaveTitle(/Free2Top/);
});

test('should display a signup link', async ({ page }) => {
  // Click the signup link.
  await page.getByRole('link', { name: 'Devenir membre' }).click();

  // Expects page to have a link with the name of 'Déjà membre ?'.
  await expect(page.getByRole('link', { name: 'Déjà membre ?' })).toBeVisible();
});

test('should allow to signup', async ({ page, browserName }) => {
  // Click the signup link.
  await page.getByRole('link', { name: 'Devenir membre' }).click();

  // Text input
  await page.getByRole('textbox', { name: 'Prénom' }).fill('John');
  await page.getByRole('textbox', { name: 'Nom', exact: true }).fill('Doe');
  await page.getByRole('textbox', { name: 'Identifiant' }).fill(`${browserName}@ik.me`);
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('secret$1');
  await page.getByRole('textbox', { name: 'Confirmation' }).fill('secret$1');

  // Sign Up button
  await page.getByRole('button', { name: 'Sign Up' }).click()
});

test('should not allow to signup twice', async ({ page, browserName }) => {
  // Click the signup link.
  await page.getByRole('link', { name: 'Devenir membre' }).click();

  // Text input
  await page.getByRole('textbox', { name: 'Prénom' }).fill('John');
  await page.getByRole('textbox', { name: 'Nom', exact: true }).fill('Doe');
  await page.getByRole('textbox', { name: 'Identifiant' }).fill(`${browserName}@ik.me`);
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('secret$1');
  await page.getByRole('textbox', { name: 'Confirmation' }).fill('secret$1');

  // Sign Up button
  await page.getByRole('button', { name: 'Sign Up' }).click()

  // Check the error message
  await expect(page.getByText("Les informations saisies sont incorrectes ou l'adresse mail est déjà utilisée.")).toBeVisible();
});

test.describe('Members', () => {

  test.beforeEach(async ({ page, browserName }) => {
    // Sign In
    await page.getByRole('textbox', { name: 'Identifiant' }).fill(`${browserName}@ik.me`);
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill('secret$1');
    await page.getByRole('button', { name: 'Sign In' }).click()
  });

  test('should display the member\'s name', async ({ page }) => {
    // Expects page to redirect at Dashboard
    await page.waitForURL('/dashboard');

    await expect(page.getByText("John Doe")).toBeVisible();
  });

  test('should allow to create, update and delete a course', async ({ page, browserName }) => {
    // Expects page to have a link with the name of 'Proposer une nouvelle course'.
    await expect(page.getByRole('link', { name: 'Proposer une nouvelle course' })).toBeVisible();

    // Click the create link.
    await page.getByRole('link', { name: 'Proposer une nouvelle course' }).click();

    // Expects page to redirect at Course
    await page.waitForURL('/course');

    // Cancel button
    await page.getByRole('link', { name: 'Annuler' }).click()

    // Expects page to redirect at Dashboard
    await page.waitForURL('/dashboard');

    // Click the create link.
    await page.getByRole('link', { name: 'Proposer une nouvelle course' }).click();

    await page.getByRole('textbox', { name: 'Objectif' }).fill(browserName);
    await page.getByRole('textbox', { name: 'Itinéraire' }).fill(course.itinerary);
    await page.getByRole('checkbox', { name: 'Transports publics' }).check();
    await page.getByLabel('Date de la course').fill(course.dateBegin);
    await page.getByLabel('Date du Stamm').fill(course.dateStamm);
    await page.getByLabel('Altitude en mètres').fill(String(course.altitude));
    await page.getByLabel('Dénivelé en mètres').fill(String(course.ascending));
    await page.getByLabel('Temps en heures').fill(String(course.hours));
    await page.getByRole('textbox', { name: 'Description' }).fill(course.description);
    await page.getByLabel('Catégorie').selectOption('Ski de randonnée');

    // Save button
    await page.getByRole('button', { name: 'Enregistrer' }).click()

    // Expects page to redirect at Dashboard
    await page.waitForURL('/dashboard');
    
    // Click the course link
    await page.getByRole('link', { name: browserName }).click();

    await page.getByRole('checkbox', { name: 'Transports publics' }).uncheck();

    // Save button
    await page.getByRole('button', { name: 'Enregistrer' }).click()

    // Expects page to redirect at Dashboard
    await page.waitForURL('/dashboard');

    // Click the course link
    await page.getByRole('link', { name: browserName }).click();

    // Click the Delete button
    await page.getByRole('button', { name: 'Supprimer' }).click()

    // Confirm
    await page.getByRole('button', { name: 'Oui' }).click()

    // Expects page to redirect at Dashboard
    await page.waitForURL('/dashboard');
  });

});

test.describe('Admin', () => {

  test.beforeEach(async ({ page }) => {
    // Sign In
    await page.getByRole('textbox', { name: 'Identifiant' }).fill(`free2top@ik.me`);
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill('secret');
    await page.getByRole('button', { name: 'Sign In' }).click()
  });

  test('create a course', async ({ page, browserName }) => {
    // Expects page to have a link with the name of 'Proposer une nouvelle course'.
    await expect(page.getByRole('link', { name: 'Proposer une nouvelle course' })).toBeVisible();

    // Click the create link.
    await page.getByRole('link', { name: 'Proposer une nouvelle course' }).click();

    // Expects page to redirect at Course
    await page.waitForURL('/course');

    await page.getByRole('textbox', { name: 'Objectif' }).fill(browserName);
    await page.getByRole('textbox', { name: 'Itinéraire' }).fill(course.itinerary);
    await page.getByRole('checkbox', { name: 'Transports publics' }).check();
    await page.getByLabel('Date de la course').fill(course.dateBegin);
    await page.getByLabel('Date du Stamm').fill(course.dateStamm);
    await page.getByLabel('Altitude en mètres').fill(String(course.altitude));
    await page.getByLabel('Dénivelé en mètres').fill(String(course.ascending));
    await page.getByLabel('Temps en heures').fill(String(course.hours));
    await page.getByRole('textbox', { name: 'Description' }).fill(course.description);
    await page.getByLabel('Catégorie').selectOption('Splitboard');
    await page.getByRole('checkbox', { name: 'Désactiver les demandes d\'inscription' }).uncheck();

    // Save button
    await page.getByRole('button', { name: 'Enregistrer' }).click()

    // Expects page to redirect at Dashboard
    await page.waitForURL('/dashboard');
  });

  test('should allow members to subscribe to a course proposed by others', async ({ page, browserName }) => {

    // Click the signout link.
    await page.getByRole('link', { name: 'Sign out' }).click();

    // Expects page to redirect at Sign in
    await page.waitForURL('/');

    // Sign In member
    await page.getByRole('textbox', { name: 'Identifiant' }).fill(`${browserName}@ik.me`);
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill('secret$1');
    await page.getByRole('button', { name: 'Sign In' }).click()
    await page.waitForURL('/dashboard')

    // Find a course created by another user
    await page.getByRole('link', { name: browserName }).click();
  
    // Expects page to redirect at Course
    await page.waitForURL('/course/*');

    // Expects page to have a link with the name of 'S'inscrire'.
    await expect(page.getByRole('link', { name: "S'inscrire" })).toBeVisible();

    // Cancel
    await page.getByRole('link', { name: 'Annuler' }).click()

    // Expects page to redirect at Dashboard
    await page.waitForURL('/dashboard');
  });

  test('delete course', async ({ page, browserName }) => {
    // Click the course link
    await page.getByRole('link', { name: browserName }).click();

    // Click the Delete button
    await page.getByRole('button', { name: 'Supprimer' }).click()

    // Confirm
    await page.getByRole('button', { name: 'Oui' }).click()

    // Expects page to redirect at Dashboard
    await page.waitForURL('/dashboard');
  });

});

import {expect, test} from 'vitest';
import {pirkeiAvot} from '../src/pirkeiAvotBase';
import {PirkeiAvotSummerEvent} from '../src/PirkeiAvotSummerEvent';
import {HDate, months} from '@hebcal/core';

function makeSaturdays(currentYear) {
  const pesach7 = new HDate(21, months.NISAN, currentYear);
  const firstSaturday = pesach7.onOrAfter(6).abs();
  const erevRH = new HDate(1, months.TISHREI, currentYear + 1).abs() - 1;
  const dates = [];
  for (let abs = firstSaturday; abs <= erevRH; abs += 7) {
    dates.push(new HDate(abs));
  }
  return dates;
}

test('pirkeiAvot 5784', () => {
  const dates = makeSaturdays(5784);
  const actual = {};
  for (const hd of dates) {
    const reading = pirkeiAvot(hd, true);
    actual[hd.toString()] = reading;
  }
  const expected = {
    '26 Nisan 5784': [1],
    '3 Iyyar 5784': [2],
    '10 Iyyar 5784': [3],
    '17 Iyyar 5784': [4],
    '24 Iyyar 5784': [5],
    '2 Sivan 5784': [6],
    '9 Sivan 5784': [1],
    '16 Sivan 5784': [2],
    '23 Sivan 5784': [3],
    '30 Sivan 5784': [4],
    '7 Tamuz 5784': [5],
    '14 Tamuz 5784': [6],
    '21 Tamuz 5784': [1],
    '28 Tamuz 5784': [2],
    '6 Av 5784': [3],
    '13 Av 5784': [4],
    '20 Av 5784': [5],
    '27 Av 5784': [6],
    '4 Elul 5784': [1],
    '11 Elul 5784': [2],
    '18 Elul 5784': [3, 4],
    '25 Elul 5784': [5, 6],
  };
  expect(actual).toEqual(expected);
});

test('pirkeiAvot 5783 diaspora', () => {
  const dates = makeSaturdays(5783);
  const actual = {};
  for (const hd of dates) {
    const reading = pirkeiAvot(hd, false);
    actual[hd.toString()] = reading;
  }
  const expected = {
    '24 Nisan 5783': [1],
    '1 Iyyar 5783': [2],
    '8 Iyyar 5783': [3],
    '15 Iyyar 5783': [4],
    '22 Iyyar 5783': [5],
    '29 Iyyar 5783': [6],
    '7 Sivan 5783': null,
    '14 Sivan 5783': [1],
    '21 Sivan 5783': [2],
    '28 Sivan 5783': [3],
    '5 Tamuz 5783': [4],
    '12 Tamuz 5783': [5],
    '19 Tamuz 5783': [6],
    '26 Tamuz 5783': [1],
    '4 Av 5783': [2],
    '11 Av 5783': [3],
    '18 Av 5783': [4],
    '25 Av 5783': [5],
    '2 Elul 5783': [6],
    '9 Elul 5783': [1, 2],
    '16 Elul 5783': [3, 4],
    '23 Elul 5783': [5, 6],
  };
  expect(actual).toEqual(expected);
});

test('pirkeiAvot 5783 israel', () => {
  const dates = makeSaturdays(5783);
  const actual = {};
  for (const hd of dates) {
    const reading = pirkeiAvot(hd, true);
    actual[hd.toString()] = reading;
  }
  const expected = {
    '24 Nisan 5783': [1],
    '1 Iyyar 5783': [2],
    '8 Iyyar 5783': [3],
    '15 Iyyar 5783': [4],
    '22 Iyyar 5783': [5],
    '29 Iyyar 5783': [6],
    '7 Sivan 5783': [1],
    '14 Sivan 5783': [2],
    '21 Sivan 5783': [3],
    '28 Sivan 5783': [4],
    '5 Tamuz 5783': [5],
    '12 Tamuz 5783': [6],
    '19 Tamuz 5783': [1],
    '26 Tamuz 5783': [2],
    '4 Av 5783': [3],
    '11 Av 5783': [4],
    '18 Av 5783': [5],
    '25 Av 5783': [6],
    '2 Elul 5783': [1],
    '9 Elul 5783': [2],
    '16 Elul 5783': [3, 4],
    '23 Elul 5783': [5, 6],
  };
  expect(actual).toEqual(expected);
});

test('PirkeiAvotSummerEvent', () => {
  const ev2 = new PirkeiAvotSummerEvent(new HDate(9, 'Elul', 5783), [2]);
  const ev34 = new PirkeiAvotSummerEvent(new HDate(16, 'Elul', 5783), [3, 4]);
  expect(ev2.url()).toBe('https://www.sefaria.org/Pirkei_Avot.2?lang=bi');
  expect(ev34.url()).toBe('https://www.sefaria.org/Pirkei_Avot.3-4?lang=bi');
  expect(ev2.render('en')).toBe('Pirkei Avot 2');
  expect(ev34.render('en')).toBe('Pirkei Avot 3-4');
  expect(ev2.render('he')).toBe('פִּרְקֵי אָבוֹת ב׳');
  expect(ev34.render('he')).toBe('פִּרְקֵי אָבוֹת ג׳-ד׳');
  expect(ev2.render('he-x-NoNikud')).toBe('פרקי אבות ב׳');
  expect(ev34.render('he-x-NoNikud')).toBe('פרקי אבות ג׳-ד׳');
});

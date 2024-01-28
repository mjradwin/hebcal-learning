import test from 'ava';
import {tanakhYomi, TanakhYomiEvent} from './tanakhYomi.js';
import {HDate, greg} from '@hebcal/core';

// eslint-disable-next-line require-jsdoc
function abs2iso(abs) {
  return greg.abs2greg(abs).toISOString().substring(0, 10);
}

// ישעיהו ס' כג
test('tanakhYomi-single', (t) => {
  const dt = new Date(2021, 1, 28);
  const reading = tanakhYomi(dt);
  t.is(reading.name, 'Isaiah');
  t.is(reading.blatt, 23);
  t.is(reading.verses, 'Isaiah 55:13-58:13');
});

test('tanakhYomi-skip-Shabbat', (t) => {
  const dt = new Date(2020, 9, 17);
  const reading = tanakhYomi(dt);
  t.is(reading, null);
});

test('TanakhYomiEvent', (t) => {
  const dt = new Date(2021, 1, 28);
  const reading = tanakhYomi(dt);
  const ev = new TanakhYomiEvent(new HDate(dt), reading);
  t.is(ev.render('en'), 'Isaiah Seder 23');
  t.is(ev.render('he'), 'יְשַׁעְיָהוּ ס׳ כ״ג');
  t.is(ev.render('he-x-NoNikud'), 'ישעיהו ס׳ כ״ג');
  t.is(ev.url(), 'https://www.sefaria.org/Isaiah.55.13-58.13?lang=bi');
  t.is(ev.memo, 'Isaiah 55:13-58:13');
});

test('TanakhYomiEvent-2', (t) => {
  const dt = new Date(2021, 5, 2);
  const reading = tanakhYomi(dt);
  const ev = new TanakhYomiEvent(new HDate(dt), reading);
  t.is(ev.render('en'), 'Minor Prophets Seder 15');
  t.is(ev.memo, 'Zephaniah 3:20');
});

test('TanakhYomiEvent-3', (t) => {
  const dt = new Date(2021, 8, 22);
  const reading = tanakhYomi(dt);
  const ev = new TanakhYomiEvent(new HDate(dt), reading);
  t.is(ev.render('en'), 'Chronicles Seder 21');
  t.is(ev.url(), 'https://www.sefaria.org/II_Chronicles.26.2-29.10?lang=bi');
  t.is(ev.memo, 'II Chronicles 26:2-29:10');
});

test('tanakhYomi-5781', (t) => {
  const startHD = new HDate(23, 'Tishrei', 5781);
  const endHD = new HDate(21, 'Tishrei', 5782);
  const start = startHD.abs();
  const endAbs = endHD.abs();
  const actual = {};
  for (let abs = start; abs <= endAbs; abs++) {
    const reading = tanakhYomi(abs);
    actual[abs2iso(abs)] = reading === null ? null :
      `${reading.name} ${reading.blatt}`;
  }
  const expected = {
    '2020-10-11': 'Joshua 1',
    '2020-10-12': 'Joshua 2',
    '2020-10-13': 'Joshua 3',
    '2020-10-14': 'Joshua 4',
    '2020-10-15': 'Joshua 5',
    '2020-10-16': 'Joshua 6',
    '2020-10-17': null,
    '2020-10-18': 'Joshua 7',
    '2020-10-19': 'Joshua 8',
    '2020-10-20': 'Joshua 9',
    '2020-10-21': 'Joshua 10',
    '2020-10-22': 'Joshua 11',
    '2020-10-23': 'Joshua 12',
    '2020-10-24': null,
    '2020-10-25': 'Joshua 13',
    '2020-10-26': 'Joshua 14',
    '2020-10-27': 'Judges 1',
    '2020-10-28': 'Judges 2',
    '2020-10-29': 'Judges 3',
    '2020-10-30': 'Judges 4',
    '2020-10-31': null,
    '2020-11-01': 'Judges 5',
    '2020-11-02': 'Judges 6',
    '2020-11-03': 'Judges 7',
    '2020-11-04': 'Judges 8',
    '2020-11-05': 'Judges 9',
    '2020-11-06': 'Judges 10',
    '2020-11-07': null,
    '2020-11-08': 'Judges 11',
    '2020-11-09': 'Judges 12',
    '2020-11-10': 'Judges 13',
    '2020-11-11': 'Judges 14',
    '2020-11-12': 'Samuel 1',
    '2020-11-13': 'Samuel 2',
    '2020-11-14': null,
    '2020-11-15': 'Samuel 3',
    '2020-11-16': 'Samuel 4',
    '2020-11-17': 'Samuel 5',
    '2020-11-18': 'Samuel 6',
    '2020-11-19': 'Samuel 7',
    '2020-11-20': 'Samuel 8',
    '2020-11-21': null,
    '2020-11-22': 'Samuel 9',
    '2020-11-23': 'Samuel 10',
    '2020-11-24': 'Samuel 11',
    '2020-11-25': 'Samuel 12',
    '2020-11-26': 'Samuel 13',
    '2020-11-27': 'Samuel 14',
    '2020-11-28': null,
    '2020-11-29': 'Samuel 15',
    '2020-11-30': 'Samuel 16',
    '2020-12-01': 'Samuel 17',
    '2020-12-02': 'Samuel 18',
    '2020-12-03': 'Samuel 19',
    '2020-12-04': 'Samuel 20',
    '2020-12-05': null,
    '2020-12-06': 'Samuel 21',
    '2020-12-07': 'Samuel 22',
    '2020-12-08': 'Samuel 23',
    '2020-12-09': 'Samuel 24',
    '2020-12-10': 'Samuel 25',
    '2020-12-11': 'Samuel 26',
    '2020-12-12': null,
    '2020-12-13': 'Samuel 27',
    '2020-12-14': 'Samuel 28',
    '2020-12-15': 'Samuel 29',
    '2020-12-16': 'Samuel 30',
    '2020-12-17': 'Samuel 31',
    '2020-12-18': 'Samuel 32',
    '2020-12-19': null,
    '2020-12-20': 'Samuel 33',
    '2020-12-21': 'Samuel 34',
    '2020-12-22': 'Kings 1',
    '2020-12-23': 'Kings 2',
    '2020-12-24': 'Kings 3',
    '2020-12-25': 'Kings 4',
    '2020-12-26': null,
    '2020-12-27': 'Kings 5',
    '2020-12-28': 'Kings 6',
    '2020-12-29': 'Kings 7',
    '2020-12-30': 'Kings 8',
    '2020-12-31': 'Kings 9',
    '2021-01-01': 'Kings 10',
    '2021-01-02': null,
    '2021-01-03': 'Kings 11',
    '2021-01-04': 'Kings 12',
    '2021-01-05': 'Kings 13',
    '2021-01-06': 'Kings 14',
    '2021-01-07': 'Kings 15',
    '2021-01-08': 'Kings 16',
    '2021-01-09': null,
    '2021-01-10': 'Kings 17',
    '2021-01-11': 'Kings 18',
    '2021-01-12': 'Kings 19',
    '2021-01-13': 'Kings 20',
    '2021-01-14': 'Kings 21',
    '2021-01-15': 'Kings 22',
    '2021-01-16': null,
    '2021-01-17': 'Kings 23',
    '2021-01-18': 'Kings 24',
    '2021-01-19': 'Kings 25',
    '2021-01-20': 'Kings 26',
    '2021-01-21': 'Kings 27',
    '2021-01-22': 'Kings 28',
    '2021-01-23': null,
    '2021-01-24': 'Kings 29',
    '2021-01-25': 'Kings 30',
    '2021-01-26': 'Kings 31',
    '2021-01-27': 'Kings 32',
    '2021-01-28': 'Kings 33',
    '2021-01-29': 'Kings 34',
    '2021-01-30': null,
    '2021-01-31': 'Kings 35',
    '2021-02-01': 'Isaiah 1',
    '2021-02-02': 'Isaiah 2',
    '2021-02-03': 'Isaiah 3',
    '2021-02-04': 'Isaiah 4',
    '2021-02-05': 'Isaiah 5',
    '2021-02-06': null,
    '2021-02-07': 'Isaiah 6',
    '2021-02-08': 'Isaiah 7',
    '2021-02-09': 'Isaiah 8',
    '2021-02-10': 'Isaiah 9',
    '2021-02-11': 'Isaiah 10',
    '2021-02-12': 'Isaiah 11',
    '2021-02-13': null,
    '2021-02-14': 'Isaiah 12',
    '2021-02-15': 'Isaiah 13',
    '2021-02-16': 'Isaiah 14',
    '2021-02-17': 'Isaiah 15',
    '2021-02-18': 'Isaiah 16',
    '2021-02-19': 'Isaiah 17',
    '2021-02-20': null,
    '2021-02-21': 'Isaiah 18',
    '2021-02-22': 'Isaiah 19',
    '2021-02-23': 'Isaiah 20',
    '2021-02-24': 'Isaiah 21',
    '2021-02-25': 'Isaiah 22',
    '2021-02-26': null,
    '2021-02-27': null,
    '2021-02-28': 'Isaiah 23',
    '2021-03-01': 'Isaiah 24',
    '2021-03-02': 'Isaiah 25',
    '2021-03-03': 'Isaiah 26',
    '2021-03-04': 'Jeremiah 1',
    '2021-03-05': 'Jeremiah 2',
    '2021-03-06': null,
    '2021-03-07': 'Jeremiah 3',
    '2021-03-08': 'Jeremiah 4',
    '2021-03-09': 'Jeremiah 5',
    '2021-03-10': 'Jeremiah 6',
    '2021-03-11': 'Jeremiah 7',
    '2021-03-12': 'Jeremiah 8',
    '2021-03-13': null,
    '2021-03-14': 'Jeremiah 9',
    '2021-03-15': 'Jeremiah 10',
    '2021-03-16': 'Jeremiah 11',
    '2021-03-17': 'Jeremiah 12',
    '2021-03-18': 'Jeremiah 13',
    '2021-03-19': 'Jeremiah 14',
    '2021-03-20': null,
    '2021-03-21': 'Jeremiah 15',
    '2021-03-22': 'Jeremiah 16',
    '2021-03-23': 'Jeremiah 17',
    '2021-03-24': 'Jeremiah 18',
    '2021-03-25': 'Jeremiah 19',
    '2021-03-26': 'Jeremiah 20',
    '2021-03-27': null,
    '2021-03-28': null,
    '2021-03-29': 'Jeremiah 21',
    '2021-03-30': 'Jeremiah 22',
    '2021-03-31': 'Jeremiah 23',
    '2021-04-01': 'Jeremiah 24',
    '2021-04-02': 'Jeremiah 25',
    '2021-04-03': null,
    '2021-04-04': 'Jeremiah 26',
    '2021-04-05': 'Jeremiah 27',
    '2021-04-06': 'Jeremiah 28',
    '2021-04-07': 'Jeremiah 29',
    '2021-04-08': 'Jeremiah 30',
    '2021-04-09': 'Jeremiah 31',
    '2021-04-10': null,
    '2021-04-11': 'Ezekiel 1',
    '2021-04-12': 'Ezekiel 2',
    '2021-04-13': 'Ezekiel 3',
    '2021-04-14': 'Ezekiel 4',
    '2021-04-15': null,
    '2021-04-16': 'Ezekiel 5',
    '2021-04-17': null,
    '2021-04-18': 'Ezekiel 6',
    '2021-04-19': 'Ezekiel 7',
    '2021-04-20': 'Ezekiel 8',
    '2021-04-21': 'Ezekiel 9',
    '2021-04-22': 'Ezekiel 10',
    '2021-04-23': 'Ezekiel 11',
    '2021-04-24': null,
    '2021-04-25': 'Ezekiel 12',
    '2021-04-26': 'Ezekiel 13',
    '2021-04-27': 'Ezekiel 14',
    '2021-04-28': 'Ezekiel 15',
    '2021-04-29': 'Ezekiel 16',
    '2021-04-30': 'Ezekiel 17',
    '2021-05-01': null,
    '2021-05-02': 'Ezekiel 18',
    '2021-05-03': 'Ezekiel 19',
    '2021-05-04': 'Ezekiel 20',
    '2021-05-05': 'Ezekiel 21',
    '2021-05-06': 'Ezekiel 22',
    '2021-05-07': 'Ezekiel 23',
    '2021-05-08': null,
    '2021-05-09': 'Ezekiel 24',
    '2021-05-10': 'Ezekiel 25',
    '2021-05-11': 'Ezekiel 26',
    '2021-05-12': 'Ezekiel 27',
    '2021-05-13': 'Ezekiel 28',
    '2021-05-14': 'Ezekiel 29',
    '2021-05-15': null,
    '2021-05-16': 'Minor Prophets 1',
    '2021-05-17': null,
    '2021-05-18': 'Minor Prophets 2',
    '2021-05-19': 'Minor Prophets 3',
    '2021-05-20': 'Minor Prophets 4',
    '2021-05-21': 'Minor Prophets 5',
    '2021-05-22': null,
    '2021-05-23': 'Minor Prophets 6',
    '2021-05-24': 'Minor Prophets 7',
    '2021-05-25': 'Minor Prophets 8',
    '2021-05-26': 'Minor Prophets 9',
    '2021-05-27': 'Minor Prophets 10',
    '2021-05-28': 'Minor Prophets 11',
    '2021-05-29': null,
    '2021-05-30': 'Minor Prophets 12',
    '2021-05-31': 'Minor Prophets 13',
    '2021-06-01': 'Minor Prophets 14',
    '2021-06-02': 'Minor Prophets 15',
    '2021-06-03': 'Minor Prophets 16',
    '2021-06-04': 'Minor Prophets 17',
    '2021-06-05': null,
    '2021-06-06': 'Minor Prophets 18',
    '2021-06-07': 'Minor Prophets 19',
    '2021-06-08': 'Minor Prophets 20',
    '2021-06-09': 'Minor Prophets 21',
    '2021-06-10': 'Psalms 1',
    '2021-06-11': 'Psalms 2',
    '2021-06-12': null,
    '2021-06-13': 'Psalms 3',
    '2021-06-14': 'Psalms 4',
    '2021-06-15': 'Psalms 5',
    '2021-06-16': 'Psalms 6',
    '2021-06-17': 'Psalms 7',
    '2021-06-18': 'Psalms 8',
    '2021-06-19': null,
    '2021-06-20': 'Psalms 9',
    '2021-06-21': 'Psalms 10',
    '2021-06-22': 'Psalms 11',
    '2021-06-23': 'Psalms 12',
    '2021-06-24': 'Psalms 13',
    '2021-06-25': 'Psalms 14',
    '2021-06-26': null,
    '2021-06-27': 'Psalms 15',
    '2021-06-28': 'Psalms 16',
    '2021-06-29': 'Psalms 17',
    '2021-06-30': 'Psalms 18',
    '2021-07-01': 'Psalms 19',
    '2021-07-02': 'Proverbs 1',
    '2021-07-03': null,
    '2021-07-04': 'Proverbs 2',
    '2021-07-05': 'Proverbs 3',
    '2021-07-06': 'Proverbs 4',
    '2021-07-07': 'Proverbs 5',
    '2021-07-08': 'Proverbs 6',
    '2021-07-09': 'Proverbs 7',
    '2021-07-10': null,
    '2021-07-11': 'Proverbs 8',
    '2021-07-12': 'Job 1',
    '2021-07-13': 'Job 2',
    '2021-07-14': 'Job 3',
    '2021-07-15': 'Job 4',
    '2021-07-16': 'Job 5',
    '2021-07-17': null,
    '2021-07-18': null,
    '2021-07-19': 'Job 6',
    '2021-07-20': 'Job 7',
    '2021-07-21': 'Job 8',
    '2021-07-22': 'Song of Songs 1',
    '2021-07-23': 'Ruth 1',
    '2021-07-24': null,
    '2021-07-25': 'Lamentations 1',
    '2021-07-26': 'Ecclesiastes 1',
    '2021-07-27': 'Ecclesiastes 2',
    '2021-07-28': 'Ecclesiastes 3',
    '2021-07-29': 'Ecclesiastes 4',
    '2021-07-30': 'Esther 1',
    '2021-07-31': null,
    '2021-08-01': 'Esther 2',
    '2021-08-02': 'Esther 3',
    '2021-08-03': 'Esther 4',
    '2021-08-04': 'Esther 5',
    '2021-08-05': 'Daniel 1',
    '2021-08-06': 'Daniel 2',
    '2021-08-07': null,
    '2021-08-08': 'Daniel 3',
    '2021-08-09': 'Daniel 4',
    '2021-08-10': 'Daniel 5',
    '2021-08-11': 'Daniel 6',
    '2021-08-12': 'Daniel 7',
    '2021-08-13': 'Ezra and Nehemiah 1',
    '2021-08-14': null,
    '2021-08-15': 'Ezra and Nehemiah 2',
    '2021-08-16': 'Ezra and Nehemiah 3',
    '2021-08-17': 'Ezra and Nehemiah 4',
    '2021-08-18': 'Ezra and Nehemiah 5',
    '2021-08-19': 'Ezra and Nehemiah 6',
    '2021-08-20': 'Ezra and Nehemiah 7',
    '2021-08-21': null,
    '2021-08-22': 'Ezra and Nehemiah 8',
    '2021-08-23': 'Ezra and Nehemiah 9',
    '2021-08-24': 'Ezra and Nehemiah 10',
    '2021-08-25': 'Chronicles 1',
    '2021-08-26': 'Chronicles 2',
    '2021-08-27': 'Chronicles 3',
    '2021-08-28': null,
    '2021-08-29': 'Chronicles 4',
    '2021-08-30': 'Chronicles 5',
    '2021-08-31': 'Chronicles 6',
    '2021-09-01': 'Chronicles 7',
    '2021-09-02': 'Chronicles 8',
    '2021-09-03': 'Chronicles 9',
    '2021-09-04': null,
    '2021-09-05': 'Chronicles 10',
    '2021-09-06': 'Chronicles 11',
    '2021-09-07': null,
    '2021-09-08': null,
    '2021-09-09': 'Chronicles 12',
    '2021-09-10': 'Chronicles 13',
    '2021-09-11': null,
    '2021-09-12': 'Chronicles 14',
    '2021-09-13': 'Chronicles 15',
    '2021-09-14': 'Chronicles 16',
    '2021-09-15': 'Chronicles 17',
    '2021-09-16': null,
    '2021-09-17': 'Chronicles 18',
    '2021-09-18': null,
    '2021-09-19': 'Chronicles 19',
    '2021-09-20': 'Chronicles 20',
    '2021-09-21': null,
    '2021-09-22': 'Chronicles 21',
    '2021-09-23': 'Chronicles 22',
    '2021-09-24': 'Chronicles 23',
    '2021-09-25': null,
    '2021-09-26': 'Chronicles 24',
    '2021-09-27': 'Chronicles 25',
  };
  t.deepEqual(actual, expected);
});

test('tanakhYomi-5783', (t) => {
  const startHD = new HDate(23, 'Tishrei', 5783);
  const endHD = new HDate(21, 'Tishrei', 5784);
  const start = startHD.abs();
  const endAbs = endHD.abs();
  const actual = {};
  for (let abs = start; abs <= endAbs; abs++) {
    const reading = tanakhYomi(abs);
    actual[abs2iso(abs)] = reading === null ? null :
      `${reading.name} ${reading.blatt}`;
  }
  const expected = {
    '2022-10-18': 'Joshua 1',
    '2022-10-19': 'Joshua 2',
    '2022-10-20': 'Joshua 3',
    '2022-10-21': 'Joshua 4',
    '2022-10-22': null,
    '2022-10-23': 'Joshua 5',
    '2022-10-24': 'Joshua 6',
    '2022-10-25': 'Joshua 7',
    '2022-10-26': 'Joshua 8',
    '2022-10-27': 'Joshua 9',
    '2022-10-28': 'Joshua 10',
    '2022-10-29': null,
    '2022-10-30': 'Joshua 11',
    '2022-10-31': 'Joshua 12',
    '2022-11-01': 'Joshua 13',
    '2022-11-02': 'Joshua 14',
    '2022-11-03': 'Judges 1',
    '2022-11-04': 'Judges 2',
    '2022-11-05': null,
    '2022-11-06': 'Judges 3',
    '2022-11-07': 'Judges 4',
    '2022-11-08': 'Judges 5',
    '2022-11-09': 'Judges 6',
    '2022-11-10': 'Judges 7',
    '2022-11-11': 'Judges 8',
    '2022-11-12': null,
    '2022-11-13': 'Judges 9',
    '2022-11-14': 'Judges 10',
    '2022-11-15': 'Judges 11',
    '2022-11-16': 'Judges 12',
    '2022-11-17': 'Judges 13',
    '2022-11-18': 'Judges 14',
    '2022-11-19': null,
    '2022-11-20': 'Samuel 1',
    '2022-11-21': 'Samuel 2',
    '2022-11-22': 'Samuel 3',
    '2022-11-23': 'Samuel 4',
    '2022-11-24': 'Samuel 5',
    '2022-11-25': 'Samuel 6',
    '2022-11-26': null,
    '2022-11-27': 'Samuel 7',
    '2022-11-28': 'Samuel 8',
    '2022-11-29': 'Samuel 9',
    '2022-11-30': 'Samuel 10',
    '2022-12-01': 'Samuel 11',
    '2022-12-02': 'Samuel 12',
    '2022-12-03': null,
    '2022-12-04': 'Samuel 13',
    '2022-12-05': 'Samuel 14',
    '2022-12-06': 'Samuel 15',
    '2022-12-07': 'Samuel 16',
    '2022-12-08': 'Samuel 17',
    '2022-12-09': 'Samuel 18',
    '2022-12-10': null,
    '2022-12-11': 'Samuel 19',
    '2022-12-12': 'Samuel 20',
    '2022-12-13': 'Samuel 21',
    '2022-12-14': 'Samuel 22',
    '2022-12-15': 'Samuel 23',
    '2022-12-16': 'Samuel 24',
    '2022-12-17': null,
    '2022-12-18': 'Samuel 25',
    '2022-12-19': 'Samuel 26',
    '2022-12-20': 'Samuel 27',
    '2022-12-21': 'Samuel 28',
    '2022-12-22': 'Samuel 29',
    '2022-12-23': 'Samuel 30',
    '2022-12-24': null,
    '2022-12-25': 'Samuel 31',
    '2022-12-26': 'Samuel 32',
    '2022-12-27': 'Samuel 33',
    '2022-12-28': 'Samuel 34',
    '2022-12-29': 'Kings 1',
    '2022-12-30': 'Kings 2',
    '2022-12-31': null,
    '2023-01-01': 'Kings 3',
    '2023-01-02': 'Kings 4',
    '2023-01-03': 'Kings 5',
    '2023-01-04': 'Kings 6',
    '2023-01-05': 'Kings 7',
    '2023-01-06': 'Kings 8',
    '2023-01-07': null,
    '2023-01-08': 'Kings 9',
    '2023-01-09': 'Kings 10',
    '2023-01-10': 'Kings 11',
    '2023-01-11': 'Kings 12',
    '2023-01-12': 'Kings 13',
    '2023-01-13': 'Kings 14',
    '2023-01-14': null,
    '2023-01-15': 'Kings 15',
    '2023-01-16': 'Kings 16',
    '2023-01-17': 'Kings 17',
    '2023-01-18': 'Kings 18',
    '2023-01-19': 'Kings 19',
    '2023-01-20': 'Kings 20',
    '2023-01-21': null,
    '2023-01-22': 'Kings 21',
    '2023-01-23': 'Kings 22',
    '2023-01-24': 'Kings 23',
    '2023-01-25': 'Kings 24',
    '2023-01-26': 'Kings 25',
    '2023-01-27': 'Kings 26',
    '2023-01-28': null,
    '2023-01-29': 'Kings 27',
    '2023-01-30': 'Kings 28',
    '2023-01-31': 'Kings 29',
    '2023-02-01': 'Kings 30',
    '2023-02-02': 'Kings 31',
    '2023-02-03': 'Kings 32',
    '2023-02-04': null,
    '2023-02-05': 'Kings 33',
    '2023-02-06': 'Kings 34',
    '2023-02-07': 'Kings 35',
    '2023-02-08': 'Isaiah 1',
    '2023-02-09': 'Isaiah 2',
    '2023-02-10': 'Isaiah 3',
    '2023-02-11': null,
    '2023-02-12': 'Isaiah 4',
    '2023-02-13': 'Isaiah 5',
    '2023-02-14': 'Isaiah 6',
    '2023-02-15': 'Isaiah 7',
    '2023-02-16': 'Isaiah 8',
    '2023-02-17': 'Isaiah 9',
    '2023-02-18': null,
    '2023-02-19': 'Isaiah 10',
    '2023-02-20': 'Isaiah 11',
    '2023-02-21': 'Isaiah 12',
    '2023-02-22': 'Isaiah 13',
    '2023-02-23': 'Isaiah 14',
    '2023-02-24': 'Isaiah 15',
    '2023-02-25': null,
    '2023-02-26': 'Isaiah 16',
    '2023-02-27': 'Isaiah 17',
    '2023-02-28': 'Isaiah 18',
    '2023-03-01': 'Isaiah 19',
    '2023-03-02': 'Isaiah 20',
    '2023-03-03': 'Isaiah 21',
    '2023-03-04': null,
    '2023-03-05': 'Isaiah 22',
    '2023-03-06': 'Isaiah 23',
    '2023-03-07': null,
    '2023-03-08': 'Isaiah 24',
    '2023-03-09': 'Isaiah 25',
    '2023-03-10': 'Isaiah 26',
    '2023-03-11': null,
    '2023-03-12': 'Jeremiah 1',
    '2023-03-13': 'Jeremiah 2',
    '2023-03-14': 'Jeremiah 3',
    '2023-03-15': 'Jeremiah 4',
    '2023-03-16': 'Jeremiah 5',
    '2023-03-17': 'Jeremiah 6',
    '2023-03-18': null,
    '2023-03-19': 'Jeremiah 7',
    '2023-03-20': 'Jeremiah 8',
    '2023-03-21': 'Jeremiah 9.1',
    '2023-03-22': 'Jeremiah 9.2',
    '2023-03-23': 'Jeremiah 10',
    '2023-03-24': 'Jeremiah 11',
    '2023-03-25': null,
    '2023-03-26': 'Jeremiah 12',
    '2023-03-27': 'Jeremiah 13',
    '2023-03-28': 'Jeremiah 14',
    '2023-03-29': 'Jeremiah 15',
    '2023-03-30': 'Jeremiah 16',
    '2023-03-31': 'Jeremiah 17',
    '2023-04-01': null,
    '2023-04-02': 'Jeremiah 18',
    '2023-04-03': 'Jeremiah 19',
    '2023-04-04': 'Jeremiah 20',
    '2023-04-05': 'Jeremiah 21',
    '2023-04-06': null,
    '2023-04-07': 'Jeremiah 22',
    '2023-04-08': null,
    '2023-04-09': 'Jeremiah 23',
    '2023-04-10': 'Jeremiah 24',
    '2023-04-11': 'Jeremiah 25',
    '2023-04-12': null,
    '2023-04-13': 'Jeremiah 26',
    '2023-04-14': 'Jeremiah 27',
    '2023-04-15': null,
    '2023-04-16': 'Jeremiah 28',
    '2023-04-17': 'Jeremiah 29',
    '2023-04-18': 'Jeremiah 30',
    '2023-04-19': 'Jeremiah 31',
    '2023-04-20': 'Ezekiel 1',
    '2023-04-21': 'Ezekiel 2',
    '2023-04-22': null,
    '2023-04-23': 'Ezekiel 3',
    '2023-04-24': 'Ezekiel 4',
    '2023-04-25': 'Ezekiel 5',
    '2023-04-26': null,
    '2023-04-27': 'Ezekiel 6',
    '2023-04-28': 'Ezekiel 7',
    '2023-04-29': null,
    '2023-04-30': 'Ezekiel 8',
    '2023-05-01': 'Ezekiel 9',
    '2023-05-02': 'Ezekiel 10',
    '2023-05-03': 'Ezekiel 11',
    '2023-05-04': 'Ezekiel 12',
    '2023-05-05': 'Ezekiel 13',
    '2023-05-06': null,
    '2023-05-07': 'Ezekiel 14',
    '2023-05-08': 'Ezekiel 15',
    '2023-05-09': 'Ezekiel 16',
    '2023-05-10': 'Ezekiel 17',
    '2023-05-11': 'Ezekiel 18',
    '2023-05-12': 'Ezekiel 19',
    '2023-05-13': null,
    '2023-05-14': 'Ezekiel 20',
    '2023-05-15': 'Ezekiel 21',
    '2023-05-16': 'Ezekiel 22',
    '2023-05-17': 'Ezekiel 23',
    '2023-05-18': 'Ezekiel 24',
    '2023-05-19': 'Ezekiel 25',
    '2023-05-20': null,
    '2023-05-21': 'Ezekiel 26',
    '2023-05-22': 'Ezekiel 27',
    '2023-05-23': 'Ezekiel 28',
    '2023-05-24': 'Ezekiel 29',
    '2023-05-25': 'Minor Prophets 1',
    '2023-05-26': null,
    '2023-05-27': null,
    '2023-05-28': 'Minor Prophets 2',
    '2023-05-29': 'Minor Prophets 3',
    '2023-05-30': 'Minor Prophets 4',
    '2023-05-31': 'Minor Prophets 5',
    '2023-06-01': 'Minor Prophets 6',
    '2023-06-02': 'Minor Prophets 7',
    '2023-06-03': null,
    '2023-06-04': 'Minor Prophets 8',
    '2023-06-05': 'Minor Prophets 9',
    '2023-06-06': 'Minor Prophets 10',
    '2023-06-07': 'Minor Prophets 11',
    '2023-06-08': 'Minor Prophets 12',
    '2023-06-09': 'Minor Prophets 13',
    '2023-06-10': null,
    '2023-06-11': 'Minor Prophets 14',
    '2023-06-12': 'Minor Prophets 15',
    '2023-06-13': 'Minor Prophets 16',
    '2023-06-14': 'Minor Prophets 17',
    '2023-06-15': 'Minor Prophets 18',
    '2023-06-16': 'Minor Prophets 19',
    '2023-06-17': null,
    '2023-06-18': 'Minor Prophets 20',
    '2023-06-19': 'Minor Prophets 21',
    '2023-06-20': 'Psalms 1',
    '2023-06-21': 'Psalms 2',
    '2023-06-22': 'Psalms 3',
    '2023-06-23': 'Psalms 4',
    '2023-06-24': null,
    '2023-06-25': 'Psalms 5',
    '2023-06-26': 'Psalms 6',
    '2023-06-27': 'Psalms 7',
    '2023-06-28': 'Psalms 8',
    '2023-06-29': 'Psalms 9',
    '2023-06-30': 'Psalms 10',
    '2023-07-01': null,
    '2023-07-02': 'Psalms 11',
    '2023-07-03': 'Psalms 12',
    '2023-07-04': 'Psalms 13',
    '2023-07-05': 'Psalms 14',
    '2023-07-06': 'Psalms 15',
    '2023-07-07': 'Psalms 16',
    '2023-07-08': null,
    '2023-07-09': 'Psalms 17',
    '2023-07-10': 'Psalms 18',
    '2023-07-11': 'Psalms 19',
    '2023-07-12': 'Proverbs 1',
    '2023-07-13': 'Proverbs 2',
    '2023-07-14': 'Proverbs 3',
    '2023-07-15': null,
    '2023-07-16': 'Proverbs 4',
    '2023-07-17': 'Proverbs 5',
    '2023-07-18': 'Proverbs 6',
    '2023-07-19': 'Proverbs 7',
    '2023-07-20': 'Proverbs 8',
    '2023-07-21': 'Job 1',
    '2023-07-22': null,
    '2023-07-23': 'Job 2',
    '2023-07-24': 'Job 3',
    '2023-07-25': 'Job 4',
    '2023-07-26': 'Job 5',
    '2023-07-27': null,
    '2023-07-28': 'Job 6',
    '2023-07-29': null,
    '2023-07-30': 'Job 7',
    '2023-07-31': 'Job 8',
    '2023-08-01': 'Song of Songs 1.1',
    '2023-08-02': 'Song of Songs 1.2',
    '2023-08-03': 'Ruth 1.1',
    '2023-08-04': 'Ruth 1.2',
    '2023-08-05': null,
    '2023-08-06': 'Lamentations 1',
    '2023-08-07': 'Ecclesiastes 1',
    '2023-08-08': 'Ecclesiastes 2',
    '2023-08-09': 'Ecclesiastes 3',
    '2023-08-10': 'Ecclesiastes 4',
    '2023-08-11': 'Esther 1',
    '2023-08-12': null,
    '2023-08-13': 'Esther 2',
    '2023-08-14': 'Esther 3',
    '2023-08-15': 'Esther 4',
    '2023-08-16': 'Esther 5',
    '2023-08-17': 'Daniel 1',
    '2023-08-18': 'Daniel 2',
    '2023-08-19': null,
    '2023-08-20': 'Daniel 3',
    '2023-08-21': 'Daniel 4',
    '2023-08-22': 'Daniel 5',
    '2023-08-23': 'Daniel 6',
    '2023-08-24': 'Daniel 7',
    '2023-08-25': 'Ezra and Nehemiah 1',
    '2023-08-26': null,
    '2023-08-27': 'Ezra and Nehemiah 2',
    '2023-08-28': 'Ezra and Nehemiah 3',
    '2023-08-29': 'Ezra and Nehemiah 4',
    '2023-08-30': 'Ezra and Nehemiah 5',
    '2023-08-31': 'Ezra and Nehemiah 6',
    '2023-09-01': 'Ezra and Nehemiah 7',
    '2023-09-02': null,
    '2023-09-03': 'Ezra and Nehemiah 8',
    '2023-09-04': 'Ezra and Nehemiah 9',
    '2023-09-05': 'Ezra and Nehemiah 10',
    '2023-09-06': 'Chronicles 1',
    '2023-09-07': 'Chronicles 2',
    '2023-09-08': 'Chronicles 3',
    '2023-09-09': null,
    '2023-09-10': 'Chronicles 4',
    '2023-09-11': 'Chronicles 5',
    '2023-09-12': 'Chronicles 6',
    '2023-09-13': 'Chronicles 7',
    '2023-09-14': 'Chronicles 8',
    '2023-09-15': 'Chronicles 9',
    '2023-09-16': null,
    '2023-09-17': null,
    '2023-09-18': 'Chronicles 10',
    '2023-09-19': 'Chronicles 11',
    '2023-09-20': 'Chronicles 12',
    '2023-09-21': 'Chronicles 13',
    '2023-09-22': 'Chronicles 14',
    '2023-09-23': null,
    '2023-09-24': 'Chronicles 15',
    '2023-09-25': null,
    '2023-09-26': 'Chronicles 16',
    '2023-09-27': 'Chronicles 17',
    '2023-09-28': 'Chronicles 18',
    '2023-09-29': 'Chronicles 19',
    '2023-09-30': null,
    '2023-10-01': 'Chronicles 20',
    '2023-10-02': 'Chronicles 21',
    '2023-10-03': 'Chronicles 22',
    '2023-10-04': 'Chronicles 23',
    '2023-10-05': 'Chronicles 24',
    '2023-10-06': 'Chronicles 25',
  };
  t.deepEqual(actual, expected);
});

test('tanakhYomi-2024', (t) => {
  const startAbs = greg.greg2abs(new Date(2024, 7, 22));
  const endAbs = greg.greg2abs(new Date(2024, 9, 30));
  const actual = {};
  for (let abs = startAbs; abs <= endAbs; abs++) {
    const reading = tanakhYomi(abs);
    actual[abs2iso(abs)] = reading === null ? null :
      `${reading.name} ${reading.blatt}`;
  }
  const expected = {
    '2024-08-22': 'Ezra and Nehemiah 10',
    '2024-08-23': 'Chronicles 1',
    '2024-08-24': null,
    '2024-08-25': 'Chronicles 2',
    '2024-08-26': 'Chronicles 3',
    '2024-08-27': 'Chronicles 4',
    '2024-08-28': 'Chronicles 5',
    '2024-08-29': 'Chronicles 6',
    '2024-08-30': 'Chronicles 7',
    '2024-08-31': null,
    '2024-09-01': 'Chronicles 8',
    '2024-09-02': 'Chronicles 9',
    '2024-09-03': 'Chronicles 10',
    '2024-09-04': 'Chronicles 11',
    '2024-09-05': 'Chronicles 12',
    '2024-09-06': 'Chronicles 13',
    '2024-09-07': null,
    '2024-09-08': 'Chronicles 14',
    '2024-09-09': 'Chronicles 15',
    '2024-09-10': 'Chronicles 16',
    '2024-09-11': 'Chronicles 17',
    '2024-09-12': 'Chronicles 18',
    '2024-09-13': 'Chronicles 19',
    '2024-09-14': null,
    '2024-09-15': 'Chronicles 20',
    '2024-09-16': 'Chronicles 21',
    '2024-09-17': 'Chronicles 22',
    '2024-09-18': 'Chronicles 23',
    '2024-09-19': 'Chronicles 24',
    '2024-09-20': 'Chronicles 25',
    '2024-09-21': null,
    '2024-09-22': 'Chronicles 1',
    '2024-09-23': 'Chronicles 2',
    '2024-09-24': 'Chronicles 3',
    '2024-09-25': 'Chronicles 4',
    '2024-09-26': 'Chronicles 5',
    '2024-09-27': 'Chronicles 6',
    '2024-09-28': null,
    '2024-09-29': 'Chronicles 7',
    '2024-09-30': 'Chronicles 8',
    '2024-10-01': 'Chronicles 9',
    '2024-10-02': 'Chronicles 10',
    '2024-10-03': null,
    '2024-10-04': null,
    '2024-10-05': null,
    '2024-10-06': 'Chronicles 11',
    '2024-10-07': 'Chronicles 12',
    '2024-10-08': 'Chronicles 13',
    '2024-10-09': 'Chronicles 14',
    '2024-10-10': 'Chronicles 15',
    '2024-10-11': 'Chronicles 16',
    '2024-10-12': null,
    '2024-10-13': 'Chronicles 17',
    '2024-10-14': 'Chronicles 18',
    '2024-10-15': 'Chronicles 19',
    '2024-10-16': 'Chronicles 20',
    '2024-10-17': null,
    '2024-10-18': 'Chronicles 21',
    '2024-10-19': null,
    '2024-10-20': 'Chronicles 22',
    '2024-10-21': 'Chronicles 23',
    '2024-10-22': 'Chronicles 24',
    '2024-10-23': 'Chronicles 25',
    '2024-10-24': null,
    '2024-10-25': 'Joshua 1',
    '2024-10-26': null,
    '2024-10-27': 'Joshua 2',
    '2024-10-28': 'Joshua 3',
    '2024-10-29': 'Joshua 4',
    '2024-10-30': 'Joshua 5',
  };
  t.deepEqual(actual, expected);
});

test('tanakhYomi-summer-2026', (t) => {
  const startAbs = greg.greg2abs(new Date(2026, 6, 26));
  const endAbs = greg.greg2abs(new Date(2026, 9, 9));
  const actual = {};
  for (let abs = startAbs; abs <= endAbs; abs++) {
    const reading = tanakhYomi(abs);
    actual[abs2iso(abs)] = reading === null ? null :
      `${reading.name} ${reading.blatt}`;
  }
  const expected = {
    '2026-07-26': 'Job 7',
    '2026-07-27': 'Job 8',
    '2026-07-28': 'Song of Songs 1.1',
    '2026-07-29': 'Song of Songs 1.2',
    '2026-07-30': 'Ruth 1.1',
    '2026-07-31': 'Ruth 1.2',
    '2026-08-01': null,
    '2026-08-02': 'Lamentations 1',
    '2026-08-03': 'Ecclesiastes 1',
    '2026-08-04': 'Ecclesiastes 2',
    '2026-08-05': 'Ecclesiastes 3',
    '2026-08-06': 'Ecclesiastes 4',
    '2026-08-07': 'Esther 1',
    '2026-08-08': null,
    '2026-08-09': 'Esther 2',
    '2026-08-10': 'Esther 3',
    '2026-08-11': 'Esther 4',
    '2026-08-12': 'Esther 5',
    '2026-08-13': 'Daniel 1',
    '2026-08-14': 'Daniel 2',
    '2026-08-15': null,
    '2026-08-16': 'Daniel 3',
    '2026-08-17': 'Daniel 4',
    '2026-08-18': 'Daniel 5',
    '2026-08-19': 'Daniel 6',
    '2026-08-20': 'Daniel 7',
    '2026-08-21': 'Ezra and Nehemiah 1',
    '2026-08-22': null,
    '2026-08-23': 'Ezra and Nehemiah 2',
    '2026-08-24': 'Ezra and Nehemiah 3',
    '2026-08-25': 'Ezra and Nehemiah 4',
    '2026-08-26': 'Ezra and Nehemiah 5',
    '2026-08-27': 'Ezra and Nehemiah 6',
    '2026-08-28': 'Ezra and Nehemiah 7',
    '2026-08-29': null,
    '2026-08-30': 'Ezra and Nehemiah 8',
    '2026-08-31': 'Ezra and Nehemiah 9',
    '2026-09-01': 'Ezra and Nehemiah 10',
    '2026-09-02': 'Chronicles 1',
    '2026-09-03': 'Chronicles 2',
    '2026-09-04': 'Chronicles 3',
    '2026-09-05': null,
    '2026-09-06': 'Chronicles 4',
    '2026-09-07': 'Chronicles 5',
    '2026-09-08': 'Chronicles 6',
    '2026-09-09': 'Chronicles 7',
    '2026-09-10': 'Chronicles 8',
    '2026-09-11': 'Chronicles 9',
    '2026-09-12': null,
    '2026-09-13': null,
    '2026-09-14': 'Chronicles 10',
    '2026-09-15': 'Chronicles 11',
    '2026-09-16': 'Chronicles 12',
    '2026-09-17': 'Chronicles 13',
    '2026-09-18': 'Chronicles 14',
    '2026-09-19': null,
    '2026-09-20': 'Chronicles 15',
    '2026-09-21': null,
    '2026-09-22': 'Chronicles 16',
    '2026-09-23': 'Chronicles 17',
    '2026-09-24': 'Chronicles 18',
    '2026-09-25': 'Chronicles 19',
    '2026-09-26': null,
    '2026-09-27': 'Chronicles 20',
    '2026-09-28': 'Chronicles 21',
    '2026-09-29': 'Chronicles 22',
    '2026-09-30': 'Chronicles 23',
    '2026-10-01': 'Chronicles 24',
    '2026-10-02': 'Chronicles 25',
    '2026-10-03': null,
    '2026-10-04': 'Joshua 1',
    '2026-10-05': 'Joshua 2',
    '2026-10-06': 'Joshua 3',
    '2026-10-07': 'Joshua 4.1',
    '2026-10-08': 'Joshua 4.2',
    '2026-10-09': 'Joshua 5',
  };
  t.deepEqual(actual, expected);
});

test('Joshua', (t) => {
  const events = [];
  for (let i = 6; i <= 9; i++) {
    const dt = new Date(2026, 9, i);
    const reading = tanakhYomi(dt);
    const ev = new TanakhYomiEvent(new HDate(dt), reading);
    events.push(ev);
  }
  // '2026-10-06': 'Joshua 3',
  // '2026-10-07': 'Joshua 4.1',
  // '2026-10-08': 'Joshua 4.2',
  // '2026-10-09': 'Joshua 5',
  const expected = [
    'יהושוע ס׳ ג׳',
    'יהושוע ס׳ ד׳1',
    'יהושוע ס׳ ד׳2',
    'יהושוע ס׳ ה׳',
  ];
  const strs = events.map((ev) => ev.render('he-x-NoNikud'));
  t.deepEqual(strs, expected);
});

test.skip('tanakhYomi-huge', (t) => {
  const startAbs = greg.greg2abs(new Date(2001, 0, 1));
  const endAbs = greg.greg2abs(new Date(2029, 11, 31));
  for (let abs = startAbs; abs <= endAbs; abs++) {
    tanakhYomi(abs);
  }
  t.pass();
});
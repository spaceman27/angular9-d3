#!/usr/bin/env node

// print any npm debug log files to stdout

const fs = require('fs');
const path = `${process.env['HOME']}` + '/.npm/_logs/';

const files = fs.readdirSync(path);

if (files.length) {
  console.log(`found npm debug logs: ${files.join('\n')}`);

  files.forEach(file => {
    console.log(`\n\ncontents of ${path}/${file}`);
    const buf = fs.readFileSync(`${path}/${file}`);
    process.stdout.write(buf);
  });
} else {
  console.log(`no files found in ${path}`);
}

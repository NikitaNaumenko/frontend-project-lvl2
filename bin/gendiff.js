#!/usr/bin/env node

import program from 'commander';
// import { version, description } from '../package';

program
  .version('0.0.1')
  .description('description');

program.parse(process.argv);

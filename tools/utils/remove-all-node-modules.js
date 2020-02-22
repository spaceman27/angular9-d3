#!/usr/bin/env node

const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const { platform } = require('os');

const isOSX = platform() === 'darwin';

// setting our root location
const rootPath = '../../..';
const rootDir = path.resolve(__dirname, rootPath);

const nodeModulesToExclude = ['libs/shared/docs/node_modules'];

console.log('Locating all node_modules...');
const locatingStart = new Date().getTime();
const allNodeModules = getAllNodeModules();
const locatingEnd = new Date().getTime();
console.log(`Done! Locating all node_modules took ${(locatingEnd - locatingStart) / 1000}s\n`);

console.log('Removing all node_modules...');
const removingStart = new Date().getTime();
removeAllNodeModules(allNodeModules);
const removingEnd = new Date().getTime();
console.log(`Done! Removing all node_modules took ${(removingEnd - removingStart) / 1000}s\n`);

console.log(`Total script execution time: ${(removingEnd - locatingStart) / 1000}s`);

function getAllNodeModules() {
  // executing the bash command directly is the fastest way to accomplish this task,
  // given that the -prune param ensures that it stops recursively searching when it encounters a `node_modules` folder,
  // thus reducing the number of directories it needs to inspect
  const findResult = execSync('find ** -name node_modules -type d -prune', { cwd: rootDir }).toString();

  // the result of this command is a string (delimited by line breaks), so we have to convert it to an array
  const nodeModulePaths = findResult.split('\n');

  // the output has an empty line at the end, so we need to filter that out before returning it
  const nonEmptyNodeModulePaths = nodeModulePaths.filter(
    nodeModulePath => nodeModulePath.length && !nodeModulesToExclude.includes(nodeModulePath)
  );
  return nonEmptyNodeModulePaths;
}

function removeAllNodeModules(nonEmptyNodeModulePaths) {
  if (isOSX) {
    // the simplest approach would be to move each folder to the trash individually, appending an isodate to the end of the folder name
    // unfortunately, the move operation is so quick that it can move multiple folders to the trash within the same millisecond
    // therefore, this approach will fail due to directory name collisions because the folder may already exist

    // as a workaround, we'll create one folder in ~/.Trash for all the node_modules for each run (with an isodate)
    // and then move each node_module into it, using a new folder name based upon its original location in the filesystem
    const rootTrashDirectory = `${process.env.HOME}/.Trash/ease-web-node-modules-${new Date().toISOString()}`;
    console.log(`  Creating ${rootTrashDirectory}`);

    fs.mkdirSync(rootTrashDirectory);

    nonEmptyNodeModulePaths.forEach(nodeModulePath => removeNodeModule(nodeModulePath, rootTrashDirectory));
  } else {
    console.log(`  Removing node_modules...`);
    nonEmptyNodeModulePaths.forEach(nodeModulePath => execSync(`rm -rf ${nodeModulePath}`, { cwd: rootDir }));
  }
}

function removeNodeModule(nodeModulePath, rootTrashDirectory) {
  const newFolderNameInTrashDirectory = nodeModulePath.replace(rootPath, '').replace(/\//g, '-');
  const fullNodeModulePath = path.resolve(rootDir, nodeModulePath);
  const destinationInTrashDir = `${rootTrashDirectory}/${newFolderNameInTrashDirectory}`;
  console.log(`  Moving ${fullNodeModulePath} \n      to ${destinationInTrashDir}`);
  fs.renameSync(fullNodeModulePath, destinationInTrashDir);
}

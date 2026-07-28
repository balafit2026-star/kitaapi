module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.name === 'unrs-resolver') {
        delete pkg.scripts?.build;
      }
      return pkg;
    }
  }
}
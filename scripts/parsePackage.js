// // ? Function to get the package versions from the package.json file
// // ? Returns a string array of the package versions

// var cache = Object.create(null);
// import npa from 'npm-package-arg'; // !INFO: https://www.npmjs.com/package/npm-package-arg
// import registryUrl from 'registry-url'; // !INFO: https://www.npmjs.com/package/registry-url

// export default parsePackage;

// function parsePackage(http, q, packageName) {

//   var cached = cache[packageName];

//   if (cached) {
//     return q.when(cached);
//   }

//   try {
//     var parsed = npa(packageName);
//   } catch (e) { 
//     return q.reject(e); 
//   }

//   if (!parsed.escapedName) {
//     throw new Error("Couldn't escape package: " + packageName);
//   }

//   return http.get(registryUrl() + parsed.escapedName)
//     .then(function(response) {
//       var versions = Object.keys(response.data.versions);
//       return versions; // ? Return the versions
//   });
// }


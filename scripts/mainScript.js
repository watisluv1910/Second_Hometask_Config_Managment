const textarea = document.querySelector('textarea');
const watchedDependencies = [];

function submitForm() {
    if (document.querySelector('input').value != watchedDependencies.slice(-1)) {
        textarea.value = "digraph G {\n";
        getPackageDependencies(document.querySelector('input').value, 0);
        textarea.value += "}";
    }
}

// ? Function to get the package dependencies from the package.json file
function getPackageDependencies(packageName, level) {

    var http = new XMLHttpRequest();
    http.open("GET", "https://registry.npmjs.org/" + packageName, false);
    http.send(null);

    try {
        var response = JSON.parse(http.responseText);  // Get the response from the server
    } catch (e) {
        textarea.value += "Error: " + e;
        return;
    }

    try {
        var versions = Object.keys(response.versions); // Get the versions of the package
    } catch (e) {
        textarea.value += "Error: " + e;
        return;
    }

    // If dependency is in watchedDependencies, then don't add it to the graph
    if (watchedDependencies.indexOf(packageName) == -1) {

        // * Get the latest version of the package and its dependencies
        for (var dependency in response.versions[versions.slice(-1)].dependencies) {

            textarea.value += "\t\"" + packageName + "\" -> \"" + dependency + "\"\n";

            if (level < 3) { // * Limit the depth of the dependency tree
                getPackageDependencies(dependency, level + 1); // Recursive call
            }
        }

        watchedDependencies.push(packageName);
    }    
}
const fs = require('fs');
const path = require('path');

const translations = {},
    dir = __dirname + '/';

fs.readdirSync(dir).forEach(function (file) {

	if (path.extname(file) == ".json")
	{
		translations[file.replace(/\.json$/, '')] = require(dir + file);	
	}
   
});

//Get the template
const template = translations.template;

//Remove the template
delete translations.template;

for (let langauge in translations) {
	console.log("Merging " + langauge + " with template");
	const merge = Object.assign(template, translations[langauge]);
	fs.writeFileSync(langauge + '.json', JSON.stringify(merge, null, 2), 'utf8');

	//Write a ts file for library compilation
	fs.writeFileSync(langauge + '.ts', "export default '';" , 'utf8');
}

console.log("Done");
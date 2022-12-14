const tiny = require('tiny-json-http')

const weblateUrl = 'http://localhost:8080/api/'
const weblateProject = 'liga-manager'
const apiKey = 'wlu_77Eo30mdCJNQL3IPgAEfWDblVOFEes58Risp'

const jsonTempalte = 'i18n/template.json';
var fs = require('fs');

// tiny.get({ url: weblateUrl }, (err, result) => {
//     if (err) {
//         console.log('ruh roh!', err)
//     }
//     else {
//         console.log(result)
//     }
// })

tiny.get({ url: `${weblateUrl}projects/${weblateProject}/languages/` }, (err, result) => {
    if (err) {
        console.log('ruh roh!', err)
    }
    else {
        console.log(result)
    }
})


// tiny.post({
//     url: `${weblateUrl}projects/`,
//     data: {
//         name: weblateProject,
//         slug: weblateProject,
//         web: 'http://manager.wildeligabremen.de'
//     },
//     headers: {
//         'Authorization': `Token ${apiKey}`
//     }
// }, (err, result) => {
//     if (err) {
//         console.log('ruh roh!', err)
//     }
//     else {
//         console.log(result)
//     }
// })

// const formData = new FormData();
// formData.append('name', "translate")
// formData.append('slug', "translate")
// formData.append('file_format', "json")
// formData.append('filemask', "template/*.json"),
// formData.append('docfile', fs.createReadStream(jsonTempalte));

// console.log(formData);
// tiny.post({
//     url: `${weblateUrl}projects/${weblateProject}/components/`,
//     data: formData,
//     headers: {
//         'Content-Type': 'multipart/form-data',
//         'Authorization': `Token ${apiKey}`
//     }
// }, (err, result) => {
//     if (err) {
//         console.log('ruh roh!', err)
//     }
//     else {
//         console.log(result)
//     }
// })

// const http = require('http');

// const weblateUrl = 'http://localhost:8080/api/'
// const weblateProject = 'liga-manager'

// http.get(weblateUrl, (resp) => {
//     let data = '';

//     // A chunk of data has been received.
//     resp.on('data', (chunk) => {
//         data += chunk;
//     });

//     // The whole response has been received. Print out the result.
//     resp.on('end', () => {
//         console.log(JSON.parse(data));
//     });

// }).on("error", (err) => {
//     console.log("Error: " + err.message);
// });

// http.get(`${weblateUrl}projects/`, (resp) => {
//     let data = '';

//     // A chunk of data has been received.
//     resp.on('data', (chunk) => {
//         data += chunk;
//     });

//     // The whole response has been received. Print out the result.
//     resp.on('end', () => {
//         console.log(JSON.parse(data));
//         const result = JSON.parse(data);
//         if (!result.results.find(x => x.name === weblateProject)) {
//             console.log(`${weblateProject} dosent exists`);

//             http.post(`${weblateUrl}projects/`, {
//                 name: weblateProject,
//                 slug: weblateProject,
//                 web: 'http://manager.wildeligabremen.de'
//             }, (resp) => {
//                 console.log(resp);
//             })
//         }
//     });

// }).on("error", (err) => {
//     console.log("Error: " + err.message);
// });
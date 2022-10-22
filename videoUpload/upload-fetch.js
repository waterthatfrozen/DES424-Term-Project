// Upload to storage works
import fetch from 'node-fetch';

const body = {name: 'Fetch Test'}

fetch('https://quickvidapp.azurewebsites.net/api/videoUpload',{
    method: 'POST', 
    body: JSON.stringify(body),
    headers : { 'Content-Type': 'application/json' },
})
.then((res) => res.json())
.then((res) => console.log(res));
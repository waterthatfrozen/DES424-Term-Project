// Upload to storage works
import axios from 'axios';

axios.post('https://quickvidapp.azurewebsites.net/api/videoUpload', {
  name: "Axios Test",
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});
  

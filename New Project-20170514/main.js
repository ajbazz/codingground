var https = require('https');
var onPage = 1;
function getMovieTitles(substr) {
    var request = https.get({
        host:'jsonmock.hackerrank.com',
        path:'/api/movies/search?Title='+substr+'&page=' + onPage
    },function(response) {
        var respData = '';
        response.on('data', function(d) {
            respData = respData + d;
        })
        response.on('end', function(d) {
            var resp = JSON.parse(respData);
            if(resp.total_pages === 0){
                console.log('No movies found.');
                response.end;
                return;
            }
            
            console.log("\npage:"+resp.page)
            for(var i=0; i<resp.data.length;i=i+1) {
                console.log(resp.data[i].Title);
            }
            
            if(parseInt(resp.page) !== resp.total_pages)  {
                onPage = onPage + 1;
                getMovieTitles(substr);
            }   
        })
    });
    request.on('error',function(err){
        console.log(err)
    });
    request.end();
}
console.log(getMovieTitles('man'));

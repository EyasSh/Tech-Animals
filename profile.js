/**
 * @param express imports the express module for it to be used in the server
 * @param app the app is an express server which will have endpoints that get the HTML pages
 * @param ejs embedded js dependency for node and page rendering
 */
const express = require('express');
const ejs = require('ejs')
const path= require('path')
const fs= require('fs')
let app = express();
app.set('view engine',ejs)
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))


app.get('/profile',(req,res)=>{
    let id= req.query.id.toLowerCase();
    const profilePic=`./${id}/profile.png`
    const bannerPic =`./${id}/banner.png`
    const titleAndParags = getTitle(id)
    res.render('profile.ejs', { id, profilePic, bannerPic,titleAndParags });
})
function getTitle(id){
    const titlePath= `./private/${id}/title.txt`
    const titleText= fs.readFileSync(titlePath,"utf-8")
    /**
     * *Getting the line containing the title to be split from the second line 
     * *that contains 2 sentences
     */
    const lines= titleText.split('\n')
    /**
     * *The content of each title file would be indexed in this list
     * *the actual profile title e.g. "Mickey the debug dog" would occupy the 0th index
     * *while the text within the paragraphs occupies the rest of the array
     */
    const content=[]
    //title being pushed inside the array
    content.push(lines[0])
    //regex that splits the first sentence in line 2 from the second without changing any content
    const regex = /\. (?=<(?:a href[^>]+>))/;

     // Split the text using the regular expression
    const sentences = lines[1].split(regex)
    console.log(sentences)

    content.push(sentences[0])
    content.push(sentences[1])

    return content

}

let port = 3000
app.listen(port,()=>{
    console.log(`listening on port: ${port}`)
})
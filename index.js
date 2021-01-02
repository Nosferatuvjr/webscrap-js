const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/1997vjr');
  /*await page.screenshot({path: 'xvideos.png'});*/

  const imgList = await page.evaluate(()=>{
    //toda essa função será executada no navegador
    //vamos pegar tudo que tiver na pagina de posts
    const nodeList = document.querySelectorAll('article img')
    //transformar o nodelist em array
    const imgArray = [...nodeList]
    //transformar a list em objetos js
    const imgList = imgArray.map( ({src}) => ({
      src
    }))
    //colocar para fora da function
    return imgList
  });

  //escrever os dados em um arquivo local (json)
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
    if(err) throw new Error('something went wrong')

    console.log('well done')
  })

 await browser.close();
})();
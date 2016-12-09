//función que permite cambiar las imágenes de las instrucciones al dar click en la imagen

function continuar() {
        var menu = document.getElementById('img');
        if(menu.className == 'img1'){
        	menu.className='img2';
        }
        else if(menu.className=='img2'){
        	menu.className='img3';
        }
        else{
        	menu.className='img1';
        }
}


function volver() {
        var menu = document.getElementById('img');
        if(menu.className == 'img2'){
            menu.className='img1';
        }
        else if(menu.className=='img3'){
            menu.className='img2';
        }
        else{
            menu.className='img1';
        }
}

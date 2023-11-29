
(function(){
    const socket = io();
    let email='';
    document.getElementById('form-message').addEventListener('submit',async (event)=>{
        event.preventDefault();
        const input= document.getElementById('input-message');
        const newMessage={
            user:email,
            message:input.value,
        }
        input.value='';
        input.focus();
        socket.emit('new-message',newMessage);
        
    }
    )
    socket.on('update-messages',(messages)=>{
        console.log('messages',messages);
        const log=document.getElementById('log-messages');
        log.innerText='';
        messages.forEach((mes) => {
            const p= document.createElement('p');
            p.innerText=`${mes.user}: ${mes.message}`;
            log.appendChild(p);    
        });
    });
    Swal.fire({
        title: 'Log in',
        input: 'text',
        inputLabel: 'Enter your username please',
        allowOutsideClick: false,
        inputValidator: (value) => {
          if (!value) {
            return 'Enter a valid username please';
          }
        },
      })
      .then((result) => {
        email = result.value.trim();
        console.log(`Welcome back ${email}`);
    
      });

})();




















// function add() {
//     const socket = io();
// document.getElementById('form-products').addEventListener('submit',(event)=>{
//     event.preventDefault();
//     const title= document.getElementById('input-title');
//     const description= document.getElementById('input-description');
//     const price= document.getElementById('input-price');
//     const thumbnail= document.getElementById('input-thumbnail');
//     const code= document.getElementById('input-code');
//     const stock= document.getElementById('input-stock');
//     const category= document.getElementById('input-category');

    
//     const newProduct={
//         title: title.value,
//         description:description.value,
//         price:price.value,
//         thumbnail:thumbnail.value,
//         code:code.value, 
//         stock:stock.value,
//         category:category.value,

//     }
//     socket.emit('new-product',newProduct)

//     title.value='';
//     description.value='';
//     price.value='';
//     thumbnail.value='';
//     code.value='';
//     stock.value='';
//     category.value='';
//     title.focus();
// })
// document.getElementById('delete-form').addEventListener('submit',(event)=>{
//     event.preventDefault();
//     const idDelete= document.getElementById('input-delete');
//     socket.emit('delete-product',idDelete.value);
//     idDelete.value='';
//     idDelete.focus();
// })

//     socket.emit('notification', 'Hello from the client')
//     socket.on('init', (data) => {
//         console.log('event init', data);
//     })
//     socket.on('start', (data) => {
//         console.log('start', data);
//     })
//     socket.on('message', (data) => {
//         console.log('message', data);
//     })
//     socket.on('product-list', (products) => {
//         console.log('products', products);
//         const logProducts = document.getElementById('log-products');
//         logProducts.innerHTML='';
//         products.forEach((data) => {
//             const div = document.createElement('div');
//             div.innerHTML = `
//                            <div class="product_info">
//                                 <span class="product_title">Title: ${data.title}</span>
//                                 <span class="product_description">Description:  ${data.description}</span>
//                                 <span class="product_price">Price: ${data.price}</span>
//                                 <span class="product_thumbnail">Thumbnail: ${data.thumbnail}</span>
//                                 <span class="product_code">Code: ${data.code}</span>
//                                 <span class="product_status">Status: ${data.status}</span>
//                                 <span class="product_stock">Stock: ${data.stock}</span>
//                                 <span class="product_category">Category: ${data.category}</span>
//                                 <span class="product_id">id: ${data.id}</span>

                                
                                
//                              </div>
//     `
//           logProducts.appendChild(div);
//         });
//     })



// }
// add();
// ;

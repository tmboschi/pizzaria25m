function fazerPizzas(sabor) {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
           resolve (`Pizza de ${sabor} pronta!`) 
        }, 5000);
       
    }

)
}
export async function pedirPizza() {
    console.log('Pedido enviado para cozinha')
    try {
        const pedidoDaPizza = await fazerPizzas('Frango Catupiry')
        console.log(`Finalmente chegou, ${pedidoDaPizza}`)
    } catch (error) {
        console.log(`Deu ruim: ${error.mensage}`)
    }
}
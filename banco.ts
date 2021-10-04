let conta;
let extrat:number[] = [];

function criar_conta(nome:any, saldo:number,):any{
    return{
        "nome": nome,
        "saldo": saldo,
    }
}

function depositar(conta:any, valor:number):void{
    conta.saldo += valor;
    extrat.push(valor);
}

function sacar(conta:any, valor:number):boolean{
    if(conta.saldo>valor){
        conta.saldo -= valor;
        extrat.push(-valor);
        return true;
    }else{
        console.log("saldo insuficiente");
        return false;
    }
}

function extrato(conta:any){
    console.log("resumo de transações \n" + extrat);
}
conta = criar_conta("lucas", 500);

depositar(conta, 100);
console.log(conta);
sacar(conta, 300);
console.log(conta);
sacar(conta,400);
extrato(conta);

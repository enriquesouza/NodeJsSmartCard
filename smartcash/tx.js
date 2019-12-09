const smartCash = require('smartcashjs-lib');

var key = smartCash.ECPair.fromWIF("VNfTLEaiicXDZum2DxYiRNLoMHLbjGsE43DV5CEtVnq8rxdAP9bx");

console.log(key.getAddress().toString());

var tx = new smartCash.TransactionBuilder();
tx.addInput("3e6ed9200abb4fe2a29b44010e5f05a7450b79e946a7de8328943eaa152db3de", 1);
tx.addOutput("TO_ADDRESS", 100000);
tx.sign(0, key);
console.log(tx.build().toHex());

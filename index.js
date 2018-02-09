
const ProviderEngine = require('web3-provider-engine')
const CacheSubprovider = require('web3-provider-engine/subproviders/cache.js')
const FixtureSubprovider = require('web3-provider-engine/subproviders/fixture.js')
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js')
const VmSubprovider = require('web3-provider-engine/subproviders/vm.js')
const HookedWalletSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js')
const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js')
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js')

CURRENT_TASK = null;

CURRENT_CALLBACK = null;

CLEAR_TASK = function(){
alert("clear");
 CURRENT_TASK = null;
}
CLEAR_CALLBACK = function(error){
   CURRENT_CALLBACK(error,null);
}
START_CALLBACK = function(response){


CLEAR_TASK();

try{

    var data = JSON.parse(response);
    

    if(CURRENT_CALLBACK != null){

      if(data.type == "getAccount"){

          CURRENT_CALLBACK(null,[data.data]);
         
      }
      else if(data.type == "signMessage"){
 
          CURRENT_CALLBACK(null,data.data);
         
      }
      else if(data.type == "signTransaction"){
 
          CURRENT_CALLBACK(null,data.data);
         
      }

    }
    else{
      return "callback null";
    }

  }
  catch(e){
     console.error("callback error",e);
     return "error "+e;
  }
  

}
 

GET_CURRENT_TASK = function(){

if(CURRENT_TASK == null){
    return null;
}
   
  var currentTaskCopy = CURRENT_TASK+"";
  CURRENT_TASK = null;
  return currentTaskCopy;
   
}
  
 Web3 = require('web3')

 try{

var engine = new ProviderEngine()
 web3 = new Web3(engine)
 
  
 engine.addProvider(new HookedWalletSubprovider({
  getAccounts: function(cb){
      
       CURRENT_TASK = JSON.stringify({
        "type":"getAccount",
       });

       CURRENT_CALLBACK = cb;
       
      
    },
    signMessage: function(data,cb){
    
       CURRENT_TASK = JSON.stringify({
        "type":"signMessage",
        "data":data
       });
        

        CURRENT_CALLBACK = cb;
       
       
      
    },
    signTransaction: function(data,cb){
    
       CURRENT_TASK = JSON.stringify({
        "type":"signTransaction",
        "data":data
       });
        

        CURRENT_CALLBACK = cb;
       
       
      
    } 


    

}))

// data source
engine.addProvider(new RpcSubprovider({
  rpcUrl: 'https://mainnet.infura.io/tpmEK4A0oewQTq68OdBMs',
}))

// network connectivity error
engine.on('error', function(err){
  // report connectivity errors
  console.error(err.stack)

})


engine.start();
 
 
}
catch(e){
  console.log("err"+e);
  alert(e);
}
 
 
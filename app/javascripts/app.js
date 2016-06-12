var accounts;
var account;
var balance;

function setStatus(message) {
  var status = document.getElementById("status");
  if (status)
  status.innerHTML = message;
};

var accountID = 3

function displayAccounts() {
        document.getElementById("addresses").innerHTML =
        accounts
        .map((x, i) => ('<tr '+ (i == accountID ? 'class="warning"' : 'class="info"') + '><td><a onclick="setChangeAccount(' + i + ')">' + x + '</a></td></tr>'))
        .join('')
};

function setChangeAccount(newAccount) {
  accountID       = newAccount;
  account         = accounts[accountID];
  var journalist  = document.getElementById("journalist");
  if (journalist)
  journalist.innerHTML = account;
  displayAccounts();
  getAddresses();
}

function refreshBalance() {
  var cryptoContract = Crypto.deployed();
  var balance = web3.fromWei(web3.eth.getBalance(cryptoContract.address), "ether");
  var balance_element = document.getElementById("funds");
  if (balance_element)
  balance_element.innerHTML = balance;

  // cryptoContract.getBalance.call(account, {from: account}).then(function(value) {
  //   var balance_element = document.getElementById("balance");
  //   balance_element.innerHTML = value.valueOf();
  // }).catch(function(e) {
  //   console.log(e);
  //   setStatus("Error getting balance; see log.");
  // });
};

function sendCoin() {
  var crypto = Crypto.deployed();
  var amount = parseInt(document.getElementById("amount").value);
  // var receiver = document.getElementById("receiver").value;
  if (amount === '') return;
  console.log('amount')
  setStatus("Initiating transaction... (please wait)");
  // crypto.sendFundsToParticipate().then(function() {
  //     setStatus("Transaction complete!");
  //     refreshBalance();
  // }).catch(function(e) {
  //   console.log(e);
  //   setStatus("Error sending coin; see log.");
  // });
  //console.log('crypto.address ', crypto.address);
  //crypto.sendFundsToParticipate(web3.toWei(amount, 'ether'));

  console.log('account : ', account);
  if (account) {
    web3.eth.sendTransaction({
      from: account,
      to: crypto.address,
      value: web3.toWei(amount, 'ether')
    },
    function(err, address) {
      if (err) {
        setStatus("Error sending coin; see log.");
      }

      setStatus("Transaction complete!");
      refreshBalance();
    });
  }

  // meta.sendCoin(receiver, amount, {from: account}).then(function() {
  //   setStatus("Transaction complete!");
  //   refreshBalance();
  // }).catch(function(e) {
  //   console.log(e);
  //   setStatus("Error sending coin; see log.");
  // });
};

function getAddresses() {
  var cryptoContract = Crypto.deployed();
  console.log('contract ', cryptoContract.address);
  var address = cryptoContract.getCaller().then(function(value) {
    console.log("caller :", value);
    var balance = web3.fromWei(web3.eth.getBalance(cryptoContract.address), "ether")
    console.log(balance.c[0] + ' ethers');
  });
}

window.onload = function() {
  var cryptoContract = Crypto.deployed();
  console.log('contract ', cryptoContract.address);

  var contract_element = document.getElementById("contract");
  if (contract_element)
  contract_element.innerHTML = cryptoContract.address;

  var address = cryptoContract.getCaller().then(function(value) {
    console.log("caller :", value);
    var balance = web3.fromWei(web3.eth.getBalance(cryptoContract.address), "ether");
    console.log(balance.c[0] + ' ethers');
    var balance_element = document.getElementById("funds");
    if (balance_element)
    balance_element.innerHTML = balance;
  });
  // cryptoContract.getNow()
  //   .then(function (value) {
  //   console.log('now ', value);
  // }).catch(function (error) {
  //   console.log('error ', error);
  // });


  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
  //  account = accounts[0];

    //refreshBalance();
    displayAccounts();
  });
}

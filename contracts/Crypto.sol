contract Crypto {
  mapping (address => uint) funders;
  //uint balance;

  uint durationInMinutes =  60 * 24 * 7;

  struct Proposal {
    address owner;
    string content;
    address[] voters;
    uint votes;
    uint startDate;
    bool closed;
  }

  Proposal[] proposals;

  struct Journalist {
    address addresse;
    string pseudo;
  }

  Journalist[] whitelist;
  uint maxSalary = 5000;

  function() {
    //throw;
    //envoyer des tokens au owner
    if (msg.value <= 0) {
      throw;
    }
    funders[msg.sender] = msg.value;
  }

    function getCaller() constant returns (address caller) {
        caller = msg.sender;
        return caller;
    }

    function sendFundsToParticipate(uint value) {
      if (value <= 0) {
        throw;
      }
      funders[msg.sender] = value;
    }

    function getWitheList() returns (address r) {
      Journalist j = whitelist[0];
      r = j.addresse;
      return r;
    }

   function askForSalary(uint salary) {
       bool isValid = false;
       //vérifier l'état de la whitelist
       for (uint i=0; i < whitelist.length; i++) {
          if (whitelist[i].addresse == msg.sender) isValid = true;
       }
       //si non whitelist => throw
       if (!isValid) {
         throw;
       }

       //si true => envoi d'un salaire
        if (salary > maxSalary) {
          salary = maxSalary;
        }
        msg.sender.send(salary);
       //enregistrer l'opération dans l'historique
   }

   function sendFundsToParticipate() {
       if (msg.value <= 0) {
           throw;
       }
       funders[msg.sender] = msg.value;
   }

   function registerJournalist(address journalistAdress, string fullname) {
       whitelist.push(Journalist(journalistAdress, fullname));
   }


   function sendProposalToRevoke(string content) {
       if (funders[msg.sender] <= 0) {
           throw;
       }

       //deadline = now + durationInMinutes * 1 minutes;
       proposals.push( Proposal(msg.sender,content, new address[](1), 0, now, false) );
   }

   function stopVotingPeriod() {

   }
     //vote
    function voteForRevocation(uint proposalId) {
       if (funders[msg.sender] <= 0) {
           throw;
       }
       proposals[proposalId].voters.length++;
       proposals[proposalId].voters.push(msg.sender);
       proposals[proposalId].votes++;
    }

   function acceptInterruption() {

   }

   function rejectInterruption() {

   }

   function giveFundsBackToParticipants() {

   }
}

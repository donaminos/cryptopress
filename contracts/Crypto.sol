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


   function askForSalary(uint salary) {
       //vérifier l'état de la whitelist
       //sinon throw
       //si true => envoi d'un salaire
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

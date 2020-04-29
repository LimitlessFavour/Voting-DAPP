var Voting = artifacts.require("./Voting.sol");

contract("Election", (accounts) =>{
 

  it('We should have 3 candidates upon deployment', async function () {
     var voting = await Voting.deployed();
     var count = await voting.candidatesCount();
     assert.equal(count,3);
  });

  it('Candidates,upon initiailization have correct values', async function () {
     var voting = await Voting.deployed();
     var count = await voting.candidatesCount();
  });

    it('A user can cast a vote', async function () {
     var voting = await Voting.deployed();
     var count = await voting.candidatesCount();

     var candidateOne = await voting.candidates(1);
     assert.equal(candidateOne[0], 1);
     //initial number of votes for first candidate - 0
     assert.equal(candidateOne[2] , 0);
     //voter votes for candidate one.
     await voting.vote(1,{from : accounts[0]});
     //confirm that number of votes increased to 1.
     candidateOne = await voting.candidates(1);
     assert.equal(candidateOne[2] , 1);
     //another voter votes for candidate one.
     await voting.vote(1,{from : accounts[1]});
     //confirm that number of votes increased to 2.
    candidateOne = await voting.candidates(1);
    assert.equal(candidateOne[2] , 2);
  });

   it('throws an exception for invalid candidates', async function () {
     var voting = await Voting.deployed();
     var count = await voting.candidatesCount();
     let failed = false;

    try{
        
     var candidateOne = await voting.candidates(199,{from : accounts[0]});

    }catch(error){
    failed = true;
    assert.equal(failed,true);
    assert(error.message.indexOf('revert') >= 0, "error message must contain revert");

    }
   });

it('throws an exception for double voting', async function () {
    var voting = await Voting.deployed();
    var candidateTwo = await voting.candidates(2);
    let failed = false;

     assert.equal(candidateTwo[0], 2);
     //initial number of votes for second candidate - 0
     assert.equal(candidateTwo[2] , 0);
     //voter votes for candidate Two.
     await voting.vote(2,{from : accounts[7]});
    //confirm that number of votes increased to 1.
      candidateTwo = await voting.candidates(2);
      assert.equal(candidateTwo[2] , 1);
    //voter attempts to vote again for Candidate One-should fail.
     try{
        await voting.vote(1,{from : accounts[7]});
     }
     catch(error){
      failed = true;
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");

     }
    assert.equal(failed,true);

  });
});
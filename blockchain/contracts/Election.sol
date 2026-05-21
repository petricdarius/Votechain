// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Votechain {
    mapping(string => mapping(string => uint)) public votes;
    mapping(string => mapping(string => bool)) public hasVoted;

    function castVote(string memory _electionId, string memory _candidateId, string memory _userId) public {
        require(!hasVoted[_electionId][_userId], "Vot deja inregistrat!");
        
        votes[_electionId][_candidateId]++;
        hasVoted[_electionId][_userId] = true;
    }

    function getVotesForCandidate(string memory _electionId, string memory _candidateId) public view returns (uint) {
        return votes[_electionId][_candidateId];
    }
}
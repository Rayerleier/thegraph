import {
  NFTCreated as NFTCreatedEvent,
  NFTRegesitered as NFTRegesiteredEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from "../generated/nftFactory/nftFactory"

import {s2NFT} from "../generated/s2NFT/s2NFT"
import {
  NFTCreated,
  NFTRegesitered,
  OwnershipTransferred,
  TokenInfo
} from "../generated/schema"

export async function handleNFTCreated(event: NFTCreatedEvent): void {
  let entity = new NFTCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftCA = event.params.nftCA

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()

  let tokenInfo = new TokenInfo(event.params.nftCA.toHexString());
  tokenInfo.ca = event.params.nftCA;
  tokenInfo.tokenId = 1; //
  tokenInfo.blockNumber = event.block.number;
  tokenInfo.blockTimestamp = event.block.timestamp;
  tokenInfo.transactionHash = event.transaction.hash;

  let s2nft = s2NFT.bind(event.params.nftCA);

  let baseURI = await s2nft._baseURI();
  tokenInfo.tokenURL = baseURI;
  tokenInfo.name = await s2nft.name();
  tokenInfo.owner = await s2nft.owner();

  tokenInfo.save();

}

export function handleNFTRegesitered(event: NFTRegesiteredEvent): void {
  let entity = new NFTRegesitered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftCA = event.params.nftCA

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

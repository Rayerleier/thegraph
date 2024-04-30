在 Sepolia 网络中利用 TheGraph 存储NFT的用户持仓信息，要求如下：

监控 NFTFactory 合约 event NFTCreated(address nftCA); 事件中所有新部署的 nft 合约。
最终将事件中的 nft 合约下用户持仓信息记录到 TheGraph中，用户NFT持仓表对象如下：
type TokenInfo @entity {
  id: ID!
  ca: Bytes! # address
  tokenId: BigInt! # uint256
  tokenURL: String!
  name: String!
  owner: Bytes! # address
  blockNumber: BigInt!
  blockTimestamp: BigInt!
  transactionHash: Bytes!
}
并将 thegraph 项目存放在仓库的 thegraph 文件夹中。
最后提交：github 仓库链接 和 TheGraph 子图数据查询链接（如： https://api.studio.thegraph.com/proxy/72676/mytokendb/version/latest/graphql）

